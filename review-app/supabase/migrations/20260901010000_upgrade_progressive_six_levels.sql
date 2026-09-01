alter table public.progressive_training_progress
  drop constraint if exists progressive_training_progress_current_step_check,
  drop constraint if exists progressive_training_progress_completed_steps_check,
  drop constraint if exists progressive_training_progress_mastery_level_check;

alter table public.progressive_training_progress
  add constraint progressive_training_progress_current_step_check
    check (current_step between 1 and 6),
  add constraint progressive_training_progress_completed_steps_check
    check (completed_steps <@ array[1, 2, 3, 4, 5, 6]::smallint[]),
  add constraint progressive_training_progress_mastery_level_check
    check (mastery_level in (
      'NEW', 'LEARNING', 'BLOCK_RECALL', 'ASSISTED_RECALL',
      'FULL_RECALL', 'TRANSFER_READY', 'MASTERED', 'PRACTICING'
    ));

alter table public.progressive_training_progress
  add column if not exists full_recall_passed boolean not null default false,
  add column if not exists debug_passed boolean not null default false,
  add column if not exists first_full_recall_at timestamptz;

-- Legacy five-step progress maps forward without losing earned work:
-- pattern→L1, block ordering→L2+L3, code fill→L4, full code→L5, variant→L6.
update public.progressive_training_progress progress
set completed_steps = (
  select coalesce(array_agg(distinct new_level order by new_level), '{}'::smallint[]) as levels
  from unnest(progress.completed_steps) old_level
  cross join lateral unnest(case old_level
    when 1 then array[1]::smallint[]
    when 2 then array[2, 3]::smallint[]
    when 3 then array[4]::smallint[]
    when 4 then array[5]::smallint[]
    when 5 then array[6]::smallint[]
    else '{}'::smallint[] end
  ) new_level
),
current_step = case progress.current_step when 1 then 1 when 2 then 3 when 3 then 4 when 4 then 5 else 6 end;

update public.progressive_training_progress
set full_recall_passed = full_code_passed,
    first_full_recall_at = case
      when full_code_passed then coalesce(first_full_recall_at, last_reviewed_at, updated_at)
      else first_full_recall_at
    end
where full_code_passed and not full_recall_passed;

update public.progressive_training_progress
set mastery_level = case
  when mastery_level = 'MASTERED' then 'TRANSFER_READY'
  when mastery_level = 'PRACTICING' and full_recall_passed then 'FULL_RECALL'
  else mastery_level
end
where mastery_level in ('MASTERED', 'PRACTICING');

alter table public.progressive_training_attempts
  drop constraint if exists progressive_training_attempts_step_type_check;

alter table public.progressive_training_attempts
  add constraint progressive_training_attempts_step_type_check
    check (step_type in (
      'PATTERN_CHOICE', 'BLOCK_ORDERING', 'CODE_FILL', 'FULL_CODE', 'VARIANT',
      'PATTERN_BLUEPRINT', 'LOGIC_ORDERING', 'CODE_BLOCK_ORDERING',
      'BLOCK_WRITING', 'FULL_RECALL', 'DEBUG_VARIANT'
    ));

create or replace function public.record_progressive_training_attempt_v2(
  p_attempt_id uuid,
  p_lesson_id text,
  p_lesson_version integer,
  p_step_type text,
  p_answer_payload jsonb,
  p_passed boolean,
  p_test_results jsonb,
  p_hint_level_used smallint,
  p_duration_ms integer,
  p_current_level smallint,
  p_completed_levels smallint[],
  p_full_recall_passed boolean,
  p_debug_passed boolean,
  p_variant_passed boolean,
  p_viewed_solution boolean,
  p_draft_answers jsonb
)
returns public.progressive_training_progress
language plpgsql
security invoker
set search_path = public
as $$
declare
  active_user uuid := auth.uid();
  inserted_count integer;
  previous public.progressive_training_progress;
  result public.progressive_training_progress;
  next_full boolean;
  next_debug boolean;
  next_variant boolean;
  first_recall timestamptz;
  next_mastery text;
  review_days integer;
begin
  if active_user is null then raise exception 'Authentication required'; end if;

  insert into public.progressive_training_attempts (
    id, user_id, lesson_id, lesson_version, step_type, answer_payload,
    passed, test_results, hint_level_used, duration_ms
  ) values (
    p_attempt_id, active_user, p_lesson_id, p_lesson_version, p_step_type,
    coalesce(p_answer_payload, '{}'::jsonb), p_passed,
    coalesce(p_test_results, '[]'::jsonb), p_hint_level_used, p_duration_ms
  ) on conflict (id) do nothing;
  get diagnostics inserted_count = row_count;

  if inserted_count = 0 then
    select * into result from public.progressive_training_progress
    where user_id = active_user and lesson_id = p_lesson_id;
    return result;
  end if;

  select * into previous from public.progressive_training_progress
  where user_id = active_user and lesson_id = p_lesson_id for update;

  next_full := coalesce(previous.full_recall_passed, false) or p_full_recall_passed;
  next_debug := coalesce(previous.debug_passed, false) or p_debug_passed;
  next_variant := coalesce(previous.variant_passed, false) or p_variant_passed;
  first_recall := coalesce(previous.first_full_recall_at, case when p_full_recall_passed and p_passed then now() end);

  if next_full and (next_debug or next_variant)
     and not p_viewed_solution
     and p_hint_level_used = 0
     and p_step_type = 'FULL_RECALL' and p_passed
     and first_recall::date < current_date then
    next_mastery := 'MASTERED'; review_days := 7;
  elsif next_full and (next_debug or next_variant) and not p_viewed_solution then
    next_mastery := 'TRANSFER_READY'; review_days := 3;
  elsif next_full and (p_hint_level_used > 0 or p_viewed_solution) then
    next_mastery := 'ASSISTED_RECALL'; review_days := 1;
  elsif next_full then
    next_mastery := 'FULL_RECALL'; review_days := 1;
  elsif 4 = any(coalesce(p_completed_levels, '{}'::smallint[])) then
    next_mastery := 'BLOCK_RECALL'; review_days := null;
  else
    next_mastery := 'LEARNING'; review_days := null;
  end if;

  insert into public.progressive_training_progress (
    user_id, lesson_id, lesson_version, current_step, completed_steps,
    mastery_level, full_code_passed, full_recall_passed, debug_passed,
    variant_passed, first_full_recall_at, viewed_solution, hint_level_used,
    attempt_count, draft_answers, last_reviewed_at, next_review_at, updated_at
  ) values (
    active_user, p_lesson_id, p_lesson_version, p_current_level,
    coalesce(p_completed_levels, '{}'::smallint[]), next_mastery,
    next_full, next_full, next_debug, next_variant, first_recall,
    p_viewed_solution, p_hint_level_used, 1,
    coalesce(p_draft_answers, '{}'::jsonb), now(),
    case when review_days is null then null else now() + make_interval(days => review_days) end,
    now()
  ) on conflict (user_id, lesson_id) do update set
    lesson_version = greatest(progressive_training_progress.lesson_version, excluded.lesson_version),
    current_step = greatest(progressive_training_progress.current_step, excluded.current_step),
    completed_steps = array(select distinct level from unnest(progressive_training_progress.completed_steps || excluded.completed_steps) level order by level),
    mastery_level = excluded.mastery_level,
    full_code_passed = excluded.full_code_passed,
    full_recall_passed = excluded.full_recall_passed,
    debug_passed = excluded.debug_passed,
    variant_passed = excluded.variant_passed,
    first_full_recall_at = excluded.first_full_recall_at,
    viewed_solution = progressive_training_progress.viewed_solution or excluded.viewed_solution,
    hint_level_used = greatest(progressive_training_progress.hint_level_used, excluded.hint_level_used),
    attempt_count = progressive_training_progress.attempt_count + 1,
    draft_answers = excluded.draft_answers,
    last_reviewed_at = excluded.last_reviewed_at,
    next_review_at = excluded.next_review_at,
    updated_at = now()
  returning * into result;
  return result;
end;
$$;

revoke all on function public.record_progressive_training_attempt_v2(
  uuid, text, integer, text, jsonb, boolean, jsonb, smallint, integer,
  smallint, smallint[], boolean, boolean, boolean, boolean, jsonb
) from public, anon;
grant execute on function public.record_progressive_training_attempt_v2(
  uuid, text, integer, text, jsonb, boolean, jsonb, smallint, integer,
  smallint, smallint[], boolean, boolean, boolean, boolean, jsonb
) to authenticated;

-- PostgREST normally observes DDL automatically, but an explicit reload avoids
-- a transient PGRST202 when the app starts calling the new named-argument RPC.
notify pgrst, 'reload schema';

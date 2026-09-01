create table if not exists public.progressive_training_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null,
  lesson_version integer not null default 1 check (lesson_version > 0),
  current_step smallint not null default 1 check (current_step between 1 and 5),
  completed_steps smallint[] not null default '{}'::smallint[]
    check (completed_steps <@ array[1, 2, 3, 4, 5]::smallint[]),
  mastery_level text not null default 'NEW'
    check (mastery_level in ('NEW', 'LEARNING', 'PRACTICING', 'MASTERED')),
  full_code_passed boolean not null default false,
  variant_passed boolean not null default false,
  viewed_solution boolean not null default false,
  hint_level_used smallint not null default 0 check (hint_level_used between 0 and 5),
  attempt_count integer not null default 0 check (attempt_count >= 0),
  draft_answers jsonb not null default '{}'::jsonb,
  last_reviewed_at timestamptz,
  next_review_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create table if not exists public.progressive_training_attempts (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null,
  lesson_version integer not null check (lesson_version > 0),
  step_type text not null
    check (step_type in ('PATTERN_CHOICE', 'BLOCK_ORDERING', 'CODE_FILL', 'FULL_CODE', 'VARIANT')),
  answer_payload jsonb not null default '{}'::jsonb,
  passed boolean not null,
  test_results jsonb not null default '[]'::jsonb,
  hint_level_used smallint not null default 0 check (hint_level_used between 0 and 5),
  duration_ms integer not null default 0 check (duration_ms >= 0),
  created_at timestamptz not null default now()
);

create index if not exists progressive_training_progress_review_idx
  on public.progressive_training_progress (user_id, next_review_at);
create index if not exists progressive_training_attempts_lesson_idx
  on public.progressive_training_attempts (user_id, lesson_id, created_at desc);

alter table public.progressive_training_progress enable row level security;
alter table public.progressive_training_attempts enable row level security;

revoke all on table public.progressive_training_progress from anon;
revoke all on table public.progressive_training_attempts from anon;
grant select, insert, update on table public.progressive_training_progress to authenticated;
grant select, insert on table public.progressive_training_attempts to authenticated;

drop policy if exists "progressive_training_progress_select_own" on public.progressive_training_progress;
create policy "progressive_training_progress_select_own"
on public.progressive_training_progress for select to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "progressive_training_progress_insert_own" on public.progressive_training_progress;
create policy "progressive_training_progress_insert_own"
on public.progressive_training_progress for insert to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "progressive_training_progress_update_own" on public.progressive_training_progress;
create policy "progressive_training_progress_update_own"
on public.progressive_training_progress for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "progressive_training_attempts_select_own" on public.progressive_training_attempts;
create policy "progressive_training_attempts_select_own"
on public.progressive_training_attempts for select to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "progressive_training_attempts_insert_own" on public.progressive_training_attempts;
create policy "progressive_training_attempts_insert_own"
on public.progressive_training_attempts for insert to authenticated
with check ((select auth.uid()) = user_id);

create or replace function public.record_progressive_training_attempt(
  p_attempt_id uuid,
  p_lesson_id text,
  p_lesson_version integer,
  p_step_type text,
  p_answer_payload jsonb,
  p_passed boolean,
  p_test_results jsonb,
  p_hint_level_used smallint,
  p_duration_ms integer,
  p_current_step smallint,
  p_completed_steps smallint[],
  p_full_code_passed boolean,
  p_variant_passed boolean,
  p_viewed_solution boolean,
  p_draft_answers jsonb,
  p_next_review_at timestamptz default null
)
returns public.progressive_training_progress
language plpgsql
security invoker
set search_path = public
as $$
declare
  active_user uuid := auth.uid();
  inserted_count integer;
  result public.progressive_training_progress;
begin
  if active_user is null then
    raise exception 'Authentication required';
  end if;

  insert into public.progressive_training_attempts (
    id, user_id, lesson_id, lesson_version, step_type, answer_payload,
    passed, test_results, hint_level_used, duration_ms
  ) values (
    p_attempt_id, active_user, p_lesson_id, p_lesson_version, p_step_type,
    coalesce(p_answer_payload, '{}'::jsonb), p_passed,
    coalesce(p_test_results, '[]'::jsonb), p_hint_level_used, p_duration_ms
  ) on conflict (id) do nothing;

  get diagnostics inserted_count = row_count;

  if inserted_count = 1 then
    insert into public.progressive_training_progress (
      user_id, lesson_id, lesson_version, current_step, completed_steps,
      mastery_level, full_code_passed, variant_passed, viewed_solution,
      hint_level_used, attempt_count, draft_answers, last_reviewed_at,
      next_review_at, updated_at
    ) values (
      active_user, p_lesson_id, p_lesson_version, p_current_step,
      coalesce(p_completed_steps, '{}'::smallint[]),
      case when p_variant_passed then 'MASTERED'
           when p_full_code_passed then 'PRACTICING'
           else 'LEARNING' end,
      p_full_code_passed, p_variant_passed, p_viewed_solution,
      p_hint_level_used, 1, coalesce(p_draft_answers, '{}'::jsonb),
      now(), p_next_review_at, now()
    )
    on conflict (user_id, lesson_id) do update set
      lesson_version = greatest(progressive_training_progress.lesson_version, excluded.lesson_version),
      current_step = greatest(progressive_training_progress.current_step, excluded.current_step),
      completed_steps = array(
        select distinct step
        from unnest(progressive_training_progress.completed_steps || excluded.completed_steps) as step
        order by step
      ),
      mastery_level = case
        when progressive_training_progress.variant_passed or excluded.variant_passed then 'MASTERED'
        when progressive_training_progress.full_code_passed or excluded.full_code_passed then 'PRACTICING'
        else 'LEARNING'
      end,
      full_code_passed = progressive_training_progress.full_code_passed or excluded.full_code_passed,
      variant_passed = progressive_training_progress.variant_passed or excluded.variant_passed,
      viewed_solution = progressive_training_progress.viewed_solution or excluded.viewed_solution,
      hint_level_used = greatest(progressive_training_progress.hint_level_used, excluded.hint_level_used),
      attempt_count = progressive_training_progress.attempt_count + 1,
      draft_answers = excluded.draft_answers,
      last_reviewed_at = excluded.last_reviewed_at,
      next_review_at = coalesce(excluded.next_review_at, progressive_training_progress.next_review_at),
      updated_at = now();
  end if;

  select * into result
  from public.progressive_training_progress
  where user_id = active_user and lesson_id = p_lesson_id;

  return result;
end;
$$;

revoke all on function public.record_progressive_training_attempt(
  uuid, text, integer, text, jsonb, boolean, jsonb, smallint, integer,
  smallint, smallint[], boolean, boolean, boolean, jsonb, timestamptz
) from public, anon;
grant execute on function public.record_progressive_training_attempt(
  uuid, text, integer, text, jsonb, boolean, jsonb, smallint, integer,
  smallint, smallint[], boolean, boolean, boolean, jsonb, timestamptz
) to authenticated;

create or replace function public.save_progressive_training_draft(
  p_lesson_id text,
  p_lesson_version integer,
  p_draft_answers jsonb,
  p_hint_level_used smallint default 0,
  p_viewed_solution boolean default false
)
returns public.progressive_training_progress
language plpgsql
security invoker
set search_path = public
as $$
declare
  active_user uuid := auth.uid();
  result public.progressive_training_progress;
begin
  if active_user is null then
    raise exception 'Authentication required';
  end if;

  insert into public.progressive_training_progress (
    user_id, lesson_id, lesson_version, draft_answers, hint_level_used,
    viewed_solution, updated_at
  ) values (
    active_user, p_lesson_id, p_lesson_version,
    coalesce(p_draft_answers, '{}'::jsonb), p_hint_level_used,
    p_viewed_solution, now()
  )
  on conflict (user_id, lesson_id) do update set
    lesson_version = greatest(progressive_training_progress.lesson_version, excluded.lesson_version),
    draft_answers = excluded.draft_answers,
    hint_level_used = greatest(progressive_training_progress.hint_level_used, excluded.hint_level_used),
    viewed_solution = progressive_training_progress.viewed_solution or excluded.viewed_solution,
    updated_at = now()
  returning * into result;

  return result;
end;
$$;

revoke all on function public.save_progressive_training_draft(text, integer, jsonb, smallint, boolean) from public, anon;
grant execute on function public.save_progressive_training_draft(text, integer, jsonb, smallint, boolean) to authenticated;

create table if not exists public.review_stores (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{"version":1,"lessons":{}}'::jsonb,
  revision bigint not null default 1 check (revision > 0),
  updated_at timestamptz not null default now()
);

alter table public.review_stores enable row level security;
revoke all on table public.review_stores from anon;
grant select, insert, update, delete on table public.review_stores to authenticated;

drop policy if exists "review_stores_select_own" on public.review_stores;
create policy "review_stores_select_own"
on public.review_stores for select to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "review_stores_insert_own" on public.review_stores;
create policy "review_stores_insert_own"
on public.review_stores for insert to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "review_stores_update_own" on public.review_stores;
create policy "review_stores_update_own"
on public.review_stores for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "review_stores_delete_own" on public.review_stores;
create policy "review_stores_delete_own"
on public.review_stores for delete to authenticated
using ((select auth.uid()) = user_id);

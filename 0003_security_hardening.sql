-- Apply the admin authorization hardening to databases that already ran 0002.

drop policy if exists "profiles_select_all" on public.profiles;
drop policy if exists "profiles_update_self" on public.profiles;
drop policy if exists "profiles_select_authenticated" on public.profiles;
create policy "profiles_select_authenticated" on public.profiles
  for select using (auth.role() = 'authenticated');

drop policy if exists "treasury_select_authenticated" on public.treasury_transactions;
create policy "treasury_select_council_up" on public.treasury_transactions
  for select using (public.current_role() in ('director', 'council'));

drop policy if exists "treasury_update_council_up" on public.treasury_transactions;
create policy "treasury_update_council_up" on public.treasury_transactions
  for update using (public.current_role() in ('director', 'council'))
  with check (public.current_role() in ('director', 'council'));

create or replace function public.current_role() returns public.user_role
language sql stable security definer set search_path = public as $$
  select role from public.profiles where id = auth.uid();
$$;
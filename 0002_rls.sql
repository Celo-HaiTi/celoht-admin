-- Row Level Security — maps directly to CeloHT's governance chain:
-- Foundation Director → Maintainer Council → Community Contributors.
-- Everyone authenticated can read; writes are role-gated per table.

alter table public.profiles enable row level security;
alter table public.treasury_transactions enable row level security;
alter table public.donations enable row level security;
alter table public.governance_proposals enable row level security;
alter table public.audit_log enable row level security;

create function public.current_role() returns public.user_role
language sql stable security definer as $$
  select role from public.profiles where id = auth.uid();
$$;

-- profiles: users read all profiles, update only their own.
create policy "profiles_select_all" on public.profiles for select using (true);
create policy "profiles_update_self" on public.profiles for update using (id = auth.uid());

-- treasury: everyone authenticated reads; council+director write.
create policy "treasury_select_authenticated" on public.treasury_transactions
  for select using (auth.role() = 'authenticated');
create policy "treasury_write_council_up" on public.treasury_transactions
  for insert with check (public.current_role() in ('director', 'council'));
create policy "treasury_update_council_up" on public.treasury_transactions
  for update using (public.current_role() in ('director', 'council'));

-- donations: read-only for everyone authenticated; writes via service role only
-- (donation ingestion happens through a webhook/edge function, not client writes).
create policy "donations_select_authenticated" on public.donations
  for select using (auth.role() = 'authenticated');

-- governance: everyone authenticated reads; contributor+ can propose,
-- only council+director can change status (i.e. ratify a vote outcome).
create policy "governance_select_authenticated" on public.governance_proposals
  for select using (auth.role() = 'authenticated');
create policy "governance_insert_contributor_up" on public.governance_proposals
  for insert with check (public.current_role() in ('director', 'council', 'contributor'));
create policy "governance_update_council_up" on public.governance_proposals
  for update using (public.current_role() in ('director', 'council'));

-- audit_log: council+director read; inserts happen via triggers/service role only.
create policy "audit_select_council_up" on public.audit_log
  for select using (public.current_role() in ('director', 'council'));

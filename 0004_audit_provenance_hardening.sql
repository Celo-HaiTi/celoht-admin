-- Audit records are append-only and carry enough provenance for incident review.
alter table public.audit_log
  add column if not exists actor_role text,
  add column if not exists resource_type text,
  add column if not exists resource_id text,
  add column if not exists result text,
  add column if not exists failure_reason text,
  add column if not exists request_id uuid default gen_random_uuid(),
  add column if not exists tx_hash text;

alter table public.audit_log
  add constraint audit_log_result_check
  check (result is null or result in ('SUCCESS', 'FAILURE'));

create or replace function public.reject_audit_mutation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  raise exception 'audit_log is append-only';
end;
$$;

drop trigger if exists audit_log_immutable on public.audit_log;
create trigger audit_log_immutable
before update or delete on public.audit_log
for each row execute function public.reject_audit_mutation();

revoke insert, update, delete on public.audit_log from anon, authenticated;
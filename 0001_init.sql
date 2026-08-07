-- CeloHT Admin — Initial schema
-- Run via: supabase db push  (after `supabase link` to your project)

create type public.user_role as enum ('director', 'council', 'contributor', 'viewer');
create type public.tx_type as enum ('inflow', 'outflow');
create type public.tx_currency as enum ('USD', 'cUSD', 'CELO');
create type public.proposal_status as enum ('draft', 'active', 'passed', 'rejected');

-- Mirrors auth.users 1:1, adds CeloHT governance role.
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text not null default '',
  role public.user_role not null default 'viewer',
  avatar_url text,
  region text,
  created_at timestamptz not null default now()
);

create table public.treasury_transactions (
  id uuid primary key default gen_random_uuid(),
  type public.tx_type not null,
  category text not null,
  amount_usd numeric(14, 2) not null check (amount_usd >= 0),
  currency public.tx_currency not null default 'USD',
  description text not null default '',
  tx_hash text,
  occurred_at timestamptz not null default now(),
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

create table public.donations (
  id uuid primary key default gen_random_uuid(),
  donor_name text not null,
  amount_usd numeric(14, 2) not null check (amount_usd >= 0),
  channel text not null,
  recurring boolean not null default false,
  donated_at timestamptz not null default now()
);

create table public.governance_proposals (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  proposer_id uuid references public.profiles (id),
  status public.proposal_status not null default 'draft',
  votes_for integer not null default 0,
  votes_against integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles (id),
  action text not null,
  target text not null,
  metadata jsonb,
  created_at timestamptz not null default now()
);

-- Every mutating table is append-mostly and role-gated; see 0002_rls.sql.
create index idx_treasury_occurred_at on public.treasury_transactions (occurred_at desc);
create index idx_donations_donated_at on public.donations (donated_at desc);
create index idx_audit_created_at on public.audit_log (created_at desc);

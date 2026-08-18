-- Optional local seed data for `supabase db reset`. This is NOT the mock
-- data shown in the UI by default (that's generated client-side and
-- clearly labeled - see src/lib/mock-data/). This file is for developers
-- who want a populated local Postgres instance to test RLS policies against.

insert into public.governance_proposals (title, status, votes_for, votes_against)
values
  ('Approve Q3 education curriculum budget', 'passed', 18, 2),
  ('Onboard 5 new agents in Léogâne', 'active', 12, 1),
  ('Ratify updated Code of Conduct', 'passed', 21, 0);

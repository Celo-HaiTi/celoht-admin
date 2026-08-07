# Database

Schema lives in `supabase/migrations/`:

- `0001_init.sql` — tables: `profiles`, `treasury_transactions`, `donations`, `governance_proposals`, `audit_log`
- `0002_rls.sql` — Row Level Security policies mapped to CeloHT's governance roles

## Setup

```bash
npm install -g supabase
supabase login
supabase link --project-ref <your-project-ref>
supabase db push
```

Optionally seed local data for testing RLS:

```bash
supabase db reset   # applies migrations + supabase/seed/seed.sql
```

## Regenerating types

`src/types/database.ts` is hand-written to match the schema above. Once the project is live, regenerate it properly:

```bash
supabase gen types typescript --project-id <your-project-ref> > src/types/database.ts
```

## Adding a table for a new dashboard

1. Add a migration file `000N_<name>.sql` following the existing numbering.
2. Add matching RLS policies in the same migration — never ship a table without RLS enabled.
3. Update `src/types/database.ts`.
4. Add a Supabase query function alongside the dashboard's mock-data function, gated by `isMockMode()`.

# Data sources: mock vs. real

This is the most important doc in the repo if you plan to demo, screenshot, or share this platform outside the core team.

## The rule

Every dashboard reads through `src/lib/data-source.ts`'s `isMockMode()`. When Supabase isn't configured (no `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`), **every dashboard falls back to seeded mock data** and renders a persistent `MockDataBanner`. This is deliberate:

- Financial dashboards (Treasury, Donations, Grants, Revenue, Expenses) directly affect CeloHT's credibility with grant reviewers and partners. Fabricated-looking numbers presented without a clear "this is a demo" label would be misleading, even unintentionally.
- CeloHT's No Token Policy and non-investment identity mean this platform must never look like it's projecting returns or inflating traction.

## How mock data is built

All mock generators live in `src/lib/mock-data/*.ts`, are named `MOCK_*` or documented as such in a header comment, and use a **seeded pseudo-random generator** (`src/lib/mock-data/seed.ts`) so numbers are stable across reloads — not fabricated fresh each time, and not implying real historical trends.

## Turning mock mode off

1. Provision Supabase (see `docs/DATABASE.md`).
2. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local` (or your deploy host's env settings).
3. Each dashboard's data-fetching function (currently the `getXxx()` mock functions) needs a matching Supabase query. As dashboards are migrated, replace the mock import with a query through `src/lib/supabase/server.ts`, gated by the same `isMockMode()` check so local design work can still fall back to mock data.

## Never do this

- Don't hardcode a "real-looking" number directly into a component to make a demo look more impressive — always route through the mock-data layer so it stays labeled.
- Don't remove the `MockDataBanner` from a dashboard that's still on mock data, even temporarily for a screenshot.
- Don't present GitHub Analytics, Blockchain Analytics, or Wallet Analytics numbers as current unless they're wired to a live API call (GitHub REST API, Celo RPC) — these are especially easy to mistake for live data since the shapes are realistic.

# Data sources and provenance

This is the most important doc in the repo if you plan to demo, screenshot, or share this platform outside the core team.

## The rule

Production dashboards do not fall back to seeded data. They must obtain data
through a server-side provider and expose source, freshness, verification
status, network, and supporting block/transaction metadata where applicable.
When a provider is missing or unavailable, the dashboard reports
`UNAVAILABLE` rather than showing `$0`, an empty verified result, or a fixture.

Fixture generators remain in `lib/mock-data/` for development and test use only.
They are not a production data source and must not be used to support financial,
identity, blockchain, audit, or impact claims.

- Financial dashboards (Treasury, Donations, Grants, Revenue, Expenses) directly affect CeloHT's credibility with grant reviewers and partners. Fabricated-looking numbers presented without a clear "this is a demo" label would be misleading, even unintentionally.
- CeloHT's No Token Policy and non-investment identity mean this platform must never look like it's projecting returns or inflating traction.

## How mock data is built

All mock generators live in `src/lib/mock-data/*.ts`, are named `MOCK_*` or documented as such in a header comment, and use a **seeded pseudo-random generator** (`src/lib/mock-data/seed.ts`) so numbers are stable across reloads - not fabricated fresh each time, and not implying real historical trends.

## Connecting a real provider

1. Provision and migrate Supabase (see `DATABASE.md`).
2. Configure the canonical CeloHT indexer/RPC and verified deployment metadata.
3. Implement the domain provider under `lib/data/providers/` with provenance
	and verification fields.
4. Replace the fixture import in the dashboard with a server-side provider
	call and add positive and negative tests before enabling the route.

## Never do this

- Don't hardcode a "real-looking" number directly into a component to make a demo look more impressive - always route through the mock-data layer so it stays labeled.
- Don't remove the `MockDataBanner` from a dashboard that's still on mock data, even temporarily for a screenshot.
- Don't present GitHub Analytics, Blockchain Analytics, or Wallet Analytics numbers as current unless they're wired to a live API call (GitHub REST API, Celo RPC) - these are especially easy to mistake for live data since the shapes are realistic.

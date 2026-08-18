# Build status

**All 24 dashboards are fully built** - KPIs, charts where relevant, and searchable/sortable/exportable (CSV/XLSX/PDF) data tables, all reading through the shared `isMockMode()` switch.

| Group | Dashboard | Status |
|---|---|---|
| Overview | Executive | ✅ |
| Overview | Transparency | ✅ |
| Overview | KPI | ✅ |
| Overview | Impact | ✅ |
| Finance | Treasury | ✅ |
| Finance | Donations | ✅ |
| Finance | Grants | ✅ |
| Finance | Revenue | ✅ |
| Finance | Expenses | ✅ |
| Programs | Education | ✅ |
| Programs | Community | ✅ |
| Programs | Volunteers | ✅ |
| Programs | Ambassadors | ✅ |
| Programs | Partnerships | ✅ |
| Programs | Reforestation | ✅ |
| Programs | Agent Network | ✅ |
| Technology | Wallet Analytics | ✅ |
| Technology | Blockchain Analytics | ✅ |
| Technology | GitHub Analytics | ✅ |
| Technology | Security | ✅ |
| Governance | Governance | ✅ |
| Governance | Risk | ✅ |
| Governance | Audit | ✅ |
| Governance | Reports | ✅ |

## What "built" means here

Every dashboard has real UI, real mock-data generators (seeded, `MOCK_*`-labeled), and reuses the shared component library (`KpiCard`, `DataTable`, `TrendChart`/`CategoryBarChart`, `ExportMenu`, `MockDataBanner`). What's **not** done automatically by this build:

- **Live data wiring.** Every dashboard still reads seeded mock data by default. Connecting each one to Supabase (or GitHub's API / Celo RPC for the Technology group) is tracked per-dashboard in `docs/DATA_SOURCES.md` - the pattern is consistent, but it's real integration work, not a flag flip.
- **A real `npm install && npm run build`.** This was authored without live network access - see the caveat in the repo's delivery notes. Run the full toolchain locally before merging to `main`; CI (`.github/workflows/ci.yml`) will catch anything on the first PR.
- **Additional Supabase tables.** `supabase/migrations/0001_init.sql` covers Treasury, Donations, Governance, and Audit. Grants, Revenue, Expenses, Education, Community, and the rest will need their own migrations as they're wired to real data - follow the pattern in `docs/DATABASE.md`.

## Suggested next steps (not required to consider this "done")

1. Run `npm install`, `npm run lint`, `npm run typecheck`, `npm run build` locally and fix anything that surfaces - this was hand-authored without a live Node environment to verify against.
2. Provision the Supabase project and start migrating dashboards off mock data, highest-stakes first (Treasury, Donations, Audit).
3. Wire GitHub Analytics to the real GitHub REST API using `GITHUB_TOKEN`/`GITHUB_ORG` from `.env.example`.
4. Replace the Valora wallet-connect stub in `src/app/(auth)/login/page.tsx` with real WalletConnect credentials.

## Per-dashboard deep dives

**All 24 dashboards now have a deep-dive doc** - data model, RLS, current data source, and a concrete roadmap from mock to real. See [`docs/README.md`](README.md) for the full index, or start with [`docs/TREASURY_DASHBOARD.md`](TREASURY_DASHBOARD.md) as the reference example.

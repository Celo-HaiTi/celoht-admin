# CeloHT Admin

Operational control center for the [CeloHT](https://celoht.com) ecosystem treasury, governance, education, community, agent network, and reforestation management in one place.

CeloHT is a community-governed financial-inclusion and blockchain-education initiative built on Celo, headquartered in Léogâne, Haiti. This repository is the internal admin platform used by the Foundation Director, Maintainer Council, and approved Community Contributors to run day-to-day operations transparently.

> **CeloHT has no native token, ICO, presale, or staking product.** This platform reports on real program activity (education, agent network, reforestation) and treasury flows it is not an investment product and nothing in it should be read as financial advice or a return projection.

## ⚠️ Mock data by default

This repo ships with **no live backend connected**. Every number you see on first run is seeded placeholder data, clearly labeled `MOCK_*` in source and flagged with a banner in the UI. This is intentional - see [`docs/DATA_SOURCES.md`](docs/DATA_SOURCES.md) before connecting real financial or program data, and never present a mock-mode screenshot as a live report.

## Status

**All 24 dashboards are fully built**  KPIs, charts, and searchable/exportable data tables throughout. See [`docs/BUILD_STATUS.md`](docs/BUILD_STATUS.md) for what "built" means and what real-data wiring is still needed per dashboard.

## Tech stack

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 4 · shadcn/ui-style components · Framer Motion · Recharts · TanStack Table & Query · React Hook Form + Zod · Zustand · Supabase (Postgres + Auth + RLS) · Celo blockchain integration · Docker · GitHub Actions

## Getting started

```bash
npm install
cp .env.example .env.local   # leave blank to stay in mock-data mode
npm run dev
```

Open http://localhost:3000 you'll land on the Executive dashboard with mock data. No Supabase project is required to explore the UI.

### Connecting real data

1. Create a project at [supabase.com](https://supabase.com).
2. `supabase link` then `supabase db push` to apply `supabase/migrations/`.
3. Fill in `.env.local` with your project URL and anon key.
4. Restart the dev server the mock-data banner disappears once `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set (see `src/lib/data-source.ts`).

Full walkthrough: [`docs/DATABASE.md`](docs/DATABASE.md).

## Governance & roles

Access follows CeloHT's real governance chain see [`docs/AUTHENTICATION.md`](docs/AUTHENTICATION.md):

| Role | Maps to |
|---|---|
| `director` | Foundation Director |
| `council` | Maintainer Council |
| `contributor` | Community Contributor |
| `viewer` | Read-only access |

## Documentation

Full index: [`docs/README.md`](docs/README.md). Start with [`docs/DATA_SOURCES.md`](docs/DATA_SOURCES.md) - every other doc assumes it.

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) - folder structure and module boundaries
- [`docs/DATABASE.md`](docs/DATABASE.md) - Supabase schema and RLS
- [`docs/AUTHENTICATION.md`](docs/AUTHENTICATION.md) - auth flows and RBAC
- [`docs/BUILD_STATUS.md`](docs/BUILD_STATUS.md) - which dashboards are built vs. mocked
- **24 dashboard deep dives** (one per dashboard: purpose, data model, RLS, roadmap) see [`docs/README.md`](docs/README.md) for the full list, organized the same way as the sidebar
- [`SECURITY.md`](SECURITY.md) - reporting vulnerabilities
- [`CONTRIBUTING.md`](CONTRIBUTING.md) - how to propose changes

## License

Apache 2.0 see [`LICENSE`](LICENSE).

## Contact

contact@celoht.com · [github.com/Celo-HaiTi](https://github.com/Celo-HaiTi) · [celoht.com](https://celoht.com)

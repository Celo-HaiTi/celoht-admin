# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.3.0] - 2026-08-07

### Added
- Deep-dive documentation for all 24 dashboards (`docs/*_DASHBOARD.md`) - purpose, exact data model, RLS, current data source, and a concrete roadmap from mock to real for each.
- `docs/README.md` - full documentation index, organized by the same groups as the sidebar nav.
- Corrected every reference to the CeloHT GitHub org from the nonexistent `Celo-HT` to the real, verified `Celo-HaiTi` (`.env.example`, GitHub Analytics dashboard, deploy workflow, README).

### Fixed
- Live verification (2026-08-06) found the CeloHT org profile's own README mixing `Celo-HT` (nonexistent, 404) and `Celo-HaiTi` (real) links inconsistently - a corrected profile README was produced separately for the `.github` repo.

## [0.2.0] - 2026-08-06

### Added
- All remaining 19 dashboards fully built (Grants, Revenue, Expenses, Education, Community, Volunteers, Ambassadors, Partnerships, Reforestation, Agent Network, Wallet Analytics, Blockchain Analytics, GitHub Analytics, Security, KPI, Impact, Risk, Audit, Reports) - 24/24 total.
- Seeded mock-data generators for every new dashboard, following the existing `MOCK_*` labeling convention.
- `nav-config.ts` fully flipped to `built: true` across all groups.

### Notes
- All dashboards still default to mock-data mode until Supabase (and GitHub API / Celo RPC for the Technology group) are connected - see `docs/DATA_SOURCES.md`.
- Authored without live network access; run `npm install && npm run build` locally before merging.

## [0.1.0] - 2026-08-06

### Added
- Initial repository scaffold: Next.js 15, React 19, TypeScript strict, Tailwind CSS 4.
- Design system (`src/app/globals.css`) - navy/gold token system derived from the CeloHT mark.
- Shared component library: KpiCard, DataTable (search/sort/paginate/export), ExportMenu (CSV/XLSX/PDF), MockDataBanner, ComingSoon shell, chart wrappers.
- Auth scaffold: Supabase email magic link + Valora wallet-connect stub, RBAC types, middleware guard.
- Supabase schema + RLS policies (`supabase/migrations/`) mapped to CeloHT's governance chain.
- 5 dashboards fully built: Executive, Transparency, Governance, Treasury, Donations.
- 18 remaining dashboards scaffolded with routing, nav, and a build-status shell.
- CI (lint, typecheck, test, build, CodeQL), Dependabot, issue/PR templates.
- Docs: architecture, data-sources policy, database, authentication, build status.

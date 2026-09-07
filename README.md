# CeloHT Admin

Operational admin dashboard for the CeloHT ecosystem. This repository provides the internal UI for treasury, governance, education, community, reforestation, and program reporting workflows.

CeloHT is a community-governed financial-inclusion and blockchain-education initiative built on Celo. This repository is the admin platform used to review operational data and dashboard views, not a wallet, treasury custody layer, or smart-contract deployment system.

> CeloHT does not currently define a native token, ICO, presale, or staking product in this repository. This app is an admin interface whose production dashboard routes fail closed until verified data providers are configured.

## Current status

This repo has been repaired and verified as a functional Next.js app shell:

- App Router structure restored under `app/`
- Dashboard route system working for all configured dashboard slugs
- Development fixtures are isolated from production; production dashboard routes show `UNAVAILABLE` until verified providers are configured
- No wallet signing or treasury custody logic is implemented here
- Verified with actual commands: `npm test`, `npm run build`, and `npm run lint`

## Tech stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Vitest + jsdom
- Supabase SSR/client helpers
- Recharts
- TanStack Table
- Sonner for toasts

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Supabase authentication is required for dashboard access. Production never
accepts an unauthenticated fixture mode and never substitutes mock data for an
unavailable provider.

## Routes

- `/` redirects to `/dashboard/executive`
- `/login` for the auth entry page
- `/dashboard/[slug]` for the dashboard router

## Data and production status

Canonical provider contracts and provenance types are present, but the external
CeloHT indexer, verified addresses, event definitions, and production evidence
sources are not configured in this repository. This project is **NOT
PRODUCTION READY** and must not be represented as live financial, governance,
impact, audit, or blockchain reporting.

## Required external configuration for live data

To connect real data, supply environment values in `.env.local` and configure the relevant real services externally:

- Supabase URL and anon key
- GitHub access for analytics
- Celo RPC or indexer access for blockchain analytics
- real wallet/project credentials where wallet flows are added later

## Documentation index

Root-level documentation currently in this repository:

- [ARCHITECTURE.md](ARCHITECTURE.md)
- [AUTHENTICATION.md](AUTHENTICATION.md)
- [BUILD_STATUS.md](BUILD_STATUS.md)
- [DATABASE.md](DATABASE.md)
- [DATA_SOURCES.md](DATA_SOURCES.md)
- [SECURITY.md](SECURITY.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)
- [REPOSITORY_PRODUCT_READINESS.md](REPOSITORY_PRODUCT_READINESS.md)
- [WALLET_COMPATIBILITY.md](WALLET_COMPATIBILITY.md)

## Product readiness note

This repository is in a verified app-shell and dashboard-building state. It is not a production blockchain deployment, wallet custody implementation, or live treasury backend. It is suitable for mock review and internal dashboard work, while real data integrations remain external and intentionally unconfigured.

## License

Apache 2.0 — see [LICENSE](LICENSE).

## Contact

- GitHub: [Celo-HaiTi](https://github.com/Celo-HaiTi)
- Website: [celoht.com](https://celoht.com)
- Email: contact@celoht.com

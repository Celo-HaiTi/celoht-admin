# Contributing to CeloHT Admin

CeloHT is community-governed. Contributions from Community Contributors are welcome and reviewed by the Maintainer Council.

## Workflow

1. Fork and branch from `main`.
2. `npm install`, `npm run dev` (mock mode works with no setup).
3. Make your change. Reuse shared components (`KpiCard`, `DataTable`, chart wrappers) rather than one-off widgets - see `docs/ARCHITECTURE.md`.
4. `npm run lint && npm run typecheck && npm run test` before opening a PR.
5. If your change touches financial or program data, read `docs/DATA_SOURCES.md` first - mock data must stay clearly labeled.
6. Open a PR using the template; link the relevant dashboard from `docs/BUILD_STATUS.md` if you're completing one.

## Commit style

Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`), enforced by commitlint via Husky.

## Code of Conduct

Be respectful, assume good faith, and keep discussion focused on the work. Governance disputes go through `governance_proposals`, not PR comments.

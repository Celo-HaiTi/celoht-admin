# Production Readiness

This document records the evidence-based status of `celoht-admin`. It describes the administrative application in this repository only; it does not certify the CeloHT contracts, dApp, Treasury, or external Supabase project.

## IMPLEMENTED

- Next.js App Router dashboard shell with typed TypeScript configuration.
- Deterministic mock data with persistent mock-data labeling.
- Explicit development-only unauthenticated mock access.
- Production fail-closed behavior when Supabase authentication is not configured.
- Supabase server and browser client helpers using the anon key only.
- RLS migrations for profile directory access, role-gated Treasury reads/writes, governance, donations, and audit-log reads.
- Removal of self-service profile updates so users cannot change their own role through RLS.
- CI checks for formatting, lint, typechecking, tests, build, and CodeQL analysis.

## TESTNET READY

- No on-chain deployment or wallet transaction flow is implemented in this repository.
- Celo Sepolia integration is therefore not applicable to the current admin shell.

## PRODUCTION READY

- None. No claim of production readiness is made for live administrative operations.

## PLANNED

- Connect an authorized Supabase project and generate database types from the deployed schema.
- Add server-side, audited mutation paths that authenticate, authorize, validate, execute, and record audit events.
- Add real blockchain/indexer adapters for read-only analytics with explicit source labels.
- Add integration, accessibility, and end-to-end coverage for authenticated workflows.

## BLOCKED

- Live administrative use is blocked until a Supabase project, authentication policy, role bootstrap process, and operational ownership are configured and reviewed.
- Treasury and governance operations are blocked because this repository contains no custody, Safe, contract execution, or verified deployment integration.
- Production impact, agent, education, and wallet metrics are blocked because no authoritative live data source is connected.

## MOCK / DEMO

- All dashboard generators under `lib/mock-data/` are deterministic mock data.
- Mock mode is suitable for local design review and automated build validation only.
- Mock values are not Treasury balances, transaction history, verified agent records, student records, or reforestation evidence.

## HISTORICAL / DEPRECATED

- Any legacy CeloHT organization, network, asset, or URL references found in historical documentation must remain explicitly labeled and are not current integration targets.
- The repository does not configure Alfajores, cUSD, a CeloHT token, tokenomics, staking, ICO, presale, or investment returns.

## Security Notes

- The admin middleware now fails closed in production when Supabase is absent.
- `0003_security_hardening.sql` must be applied to an existing Supabase database; editing SQL files alone does not change a deployed database.
- The current RLS model is necessary but not sufficient for production. Service-role access, server actions, storage, audit retention, backups, and incident recovery still require review.

## Validation Evidence

- `npm ci` completed successfully on 2026-09-06.
- Focused middleware tests pass: `npm test -- middleware.test.ts`.
- Full tests pass: `npm test` (2 files, 4 tests).
- Typecheck passes: `npm run typecheck`.
- Production build passes: `npm run build` with the existing mock-data build path.
- Lint passes with five existing warnings in layout/configuration files; there are no lint errors.
- Targeted formatting passes for edited TypeScript and Markdown files. Repository-wide `npm run format:check` still reports 95 pre-existing files needing formatting.
- Production dependency audit remains blocked: `npm audit --omit=dev` reports 14 vulnerabilities, including 5 high and 3 critical findings.

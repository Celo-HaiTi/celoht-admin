# Architecture

## Current production boundary

Production requests are authenticated by middleware and routed through the
server-side App Router. The dashboard dispatcher returns an explicit
`UNAVAILABLE` state until a verified provider is configured; it does not execute
fixture-backed dashboard components in production. Development fixture imports
are isolated in `app/dashboard/[slug]/development-map.tsx`.

Provider contracts and provenance types live under `lib/data/providers/` and
`lib/data/provenance.ts`. The Celo RPC treasury adapter validates the configured
chain and treasury address and returns block-backed native CELO balance data.
Transactions, donations, governance, agents, education, reforestation, and
audit adapters remain unavailable until canonical external sources are supplied.

The browser never receives the Supabase service-role key and contains no private
key signing path. Append-only audit protections are defined in
`0004_audit_provenance_hardening.sql`.

```
src/
  app/
    (auth)/login/          Public auth routes - no sidebar
    (dashboard)/dashboard/  All 23 dashboards, one folder per slug
      <slug>/page.tsx
    globals.css             Design tokens (see docs/DESIGN_SYSTEM.md below)
    layout.tsx               Root layout: fonts, theme provider, toaster
  components/
    ui/                     Primitives: Button, Card, Badge (shadcn-style)
    dashboard/              Shared dashboard widgets: KpiCard, DataTable,
                             ExportMenu, MockDataBanner, ComingSoon, BarGlyph
    layout/                 Sidebar, Topbar, ThemeProvider
    charts/                 Recharts wrappers: TrendChart, CategoryBarChart
  lib/
    supabase/               client.ts (browser), server.ts (RSC/route handlers)
    mock-data/               One file per dashboard domain, seeded + labeled
    utils/                   cn, format, export (CSV/XLSX/PDF)
    data-source.ts           isMockMode() - the single mock/real switch
    nav-config.ts             Source of truth for sidebar + build status
  types/                    Shared TS types + Supabase Database typing
  middleware.ts              Session refresh + auth guard on /dashboard/*
supabase/
  migrations/                SQL schema + RLS policies
  seed/                      Optional local dev seed data
```

## Adding a new dashboard

1. It's already routed - every slug in `src/lib/nav-config.ts` has a folder under `src/app/(dashboard)/dashboard/`.
2. Flip `built: false` → `true` in `nav-config.ts` once you replace `ComingSoon` with a real page.
3. Add a `src/lib/mock-data/<slug>.ts` seeded generator first (see `docs/DATA_SOURCES.md`), build the UI against that, then wire Supabase later.
4. Reuse `KpiCard`, `DataTable`, `TrendChart`/`CategoryBarChart`, and `ExportMenu` rather than building bespoke widgets - consistency across 23 dashboards depends on this.

## RBAC

`src/types/index.ts` defines `Role` and `PERMISSIONS`, mirroring the Postgres RLS policies in `supabase/migrations/0002_rls.sql`. Postgres RLS is the source of truth; the TS mirror is for UI gating (hiding actions a role can't perform, not just disabling them).

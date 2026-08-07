# Treasury Dashboard

**Path:** `src/app/(dashboard)/dashboard/treasury/page.tsx`
**Status:** ✅ Built · 🚧 Mock data by default — see [Data source](#data-source)
**Owners:** Maintainer Council (read/write) · Foundation Director (read/write) · everyone else (read-only)

---

## 1. Purpose

The Treasury Dashboard is the single place anyone with admin access goes to answer, at a glance: *how much does CeloHT have, where did it come from, and where did it go.* It exists to make CeloHT's finances legible to three audiences at once, without maintaining three separate views:

- **Grant reviewers and prospective partners**, who need to trust the numbers before they trust the pitch.
- **The Maintainer Council**, who need enough detail to approve or question a specific transaction, not just a total.
- **Community Contributors**, who have a right to see how funds raised in the community's name are actually spent.

This document describes what the dashboard shows, how it's built, how the data model works, and — most importantly — exactly what has to happen before any number on this page can be shown to someone outside the core team as real.

---

## 2. What it shows

| Section | Contents |
|---|---|
| **KPI row** | Current Balance, Inflows (90d), Outflows (90d), cUSD Reserve — each with a period-over-period delta |
| **Balance over time** | An area chart of combined USD-equivalent balance across the tracked window |
| **Transactions table** | Every inflow and outflow: ID, date, type, category, description, amount, currency — searchable, sortable, paginated, and exportable to CSV / Excel / PDF |

Screens reference: run `npm run dev`, open `/dashboard/treasury`. No login or Supabase project is required to view it in mock mode.

---

## 3. Data model

Backed by `supabase/migrations/0001_init.sql`, table `treasury_transactions`:

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | Primary key |
| `type` | `inflow` \| `outflow` | Enum `tx_type` |
| `category` | `text` | Free text today (e.g. "Grant", "Education", "Tooling") — see [§6 Roadmap](#6-roadmap-for-this-dashboard) for a proposed enum |
| `amount_usd` | `numeric(14,2)` | Always stored in USD-equivalent for consistent reporting, regardless of the original currency |
| `currency` | `USD` \| `cUSD` \| `CELO` | The currency the transaction actually settled in |
| `description` | `text` | Human-readable context |
| `tx_hash` | `text`, nullable | On-chain reference when the transaction is a cUSD/CELO transfer; null for fiat |
| `occurred_at` | `timestamptz` | When the transaction happened (not when it was entered) |
| `created_by` | `uuid` → `profiles.id` | Who recorded it |

### Row Level Security

Defined in `supabase/migrations/0002_rls.sql`:

- **Read:** any authenticated user (`director`, `council`, `contributor`, `viewer`).
- **Write (insert/update):** `director` and `council` only, enforced via `public.current_role()`.

This mirrors CeloHT's real governance chain — Foundation Director → Maintainer Council → Community Contributors — so a Community Contributor can see every transaction but cannot alter one. RLS is the enforcement layer; `src/types/index.ts`'s `PERMISSIONS` map mirrors it for UI-level gating (hiding write actions a role can't perform), but Postgres is the source of truth.

---

## 4. Data source

Like every dashboard in this repo, Treasury reads through `src/lib/data-source.ts`'s `isMockMode()`:

```ts
// src/lib/mock-data/treasury.ts
export function getTreasuryTransactions(): TreasuryTx[] { ... }
```

- **Mock mode (default):** figures come from `src/lib/mock-data/treasury.ts`, a seeded, deterministic generator. Every mock ID is prefixed `MOCK-TX-`. A persistent banner (`MockDataBanner`) renders at the top of the page whenever this is active.
- **Real mode:** once `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set, `isMockMode()` returns `false` and the page should read from `treasury_transactions` via `src/lib/supabase/server.ts` instead. **This wiring is not yet implemented** — replacing the mock import with a real Supabase query, gated by the same `isMockMode()` check, is the single highest-priority item in [§6](#6-roadmap-for-this-dashboard).

> **This is the most sensitive dashboard in the repo to get wrong.** Never remove the mock banner while still on mock data, and never let a screenshot of this page circulate as a real financial statement until it's reading from Supabase. See [`docs/DATA_SOURCES.md`](DATA_SOURCES.md) for the full policy.

---

## 5. Components used

Reused from the shared library — no bespoke widgets on this page, by design, so it stays visually and behaviorally consistent with every other dashboard:

- `KpiCard` (`src/components/dashboard/kpi-card.tsx`)
- `TrendChart` (`src/components/charts/trend-chart.tsx`)
- `DataTable` + `ExportMenu` (`src/components/dashboard/data-table.tsx`, `export-menu.tsx`)
- `MockDataBanner` (`src/components/dashboard/mock-data-banner.tsx`)

If you're extending this page, prefer adding a prop to one of these over writing a new component — see [`docs/ARCHITECTURE.md`](ARCHITECTURE.md#adding-a-new-dashboard).

---

## 6. Roadmap for this dashboard

In priority order:

1. **Wire to Supabase.** Replace `getTreasuryTransactions()` / `getTreasuryKpis()` / `getTreasuryTrend()` mock calls with real queries against `treasury_transactions`, behind `isMockMode()`. KPI deltas need a stored or computed prior-period comparison — either a scheduled Postgres function or a client-side comparison against a second query.
2. **Constrain `category` to an enum.** Currently free text; a fixed set (e.g. `grant`, `donation`, `sponsorship`, `education`, `agent_network`, `reforestation`, `operations`, `tooling`) would make the category breakdown chart and filtering reliable instead of dependent on consistent manual entry.
3. **Add a write flow.** Currently read-only in the UI even for `director`/`council` roles, despite RLS already allowing their writes. A "Record transaction" form (React Hook Form + Zod, matching the stack already in `package.json`) is the natural next addition, logged to `audit_log` on submit.
4. **On-chain verification.** For transactions with a `tx_hash`, link out to a Celo block explorer and optionally verify the amount against the chain rather than trusting manual entry — closes the gap between "we said this happened" and "this provably happened."
5. **Independent review cadence.** Once real data is flowing, pair this dashboard with the "Independent financial review" item already tracked as "Planned" on the Transparency dashboard's compliance checklist (`src/lib/mock-data/transparency.ts`).

None of the above is required for the dashboard to be considered "built" per [`docs/BUILD_STATUS.md`](BUILD_STATUS.md) — it already has real UI and a real (mocked) data path. These are the steps between "built" and "trustworthy to show a funder," which is a deliberately higher bar.

---

## 7. Why this level of documentation

Top-tier open-source financial tooling (Open Collective, GiveDirectly's public dashboards, GitLab's own transparency reports) earns trust through two things this doc tries to model: **a data model anyone can audit**, and **an explicit, written line between what's real and what's a placeholder.** A polished UI is the easy 20%; a documented, honest data pipeline is the 80% that actually earns grant reviewers' and the community's confidence. Every other `docs/*_DASHBOARD.md` added to this repo should follow the same shape: purpose → what it shows → data model → data source status → roadmap.

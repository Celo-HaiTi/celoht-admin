# Wallet Analytics Dashboard

**Path:** `src/app/(dashboard)/dashboard/wallet-analytics/page.tsx`
**Status:** ✅ Built · 🚧 Mock data by default — see [Data source](#data-source)
**Owners:** Maintainer Council (read) · Foundation Director (read) · everyone else (read-only) — system-generated, no manual writes

---

## 1. Purpose

This dashboard aggregates wallet activity — total wallets, active-30-day, average balance, growth by cohort (students/merchants/farmers/agents/community) — to show whether financial inclusion is actually sticking (repeat use) rather than only growing (one-time signups). Privacy matters here: this must always be aggregate statistics, never a lookup of any individual's balance.

---

## 2. What it shows

| Section | Contents |
|---|---|
| KPI row | Total Wallets, Active (30d), Avg. Balance, New This Month |
| Trend chart | Cumulative wallet growth over time |
| Cohorts table | Cohort, wallet count, avg. cUSD balance, active-30d count — searchable, sortable, exportable |

---

## 3. Data model

**None yet — sourced externally, not from a CeloHT-owned table.** See [§ Roadmap](#roadmap) for the schema this dashboard needs before it can leave mock mode.

### Row Level Security

N/A — this dashboard should never read individual wallet data directly. Aggregation must happen either in the indexer/API layer or in a Postgres materialized view that only ever exposes cohort-level sums, never row-level user balances.

---

## 4. Data source

Like every dashboard in this repo, Wallet Analytics reads through `src/lib/data-source.ts`'s `isMockMode()`. In mock mode (the default), figures come from `src/lib/mock-data/wallet-analytics.ts` — a seeded, deterministic generator with every mock ID prefixed `MOCK-`. A persistent `MockDataBanner` renders at the top of the page whenever this is active. See [`docs/DATA_SOURCES.md`](DATA_SOURCES.md) for the full policy on why this default exists and when it's safe to turn off.

---

## 5. Components used

Reused from the shared library, consistent with every other dashboard in this repo — see [`docs/ARCHITECTURE.md`](ARCHITECTURE.md#adding-a-new-dashboard) before adding a bespoke widget here instead of extending an existing one.

---

## 6. Roadmap for this dashboard

1. Wire to a real source: either a Valora/Celo indexer API, or a scheduled job that aggregates on-chain data into a `wallet_cohort_stats` summary table — **never** a live per-wallet query surfaced to this UI.
2. Define "cohort" concretely (self-reported at onboarding? agent-assigned?) before this is real, since the current mock cohorts (Students, Merchants, Farmers, Agents, General Community) are illustrative, not sourced from an actual field.
3. Add a privacy note directly in the UI once real data is connected, reiterating that all figures are aggregate.

None of the above is required for this dashboard to be considered "built" per [`docs/BUILD_STATUS.md`](BUILD_STATUS.md) — it already has real UI and a real (mocked) data path. These are the steps between "built" and "auditable."

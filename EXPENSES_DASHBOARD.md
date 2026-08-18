# Expenses Dashboard

**Path:** `src/app/(dashboard)/dashboard/expenses/page.tsx`
**Status:** ✅ Built · 🚧 Mock data by default - see [Data source](#data-source)
**Owners:** Maintainer Council (read/write) · Foundation Director (read/write) · everyone else (read-only)

---

## 1. Purpose

Where Treasury shows the balance and Revenue shows what comes in, Expenses answers the question a skeptical funder asks first: does the spending match the mission. Category breakdown (Education vs. Agent Stipends vs. Reforestation vs. Tooling vs. Events) is the fastest way to demonstrate that overhead isn't quietly eating program budget.

---

## 2. What it shows

| Section | Contents |
|---|---|
| KPI row | Total Spend (YTD), Largest Category, Monthly Burn Rate, Budget Remaining |
| Trend + breakdown | Monthly spend trend and a by-category chart |
| Expense ledger | Category, vendor, amount, date, approver (Council/Director) - searchable, sortable, exportable |

---

## 3. Data model

**None yet - not in `supabase/migrations/0001_init.sql`.** See [§ Roadmap](#roadmap) for the schema this dashboard needs before it can leave mock mode.

### Row Level Security

N/A until the table exists - see Roadmap.

---

## 4. Data source

Like every dashboard in this repo, Expenses reads through `src/lib/data-source.ts`'s `isMockMode()`. In mock mode (the default), figures come from `src/lib/mock-data/expenses.ts` - a seeded, deterministic generator with every mock ID prefixed `MOCK-`. A persistent `MockDataBanner` renders at the top of the page whenever this is active. See [`docs/DATA_SOURCES.md`](DATA_SOURCES.md) for the full policy on why this default exists and when it's safe to turn off.

---

## 5. Components used

Reused from the shared library, consistent with every other dashboard in this repo - see [`docs/ARCHITECTURE.md`](ARCHITECTURE.md#adding-a-new-dashboard) before adding a bespoke widget here instead of extending an existing one.

---

## 6. Roadmap for this dashboard

1. **Add an `expenses` table** (or model as a view over `treasury_transactions` where `type = 'outflow'`, same reasoning as Revenue above - one ledger, multiple views, rather than duplicated data that can drift out of sync).
2. Enforce the `approved_by` field at the database level (a check constraint or trigger requiring Council/Director role) rather than trusting client-supplied data.
3. "Budget Remaining" currently has no linked budget-plan table to compare against - add one (per pillar, per quarter) so this figure is computed, not asserted.

None of the above is required for this dashboard to be considered "built" per [`docs/BUILD_STATUS.md`](BUILD_STATUS.md) - it already has real UI and a real (mocked) data path. These are the steps between "built" and "auditable."

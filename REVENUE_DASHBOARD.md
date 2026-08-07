# Revenue Dashboard

**Path:** `src/app/(dashboard)/dashboard/revenue/page.tsx`
**Status:** ✅ Built · 🚧 Mock data by default — see [Data source](#data-source)
**Owners:** Maintainer Council (read/write) · Foundation Director (read/write) · everyone else (read-only)

---

## 1. Purpose

CeloHT's real, documented business model is grants + strategic partnerships + community/GitHub Sponsors today, with agent-network service fees becoming a revenue source starting Phase 3. This dashboard exists to make that model visible and falsifiable — anyone should be able to check whether the revenue mix is actually diversifying the way the roadmap says it will, rather than taking the roadmap's word for it.

---

## 2. What it shows

| Section | Contents |
|---|---|
| KPI row | Total Revenue (YTD), GitHub Sponsors (MRR), Grant Revenue Share, Active Revenue Sources |
| Trend + breakdown | Monthly revenue trend chart and a by-source category chart (Grants / Sponsorships / GitHub Sponsors / Agent Fees) |
| Revenue entries | Source, category, amount, date — searchable, sortable, exportable |

---

## 3. Data model

**None yet — not in `supabase/migrations/0001_init.sql`.** See [§ Roadmap](#roadmap) for the schema this dashboard needs before it can leave mock mode.

### Row Level Security

N/A until the table exists — see Roadmap.

---

## 4. Data source

Like every dashboard in this repo, Revenue reads through `src/lib/data-source.ts`'s `isMockMode()`. In mock mode (the default), figures come from `src/lib/mock-data/revenue.ts` — a seeded, deterministic generator with every mock ID prefixed `MOCK-`. A persistent `MockDataBanner` renders at the top of the page whenever this is active. See [`docs/DATA_SOURCES.md`](DATA_SOURCES.md) for the full policy on why this default exists and when it's safe to turn off.

---

## 5. Components used

Reused from the shared library, consistent with every other dashboard in this repo — see [`docs/ARCHITECTURE.md`](ARCHITECTURE.md#adding-a-new-dashboard) before adding a bespoke widget here instead of extending an existing one.

---

## 6. Roadmap for this dashboard

1. **Add a `revenue_entries` table**, or, better, model this as a Postgres *view* over `treasury_transactions` filtered to `type = 'inflow'` plus a `category` classification, rather than a second source of truth for the same money.
2. Wire the GitHub Sponsors MRR figure to the real GitHub Sponsors API once `GITHUB_TOKEN` is configured (see `.env.example`).
3. Track "Agent Fees (pilot)" as its own category from day one, even at near-zero volume, so the Phase 3 self-sustainability transition is visible in the trend line rather than appearing as a sudden jump.

None of the above is required for this dashboard to be considered "built" per [`docs/BUILD_STATUS.md`](BUILD_STATUS.md) — it already has real UI and a real (mocked) data path. These are the steps between "built" and "auditable."

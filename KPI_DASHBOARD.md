# KPI Dashboard

**Path:** `src/app/(dashboard)/dashboard/kpi/page.tsx`
**Status:** ✅ Built · 🚧 Mock data by default — see [Data source](#data-source)
**Owners:** Maintainer Council (read/write) · Foundation Director (read/write) · everyone else (read-only)

---

## 1. Purpose

Every pillar has its own dashboard with its own metrics; this one exists to hold leadership's actual targets next to actuals in a single table, across pillars, so progress can be judged against a commitment made in advance rather than against whatever number looks best in retrospect.

---

## 2. What it shows

| Section | Contents |
|---|---|
| KPI targets table | Metric, pillar, target, actual, progress % — searchable, sortable, exportable |

---

## 3. Data model

**None yet — not in `supabase/migrations/0001_init.sql`.** See [§ Roadmap](#roadmap) for the schema this dashboard needs before it can leave mock mode.

### Row Level Security

N/A until the table exists — see Roadmap.

---

## 4. Data source

Like every dashboard in this repo, KPI reads through `src/lib/data-source.ts`'s `isMockMode()`. In mock mode (the default), figures come from `src/lib/mock-data/kpi.ts` — a seeded, deterministic generator with every mock ID prefixed `MOCK-`. A persistent `MockDataBanner` renders at the top of the page whenever this is active. See [`docs/DATA_SOURCES.md`](DATA_SOURCES.md) for the full policy on why this default exists and when it's safe to turn off.

---

## 5. Components used

Reused from the shared library, consistent with every other dashboard in this repo — see [`docs/ARCHITECTURE.md`](ARCHITECTURE.md#adding-a-new-dashboard) before adding a bespoke widget here instead of extending an existing one.

---

## 6. Roadmap for this dashboard

1. **Add a `kpi_targets` table** with a `period` field (e.g. tied to roadmap phases) so targets can be set per-phase rather than as a single perpetual number.
2. Each row's `actual` value should be computed from the relevant source dashboard's real data (e.g. "Trees planted" pulls from Reforestation) once those are wired — not entered a second time by hand.
3. Targets should be set and versioned by the Maintainer Council with a visible history, so past targets aren't quietly revised after the fact.

None of the above is required for this dashboard to be considered "built" per [`docs/BUILD_STATUS.md`](BUILD_STATUS.md) — it already has real UI and a real (mocked) data path. These are the steps between "built" and "auditable."

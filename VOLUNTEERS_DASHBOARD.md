# Volunteers Dashboard

**Path:** `src/app/(dashboard)/dashboard/volunteers/page.tsx`
**Status:** ✅ Built · 🚧 Mock data by default — see [Data source](#data-source)
**Owners:** Community Contributors (read/write) · Maintainer Council (read/write) · Foundation Director (read/write) · everyone else (read-only)

---

## 1. Purpose

Volunteer hours are real, uncounted-elsewhere value CeloHT relies on — this dashboard exists to make that labor visible in the same place as paid spend, so it isn't invisible in reports that only track money. Retention rate matters as much as headcount: a volunteer program that churns fast is a different problem than one that's simply small.

---

## 2. What it shows

| Section | Contents |
|---|---|
| KPI row | Active Volunteers, Hours Contributed (YTD), New This Month, Retention Rate |
| Volunteer roster | Name, focus area, hours contributed, joined date, active status — searchable, sortable, exportable |

---

## 3. Data model

**None yet — not in `supabase/migrations/0001_init.sql`.** See [§ Roadmap](#roadmap) for the schema this dashboard needs before it can leave mock mode.

### Row Level Security

N/A until the table exists — see Roadmap.

---

## 4. Data source

Like every dashboard in this repo, Volunteers reads through `src/lib/data-source.ts`'s `isMockMode()`. In mock mode (the default), figures come from `src/lib/mock-data/volunteers.ts` — a seeded, deterministic generator with every mock ID prefixed `MOCK-`. A persistent `MockDataBanner` renders at the top of the page whenever this is active. See [`docs/DATA_SOURCES.md`](DATA_SOURCES.md) for the full policy on why this default exists and when it's safe to turn off.

---

## 5. Components used

Reused from the shared library, consistent with every other dashboard in this repo — see [`docs/ARCHITECTURE.md`](ARCHITECTURE.md#adding-a-new-dashboard) before adding a bespoke widget here instead of extending an existing one.

---

## 6. Roadmap for this dashboard

1. **Add a `volunteers` table** plus a lightweight `volunteer_hours` log so "hours contributed" is a sum of logged entries, not a single mutable field prone to inflation.
2. Consider whether volunteer names need the same privacy review flagged on the Donations dashboard before this page is shown outside the core team.
3. Retention rate needs a defined cohort window (e.g. "still active 90 days after joining") written down here once it's computed for real.

None of the above is required for this dashboard to be considered "built" per [`docs/BUILD_STATUS.md`](BUILD_STATUS.md) — it already has real UI and a real (mocked) data path. These are the steps between "built" and "auditable."

# Education Dashboard

**Path:** `src/app/(dashboard)/dashboard/education/page.tsx`
**Status:** ✅ Built · 🚧 Mock data by default — see [Data source](#data-source)
**Owners:** Community Contributors (read/write) · Maintainer Council (read/write) · Foundation Director (read/write) · everyone else (read-only)

---

## 1. Purpose

Education is one of CeloHT's three pillars, delivered primarily in Haitian Creole. This dashboard exists so the Council can see whether courses are actually reaching and completing students — not just being published — since a course with high enrollment and low completion is a different problem than one with low enrollment, and needs a different fix.

---

## 2. What it shows

| Section | Contents |
|---|---|
| KPI row | Students Enrolled, Active Courses, Certificates Issued, Avg. Completion Rate |
| Courses table | Title, instructor, enrolled, completion rate, certificates issued, status — searchable, sortable, exportable |

---

## 3. Data model

**None yet — not in `supabase/migrations/0001_init.sql`.** See [§ Roadmap](#roadmap) for the schema this dashboard needs before it can leave mock mode.

### Row Level Security

N/A until the table exists — see Roadmap.

---

## 4. Data source

Like every dashboard in this repo, Education reads through `src/lib/data-source.ts`'s `isMockMode()`. In mock mode (the default), figures come from `src/lib/mock-data/education.ts` — a seeded, deterministic generator with every mock ID prefixed `MOCK-`. A persistent `MockDataBanner` renders at the top of the page whenever this is active. See [`docs/DATA_SOURCES.md`](DATA_SOURCES.md) for the full policy on why this default exists and when it's safe to turn off.

---

## 5. Components used

Reused from the shared library, consistent with every other dashboard in this repo — see [`docs/ARCHITECTURE.md`](ARCHITECTURE.md#adding-a-new-dashboard) before adding a bespoke widget here instead of extending an existing one.

---

## 6. Roadmap for this dashboard

1. **Add `courses`, `enrollments`, and `certificates` tables** — the current mock model flattens all three into one row per course, which won't support a real student-level completion funnel.
2. RLS should let Contributors manage courses they instruct, while Council/Director can manage all — a role check finer than the current all-or-nothing `contributor` grant.
3. Language field: courses should record which language(s) they're delivered in, given CeloHT's Creole-first commitment — useful both operationally and as an impact metric.

None of the above is required for this dashboard to be considered "built" per [`docs/BUILD_STATUS.md`](BUILD_STATUS.md) — it already has real UI and a real (mocked) data path. These are the steps between "built" and "auditable."

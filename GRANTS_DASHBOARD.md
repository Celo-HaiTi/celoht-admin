# Grants Dashboard

**Path:** `src/app/(dashboard)/dashboard/grants/page.tsx`
**Status:** ✅ Built · 🚧 Mock data by default - see [Data source](#data-source)
**Owners:** Maintainer Council (read/write) · Foundation Director (read/write) · everyone else (read-only)

---

## 1. Purpose

Grants are CeloHT's largest funding source today, so this dashboard exists to answer the question every grantor eventually asks a repeat applicant: "what did you do with the last one?" It tracks the full pipeline - applied, under review, awarded, declined - not just awarded totals, so the Council can see where relationships stand, not only where money already landed.

---

## 2. What it shows

| Section | Contents |
|---|---|
| KPI row | Total Awarded (YTD), Active Grants, Pending Applications, Avg. Grant Size |
| Grant pipeline | Grantor, program, amount, status, submission date - searchable, sortable, exportable |

---

## 3. Data model

**None yet - not in `supabase/migrations/0001_init.sql`.** See [§ Roadmap](#roadmap) for the schema this dashboard needs before it can leave mock mode.

### Row Level Security

N/A until the table exists - see Roadmap.

---

## 4. Data source

Like every dashboard in this repo, Grants reads through `src/lib/data-source.ts`'s `isMockMode()`. In mock mode (the default), figures come from `src/lib/mock-data/grants.ts` - a seeded, deterministic generator with every mock ID prefixed `MOCK-`. A persistent `MockDataBanner` renders at the top of the page whenever this is active. See [`docs/DATA_SOURCES.md`](DATA_SOURCES.md) for the full policy on why this default exists and when it's safe to turn off.

---

## 5. Components used

Reused from the shared library, consistent with every other dashboard in this repo - see [`docs/ARCHITECTURE.md`](ARCHITECTURE.md#adding-a-new-dashboard) before adding a bespoke widget here instead of extending an existing one.

---

## 6. Roadmap for this dashboard

1. **Add a `grants` table** (grantor, program, amount_usd, status enum, submitted_at, decided_at) via a new migration `0003_grants.sql`, with RLS matching the Council/Director write pattern in `0002_rls.sql`.
2. Wire `src/lib/mock-data/grants.ts` to that table behind `isMockMode()`.
3. Link each awarded grant to its corresponding `treasury_transactions` inflow row so the two dashboards reconcile instead of drifting apart.
4. Add a renewal-reminder view - grants with an implicit reporting deadline are the easiest funding source to lose through inattention, not rejection.

None of the above is required for this dashboard to be considered "built" per [`docs/BUILD_STATUS.md`](BUILD_STATUS.md) - it already has real UI and a real (mocked) data path. These are the steps between "built" and "auditable."

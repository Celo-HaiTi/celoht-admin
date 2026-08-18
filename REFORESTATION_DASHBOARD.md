# Reforestation Dashboard

**Path:** `src/app/(dashboard)/dashboard/reforestation/page.tsx`
**Status:** ✅ Built · 🚧 Mock data by default - see [Data source](#data-source)
**Owners:** Community Contributors (read/write) · Maintainer Council (read/write) · Foundation Director (read/write) · everyone else (read-only)

---

## 1. Purpose

CeloHT's reforestation pillar is explicitly still in **design and pilot phase**, not full operation - this dashboard is scaled to match: pilot-site tracking with survival rate front and center, because CeloHT's stated commitment is verified survival tracking, not just planting counts. A planting-count-only dashboard would misrepresent the program's actual rigor.

---

## 2. What it shows

| Section | Contents |
|---|---|
| KPI row | Trees Planted (pilot), Survival Rate, Active Pilot Sites, Volunteers Engaged |
| Planting sites table | Location, trees planted, survival rate, volunteers engaged, status (Pilot Active/Monitoring/Planned) - searchable, sortable, exportable |

---

## 3. Data model

**None yet - not in `supabase/migrations/0001_init.sql`.** See [§ Roadmap](#roadmap) for the schema this dashboard needs before it can leave mock mode.

### Row Level Security

N/A until the table exists - see Roadmap.

---

## 4. Data source

Like every dashboard in this repo, Reforestation reads through `src/lib/data-source.ts`'s `isMockMode()`. In mock mode (the default), figures come from `src/lib/mock-data/reforestation.ts` - a seeded, deterministic generator with every mock ID prefixed `MOCK-`. A persistent `MockDataBanner` renders at the top of the page whenever this is active. See [`docs/DATA_SOURCES.md`](DATA_SOURCES.md) for the full policy on why this default exists and when it's safe to turn off.

---

## 5. Components used

Reused from the shared library, consistent with every other dashboard in this repo - see [`docs/ARCHITECTURE.md`](ARCHITECTURE.md#adding-a-new-dashboard) before adding a bespoke widget here instead of extending an existing one.

---

## 6. Roadmap for this dashboard

1. **Add `planting_sites` and `survival_checks` tables** - survival rate should be computed from dated re-checks per site, not a single static percentage, to actually deliver on "verified survival tracking."
2. Photo documentation (listed in the original platform spec) belongs as a `site_photos` table referencing Supabase Storage, not inline base64 - add once the pilot has real photos to attach.
3. Keep the "pilot phase" framing in the UI copy even after real data is connected, until the program itself graduates to full operation - the dashboard should track program maturity honestly, not get ahead of it.

None of the above is required for this dashboard to be considered "built" per [`docs/BUILD_STATUS.md`](BUILD_STATUS.md) - it already has real UI and a real (mocked) data path. These are the steps between "built" and "auditable."

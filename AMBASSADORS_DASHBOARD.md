# Ambassador Dashboard

**Path:** `src/app/(dashboard)/dashboard/ambassadors/page.tsx`
**Status:** ✅ Built · 🚧 Mock data by default - see [Data source](#data-source)
**Owners:** Community Contributors (read/write) · Maintainer Council (read/write) · Foundation Director (read/write) · everyone else (read-only)

---

## 1. Purpose

Ambassadors are CeloHT's outward-facing growth layer - this dashboard exists to distinguish ambassadors who are actually driving events and referrals from ones who hold the title without activity, so the program can be evaluated on outcomes rather than headcount.

---

## 2. What it shows

| Section | Contents |
|---|---|
| KPI row | Active Ambassadors, Regions Covered, Events Hosted (YTD), Referrals Generated |
| Ambassador roster | Name, region, tier (Core/Regional/Campus), events hosted, referrals - searchable, sortable, exportable |

---

## 3. Data model

**None yet - not in `supabase/migrations/0001_init.sql`.** See [§ Roadmap](#roadmap) for the schema this dashboard needs before it can leave mock mode.

### Row Level Security

N/A until the table exists - see Roadmap.

---

## 4. Data source

Like every dashboard in this repo, Ambassador reads through `src/lib/data-source.ts`'s `isMockMode()`. In mock mode (the default), figures come from `src/lib/mock-data/ambassadors.ts` - a seeded, deterministic generator with every mock ID prefixed `MOCK-`. A persistent `MockDataBanner` renders at the top of the page whenever this is active. See [`docs/DATA_SOURCES.md`](DATA_SOURCES.md) for the full policy on why this default exists and when it's safe to turn off.

---

## 5. Components used

Reused from the shared library, consistent with every other dashboard in this repo - see [`docs/ARCHITECTURE.md`](ARCHITECTURE.md#adding-a-new-dashboard) before adding a bespoke widget here instead of extending an existing one.

---

## 6. Roadmap for this dashboard

1. **Add an `ambassadors` table** with a `tier` enum and a foreign key to `community_members`/`profiles` once those exist, rather than a standalone name field.
2. "Referrals" needs a defined, attributable source (referral code? agent-network wallet-onboarding attribution?) before it can be counted for real instead of mocked.
3. Consider linking ambassador events to the same source that will eventually power a public Events/Workshops listing.

None of the above is required for this dashboard to be considered "built" per [`docs/BUILD_STATUS.md`](BUILD_STATUS.md) - it already has real UI and a real (mocked) data path. These are the steps between "built" and "auditable."

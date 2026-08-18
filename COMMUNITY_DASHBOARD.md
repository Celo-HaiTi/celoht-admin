# Community Dashboard

**Path:** `src/app/(dashboard)/dashboard/community/page.tsx`
**Status:** ✅ Built · 🚧 Mock data by default - see [Data source](#data-source)
**Owners:** Community Contributors (read/write) · Maintainer Council (read/write) · Foundation Director (read/write) · everyone else (read-only)

---

## 1. Purpose

CeloHT's community spans Haiti and a diaspora across at least four countries. This dashboard exists to keep that spread visible so growth in one region doesn't quietly mask stagnation in another - a single "total members" number would hide exactly the regional imbalance a community-governed project most needs to notice.

---

## 2. What it shows

| Section | Contents |
|---|---|
| KPI row | Total Members, Countries Represented, Active This Month, Regional Coordinators |
| Regions table | Country, coordinator, member count, growth % - searchable, sortable, exportable |

---

## 3. Data model

**None yet - not in `supabase/migrations/0001_init.sql`.** See [§ Roadmap](#roadmap) for the schema this dashboard needs before it can leave mock mode.

### Row Level Security

N/A until the table exists - see Roadmap.

---

## 4. Data source

Like every dashboard in this repo, Community reads through `src/lib/data-source.ts`'s `isMockMode()`. In mock mode (the default), figures come from `src/lib/mock-data/community.ts` - a seeded, deterministic generator with every mock ID prefixed `MOCK-`. A persistent `MockDataBanner` renders at the top of the page whenever this is active. See [`docs/DATA_SOURCES.md`](DATA_SOURCES.md) for the full policy on why this default exists and when it's safe to turn off.

---

## 5. Components used

Reused from the shared library, consistent with every other dashboard in this repo - see [`docs/ARCHITECTURE.md`](ARCHITECTURE.md#adding-a-new-dashboard) before adding a bespoke widget here instead of extending an existing one.

---

## 6. Roadmap for this dashboard

1. **Add a `community_members` table** with a `region`/`country` field, aggregated into this dashboard's per-region rows via a view - avoid hand-maintained per-region counts, which drift.
2. Coordinator assignment should reference `profiles.id`, not a free-text name, once real accounts exist for regional coordinators.
3. "Active this month" needs a concrete activity definition (login? forum post? event attendance?) before it can be computed rather than mocked.

None of the above is required for this dashboard to be considered "built" per [`docs/BUILD_STATUS.md`](BUILD_STATUS.md) - it already has real UI and a real (mocked) data path. These are the steps between "built" and "auditable."

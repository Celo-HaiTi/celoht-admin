# Reports Dashboard

**Path:** `src/app/(dashboard)/dashboard/reports/page.tsx`
**Status:** ✅ Built · 🚧 Mock data by default — see [Data source](#data-source)
**Owners:** Maintainer Council (read/write) · Foundation Director (read/write) · everyone else (read-only)

---

## 1. Purpose

This is the index of everything CeloHT has published outward — monthly, quarterly, annual, governance, financial, and impact reports — in one place, so a partner or reviewer doesn't have to hunt across repositories and a website to find CeloHT's publication history. It exists to make the transparency commitment checkable at a glance: is CeloHT actually publishing on the cadence it claims to.

---

## 2. What it shows

| Section | Contents |
|---|---|
| KPI row | Reports Published (YTD), Next Report Due, Avg. Pages, Formats Available |
| Reports index | Title, type, period, published date — searchable, sortable, exportable |

---

## 3. Data model

**None yet — not in `supabase/migrations/0001_init.sql`.** See [§ Roadmap](#roadmap) for the schema this dashboard needs before it can leave mock mode.

### Row Level Security

N/A until the table exists — see Roadmap.

---

## 4. Data source

Like every dashboard in this repo, Reports reads through `src/lib/data-source.ts`'s `isMockMode()`. In mock mode (the default), figures come from `src/lib/mock-data/reports.ts` — a seeded, deterministic generator with every mock ID prefixed `MOCK-`. A persistent `MockDataBanner` renders at the top of the page whenever this is active. See [`docs/DATA_SOURCES.md`](DATA_SOURCES.md) for the full policy on why this default exists and when it's safe to turn off.

---

## 5. Components used

Reused from the shared library, consistent with every other dashboard in this repo — see [`docs/ARCHITECTURE.md`](ARCHITECTURE.md#adding-a-new-dashboard) before adding a bespoke widget here instead of extending an existing one.

---

## 6. Roadmap for this dashboard

1. **Add a `reports` table** with a `file_url` pointing at Supabase Storage (or the celoht-docs repo) so "download" on this page opens the real document, not just a row of metadata.
2. Each report's export should ideally be generated from the same live dashboards it summarizes (Treasury, Transparency, Governance) via the existing `src/lib/utils/export.ts` pipeline, rather than authored separately — reduces the risk of a report contradicting the live dashboard it's supposed to reflect.
3. "Next Report Due" should be computed from a publication-cadence rule (e.g. "first week of each quarter"), not manually tracked.

None of the above is required for this dashboard to be considered "built" per [`docs/BUILD_STATUS.md`](BUILD_STATUS.md) — it already has real UI and a real (mocked) data path. These are the steps between "built" and "auditable."

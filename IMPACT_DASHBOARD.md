# Impact Dashboard

**Path:** `src/app/(dashboard)/dashboard/impact/page.tsx`
**Status:** ✅ Built · 🚧 Mock data by default - see [Data source](#data-source)
**Owners:** Maintainer Council (read) · Foundation Director (read) · everyone else (read-only)

---

## 1. Purpose

Per CeloHT's own AI content rule - lead with measurable impact, never investment framing - this dashboard exists to be the single page that states outcomes in plain terms: people reached, wallets active, students certified, trees planted. No projections, no return estimates, only what has measurably happened so far.

---

## 2. What it shows

| Section | Contents |
|---|---|
| KPI row | People Reached, Financial Inclusion (wallets active), Students Certified, Trees Planted, Est. CO₂ Offset, Women Entrepreneurs Reached |
| Pillar chart | People reached by pillar - Education / Agent Network / Reforestation |

---

## 3. Data model

**None - this dashboard should be a computed aggregate over other tables, not its own source of truth.** See [§ Roadmap](#roadmap) for the schema this dashboard needs before it can leave mock mode.

### Row Level Security

N/A - read-only aggregate view once wired.

---

## 4. Data source

Like every dashboard in this repo, Impact reads through `src/lib/data-source.ts`'s `isMockMode()`. In mock mode (the default), figures come from `src/lib/mock-data/impact.ts` - a seeded, deterministic generator with every mock ID prefixed `MOCK-`. A persistent `MockDataBanner` renders at the top of the page whenever this is active. See [`docs/DATA_SOURCES.md`](DATA_SOURCES.md) for the full policy on why this default exists and when it's safe to turn off.

---

## 5. Components used

Reused from the shared library, consistent with every other dashboard in this repo - see [`docs/ARCHITECTURE.md`](ARCHITECTURE.md#adding-a-new-dashboard) before adding a bespoke widget here instead of extending an existing one.

---

## 6. Roadmap for this dashboard

1. **Build this as a Postgres view or materialized view** aggregating Education, Agent Network, Reforestation, and Wallet Analytics tables, once those exist - deliberately avoid a standalone `impact_metrics` table that someone could edit independently of the underlying program data.
2. "Est. CO₂ Offset" needs a documented estimation methodology cited on the page itself before it's shown as real - an unsourced offset number is exactly the kind of unverifiable environmental claim CeloHT's own reforestation framing (verified survival tracking, not just planting counts) argues against.
3. This is the dashboard most likely to be screenshotted for outward communications - hold it to the same real-data bar as Treasury before it's used that way.

None of the above is required for this dashboard to be considered "built" per [`docs/BUILD_STATUS.md`](BUILD_STATUS.md) - it already has real UI and a real (mocked) data path. These are the steps between "built" and "auditable."

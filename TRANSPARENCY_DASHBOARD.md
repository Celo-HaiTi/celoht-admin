# Transparency Dashboard

**Path:** `src/app/(dashboard)/dashboard/transparency/page.tsx`
**Status:** ✅ Built · 🚧 Mock data by default - see [Data source](#data-source)
**Owners:** Maintainer Council (read/write) · Foundation Director (read/write) · everyone else (read-only)

---

## 1. Purpose

This dashboard is CeloHT's answer to "how do we know you're actually doing what you say" - a compliance checklist, fund-allocation breakdown, and disclosure log in one place. It's the dashboard most directly aimed at external trust, which means it's also the one where a mock number left unlabeled would do the most damage if mistaken for real.

---

## 2. What it shows

| Section | Contents |
|---|---|
| Fund allocation by pillar | Percentage of spend by Education / Agent Network / Reforestation / Operations / Tooling |
| Compliance checklist | Apache 2.0 licensing, No Token Policy statement, quarterly transparency report, independent financial review, annual impact report - each with a status (Complete / In progress / Planned) |
| Recent disclosures | A running log of governance and financial disclosures with dates |

---

## 3. Data model

The compliance checklist (`src/lib/mock-data/transparency.ts`) currently hardcodes five specific commitments matching CeloHT's actual documented governance posture - these are closer to editorial content than generated data, and should stay that way: a Council member should update this list by hand when a commitment's status genuinely changes, not have it auto-computed from an unrelated signal.

Fund allocation and disclosures, by contrast, **should** be computed - allocation from `treasury_transactions` grouped by category, disclosures from a real publication log (see `docs/REPORTS_DASHBOARD.md`).

### Row Level Security

No dedicated table for the checklist yet (editorial content - see above). Fund allocation and disclosures should inherit RLS from `treasury_transactions` and the future `reports` table respectively.

---

## 4. Data source

Reads through `isMockMode()`, sourced from `src/lib/mock-data/transparency.ts`. This is one of the two dashboards (alongside Treasury) explicitly called out in this repo's README as needing real data before external use - see [`docs/DATA_SOURCES.md`](DATA_SOURCES.md).

---

## 5. Components used

`CategoryBarChart`, `Badge`, plain lists - no bespoke widgets. See [`docs/ARCHITECTURE.md`](ARCHITECTURE.md#adding-a-new-dashboard).

---

## 6. Roadmap for this dashboard

1. Wire the fund-allocation chart to a live `GROUP BY category` query over `treasury_transactions` - this is the fastest of the three sections to make real, since it depends only on the Treasury table already in the schema.
2. Wire the disclosures log to `docs/REPORTS_DASHBOARD.md`'s future `reports` table, filtered to public-facing types.
3. Keep the compliance checklist manually curated, but add an `updated_at` and `updated_by` field so changes to CeloHT's own compliance claims are themselves auditable - the irony of an untracked transparency checklist would undercut the entire dashboard.

None of the above is required for this dashboard to be considered "built" per [`docs/BUILD_STATUS.md`](BUILD_STATUS.md). These are the steps between "built" and "auditable."

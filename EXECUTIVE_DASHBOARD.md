# Executive Dashboard

**Path:** `src/app/(dashboard)/dashboard/executive/page.tsx`
**Status:** ✅ Built · 🚧 Mock data by default — see [Data source](#data-source)
**Owners:** Foundation Director (read) · Maintainer Council (read) · everyone else (read-only)

---

## 1. Purpose

The Executive Dashboard is the front door of the platform — it's what loads at `/dashboard` by default. It exists to answer, in under ten seconds, the question anyone new to the platform (a Council member, a prospective partner, a grant reviewer) actually has: *is this a real, active, well-run project, and where does it stand on its own roadmap.* Every other dashboard goes deeper into one slice; this one is the summary that earns the right to a deeper look.

---

## 2. What it shows

| Section | Contents |
|---|---|
| KPI row | Treasury Balance, Active Agents, Wallets Onboarded, Trees Planted (pilot), Students Enrolled, GitHub Contributors — six numbers, one from each major program area |
| Ecosystem growth | Cumulative wallets-onboarded trend chart |
| Budget by pillar | Education / Agent Network / Reforestation spend split |
| Roadmap status | The real 4-phase roadmap (Foundation → Validation → Growth → Maturity) with live-looking phase status |

---

## 3. Data model

This dashboard is intentionally a **rollup, not a source of truth** — each KPI here should eventually be pulled from the same tables that power its dedicated dashboard (Treasury Balance from `treasury_transactions`, Wallets Onboarded from the future wallet-analytics source, etc.), never entered or computed separately. Duplicating these numbers independently is how an executive summary quietly drifts out of sync with the detail pages underneath it — the single failure mode most damaging to a transparency story, since it's usually the summary page that outsiders see first.

### Row Level Security

No dedicated table — see above. Read access should match the union of the individual dashboards it summarizes.

---

## 4. Data source

Reads through `src/lib/data-source.ts`'s `isMockMode()`, sourced from `src/lib/mock-data/executive.ts` in mock mode. The roadmap phase statuses (`Complete` / `In progress` / `Planned`) are currently hardcoded to match CeloHT's real, documented roadmap — these should stay manually curated even after other KPIs go live, since "what phase are we in" is a governance decision, not a computed metric.

---

## 5. Components used

`KpiCard`, `TrendChart`, `CategoryBarChart` — all shared, no bespoke widgets. See [`docs/ARCHITECTURE.md`](ARCHITECTURE.md#adding-a-new-dashboard).

---

## 6. Roadmap for this dashboard

1. **Replace every mock KPI with a real query against the same table its dedicated dashboard uses** (Treasury Balance ← `treasury_transactions`, etc.) — do this dashboard-by-dashboard as each underlying page is wired to real data, not all at once.
2. Add a "last updated" timestamp per KPI once live, so a stale figure is visible as stale rather than looking equally fresh as everything else.
3. Consider role-based KPI visibility — a `viewer` role arguably shouldn't see the same executive summary as the Foundation Director, depending on how broadly this dashboard ends up being shared.

None of the above is required for this dashboard to be considered "built" per [`docs/BUILD_STATUS.md`](BUILD_STATUS.md). These are the steps between "built" and "auditable."

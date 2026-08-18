# Agent Network Dashboard

**Path:** `src/app/(dashboard)/dashboard/agent-network/page.tsx`
**Status:** ✅ Built · 🚧 Mock data by default - see [Data source](#data-source)
**Owners:** Community Contributors (read/write) · Maintainer Council (read/write) · Foundation Director (read/write) · everyone else (read-only)

---

## 1. Purpose

The Agent Network is CeloHT's core financial-inclusion mechanism - trained local agents doing cash↔USDm conversion, wallet onboarding, and providing community liquidity. This dashboard exists to monitor agent health (active vs. training vs. inactive) and volume by region, since the network's value depends on having enough trusted, active agents in each area, not just a large total headcount.

---

## 2. What it shows

| Section | Contents |
|---|---|
| KPI row | Active Agents, Wallets Onboarded, Cash↔USDm Volume (30d), Avg. Transaction Size |
| Agents table | Name, region, wallets onboarded, 30-day volume, status (Active/Training/Inactive) - searchable, sortable, exportable |

---

## 3. Data model

**None yet - not in `supabase/migrations/0001_init.sql`.** See [§ Roadmap](#roadmap) for the schema this dashboard needs before it can leave mock mode.

### Row Level Security

N/A until the table exists - see Roadmap.

---

## 4. Data source

Like every dashboard in this repo, Agent Network reads through `src/lib/data-source.ts`'s `isMockMode()`. In mock mode (the default), figures come from `src/lib/mock-data/agent-network.ts` - a seeded, deterministic generator with every mock ID prefixed `MOCK-`. A persistent `MockDataBanner` renders at the top of the page whenever this is active. See [`docs/DATA_SOURCES.md`](DATA_SOURCES.md) for the full policy on why this default exists and when it's safe to turn off.

---

## 5. Components used

Reused from the shared library, consistent with every other dashboard in this repo - see [`docs/ARCHITECTURE.md`](ARCHITECTURE.md#adding-a-new-dashboard) before adding a bespoke widget here instead of extending an existing one.

---

## 6. Roadmap for this dashboard

1. **Add an `agents` table** plus a link into on-chain activity once the Blockchain Analytics dashboard is wired to a real Celo indexer - agent transaction volume should ultimately be *verified*, not self-reported.
2. "Wallets Onboarded" here and the same figure on the Wallet Analytics dashboard need to come from one shared query, not two independently maintained mock generators, once real.
3. Agent training/certification status could link to the Education dashboard's certificate records, since agent certification is itself a course.

None of the above is required for this dashboard to be considered "built" per [`docs/BUILD_STATUS.md`](BUILD_STATUS.md) - it already has real UI and a real (mocked) data path. These are the steps between "built" and "auditable."

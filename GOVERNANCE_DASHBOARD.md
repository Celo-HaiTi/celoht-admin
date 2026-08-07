# Governance Dashboard

**Path:** `src/app/(dashboard)/dashboard/governance/page.tsx`
**Status:** ✅ Built · 🚧 Mock data by default — see [Data source](#data-source)
**Owners:** Maintainer Council (read/write, ratify) · Foundation Director (read/write, ratify) · Community Contributors (read, propose) · Viewers (read)

---

## 1. Purpose

CeloHT is explicitly community-governed — Foundation Director → Maintainer Council → Community Contributors, not a single founder and not token-weighted voting. This dashboard exists to make that structure demonstrable rather than asserted: real proposals, real vote counts, real status, so "community-governed" is a claim anyone can check against a log, the same way the Audit dashboard makes accountability checkable.

---

## 2. What it shows

| Section | Contents |
|---|---|
| KPI row | Active Proposals, Council Seats Filled, Avg. Participation, Proposals Passed (YTD) |
| Structure | A visual of the Director → Council → Contributors chain |
| Proposals table | ID, title, proposer, status (Passed/Active/Rejected/Draft), votes for/against, created date — searchable, sortable, exportable |

---

## 3. Data model

Backed by `supabase/migrations/0001_init.sql`, table `governance_proposals`:

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | Primary key |
| `title` | `text` | |
| `proposer_id` | `uuid → profiles.id` | |
| `status` | `draft` \| `active` \| `passed` \| `rejected` | Enum `proposal_status` |
| `votes_for` / `votes_against` | `integer` | |
| `created_at` | `timestamptz` | |

### Row Level Security

Defined in `supabase/migrations/0002_rls.sql`. Read: any authenticated user. Insert (propose): `contributor` and up — Community Contributors can propose, matching CeloHT's real governance model. Update (ratify a status change, i.e. record a vote outcome): `council` and `director` only — a Contributor can start a proposal but can't unilaterally mark it passed.

---

## 4. Data source

Reads through `isMockMode()`, sourced from `src/lib/mock-data/governance.ts` in mock mode — every mock proposal ID is prefixed `MOCK-GOV-`. Real voting mechanics (how a vote is actually cast and counted) are **not yet implemented anywhere in this repo** — the `votes_for`/`votes_against` columns exist, but nothing writes to them yet beyond manual entry. See Roadmap.

---

## 5. Components used

`KpiCard`, `Badge`, `DataTable` + `ExportMenu` — no bespoke widgets. See [`docs/ARCHITECTURE.md`](ARCHITECTURE.md#adding-a-new-dashboard).

---

## 6. Roadmap for this dashboard

1. **Design and build an actual voting mechanism.** Right now this dashboard displays vote *totals* with no path for an eligible voter to cast one — that's the single biggest gap between "governance dashboard" and "governance tool." Candidates: a `governance_votes` table (one row per voter per proposal, unique constraint to prevent double-voting) with `votes_for`/`votes_against` becoming computed counts rather than stored totals.
2. Every status change (`draft` → `active` → `passed`/`rejected`) should write to `audit_log` — see [`docs/AUDIT_DASHBOARD.md`](AUDIT_DASHBOARD.md) — so ratification decisions are independently checkable.
3. "Avg. Participation" needs a defined denominator (percentage of eligible Council seats? of all Contributors?) before it can be computed honestly rather than mocked.
4. Consider surfacing this dashboard's proposal list (read-only) on the public celoht.com site once live — governance transparency is one of the strongest, hardest-to-fake trust signals available to an open-source nonprofit.

None of the above is required for this dashboard to be considered "built" per [`docs/BUILD_STATUS.md`](BUILD_STATUS.md). These are the steps between "built" and "auditable."

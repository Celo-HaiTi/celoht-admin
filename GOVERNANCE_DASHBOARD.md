# Governance Dashboard

**Path:** `src/app/(dashboard)/dashboard/governance/page.tsx`
**Status:** ✅ Built · 🚧 Mock data by default - see [Data source](#data-source)
**Scope:** Governance Council decision-making · Maintainers technical/project stewardship · Community Contributors participation · Viewers read-only

---

## 1. Purpose

Celo-HaiTi's Governance Council is its highest ongoing collective decision-making body. This dashboard exists to make governance activity demonstrable rather than asserted: proposals, vote records, and status should be checkable against an audit trail. Maintainers provide technical/project stewardship, Working Groups operate within documented mandates, and Contributors participate through the contribution and governance framework. The Founder role is historical and may be representative or strategic; it does not by itself confer governance authority, veto power, or unilateral control.

---

## 2. What it shows

| Section | Contents |
|---|---|
| KPI row | Active Proposals, Council Seats Filled, Avg. Participation, Proposals Passed (YTD) |
| Structure | Governance Council, Maintainers, Working Groups, and Contributors within their documented scopes |
| Proposals table | ID, title, proposer, status (Passed/Active/Rejected/Draft), votes for/against, created date - searchable, sortable, exportable |

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

Defined in `0002_rls.sql`. Read: any authenticated user. Insert (propose): `contributor` and up - Contributors can propose within the contribution and governance framework. Update (record a status change or vote outcome): the currently configured roles only, as enforced by the database policy. These implementation permissions describe this dashboard's technical access; they do not change the Governance Council's status as Celo-HaiTi's highest ongoing collective decision-making body or create a single-role override for a Founder, Director, or Maintainer.

---

## 4. Data source

Reads through `isMockMode()`, sourced from `src/lib/mock-data/governance.ts` in mock mode - every mock proposal ID is prefixed `MOCK-GOV-`. Real voting mechanics (how a vote is actually cast and counted) are **not yet implemented anywhere in this repo** - the `votes_for`/`votes_against` columns exist, but nothing writes to them yet beyond manual entry. See Roadmap.

---

## 5. Components used

`KpiCard`, `Badge`, `DataTable` + `ExportMenu` - no bespoke widgets. See [`ARCHITECTURE.md`](ARCHITECTURE.md#adding-a-new-dashboard).

---

## 6. Roadmap for this dashboard

1. **Design and build an actual voting mechanism.** Right now this dashboard displays vote *totals* with no path for an eligible voter to cast one - that's the single biggest gap between "governance dashboard" and "governance tool." Candidates: a `governance_votes` table (one row per voter per proposal, unique constraint to prevent double-voting) with `votes_for`/`votes_against` becoming computed counts rather than stored totals.
2. Every status change (`draft` → `active` → `passed`/`rejected`) should write to `audit_log` - see [`AUDIT_DASHBOARD.md`](AUDIT_DASHBOARD.md) - so governance decisions are independently checkable.
3. "Avg. Participation" needs a defined denominator (percentage of eligible Council seats? of all Contributors?) before it can be computed honestly rather than mocked.
4. Consider surfacing this dashboard's proposal list (read-only) on the public celoht.com site once live - governance transparency is one of the strongest, hardest-to-fake trust signals available to an open-source nonprofit.

None of the above is required for this dashboard to be considered "built" per [`BUILD_STATUS.md`](BUILD_STATUS.md). These are the steps between "built" and "auditable."

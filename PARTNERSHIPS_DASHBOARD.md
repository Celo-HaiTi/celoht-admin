# Partnerships Dashboard

**Path:** `src/app/(dashboard)/dashboard/partnerships/page.tsx`
**Status:** ✅ Built · 🚧 Mock data by default - see [Data source](#data-source)
**Scope:** Partnership operations and representation within Celo-HaiTi's governance and operational framework

---

## 1. Purpose

This dashboard tracks Celo-HaiTi's formal and prospective relationships - including FreClean, Johnny Dubic's separate local-entrepreneurship initiative, which is deliberately listed as **"In Discussion," not "Active,"** per the documented project status. The Founder role is historical and representative; it does not make FreClean a Celo-HaiTi partnership or confer governance authority. Partnership activities are carried out within Celo-HaiTi's governance and operational framework, and this dashboard does not make partnership personnel or operators a higher governance body. Getting status wrong in either direction - overstating or hiding the relationship - is a credibility risk, which is why it has its own status field.

---

## 2. What it shows

| Section | Contents |
|---|---|
| KPI row | Active Partnerships, In Discussion, MoUs Signed, Combined Reach (est.) |
| Partnerships table | Partner, type, status, since date - searchable, sortable, exportable |

---

## 3. Data model

**None yet - not in `supabase/migrations/0001_init.sql`.** See [§ Roadmap](#roadmap) for the schema this dashboard needs before it can leave mock mode.

### Row Level Security

N/A until the table exists - see Roadmap.

---

## 4. Data source

Like every dashboard in this repo, Partnerships reads through `src/lib/data-source.ts`'s `isMockMode()`. In mock mode (the default), figures come from `src/lib/mock-data/partnerships.ts` - a seeded, deterministic generator with every mock ID prefixed `MOCK-`. A persistent `MockDataBanner` renders at the top of the page whenever this is active. See [`docs/DATA_SOURCES.md`](DATA_SOURCES.md) for the full policy on why this default exists and when it's safe to turn off.

---

## 5. Components used

Reused from the shared library, consistent with every other dashboard in this repo - see [`docs/ARCHITECTURE.md`](ARCHITECTURE.md#adding-a-new-dashboard) before adding a bespoke widget here instead of extending an existing one.

---

## 6. Roadmap for this dashboard

1. **Add a `partnerships` table** with a `status` enum matching the approved partnership due-diligence framework once that framework is made available in this repository, so this dashboard reflects the same process instead of inventing a parallel one.
2. **Never let FreClean's status here drift ahead of its actual formal status** - this field should be updated by whoever owns the partnerships doc, not inferred from this dashboard.
3. "Combined Reach (est.)" is currently a single manually-set number - replace with a computed sum once partner-level reach estimates are tracked per row, and clearly label it as an estimate either way.

None of the above is required for this dashboard to be considered "built" per [`docs/BUILD_STATUS.md`](BUILD_STATUS.md) - it already has real UI and a real (mocked) data path. These are the steps between "built" and "auditable."

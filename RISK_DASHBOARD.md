# Risk Dashboard

**Path:** `src/app/(dashboard)/dashboard/risk/page.tsx`
**Status:** ✅ Built · 🚧 Mock data by default — see [Data source](#data-source)
**Owners:** Maintainer Council (read/write) · Foundation Director (read/write) · everyone else (read-only)

---

## 1. Purpose

A risk register most open-source nonprofits never bother to make visible even internally, let alone externally. This dashboard exists because CeloHT operates in a genuinely risk-laden context — funding concentration, agent liquidity, regulatory shifts affecting stablecoin transfers — and naming those risks in writing, with an owner and a mitigation status, is a stronger transparency signal than pretending they don't exist.

---

## 2. What it shows

| Section | Contents |
|---|---|
| KPI row | Open Risks, High/Critical, Mitigated (YTD), Avg. Risk Score |
| Risk register | Risk, category, severity, mitigation status, owner — searchable, sortable, exportable |

---

## 3. Data model

**None yet — not in `supabase/migrations/0001_init.sql`.** See [§ Roadmap](#roadmap) for the schema this dashboard needs before it can leave mock mode.

### Row Level Security

N/A until the table exists — see Roadmap. Recommend Council/Director write, same pattern as Governance proposals.

---

## 4. Data source

Like every dashboard in this repo, Risk reads through `src/lib/data-source.ts`'s `isMockMode()`. In mock mode (the default), figures come from `src/lib/mock-data/risk.ts` — a seeded, deterministic generator with every mock ID prefixed `MOCK-`. A persistent `MockDataBanner` renders at the top of the page whenever this is active. See [`docs/DATA_SOURCES.md`](DATA_SOURCES.md) for the full policy on why this default exists and when it's safe to turn off.

---

## 5. Components used

Reused from the shared library, consistent with every other dashboard in this repo — see [`docs/ARCHITECTURE.md`](ARCHITECTURE.md#adding-a-new-dashboard) before adding a bespoke widget here instead of extending an existing one.

---

## 6. Roadmap for this dashboard

1. **Add a `risks` table** with `category`, `severity`, `mitigation_status` enums and an `owner_id` foreign key to `profiles`.
2. Decide how much of this dashboard, if any, should be public — a full risk register is unusually candid for an external audience; consider a summarized public view versus a full internal one, rather than defaulting either way without a decision.
3. Link mitigated risks to the specific governance proposal or treasury action that mitigated them, for a real audit trail.

None of the above is required for this dashboard to be considered "built" per [`docs/BUILD_STATUS.md`](BUILD_STATUS.md) — it already has real UI and a real (mocked) data path. These are the steps between "built" and "auditable."

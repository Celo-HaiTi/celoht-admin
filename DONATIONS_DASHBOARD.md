# Donations Dashboard

**Path:** `src/app/(dashboard)/dashboard/donations/page.tsx`
**Status:** ✅ Built · 🚧 Mock data by default — see [Data source](#data-source)
**Owners:** Maintainer Council (read/write via ingestion) · Foundation Director (read/write) · everyone else (read-only)

---

## 1. Purpose

The Donations Dashboard tracks every gift CeloHT receives — crypto, fiat, and in-kind — separately from Treasury, because donors and grant reviewers ask a different question than the treasury does: not "what do we have" but "who trusts us enough to give, and does that trust compound over time." Recurring-donor count and average gift size say more about durable community support than a single large grant does.

---

## 2. What it shows

| Section | Contents |
|---|---|
| KPI row | Total Raised (YTD), Unique Donors, Avg. Donation, Recurring Donors |
| Donation ledger | Donor, amount, channel (Crypto/Fiat/In-kind), date, recurring status — searchable, sortable, exportable |

---

## 3. Data model

Backed by `supabase/migrations/0001_init.sql`, table `donations`:

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | Primary key |
| `donor_name` | `text` | Display name — see Roadmap re: donor privacy |
| `amount_usd` | `numeric(14,2)` | USD-equivalent at time of donation |
| `channel` | `text` | Crypto (cUSD) / Fiat / In-kind |
| `recurring` | `boolean` | Whether this donor has a standing recurring gift |
| `donated_at` | `timestamptz` |  |

### Row Level Security

Read: any authenticated user. Write: intentionally **not** exposed to client writes — donation records should be created by a webhook/Edge Function (e.g. triggered by a payment processor or on-chain transfer confirmation), never typed in by hand, to keep the ledger tamper-evident.

---

## 4. Data source

Like every dashboard in this repo, Donations reads through `src/lib/data-source.ts`'s `isMockMode()`. In mock mode (the default), figures come from `src/lib/mock-data/donations.ts` — a seeded, deterministic generator with every mock ID prefixed `MOCK-`. A persistent `MockDataBanner` renders at the top of the page whenever this is active. See [`docs/DATA_SOURCES.md`](DATA_SOURCES.md) for the full policy on why this default exists and when it's safe to turn off.

---

## 5. Components used

Reused from the shared library, consistent with every other dashboard in this repo — see [`docs/ARCHITECTURE.md`](ARCHITECTURE.md#adding-a-new-dashboard) before adding a bespoke widget here instead of extending an existing one.

---

## 6. Roadmap for this dashboard

1. Wire to Supabase — replace `src/lib/mock-data/donations.ts` calls with a real query, behind `isMockMode()`.
2. **Donor privacy review before going live.** Full donor names on a public-facing dashboard may need consent or partial anonymization (e.g. "Anonymous Donor #14") depending on how this page is exposed — decide this before connecting real names.
3. Build the ingestion Edge Function (crypto: watch relevant Celo addresses; fiat: payment processor webhook) rather than manual entry.
4. Cross-link recurring donors into a lightweight CRM view once volume justifies it.

None of the above is required for this dashboard to be considered "built" per [`docs/BUILD_STATUS.md`](BUILD_STATUS.md) — it already has real UI and a real (mocked) data path. These are the steps between "built" and "auditable."

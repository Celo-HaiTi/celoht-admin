# Blockchain Analytics Dashboard

**Path:** `src/app/(dashboard)/dashboard/blockchain-analytics/page.tsx`
**Status:** ✅ Built · 🚧 Mock data by default - see [Data source](#data-source)
**Owners:** Maintainer Council (read) · Foundation Director (read) · everyone else (read-only) - system-generated, no manual writes

---

## 1. Purpose

This is CeloHT's window into its own on-chain footprint - transaction volume, USDm flow, gas cost, unique addresses - the technical proof underneath the Agent Network and Wallet Analytics dashboards' claims. Where those two dashboards describe *what happened* from a program perspective, this one exists to let anyone verify it against the chain directly.

---

## 2. What it shows

| Section | Contents |
|---|---|
| KPI row | Total Transactions (30d), USDm Volume (30d), Unique Addresses, Avg. Gas Cost |
| Transactions table | Tx hash, type, amount, block height, timestamp - searchable, sortable, exportable |

---

## 3. Data model

**None - reads directly from chain, not from Supabase.** See [§ Roadmap](#roadmap) for the schema this dashboard needs before it can leave mock mode.

### Row Level Security

N/A - public on-chain data, no RLS needed once wired to a real RPC/indexer.

---

## 4. Data source

Like every dashboard in this repo, Blockchain Analytics reads through `src/lib/data-source.ts`'s `isMockMode()`. In mock mode (the default), figures come from `src/lib/mock-data/blockchain-analytics.ts` - a seeded, deterministic generator with every mock ID prefixed `MOCK-`. A persistent `MockDataBanner` renders at the top of the page whenever this is active. See [`docs/DATA_SOURCES.md`](DATA_SOURCES.md) for the full policy on why this default exists and when it's safe to turn off.

---

## 5. Components used

Reused from the shared library, consistent with every other dashboard in this repo - see [`docs/ARCHITECTURE.md`](ARCHITECTURE.md#adding-a-new-dashboard) before adding a bespoke widget here instead of extending an existing one.

---

## 6. Roadmap for this dashboard

1. **Wire to `NEXT_PUBLIC_CELO_RPC_URL`** (already in `.env.example`) or a proper indexer (Blockscout, The Graph) rather than a raw RPC for anything beyond the simplest queries - raw RPC calls don't scale well for historical aggregation.
2. Every `hash` should link out to a real Celo block explorer once wired - currently these are fake identifiers and must stay clearly fake (`fakeHash()` in `src/lib/mock-data/blockchain-analytics.ts`) until then.
3. Filter transactions to CeloHT-relevant addresses (treasury wallet, known agent wallets) rather than all Celo chain activity, once a real data source is connected.

None of the above is required for this dashboard to be considered "built" per [`docs/BUILD_STATUS.md`](BUILD_STATUS.md) - it already has real UI and a real (mocked) data path. These are the steps between "built" and "auditable."

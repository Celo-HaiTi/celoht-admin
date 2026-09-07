# Data Provenance

Every production KPI or record must identify its source, synchronization time,
verification status, and the network/block/transaction evidence that supports
it. The shared contract is defined in `lib/data/provenance.ts`.

Allowed data states are:

- `VERIFIED`: the configured source supports the displayed claim.
- `PENDING`: ingestion or confirmation is in progress.
- `DEGRADED`: data is available but stale or partially unavailable.
- `UNAVAILABLE`: no reliable source is available.

The application must never convert an unavailable source into zero, an empty
verified result, or a fixture. Accounting records are not blockchain balances;
donations are not verified impact; and database status fields are not on-chain
governance state without supporting evidence.

Provider contracts for treasury, donations, governance, agents, education,
reforestation, and audit are defined under `lib/data/providers/`. Their real
adapters remain blocked on canonical CeloHT indexer endpoints, verified
contract/address metadata, and approved evidence sources.
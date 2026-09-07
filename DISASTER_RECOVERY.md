# Disaster Recovery

Disaster-recovery procedures are **NOT VERIFIED** in this repository. Before
production use, operators must document and test:

- Supabase/PostgreSQL backups, point-in-time recovery, and restore access.
- Immutable audit-log retention and export.
- Secret rotation and revocation for Supabase, indexer, RPC, and external APIs.
- Safe/multisig signer recovery without browser-held keys.
- Indexer replay, checkpoint, reorg, and reconciliation procedures.
- Recovery objectives, incident ownership, and communication paths.

No production deployment, custody system, backup schedule, or recovery drill is
claimed by the current repository.
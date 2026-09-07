# Admin Operations

The browser is not a security boundary and never holds private keys or service
role credentials. Privileged operations must be created server-side, authorized
from the trusted profile role, approved through the configured organizational
workflow, and verified by the canonical indexer before the UI reports success.

The intended blockchain operation flow is:

1. An authenticated administrator creates an operation request.
2. The server validates the request and permission.
3. Required approvals are recorded and audited.
4. An approved Safe, multisig, or external signing process submits the transaction.
5. The indexer confirms the transaction, confirmations, and reorg-safe state.
6. The dashboard displays the verified result and provenance.

No private-key signing or mainnet deployment is implemented in this repository.
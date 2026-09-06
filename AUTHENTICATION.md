# Authentication

Two sign-in paths, matching how CeloHT actually operates:

1. **Email magic link** (Supabase Auth `signInWithOtp`) - the primary path for Foundation Director and Maintainer Council members.
2. **Wallet connect (Valora)** - stubbed in `src/app/(auth)/login/page.tsx`. CeloHT's tech stack is Valora-only (no MiniPay), so this button is wired to show the intended UX but requires WalletConnect project credentials to complete - add `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` and implement the connect handler using `@walletconnect/web3-provider` or Valora's connect SDK.

## RBAC

Roles (`director`, `council`, `contributor`, `viewer`) live on `public.profiles.role` and are enforced by Postgres RLS (source of truth) and mirrored in `src/types/index.ts` for UI gating. New users get `viewer` by default; role changes should go through a Maintainer Council-approved process, not be self-service.

## Mock mode

Unauthenticated mock access is available only when all of the following are true:

- the environment is non-production;
- `NEXT_PUBLIC_ALLOW_UNAUTHENTICATED_MOCK_MODE=true` is set; and
- Supabase credentials are absent.

The mock path never creates a Supabase session. In production, missing Supabase credentials fail closed and redirect to `/login?reason=configuration`. The dashboard must not be exposed as an unauthenticated admin surface.

Mock values remain clearly labeled and must not be presented as live Treasury, identity, blockchain, or impact data. See [DATA_SOURCES.md](DATA_SOURCES.md).

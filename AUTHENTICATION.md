# Authentication

Two sign-in paths, matching how CeloHT actually operates:

1. **Email magic link** (Supabase Auth `signInWithOtp`) - the primary path for Foundation Director and Maintainer Council members.
2. **Wallet connect (Valora)** - stubbed in `src/app/(auth)/login/page.tsx`. CeloHT's tech stack is Valora-only (no MiniPay), so this button is wired to show the intended UX but requires WalletConnect project credentials to complete - add `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` and implement the connect handler using `@walletconnect/web3-provider` or Valora's connect SDK.

## RBAC

Roles (`director`, `council`, `contributor`, `viewer`) live on `public.profiles.role` and are enforced by Postgres RLS (source of truth) and mirrored in `src/types/index.ts` for UI gating. New users get `viewer` by default; role changes should go through a Maintainer Council-approved process, not be self-service.

## Mock mode

If `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` aren't set, `middleware.ts` skips the auth check entirely and the login page's buttons drop straight into the dashboard as a demo viewer. This keeps the UI reviewable without a live backend - see `docs/DATA_SOURCES.md`.

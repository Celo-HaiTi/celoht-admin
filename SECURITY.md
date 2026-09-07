# Security Policy

## Reporting a vulnerability

Email **security@celoht.com** with a description and reproduction steps. Please don't open a public issue for undisclosed vulnerabilities.

We aim to acknowledge reports within 5 business days.

## Scope

This repository handles governance, treasury, and program data for CeloHT. In-scope concerns include: RLS policy bypass, auth/session handling, XSS/CSRF in dashboard forms, and dependency vulnerabilities flagged by CodeQL/Dependabot.

## Supported versions

Only the `main` branch receives security fixes.

## Current security status

This repository is **NOT PRODUCTION READY**. Production dashboard routes fail
closed when verified providers are unavailable, but the external CeloHT indexer,
verified contract metadata, live Supabase project, MFA, rate limiting, backup,
and independent security review are not verified here.

The service-role client is server-only. Do not import `lib/supabase/admin.ts`
from client components, and do not add service-role keys or private keys to any
`NEXT_PUBLIC_*` variable. Apply all SQL migrations, including
`0004_audit_provenance_hardening.sql`, through a reviewed database deployment
process before relying on the controls.

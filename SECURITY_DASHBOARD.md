# Security Dashboard

**Path:** `src/app/(dashboard)/dashboard/security/page.tsx`
**Status:** ✅ Built · 🚧 Mock data by default — see [Data source](#data-source)
**Owners:** Maintainer Council (read) · Foundation Director (read) · everyone else (read-only) — system-generated, no manual writes

---

## 1. Purpose

This dashboard surfaces CeloHT's actual security posture — open Dependabot/CodeQL alerts, resolution time, days since last audit — in one place, matching this repo's own CI setup (`.github/workflows/ci.yml` runs CodeQL on every push). It exists so security debt is visible and trackable rather than scattered across GitHub's Security tab per-repository.

---

## 2. What it shows

| Section | Contents |
|---|---|
| KPI row | Open Alerts, Resolved (30d), Dependabot Alerts, Days Since Last Audit |
| Alerts table | Alert, severity, source (Dependabot/CodeQL/Manual Review), status, detected date — searchable, sortable, exportable |

---

## 3. Data model

**None — reads directly from the GitHub Security API, not from Supabase.** See [§ Roadmap](#roadmap) for the schema this dashboard needs before it can leave mock mode.

### Row Level Security

N/A — read access here should still be restricted to Council/Director even though the underlying data is org-internal, since open vulnerabilities are exactly the kind of information that shouldn't be broadly broadcast before they're fixed. Tighten the RLS-style access check when this is wired to real auth, even though it's technically system-generated data.

---

## 4. Data source

Like every dashboard in this repo, Security reads through `src/lib/data-source.ts`'s `isMockMode()`. In mock mode (the default), figures come from `src/lib/mock-data/security.ts` — a seeded, deterministic generator with every mock ID prefixed `MOCK-`. A persistent `MockDataBanner` renders at the top of the page whenever this is active. See [`docs/DATA_SOURCES.md`](DATA_SOURCES.md) for the full policy on why this default exists and when it's safe to turn off.

---

## 5. Components used

Reused from the shared library, consistent with every other dashboard in this repo — see [`docs/ARCHITECTURE.md`](ARCHITECTURE.md#adding-a-new-dashboard) before adding a bespoke widget here instead of extending an existing one.

---

## 6. Roadmap for this dashboard

1. **Wire to GitHub's Security Advisories / Dependabot API** across all CeloHT repos using `GITHUB_TOKEN`, aggregated the same way GitHub Analytics aggregates repo stats.
2. Add a manual-entry path for non-GitHub findings (e.g. a third-party smart contract audit) that CI can't detect automatically.
3. "Days Since Last Audit" should track a real, dated audit event (see `docs/BUILD_STATUS.md`'s note on independent review) rather than being manually estimated.

None of the above is required for this dashboard to be considered "built" per [`docs/BUILD_STATUS.md`](BUILD_STATUS.md) — it already has real UI and a real (mocked) data path. These are the steps between "built" and "auditable."

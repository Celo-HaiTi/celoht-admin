# GitHub Analytics Dashboard

**Path:** `src/app/(dashboard)/dashboard/github-analytics/page.tsx`
**Status:** ✅ Built · 🚧 Mock data by default — see [Data source](#data-source)
**Owners:** Maintainer Council (read) · Foundation Director (read) · everyone else (read-only) — system-generated, no manual writes

---

## 1. Purpose

Stars and forks are vanity metrics on their own; this dashboard exists to pair them with the metrics that actually indicate a healthy open-source project — open PRs, open issues, CI pass rate — across every CeloHT repository at once, so "top open-source project" is something this page can substantiate, not just claim.

---

## 2. What it shows

| Section | Contents |
|---|---|
| KPI row | Total Stars, Contributors, Open PRs, CI Pass Rate |
| Repos table | Repository, stars, forks, open PRs, open issues, CI status — searchable, sortable, exportable |

---

## 3. Data model

**None — reads directly from the GitHub API, not from Supabase.** See [§ Roadmap](#roadmap) for the schema this dashboard needs before it can leave mock mode.

### Row Level Security

N/A — public GitHub data, no RLS needed once wired.

---

## 4. Data source

Like every dashboard in this repo, GitHub Analytics reads through `src/lib/data-source.ts`'s `isMockMode()`. In mock mode (the default), figures come from `src/lib/mock-data/github-analytics.ts` — a seeded, deterministic generator with every mock ID prefixed `MOCK-`. A persistent `MockDataBanner` renders at the top of the page whenever this is active. See [`docs/DATA_SOURCES.md`](DATA_SOURCES.md) for the full policy on why this default exists and when it's safe to turn off.

---

## 5. Components used

Reused from the shared library, consistent with every other dashboard in this repo — see [`docs/ARCHITECTURE.md`](ARCHITECTURE.md#adding-a-new-dashboard) before adding a bespoke widget here instead of extending an existing one.

---

## 6. Roadmap for this dashboard

1. **Wire to the real GitHub REST API** server-side using `GITHUB_TOKEN` + `GITHUB_ORG=Celo-HaiTi` (already corrected in `.env.example` — see the org-name fix applied 2026-08-06) via a Next.js Route Handler, not client-side, to avoid exposing the token.
2. Cache responses (even a simple in-memory TTL cache, or a scheduled sync into a small Supabase table) — the GitHub API has rate limits this dashboard could hit if queried on every page load.
3. Once live, this dashboard becomes the most credible, hardest-to-fake evidence of project activity for grant reviewers — prioritize wiring it early.

None of the above is required for this dashboard to be considered "built" per [`docs/BUILD_STATUS.md`](BUILD_STATUS.md) — it already has real UI and a real (mocked) data path. These are the steps between "built" and "auditable."

# Audit Dashboard

**Path:** `src/app/(dashboard)/dashboard/audit/page.tsx`
**Status:** ✅ Built · 🚧 Mock data by default — see [Data source](#data-source)
**Owners:** Maintainer Council (read) · Foundation Director (read) — restricted; not visible to Contributors or general Viewers

---

## 1. Purpose

Every other dashboard in this repo shows *what* the state of something is; this one shows *who changed it and when*. It's the accountability backstop for every write action across Treasury, Governance, and role changes — the dashboard that makes "trust us" unnecessary, because the log is checkable.

---

## 2. What it shows

| Section | Contents |
|---|---|
| KPI row | Actions Logged Today, Admin Actions (7d), Failed Logins (7d), Last Reviewed |
| Audit log | Actor, action, target, timestamp — searchable, sortable, exportable |

---

## 3. Data model

Backed by `supabase/migrations/0001_init.sql`, table `audit_log`:

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | Primary key |
| `actor_id` | `uuid → profiles.id` | Who performed the action |
| `action` | `text` | e.g. "Updated treasury transaction", "Changed user role" |
| `target` | `text` | What was acted on, e.g. `treasury_transactions/uuid` |
| `metadata` | `jsonb, nullable` | Structured detail — before/after values, etc. |
| `created_at` | `timestamptz` |  |

### Row Level Security

Read restricted to `director` and `council` via `public.current_role()` — this is deliberately **not** readable by `contributor` or `viewer` roles, since an audit log can reveal sensitive operational detail even when the underlying action was benign. Writes should never come from client code — only from database triggers or a service-role Edge Function, so the log can't be tampered with by the same access it's meant to audit.

---

## 4. Data source

Like every dashboard in this repo, Audit reads through `src/lib/data-source.ts`'s `isMockMode()`. In mock mode (the default), figures come from `src/lib/mock-data/audit.ts` — a seeded, deterministic generator with every mock ID prefixed `MOCK-`. A persistent `MockDataBanner` renders at the top of the page whenever this is active. See [`docs/DATA_SOURCES.md`](DATA_SOURCES.md) for the full policy on why this default exists and when it's safe to turn off.

---

## 5. Components used

Reused from the shared library, consistent with every other dashboard in this repo — see [`docs/ARCHITECTURE.md`](ARCHITECTURE.md#adding-a-new-dashboard) before adding a bespoke widget here instead of extending an existing one.

---

## 6. Roadmap for this dashboard

1. **Add triggers on every RLS-protected mutating table** (`treasury_transactions`, `governance_proposals`, `profiles.role` changes) that insert into `audit_log` automatically — right now nothing writes to this table but the seed script.
2. Wire `src/lib/mock-data/audit.ts` to a real query, respecting the Council/Director-only read restriction in the UI layer too, not just RLS.
3. "Failed Logins" needs a source — Supabase Auth logs, or a custom `auth_events` table populated from `onAuthStateChange`.

None of the above is required for this dashboard to be considered "built" per [`docs/BUILD_STATUS.md`](BUILD_STATUS.md) — it already has real UI and a real (mocked) data path. These are the steps between "built" and "auditable."

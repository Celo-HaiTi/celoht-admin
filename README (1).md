# CeloHT Admin — Documentation

This is the documentation index. Start with **Data Sources** if you read nothing else — it's the policy every other document assumes.

## Start here

| Doc | What it covers |
|---|---|
| [`DATA_SOURCES.md`](DATA_SOURCES.md) | Mock-vs-real data policy — read this before demoing or connecting anything |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Folder structure, module boundaries, how to add a dashboard |
| [`DATABASE.md`](DATABASE.md) | Supabase schema and Row Level Security |
| [`AUTHENTICATION.md`](AUTHENTICATION.md) | Auth flows (magic link, Valora stub) and RBAC |
| [`BUILD_STATUS.md`](BUILD_STATUS.md) | What's built, what's mocked, what's next |

## Dashboard deep dives

Every one of the 24 dashboards has its own doc: purpose, exact data model, Row Level Security, current data source, and a concrete roadmap from mock to real. Same five-section shape throughout, so once you've read one you know how to read all of them.

### Overview
- [`EXECUTIVE_DASHBOARD.md`](EXECUTIVE_DASHBOARD.md)
- [`TRANSPARENCY_DASHBOARD.md`](TRANSPARENCY_DASHBOARD.md)
- [`KPI_DASHBOARD.md`](KPI_DASHBOARD.md)
- [`IMPACT_DASHBOARD.md`](IMPACT_DASHBOARD.md)

### Finance
- [`TREASURY_DASHBOARD.md`](TREASURY_DASHBOARD.md) — the reference example; read this one first
- [`DONATIONS_DASHBOARD.md`](DONATIONS_DASHBOARD.md)
- [`GRANTS_DASHBOARD.md`](GRANTS_DASHBOARD.md)
- [`REVENUE_DASHBOARD.md`](REVENUE_DASHBOARD.md)
- [`EXPENSES_DASHBOARD.md`](EXPENSES_DASHBOARD.md)

### Programs
- [`EDUCATION_DASHBOARD.md`](EDUCATION_DASHBOARD.md)
- [`COMMUNITY_DASHBOARD.md`](COMMUNITY_DASHBOARD.md)
- [`VOLUNTEERS_DASHBOARD.md`](VOLUNTEERS_DASHBOARD.md)
- [`AMBASSADORS_DASHBOARD.md`](AMBASSADORS_DASHBOARD.md)
- [`PARTNERSHIPS_DASHBOARD.md`](PARTNERSHIPS_DASHBOARD.md) — includes the FreClean status framing
- [`REFORESTATION_DASHBOARD.md`](REFORESTATION_DASHBOARD.md)
- [`AGENT_NETWORK_DASHBOARD.md`](AGENT_NETWORK_DASHBOARD.md)

### Technology
- [`WALLET_ANALYTICS_DASHBOARD.md`](WALLET_ANALYTICS_DASHBOARD.md)
- [`BLOCKCHAIN_ANALYTICS_DASHBOARD.md`](BLOCKCHAIN_ANALYTICS_DASHBOARD.md)
- [`GITHUB_ANALYTICS_DASHBOARD.md`](GITHUB_ANALYTICS_DASHBOARD.md)
- [`SECURITY_DASHBOARD.md`](SECURITY_DASHBOARD.md)

### Governance
- [`GOVERNANCE_DASHBOARD.md`](GOVERNANCE_DASHBOARD.md)
- [`RISK_DASHBOARD.md`](RISK_DASHBOARD.md)
- [`AUDIT_DASHBOARD.md`](AUDIT_DASHBOARD.md) — access is restricted to Council/Director, unlike every other dashboard
- [`REPORTS_DASHBOARD.md`](REPORTS_DASHBOARD.md)

## The pattern, if you're adding dashboard #25

Every deep-dive doc follows: **Purpose → What it shows → Data model (+ RLS) → Data source → Components used → Roadmap.** Purpose should name who actually reads this page and what decision it helps them make — "so people can see the data" is not a purpose. Roadmap should be concrete enough that someone unfamiliar with the dashboard could pick up item #1 without asking a clarifying question first.

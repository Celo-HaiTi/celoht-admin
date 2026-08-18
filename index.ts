/** Roles follow CeloHT's governance model: Foundation Director → Maintainer
 *  Council → Community Contributors. RBAC in this repo maps to that chain. */
export type Role = "director" | "council" | "contributor" | "viewer";

export const ROLE_LABELS: Record<Role, string> = {
  director: "Foundation Director",
  council: "Maintainer Council",
  contributor: "Community Contributor",
  viewer: "Viewer",
};

/** What each role can do. Checked both in RLS policies (source of truth)
 *  and mirrored here for UI gating (hide, don't just disable). */
export const PERMISSIONS: Record<Role, string[]> = {
  director: ["*"],
  council: [
    "treasury:read",
    "treasury:write",
    "grants:read",
    "grants:write",
    "governance:read",
    "governance:write",
    "reports:read",
    "reports:write",
    "audit:read",
  ],
  contributor: [
    "education:read",
    "education:write",
    "community:read",
    "community:write",
    "reforestation:read",
    "reforestation:write",
    "reports:read",
  ],
  viewer: ["*:read"],
};

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  avatarUrl?: string;
  region?: string;
}

export interface KPI {
  label: string;
  value: number;
  format: "usd" | "number" | "percent" | "usdm";
  delta?: number;
  deltaLabel?: string;
  trend?: number[];
}

export interface AuditLogEntry {
  id: string;
  actorEmail: string;
  action: string;
  target: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export type ExportFormat = "csv" | "xlsx" | "pdf";

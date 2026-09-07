export const AUTHORIZED_ROLES = [
  "administrator",
  "reviewer",
  "finance_viewer",
  "agent_reviewer",
  "education_reviewer",
  "reforestation_reviewer",
  "governance_operator",
] as const;

export type AuthorizedRole = (typeof AUTHORIZED_ROLES)[number];

export const LEGACY_ROLE_ALIASES: Record<string, AuthorizedRole> = {
  director: "administrator",
  council: "reviewer",
  contributor: "reviewer",
  viewer: "finance_viewer",
};

export const ROLE_PERMISSIONS: Record<AuthorizedRole, string[]> = {
  administrator: ["*"],
  reviewer: [
    "audit:read",
    "dashboard:read",
    "governance:read",
    "governance:write",
    "reports:read",
  ],
  finance_viewer: ["treasury:read", "reports:read", "dashboard:read"],
  agent_reviewer: ["agent:read", "dashboard:read"],
  education_reviewer: ["education:read", "dashboard:read"],
  reforestation_reviewer: ["reforestation:read", "dashboard:read"],
  governance_operator: ["governance:read", "governance:write", "dashboard:read"],
};

export const DASHBOARD_ROLE_REQUIREMENTS: Record<string, readonly AuthorizedRole[]> = {
  executive: ["administrator", "reviewer", "finance_viewer", "agent_reviewer", "education_reviewer", "reforestation_reviewer", "governance_operator"],
  treasury: ["administrator", "reviewer", "finance_viewer"],
  governance: ["administrator", "reviewer", "governance_operator"],
  "agent-network": ["administrator", "reviewer", "agent_reviewer"],
  education: ["administrator", "reviewer", "education_reviewer"],
  reforestation: ["administrator", "reviewer", "reforestation_reviewer"],
  audit: ["administrator", "reviewer"],
};

export function normalizeRole(role: string | null | undefined): AuthorizedRole | null {
  const value = (role ?? "").trim().toLowerCase();
  if (!value) return null;

  const normalized = value.replace(/\s+/g, "_");
  if (AUTHORIZED_ROLES.includes(normalized as AuthorizedRole)) {
    return normalized as AuthorizedRole;
  }

  return LEGACY_ROLE_ALIASES[normalized] ?? null;
}

export function hasPermission(role: string | null | undefined, permission: string): boolean {
  const normalized = normalizeRole(role);
  if (!normalized) return false;

  const permissions = ROLE_PERMISSIONS[normalized] ?? [];
  return permissions.includes("*") || permissions.includes(permission);
}

export function canAccessDashboard(slug: string, role: string | null | undefined): boolean {
  const normalized = normalizeRole(role);
  if (!normalized) return false;

  const required = DASHBOARD_ROLE_REQUIREMENTS[slug] ?? AUTHORIZED_ROLES;
  return required.includes(normalized);
}

export function assertKycAccess(role: string | null | undefined): boolean {
  const normalized = normalizeRole(role);
  if (!normalized) return false;

  return ["administrator", "reviewer", "finance_viewer"].includes(normalized);
}

export function enforceKycRestriction(role: string | null | undefined): void {
  if (!assertKycAccess(role)) {
    throw new Error("KYC data is restricted to approved administrative roles");
  }
}

export function assertDashboardAccess(slug: string, role: string | null | undefined): void {
  if (!canAccessDashboard(slug, role)) {
    throw new Error(`Forbidden: role is not permitted to access ${slug}`);
  }
}

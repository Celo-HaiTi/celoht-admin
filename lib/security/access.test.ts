import { describe, expect, it } from "vitest";
import { canAccessDashboard, enforceKycRestriction, normalizeRole, assertKycAccess } from "@/lib/security/access";
import { unavailable } from "@/lib/data/provenance";

describe("security access contract", () => {
  it("normalizes legacy roles into the current RBAC model", () => {
    expect(normalizeRole("director")).toBe("administrator");
    expect(normalizeRole("council")).toBe("reviewer");
    expect(normalizeRole("finance_viewer")).toBe("finance_viewer");
  });

  it("grants dashboard access only to eligible roles", () => {
    expect(canAccessDashboard("treasury", "finance_viewer")).toBe(true);
    expect(canAccessDashboard("treasury", "agent_reviewer")).toBe(false);
    expect(canAccessDashboard("governance", "governance_operator")).toBe(true);
    expect(canAccessDashboard("audit", "reviewer")).toBe(true);
  });

  it("restricts KYC access to authorized roles", () => {
    expect(assertKycAccess("administrator")).toBe(true);
    expect(assertKycAccess("reviewer")).toBe(true);
    expect(assertKycAccess("finance_viewer")).toBe(true);
    expect(assertKycAccess("agent_reviewer")).toBe(false);
  });

  it("throws when a non-authorized role attempts KYC access", () => {
    expect(() => enforceKycRestriction("agent_reviewer")).toThrow(
      "KYC data is restricted to approved administrative roles",
    );
  });

  it("marks unavailable provider data clearly as unavailable", () => {
    const result = unavailable("Celo RPC", "No chain configured");
    expect(result.data).toBeNull();
    expect(result.systemStatus).toBe("UNAVAILABLE");
    expect(result.provenance.status).toBe("UNAVAILABLE");
  });
});

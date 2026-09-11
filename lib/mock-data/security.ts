import { seededRandom, seededRange } from "./seed";
import type { KPI } from "@/types";

/** MOCK_SECURITY_DATA - seeded placeholder security posture. */
export interface SecurityAlert {
  id: string;
  title: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  source: "Dependabot" | "CodeQL" | "Manual Review";
  status: "Open" | "Resolved";
  detectedAt: string;
}

export function getSecurityKpis(): KPI[] {
  return [
    { label: "Open Alerts", value: 2, format: "number", delta: -33.3 },
    { label: "Resolved (30d)", value: 9, format: "number", delta: 28.5 },
    { label: "Dependabot Alerts", value: 4, format: "number" },
    { label: "Days Since Last Audit", value: 41, format: "number" },
  ];
}

export function getSecurityAlerts(): SecurityAlert[] {
  const rand = seededRandom(45);
  const sev: SecurityAlert["severity"][] = ["Critical", "High", "Medium", "Low"];
  const src: SecurityAlert["source"][] = ["Dependabot", "CodeQL", "Manual Review"];
  const titles = [
    "Outdated transitive dependency flagged",
    "Missing CSRF token on form submit",
    "Verbose error message in API route",
    "Dependency with known CVE",
    "RLS policy gap on new table",
    "Rate limiting missing on public endpoint",
  ];
  return titles.map((title, i) => {
    const month = seededRange(rand, 3, 8);
    const day = seededRange(rand, 1, 28);
    return {
      id: `MOCK-SEC-${1500 + i}`,
      title,
      severity: sev[seededRange(rand, 0, 3)]!,
      source: src[seededRange(rand, 0, 2)]!,
      status: rand() > 0.35 ? "Resolved" : "Open",
      detectedAt: `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    };
  });
}

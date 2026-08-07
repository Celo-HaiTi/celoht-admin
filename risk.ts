import { seededRandom, seededRange } from "./seed";
import type { KPI } from "@/types";

/** MOCK_RISK_DATA — seeded placeholder risk register. */
export interface RiskItem {
  id: string;
  title: string;
  category: "Financial" | "Operational" | "Security" | "Regulatory" | "Reputational";
  severity: "Critical" | "High" | "Medium" | "Low";
  mitigationStatus: "Open" | "Mitigating" | "Mitigated";
  owner: string;
}

const RISKS = [
  "Grant funding concentration in single source",
  "Agent liquidity shortfall in peak periods",
  "Reforestation pilot survival rate below target",
  "Key contributor bus-factor on core repos",
  "Regulatory shift affecting stablecoin transfers",
  "Community trust risk from delayed transparency report",
];

export function getRiskKpis(): KPI[] {
  return [
    { label: "Open Risks", value: 4, format: "number" },
    { label: "High/Critical", value: 2, format: "number" },
    { label: "Mitigated (YTD)", value: 5, format: "number", delta: 25.0 },
    { label: "Avg. Risk Score", value: 6.2, format: "number" },
  ];
}

export function getRisks(): RiskItem[] {
  const rand = seededRandom(46);
  const cats: RiskItem["category"][] = ["Financial", "Operational", "Security", "Regulatory", "Reputational"];
  const sev: RiskItem["severity"][] = ["Critical", "High", "Medium", "Low"];
  const status: RiskItem["mitigationStatus"][] = ["Open", "Mitigating", "Mitigated"];
  const owners = ["Maintainer Council", "Foundation Director", "Agent Network Lead", "Security Lead"];
  return RISKS.map((title, i) => ({
    id: `MOCK-RSK-${1600 + i}`,
    title,
    category: cats[seededRange(rand, 0, 4)]!,
    severity: sev[seededRange(rand, 0, 3)]!,
    mitigationStatus: status[seededRange(rand, 0, 2)]!,
    owner: owners[seededRange(rand, 0, 3)]!,
  }));
}

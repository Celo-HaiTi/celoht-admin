import { seededRandom, seededRange } from "./seed";

/** MOCK_KPI_DATA — seeded placeholder org-wide KPI targets vs. actuals,
 *  one row per pillar metric that leadership tracks. */
export interface KpiTarget {
  id: string;
  metric: string;
  pillar: "Education" | "Agent Network" | "Reforestation" | "Governance";
  target: number;
  actual: number;
  unit: string;
}

const METRICS: { metric: string; pillar: KpiTarget["pillar"]; target: number; unit: string }[] = [
  { metric: "Students certified", pillar: "Education", target: 300, unit: "students" },
  { metric: "Active agents", pillar: "Agent Network", target: 50, unit: "agents" },
  { metric: "Wallets onboarded", pillar: "Agent Network", target: 2500, unit: "wallets" },
  { metric: "Trees planted (pilot)", pillar: "Reforestation", target: 1500, unit: "trees" },
  { metric: "Tree survival rate", pillar: "Reforestation", target: 80, unit: "%" },
  { metric: "Proposals ratified", pillar: "Governance", target: 12, unit: "proposals" },
];

export function getKpiTargets(): KpiTarget[] {
  const rand = seededRandom(49);
  return METRICS.map((m, i) => ({
    id: `MOCK-KPIT-${1900 + i}`,
    ...m,
    actual: Math.round(m.target * (0.6 + rand() * 0.5)),
  }));
}

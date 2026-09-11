import { seededRandom, seededRange, MOCK_LABEL_MONTHS } from "./seed";
import type { KPI } from "@/types";

/** MOCK_EXECUTIVE_DATA - seeded placeholder. Replace by wiring
 *  getExecutiveKpis() to Supabase views once real figures exist. */
export function getExecutiveKpis(): KPI[] {
  return [
    { label: "Treasury Balance", value: 84210, format: "usd", delta: 6.2, deltaLabel: "vs last month" },
    { label: "Active Agents", value: 37, format: "number", delta: 12.1, deltaLabel: "vs last month" },
    { label: "Wallets Onboarded", value: 2140, format: "number", delta: 8.4, deltaLabel: "vs last month" },
    { label: "Trees Planted (pilot)", value: 1250, format: "number", delta: 3.0, deltaLabel: "vs last month" },
    { label: "Students Enrolled", value: 460, format: "number", delta: 15.6, deltaLabel: "vs last month" },
    { label: "GitHub Contributors", value: 19, format: "number", delta: 5.0, deltaLabel: "vs last month" },
  ];
}

export function getGrowthTrend() {
  const rand = seededRandom(42);
  let base = 1400;
  return MOCK_LABEL_MONTHS.map((label) => {
    base += seededRange(rand, 40, 180);
    return { label, value: base };
  });
}

export function getPillarBreakdown() {
  return [
    { label: "Education", value: 42 },
    { label: "Agent Network", value: 34 },
    { label: "Reforestation", value: 24 },
  ];
}

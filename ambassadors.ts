import { seededRandom, seededRange } from "./seed";
import type { KPI } from "@/types";

/** MOCK_AMBASSADORS_DATA — seeded placeholder. */
export interface Ambassador {
  id: string;
  name: string;
  region: string;
  eventsHosted: number;
  referrals: number;
  tier: "Core" | "Regional" | "Campus";
}

const REGIONS = ["Léogâne", "Port-au-Prince", "Cap-Haïtien", "Miami (Diaspora)", "Montréal (Diaspora)"];

export function getAmbassadorsKpis(): KPI[] {
  return [
    { label: "Active Ambassadors", value: 23, format: "number", delta: 4.5 },
    { label: "Regions Covered", value: 5, format: "number" },
    { label: "Events Hosted (YTD)", value: 31, format: "number", delta: 19.2 },
    { label: "Referrals Generated", value: 412, format: "number", delta: 10.8 },
  ];
}

export function getAmbassadors(): Ambassador[] {
  const rand = seededRandom(73);
  const tiers: Ambassador["tier"][] = ["Core", "Regional", "Campus"];
  const rows: Ambassador[] = [];
  for (let i = 0; i < 18; i++) {
    rows.push({
      id: `MOCK-AMB-${900 + i}`,
      name: `Placeholder Ambassador #${i + 1}`,
      region: REGIONS[seededRange(rand, 0, REGIONS.length - 1)]!,
      eventsHosted: seededRange(rand, 0, 8),
      referrals: seededRange(rand, 2, 60),
      tier: tiers[seededRange(rand, 0, 2)]!,
    });
  }
  return rows;
}

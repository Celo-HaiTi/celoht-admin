import { seededRandom, seededRange } from "./seed";
import type { KPI } from "@/types";

/** MOCK_AGENT_NETWORK_DATA - seeded placeholder. */
export interface Agent {
  id: string;
  name: string;
  region: string;
  walletsOnboarded: number;
  volumeUsd: number;
  status: "Active" | "Training" | "Inactive";
}

const REGIONS = ["Léogâne Centre", "Léogâne Nord", "Léogâne Sud", "Petit-Goâve", "Grand-Goâve"];

export function getAgentNetworkKpis(): KPI[] {
  return [
    { label: "Active Agents", value: 37, format: "number", delta: 12.1 },
    { label: "Wallets Onboarded", value: 2140, format: "number", delta: 8.4 },
    { label: "Cash↔USDm Volume (30d)", value: 28900, format: "usd", delta: 6.7 },
    { label: "Avg. Transaction Size", value: 14.30, format: "usd" },
  ];
}

export function getAgents(): Agent[] {
  const rand = seededRandom(76);
  const statuses: Agent["status"][] = ["Active", "Training", "Inactive"];
  const rows: Agent[] = [];
  for (let i = 0; i < 20; i++) {
    rows.push({
      id: `MOCK-AGT-${1100 + i}`,
      name: `Placeholder Agent #${i + 1}`,
      region: REGIONS[seededRange(rand, 0, REGIONS.length - 1)]!,
      walletsOnboarded: seededRange(rand, 12, 180),
      volumeUsd: seededRange(rand, 200, 4800),
      status: statuses[seededRange(rand, 0, 2)]!,
    });
  }
  return rows;
}

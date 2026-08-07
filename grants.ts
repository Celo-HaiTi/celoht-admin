import { seededRandom, seededRange } from "./seed";
import type { KPI } from "@/types";

/** MOCK_GRANTS_DATA — seeded placeholder. */
export interface Grant {
  id: string;
  grantor: string;
  program: string;
  amountUsd: number;
  status: "Awarded" | "Under Review" | "Applied" | "Declined";
  submittedAt: string;
}

const GRANTORS = ["Celo Foundation", "Gitcoin Grants", "Web3 Foundation", "Local NGO Fund", "Diaspora Giving Circle"];
const PROGRAMS = ["Education", "Agent Network", "Reforestation", "Core Infrastructure"];

export function getGrantsKpis(): KPI[] {
  return [
    { label: "Total Awarded (YTD)", value: 52400, format: "usd", delta: 14.0 },
    { label: "Active Grants", value: 4, format: "number" },
    { label: "Pending Applications", value: 3, format: "number", delta: 50.0 },
    { label: "Avg. Grant Size", value: 8733, format: "usd" },
  ];
}

export function getGrants(): Grant[] {
  const rand = seededRandom(51);
  const statuses: Grant["status"][] = ["Awarded", "Under Review", "Applied", "Declined"];
  const rows: Grant[] = [];
  for (let i = 0; i < 16; i++) {
    const month = seededRange(rand, 1, 8);
    const day = seededRange(rand, 1, 28);
    rows.push({
      id: `MOCK-GRT-${300 + i}`,
      grantor: GRANTORS[seededRange(rand, 0, GRANTORS.length - 1)]!,
      program: PROGRAMS[seededRange(rand, 0, PROGRAMS.length - 1)]!,
      amountUsd: seededRange(rand, 1500, 18000),
      status: statuses[seededRange(rand, 0, 3)]!,
      submittedAt: `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    });
  }
  return rows;
}

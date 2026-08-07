import { seededRandom, seededRange, MOCK_LABEL_MONTHS } from "./seed";
import type { KPI } from "@/types";

/** MOCK_REVENUE_DATA — seeded placeholder. CeloHT's real model: ecosystem
 *  grants, strategic partnerships, GitHub Sponsors now; agent network
 *  service fees become a revenue source from Phase 3+. */
export interface RevenueEntry {
  id: string;
  source: string;
  category: "Grant" | "Sponsorship" | "GitHub Sponsors" | "Agent Fees (pilot)";
  amountUsd: number;
  date: string;
}

export function getRevenueKpis(): KPI[] {
  return [
    { label: "Total Revenue (YTD)", value: 68900, format: "usd", delta: 11.2 },
    { label: "GitHub Sponsors (MRR)", value: 340, format: "usd", delta: 6.4 },
    { label: "Grant Revenue Share", value: 76, format: "percent" },
    { label: "Active Revenue Sources", value: 7, format: "number" },
  ];
}

export function getRevenueTrend() {
  const rand = seededRandom(88);
  return MOCK_LABEL_MONTHS.map((label) => ({ label, value: seededRange(rand, 6500, 15500) }));
}

export function getRevenueBySource() {
  return [
    { label: "Ecosystem Grants", value: 41 },
    { label: "Sponsorships", value: 28 },
    { label: "GitHub Sponsors", value: 18 },
    { label: "Agent Fees (pilot)", value: 13 },
  ];
}

export function getRevenueEntries(): RevenueEntry[] {
  const rand = seededRandom(89);
  const cats: RevenueEntry["category"][] = ["Grant", "Sponsorship", "GitHub Sponsors", "Agent Fees (pilot)"];
  const sources = ["Celo Foundation", "Local Business Sponsor", "GitHub Sponsors pool", "Léogâne Agent Pilot", "Diaspora Partner"];
  const rows: RevenueEntry[] = [];
  for (let i = 0; i < 20; i++) {
    const month = seededRange(rand, 1, 8);
    const day = seededRange(rand, 1, 28);
    rows.push({
      id: `MOCK-REV-${400 + i}`,
      source: sources[seededRange(rand, 0, sources.length - 1)]!,
      category: cats[seededRange(rand, 0, 3)]!,
      amountUsd: seededRange(rand, 80, 6200),
      date: `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    });
  }
  return rows;
}

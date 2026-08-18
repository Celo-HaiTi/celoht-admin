import { seededRandom, seededRange } from "./seed";
import type { KPI } from "@/types";

/** MOCK_DONATIONS_DATA - seeded placeholder. */
export interface Donation {
  id: string;
  donor: string;
  amountUsd: number;
  channel: "Crypto (USDm)" | "Fiat" | "In-kind";
  date: string;
  recurring: boolean;
}

export function getDonationKpis(): KPI[] {
  return [
    { label: "Total Raised (YTD)", value: 46200, format: "usd", delta: 9.8 },
    { label: "Unique Donors", value: 128, format: "number", delta: 14.2 },
    { label: "Avg. Donation", value: 361, format: "usd", delta: 2.1 },
    { label: "Recurring Donors", value: 22, format: "number", delta: 18.0 },
  ];
}

export function getDonations(): Donation[] {
  const rand = seededRandom(15);
  const channels: Donation["channel"][] = ["Crypto (USDm)", "Fiat", "In-kind"];
  const rows: Donation[] = [];
  for (let i = 0; i < 28; i++) {
    const day = seededRange(rand, 1, 28);
    const month = seededRange(rand, 3, 8);
    rows.push({
      id: `MOCK-DON-${2000 + i}`,
      donor: `Placeholder Donor #${i + 1}`,
      amountUsd: seededRange(rand, 25, 1800),
      channel: channels[seededRange(rand, 0, 2)]!,
      date: `2026-0${month}-${String(day).padStart(2, "0")}`,
      recurring: rand() > 0.75,
    });
  }
  return rows;
}

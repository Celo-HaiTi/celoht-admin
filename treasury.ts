import { seededRandom, seededRange, MOCK_LABEL_MONTHS } from "./seed";
import type { KPI } from "@/types";

/** MOCK_TREASURY_DATA — seeded placeholder financials. This dashboard
 *  is the highest-stakes one to leave un-mislabeled: never demo this
 *  to a grant reviewer without first connecting supabase/migrations to
 *  a real treasury_transactions table. See docs/DATA_SOURCES.md. */
export interface TreasuryTx {
  id: string;
  date: string;
  type: "Inflow" | "Outflow";
  category: string;
  description: string;
  amountUsd: number;
  currency: "USD" | "cUSD" | "CELO";
}

const CATEGORIES_IN = ["Grant", "Donation", "Sponsorship"];
const CATEGORIES_OUT = ["Education", "Agent Network", "Reforestation", "Operations", "Tooling"];

export function getTreasuryKpis(): KPI[] {
  return [
    { label: "Current Balance", value: 84210, format: "usd", delta: 6.2 },
    { label: "Inflows (90d)", value: 31500, format: "usd", delta: 11.4 },
    { label: "Outflows (90d)", value: 22750, format: "usd", delta: -4.1 },
    { label: "cUSD Reserve", value: 18400, format: "cusd" },
  ];
}

export function getTreasuryTrend() {
  const rand = seededRandom(7);
  let balance = 55000;
  return MOCK_LABEL_MONTHS.map((label) => {
    balance += seededRange(rand, -2000, 6500);
    return { label, value: balance };
  });
}

export function getTreasuryTransactions(): TreasuryTx[] {
  const rand = seededRandom(99);
  const rows: TreasuryTx[] = [];
  for (let i = 0; i < 34; i++) {
    const isInflow = rand() > 0.55;
    const cats = isInflow ? CATEGORIES_IN : CATEGORIES_OUT;
    const day = seededRange(rand, 1, 28);
    const month = seededRange(rand, 3, 8);
    rows.push({
      id: `MOCK-TX-${1000 + i}`,
      date: `2026-0${month}-${String(day).padStart(2, "0")}`,
      type: isInflow ? "Inflow" : "Outflow",
      category: cats[seededRange(rand, 0, cats.length - 1)]!,
      description: isInflow
        ? "Placeholder grant/donation entry"
        : "Placeholder program expenditure",
      amountUsd: seededRange(rand, 150, 4200),
      currency: rand() > 0.6 ? "cUSD" : "USD",
    });
  }
  return rows.sort((a, b) => (a.date < b.date ? 1 : -1));
}

import { seededRandom, seededRange, MOCK_LABEL_MONTHS } from "./seed";
import type { KPI } from "@/types";

/** MOCK_EXPENSES_DATA — seeded placeholder. */
export interface Expense {
  id: string;
  category: string;
  vendor: string;
  amountUsd: number;
  date: string;
  approvedBy: "Council" | "Director";
}

const CATEGORIES = ["Education Materials", "Agent Stipends", "Reforestation Supplies", "Tooling/Hosting", "Events"];
const VENDORS = ["Local Supplier", "Cloud Hosting Co.", "Curriculum Partner", "Nursery Cooperative", "Community Venue"];

export function getExpensesKpis(): KPI[] {
  return [
    { label: "Total Spend (YTD)", value: 44120, format: "usd", delta: 7.9 },
    { label: "Largest Category", value: 38, format: "percent" },
    { label: "Monthly Burn Rate", value: 5600, format: "usd", delta: -2.3 },
    { label: "Budget Remaining", value: 61, format: "percent" },
  ];
}

export function getExpensesTrend() {
  const rand = seededRandom(33);
  return MOCK_LABEL_MONTHS.map((label) => ({ label, value: seededRange(rand, 3200, 7800) }));
}

export function getExpensesByCategory() {
  return [
    { label: "Education", value: 38 },
    { label: "Agent Stipends", value: 26 },
    { label: "Reforestation", value: 20 },
    { label: "Tooling", value: 11 },
    { label: "Events", value: 5 },
  ];
}

export function getExpenses(): Expense[] {
  const rand = seededRandom(34);
  const rows: Expense[] = [];
  for (let i = 0; i < 22; i++) {
    const month = seededRange(rand, 1, 8);
    const day = seededRange(rand, 1, 28);
    rows.push({
      id: `MOCK-EXP-${500 + i}`,
      category: CATEGORIES[seededRange(rand, 0, CATEGORIES.length - 1)]!,
      vendor: VENDORS[seededRange(rand, 0, VENDORS.length - 1)]!,
      amountUsd: seededRange(rand, 60, 2400),
      date: `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      approvedBy: rand() > 0.8 ? "Director" : "Council",
    });
  }
  return rows;
}

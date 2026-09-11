import { seededRandom, seededRange, MOCK_LABEL_MONTHS } from "./seed";
import type { KPI } from "@/types";

/** MOCK_WALLET_ANALYTICS_DATA - seeded placeholder. Real version would
 *  read aggregated, privacy-respecting stats - never raw user balances -
 *  from Valora/Celo indexers. */
export interface WalletCohort {
  id: string;
  cohort: string;
  wallets: number;
  avgBalanceUsdm: number;
  activeLast30d: number;
}

export function getWalletKpis(): KPI[] {
  return [
    { label: "Total Wallets", value: 2140, format: "number", delta: 8.4 },
    { label: "Active (30d)", value: 1360, format: "number", delta: 5.1 },
    { label: "Avg. Balance", value: 42.6, format: "usdm" },
    { label: "New This Month", value: 178, format: "number", delta: 11.0 },
  ];
}

export function getWalletTrend() {
  const rand = seededRandom(41);
  let base = 1200;
  return MOCK_LABEL_MONTHS.map((label) => {
    base += seededRange(rand, 90, 220);
    return { label, value: base };
  });
}

export function getWalletCohorts(): WalletCohort[] {
  const rand = seededRandom(42);
  const cohorts = ["Students", "Merchants", "Farmers", "Agents", "General Community"];
  return cohorts.map((cohort, i) => ({
    id: `MOCK-WAL-${1200 + i}`,
    cohort,
    wallets: seededRange(rand, 120, 620),
    avgBalanceUsdm: seededRange(rand, 8, 90),
    activeLast30d: seededRange(rand, 60, 480),
  }));
}

import { seededRandom, seededRange } from "./seed";
import type { KPI } from "@/types";

/** MOCK_BLOCKCHAIN_ANALYTICS_DATA - seeded placeholder. All tx hashes
 *  are fake identifiers, not real Celo transactions - a real build wires
 *  this to the Celo RPC (forno.celo.org) or an indexer like Blockscout. */
export interface ChainTx {
  id: string;
  hash: string;
  type: "Transfer" | "Contract Call" | "Agent Cash-in" | "Agent Cash-out";
  amountUsdm: number;
  blockHeight: number;
  timestamp: string;
}

function fakeHash(rand: () => number): string {
  const chars = "0123456789abcdef";
  let out = "0x";
  for (let i = 0; i < 12; i++) out += chars[Math.floor(rand() * 16)];
  return out + "…";
}

export function getBlockchainKpis(): KPI[] {
  return [
    { label: "Total Transactions (30d)", value: 4820, format: "number", delta: 9.3 },
    { label: "USDm Volume (30d)", value: 28900, format: "usdm", delta: 6.7 },
    { label: "Unique Addresses", value: 2140, format: "number", delta: 8.4 },
    { label: "Avg. Gas Cost", value: 0.0021, format: "usdm" },
  ];
}

export function getChainTransactions(): ChainTx[] {
  const rand = seededRandom(43);
  const types: ChainTx["type"][] = ["Transfer", "Contract Call", "Agent Cash-in", "Agent Cash-out"];
  const rows: ChainTx[] = [];
  for (let i = 0; i < 25; i++) {
    rows.push({
      id: `MOCK-CHN-${1300 + i}`,
      hash: fakeHash(rand),
      type: types[seededRange(rand, 0, 3)]!,
      amountUsdm: seededRange(rand, 2, 340),
      blockHeight: 27_400_000 + seededRange(rand, 0, 90000),
      timestamp: `2026-0${seededRange(rand, 3, 8)}-${String(seededRange(rand, 1, 28)).padStart(2, "0")}`,
    });
  }
  return rows;
}

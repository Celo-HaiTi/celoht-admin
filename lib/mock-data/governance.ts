import { seededRandom, seededRange } from "./seed";

/** MOCK_GOVERNANCE_DATA - seeded placeholder proposals, matching
 *  CeloHT's real structure: Foundation Director → Maintainer Council →
 *  Community Contributors. */
export interface Proposal {
  id: string;
  title: string;
  proposer: string;
  status: "Passed" | "Active" | "Rejected" | "Draft";
  votesFor: number;
  votesAgainst: number;
  createdAt: string;
}

const TITLES = [
  "Approve Q3 education curriculum budget",
  "Onboard 5 new agents in Léogâne",
  "Adjust reforestation pilot site selection",
  "Ratify updated Code of Conduct",
  "Approve FreClean partnership scoping",
  "Council seat rotation - Léogâne region",
  "Adopt updated Security Policy v1.2",
  "Approve Q4 grant allocation framework",
];

export function getProposals(): Proposal[] {
  const rand = seededRandom(23);
  const statuses: Proposal["status"][] = ["Passed", "Active", "Rejected", "Draft"];
  return TITLES.map((title, i) => {
    const votesFor = seededRange(rand, 4, 22);
    const votesAgainst = seededRange(rand, 0, 6);
    const month = seededRange(rand, 3, 8);
    const day = seededRange(rand, 1, 28);
    return {
      id: `MOCK-GOV-${100 + i}`,
      title,
      proposer: i % 2 === 0 ? "Maintainer Council" : "Community Contributor",
      status: statuses[seededRange(rand, 0, 3)]!,
      votesFor,
      votesAgainst,
      createdAt: `2026-0${month}-${String(day).padStart(2, "0")}`,
    };
  });
}

export function getGovernanceKpis() {
  return [
    { label: "Active Proposals", value: 3, format: "number" as const },
    { label: "Council Seats Filled", value: 5, format: "number" as const, delta: 0 },
    { label: "Avg. Participation", value: 68, format: "percent" as const, delta: 4.5 },
    { label: "Proposals Passed (YTD)", value: 11, format: "number" as const, delta: 22.0 },
  ];
}

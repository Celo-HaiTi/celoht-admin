import { seededRandom, seededRange } from "./seed";
import type { KPI } from "@/types";

/** MOCK_GITHUB_ANALYTICS_DATA — seeded placeholder. A real build calls
 *  the GitHub REST API (repos, stats/contributors, pulls, issues) server-
 *  side using GITHUB_TOKEN + GITHUB_ORG from .env — see .env.example. */
export interface RepoStat {
  id: string;
  repo: string;
  stars: number;
  forks: number;
  openPRs: number;
  openIssues: number;
  ciStatus: "Passing" | "Failing" | "No runs";
}

const REPOS = ["CeloHT", "celoht-docs", "celoht-brand", "celoht-admin", "celoht-contracts", "celoht-agent-app"];

export function getGithubKpis(): KPI[] {
  return [
    { label: "Total Stars", value: 214, format: "number", delta: 18.0 },
    { label: "Contributors", value: 19, format: "number", delta: 5.0 },
    { label: "Open PRs", value: 6, format: "number" },
    { label: "CI Pass Rate", value: 94, format: "percent", delta: 2.0 },
  ];
}

export function getRepoStats(): RepoStat[] {
  const rand = seededRandom(44);
  const ci: RepoStat["ciStatus"][] = ["Passing", "Passing", "Passing", "Failing", "No runs"];
  return REPOS.map((repo, i) => ({
    id: `MOCK-GH-${1400 + i}`,
    repo,
    stars: seededRange(rand, 4, 90),
    forks: seededRange(rand, 0, 22),
    openPRs: seededRange(rand, 0, 5),
    openIssues: seededRange(rand, 0, 14),
    ciStatus: ci[seededRange(rand, 0, 4)]!,
  }));
}

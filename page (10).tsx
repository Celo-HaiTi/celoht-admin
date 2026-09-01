"use client";

import type { Metadata } from "next";
import type { ColumnDef } from "@tanstack/react-table";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { MockDataBanner } from "@/components/dashboard/mock-data-banner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/dashboard/data-table";
import { isMockMode } from "@/lib/data-source";
import { getGithubKpis, getRepoStats, type RepoStat } from "@/lib/mock-data/github-analytics";

export const metadata: Metadata = { title: "GitHub Analytics" };

const ciVariant: Record<RepoStat["ciStatus"], "success" | "danger" | "default"> = {
  Passing: "success",
  Failing: "danger",
  "No runs": "default",
};

const columns: ColumnDef<RepoStat, unknown>[] = [
  { accessorKey: "repo", header: "Repository" },
  { accessorKey: "stars", header: "Stars" },
  { accessorKey: "forks", header: "Forks" },
  { accessorKey: "openPRs", header: "Open PRs" },
  { accessorKey: "openIssues", header: "Open Issues" },
  { accessorKey: "ciStatus", header: "CI", cell: ({ row }) => <Badge variant={ciVariant[row.original.ciStatus]}>{row.original.ciStatus}</Badge> },
];

export default function GithubAnalyticsDashboard() {
  const mock = isMockMode();
  return (
    <div>
      {mock && <MockDataBanner />}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {getGithubKpis().map((kpi) => <KpiCard key={kpi.label} kpi={kpi} />)}
      </div>
      <Card className="mt-6">
        <CardHeader>
          <div>
            <CardTitle>Repositories</CardTitle>
            <CardDescription>github.com/Celo-HaiTi - connect GITHUB_TOKEN for live stats</CardDescription>
          </div>
        </CardHeader>
        <CardContent><DataTable title="GitHub Repos" data={getRepoStats()} columns={columns} exportFilename="celoht-github-analytics" /></CardContent>
      </Card>
    </div>
  );
}

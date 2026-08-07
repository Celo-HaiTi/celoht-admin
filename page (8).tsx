import type { Metadata } from "next";
import type { ColumnDef } from "@tanstack/react-table";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { MockDataBanner } from "@/components/dashboard/mock-data-banner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/dashboard/data-table";
import { isMockMode } from "@/lib/data-source";
import { getGovernanceKpis, getProposals, type Proposal } from "@/lib/mock-data/governance";

export const metadata: Metadata = { title: "Governance" };

const statusVariant: Record<Proposal["status"], "success" | "info" | "danger" | "default"> = {
  Passed: "success",
  Active: "info",
  Rejected: "danger",
  Draft: "default",
};

const columns: ColumnDef<Proposal, unknown>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "title", header: "Proposal" },
  { accessorKey: "proposer", header: "Proposer" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge variant={statusVariant[row.original.status]}>{row.original.status}</Badge>,
  },
  { accessorKey: "votesFor", header: "For" },
  { accessorKey: "votesAgainst", header: "Against" },
  { accessorKey: "createdAt", header: "Created" },
];

export default function GovernanceDashboard() {
  const mock = isMockMode();
  const kpis = getGovernanceKpis();
  const proposals = getProposals();

  return (
    <div>
      {mock && <MockDataBanner />}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <div>
            <CardTitle>Structure</CardTitle>
            <CardDescription>CeloHT is community-governed, not founder-controlled</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            {["Foundation Director", "Maintainer Council", "Community Contributors"].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-3">
                <span className="rounded-md border border-[--card-border] bg-[--muted-bg] px-3 py-1.5">{step}</span>
                {i < arr.length - 1 && <span className="text-[--muted]">→</span>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <div>
            <CardTitle>Proposals</CardTitle>
            <CardDescription>Governance voting history and active items</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable title="Governance Proposals" data={proposals} columns={columns} exportFilename="celoht-governance-proposals" />
        </CardContent>
      </Card>
    </div>
  );
}

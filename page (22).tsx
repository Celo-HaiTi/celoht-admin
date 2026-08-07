import type { Metadata } from "next";
import type { ColumnDef } from "@tanstack/react-table";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { MockDataBanner } from "@/components/dashboard/mock-data-banner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/dashboard/data-table";
import { isMockMode } from "@/lib/data-source";
import { getAgentNetworkKpis, getAgents, type Agent } from "@/lib/mock-data/agent-network";
import { formatUSD } from "@/lib/utils/format";

export const metadata: Metadata = { title: "Agent Network" };

const statusVariant: Record<Agent["status"], "success" | "gold" | "default"> = {
  Active: "success",
  Training: "gold",
  Inactive: "default",
};

const columns: ColumnDef<Agent, unknown>[] = [
  { accessorKey: "name", header: "Agent" },
  { accessorKey: "region", header: "Region" },
  { accessorKey: "walletsOnboarded", header: "Wallets Onboarded" },
  { accessorKey: "volumeUsd", header: "Volume (30d)", cell: ({ row }) => formatUSD(row.original.volumeUsd) },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <Badge variant={statusVariant[row.original.status]}>{row.original.status}</Badge> },
];

export default function AgentNetworkDashboard() {
  const mock = isMockMode();
  return (
    <div>
      {mock && <MockDataBanner />}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {getAgentNetworkKpis().map((kpi) => <KpiCard key={kpi.label} kpi={kpi} />)}
      </div>
      <Card className="mt-6">
        <CardHeader><div><CardTitle>Agents</CardTitle><CardDescription>Cash↔cUSD conversion, wallet onboarding, community liquidity</CardDescription></div></CardHeader>
        <CardContent><DataTable title="Agent Network" data={getAgents()} columns={columns} exportFilename="celoht-agent-network" /></CardContent>
      </Card>
    </div>
  );
}

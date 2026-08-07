import type { Metadata } from "next";
import type { ColumnDef } from "@tanstack/react-table";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { MockDataBanner } from "@/components/dashboard/mock-data-banner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/dashboard/data-table";
import { isMockMode } from "@/lib/data-source";
import { getBlockchainKpis, getChainTransactions, type ChainTx } from "@/lib/mock-data/blockchain-analytics";
import { formatCUSD } from "@/lib/utils/format";

export const metadata: Metadata = { title: "Blockchain Analytics" };

const columns: ColumnDef<ChainTx, unknown>[] = [
  { accessorKey: "hash", header: "Tx Hash", cell: ({ row }) => <span className="tabular text-xs">{row.original.hash}</span> },
  { accessorKey: "type", header: "Type", cell: ({ row }) => <Badge variant="info">{row.original.type}</Badge> },
  { accessorKey: "amountCUsd", header: "Amount", cell: ({ row }) => formatCUSD(row.original.amountCUsd) },
  { accessorKey: "blockHeight", header: "Block" },
  { accessorKey: "timestamp", header: "Date" },
];

export default function BlockchainAnalyticsDashboard() {
  const mock = isMockMode();
  return (
    <div>
      {mock && <MockDataBanner />}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {getBlockchainKpis().map((kpi) => <KpiCard key={kpi.label} kpi={kpi} />)}
      </div>
      <Card className="mt-6">
        <CardHeader>
          <div>
            <CardTitle>Recent transactions</CardTitle>
            <CardDescription>Placeholder identifiers — connect NEXT_PUBLIC_CELO_RPC_URL for live chain data</CardDescription>
          </div>
        </CardHeader>
        <CardContent><DataTable title="Blockchain Transactions" data={getChainTransactions()} columns={columns} exportFilename="celoht-blockchain-tx" /></CardContent>
      </Card>
    </div>
  );
}

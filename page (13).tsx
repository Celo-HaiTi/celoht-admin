import type { Metadata } from "next";
import type { ColumnDef } from "@tanstack/react-table";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { MockDataBanner } from "@/components/dashboard/mock-data-banner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/dashboard/data-table";
import { TrendChart } from "@/components/charts/trend-chart";
import { isMockMode } from "@/lib/data-source";
import { getWalletKpis, getWalletTrend, getWalletCohorts, type WalletCohort } from "@/lib/mock-data/wallet-analytics";
import { formatUSDm } from "@/lib/utils/format";

export const metadata: Metadata = { title: "Wallet Analytics" };

const columns: ColumnDef<WalletCohort, unknown>[] = [
  { accessorKey: "cohort", header: "Cohort" },
  { accessorKey: "wallets", header: "Wallets" },
  { accessorKey: "avgBalanceUsdm", header: "Avg. Balance", cell: ({ row }) => formatUSDm(row.original.avgBalanceUsdm) },
  { accessorKey: "activeLast30d", header: "Active (30d)" },
];

export default function WalletAnalyticsDashboard() {
  const mock = isMockMode();
  return (
    <div>
      {mock && <MockDataBanner />}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {getWalletKpis().map((kpi) => <KpiCard key={kpi.label} kpi={kpi} />)}
      </div>
      <Card className="mt-6">
        <CardHeader><div><CardTitle>Wallet growth</CardTitle><CardDescription>Cumulative wallets onboarded</CardDescription></div></CardHeader>
        <CardContent><TrendChart data={getWalletTrend()} /></CardContent>
      </Card>
      <Card className="mt-4">
        <CardHeader><div><CardTitle>By cohort</CardTitle><CardDescription>Students, merchants, farmers, agents, community</CardDescription></div></CardHeader>
        <CardContent><DataTable title="Wallet Cohorts" data={getWalletCohorts()} columns={columns} exportFilename="celoht-wallet-analytics" /></CardContent>
      </Card>
    </div>
  );
}

"use client";

import type { Metadata } from "next";
import type { ColumnDef } from "@tanstack/react-table";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { MockDataBanner } from "@/components/dashboard/mock-data-banner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendChart } from "@/components/charts/trend-chart";
import { DataTable } from "@/components/dashboard/data-table";
import { isMockMode } from "@/lib/data-source";
import { getTreasuryKpis, getTreasuryTrend, getTreasuryTransactions, type TreasuryTx } from "@/lib/mock-data/treasury";
import { formatUSD } from "@/lib/utils/format";

export const metadata: Metadata = { title: "Treasury" };

const columns: ColumnDef<TreasuryTx, unknown>[] = [
  { accessorKey: "id", header: "TX ID" },
  { accessorKey: "date", header: "Date" },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant={row.original.type === "Inflow" ? "success" : "default"}>{row.original.type}</Badge>
    ),
  },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "description", header: "Description" },
  {
    accessorKey: "amountUsd",
    header: "Amount",
    cell: ({ row }) => formatUSD(row.original.amountUsd),
  },
  { accessorKey: "currency", header: "Currency" },
];

export default function TreasuryDashboard() {
  const mock = isMockMode();
  const kpis = getTreasuryKpis();
  const trend = getTreasuryTrend();
  const txs = getTreasuryTransactions();

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
            <CardTitle>Balance over time</CardTitle>
            <CardDescription>Combined USD-equivalent treasury balance</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <TrendChart data={trend} valueFormatter={(v) => formatUSD(v)} />
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <div>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>All inflows and outflows, searchable and exportable</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable title="Treasury Transactions" data={txs} columns={columns} exportFilename="celoht-treasury-transactions" />
        </CardContent>
      </Card>
    </div>
  );
}

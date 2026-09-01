"use client";

import type { Metadata } from "next";
import type { ColumnDef } from "@tanstack/react-table";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { MockDataBanner } from "@/components/dashboard/mock-data-banner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/dashboard/data-table";
import { TrendChart } from "@/components/charts/trend-chart";
import { CategoryBarChart } from "@/components/charts/category-bar-chart";
import { isMockMode } from "@/lib/data-source";
import { getRevenueKpis, getRevenueTrend, getRevenueBySource, getRevenueEntries, type RevenueEntry } from "@/lib/mock-data/revenue";
import { formatUSD } from "@/lib/utils/format";

export const metadata: Metadata = { title: "Revenue" };

const columns: ColumnDef<RevenueEntry, unknown>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "source", header: "Source" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "amountUsd", header: "Amount", cell: ({ row }) => formatUSD(row.original.amountUsd) },
  { accessorKey: "date", header: "Date" },
];

export default function RevenueDashboard() {
  const mock = isMockMode();
  return (
    <div>
      {mock && <MockDataBanner />}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {getRevenueKpis().map((kpi) => <KpiCard key={kpi.label} kpi={kpi} />)}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><div><CardTitle>Revenue trend</CardTitle><CardDescription>Monthly, USD-equivalent</CardDescription></div></CardHeader>
          <CardContent><TrendChart data={getRevenueTrend()} valueFormatter={(v) => formatUSD(v)} /></CardContent>
        </Card>
        <Card>
          <CardHeader><div><CardTitle>By source</CardTitle><CardDescription>Share of total revenue</CardDescription></div></CardHeader>
          <CardContent><CategoryBarChart data={getRevenueBySource()} valueFormatter={(v) => `${v}%`} /></CardContent>
        </Card>
      </div>
      <Card className="mt-4">
        <CardHeader><div><CardTitle>Revenue entries</CardTitle><CardDescription>All recognized revenue, by source and category</CardDescription></div></CardHeader>
        <CardContent><DataTable title="Revenue" data={getRevenueEntries()} columns={columns} exportFilename="celoht-revenue" /></CardContent>
      </Card>
    </div>
  );
}

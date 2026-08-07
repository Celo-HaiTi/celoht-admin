import type { Metadata } from "next";
import type { ColumnDef } from "@tanstack/react-table";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { MockDataBanner } from "@/components/dashboard/mock-data-banner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/dashboard/data-table";
import { TrendChart } from "@/components/charts/trend-chart";
import { CategoryBarChart } from "@/components/charts/category-bar-chart";
import { isMockMode } from "@/lib/data-source";
import { getExpensesKpis, getExpensesTrend, getExpensesByCategory, getExpenses, type Expense } from "@/lib/mock-data/expenses";
import { formatUSD } from "@/lib/utils/format";

export const metadata: Metadata = { title: "Expenses" };

const columns: ColumnDef<Expense, unknown>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "vendor", header: "Vendor" },
  { accessorKey: "amountUsd", header: "Amount", cell: ({ row }) => formatUSD(row.original.amountUsd) },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "approvedBy", header: "Approved By", cell: ({ row }) => <Badge variant={row.original.approvedBy === "Director" ? "gold" : "default"}>{row.original.approvedBy}</Badge> },
];

export default function ExpensesDashboard() {
  const mock = isMockMode();
  return (
    <div>
      {mock && <MockDataBanner />}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {getExpensesKpis().map((kpi) => <KpiCard key={kpi.label} kpi={kpi} />)}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><div><CardTitle>Spend trend</CardTitle><CardDescription>Monthly, USD-equivalent</CardDescription></div></CardHeader>
          <CardContent><TrendChart data={getExpensesTrend()} color="#c14444" valueFormatter={(v) => formatUSD(v)} /></CardContent>
        </Card>
        <Card>
          <CardHeader><div><CardTitle>By category</CardTitle><CardDescription>Share of total spend</CardDescription></div></CardHeader>
          <CardContent><CategoryBarChart data={getExpensesByCategory()} valueFormatter={(v) => `${v}%`} /></CardContent>
        </Card>
      </div>
      <Card className="mt-4">
        <CardHeader><div><CardTitle>Expense ledger</CardTitle><CardDescription>All program and operational spend</CardDescription></div></CardHeader>
        <CardContent><DataTable title="Expenses" data={getExpenses()} columns={columns} exportFilename="celoht-expenses" /></CardContent>
      </Card>
    </div>
  );
}

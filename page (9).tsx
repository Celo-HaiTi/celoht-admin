"use client";

import type { Metadata } from "next";
import type { ColumnDef } from "@tanstack/react-table";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { MockDataBanner } from "@/components/dashboard/mock-data-banner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/dashboard/data-table";
import { isMockMode } from "@/lib/data-source";
import { getRiskKpis, getRisks, type RiskItem } from "@/lib/mock-data/risk";

export const metadata: Metadata = { title: "Risk" };

const sevVariant: Record<RiskItem["severity"], "danger" | "gold" | "info" | "default"> = {
  Critical: "danger",
  High: "gold",
  Medium: "info",
  Low: "default",
};
const statusVariant: Record<RiskItem["mitigationStatus"], "danger" | "gold" | "success"> = {
  Open: "danger",
  Mitigating: "gold",
  Mitigated: "success",
};

const columns: ColumnDef<RiskItem, unknown>[] = [
  { accessorKey: "title", header: "Risk" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "severity", header: "Severity", cell: ({ row }) => <Badge variant={sevVariant[row.original.severity]}>{row.original.severity}</Badge> },
  { accessorKey: "mitigationStatus", header: "Status", cell: ({ row }) => <Badge variant={statusVariant[row.original.mitigationStatus]}>{row.original.mitigationStatus}</Badge> },
  { accessorKey: "owner", header: "Owner" },
];

export default function RiskDashboard() {
  const mock = isMockMode();
  return (
    <div>
      {mock && <MockDataBanner />}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {getRiskKpis().map((kpi) => <KpiCard key={kpi.label} kpi={kpi} />)}
      </div>
      <Card className="mt-6">
        <CardHeader><div><CardTitle>Risk register</CardTitle><CardDescription>Financial, operational, security, regulatory, reputational</CardDescription></div></CardHeader>
        <CardContent><DataTable title="Risk Register" data={getRisks()} columns={columns} exportFilename="celoht-risk-register" /></CardContent>
      </Card>
    </div>
  );
}

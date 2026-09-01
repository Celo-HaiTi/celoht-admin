"use client";

import type { Metadata } from "next";
import type { ColumnDef } from "@tanstack/react-table";
import { MockDataBanner } from "@/components/dashboard/mock-data-banner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/dashboard/data-table";
import { isMockMode } from "@/lib/data-source";
import { getKpiTargets, type KpiTarget } from "@/lib/mock-data/kpi";

export const metadata: Metadata = { title: "KPI" };

const columns: ColumnDef<KpiTarget, unknown>[] = [
  { accessorKey: "metric", header: "Metric" },
  { accessorKey: "pillar", header: "Pillar" },
  { accessorKey: "target", header: "Target", cell: ({ row }) => `${row.original.target} ${row.original.unit}` },
  { accessorKey: "actual", header: "Actual", cell: ({ row }) => `${row.original.actual} ${row.original.unit}` },
  {
    id: "progress",
    header: "Progress",
    cell: ({ row }) => {
      const pct = Math.round((row.original.actual / row.original.target) * 100);
      return (
        <Badge variant={pct >= 90 ? "success" : pct >= 60 ? "gold" : "danger"}>
          {pct}%
        </Badge>
      );
    },
  },
];

export default function KpiDashboard() {
  const mock = isMockMode();
  return (
    <div>
      {mock && <MockDataBanner />}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Organization-wide KPI targets</CardTitle>
            <CardDescription>Target vs. actual across Education, Agent Network, Reforestation, and Governance</CardDescription>
          </div>
        </CardHeader>
        <CardContent><DataTable title="KPI Targets" data={getKpiTargets()} columns={columns} exportFilename="celoht-kpi-targets" /></CardContent>
      </Card>
    </div>
  );
}

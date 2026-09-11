"use client";

import type { Metadata } from "next";
import type { ColumnDef } from "@tanstack/react-table";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { MockDataBanner } from "@/components/dashboard/mock-data-banner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/dashboard/data-table";
import { isMockMode } from "@/lib/data-source";
import { getCommunityKpis, getRegionCommunities, type RegionCommunity } from "@/lib/mock-data/community";
import { formatPercent } from "@/lib/utils/format";

export const metadata: Metadata = { title: "Community" };

const columns: ColumnDef<RegionCommunity, unknown>[] = [
  { accessorKey: "country", header: "Country" },
  { accessorKey: "coordinator", header: "Coordinator" },
  { accessorKey: "members", header: "Members" },
  { accessorKey: "growthPercent", header: "Growth", cell: ({ row }) => formatPercent(row.original.growthPercent) },
];

export default function CommunityDashboard() {
  const mock = isMockMode();
  return (
    <div>
      {mock && <MockDataBanner />}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {getCommunityKpis().map((kpi) => <KpiCard key={kpi.label} kpi={kpi} />)}
      </div>
      <Card className="mt-6">
        <CardHeader><div><CardTitle>Communities by country</CardTitle><CardDescription>Members and regional coordinators</CardDescription></div></CardHeader>
        <CardContent><DataTable title="Community" data={getRegionCommunities()} columns={columns} exportFilename="celoht-community" /></CardContent>
      </Card>
    </div>
  );
}

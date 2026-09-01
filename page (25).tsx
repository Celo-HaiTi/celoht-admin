"use client";

import type { Metadata } from "next";
import type { ColumnDef } from "@tanstack/react-table";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { MockDataBanner } from "@/components/dashboard/mock-data-banner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/dashboard/data-table";
import { isMockMode } from "@/lib/data-source";
import { getVolunteersKpis, getVolunteers, type Volunteer } from "@/lib/mock-data/volunteers";

export const metadata: Metadata = { title: "Volunteers" };

const columns: ColumnDef<Volunteer, unknown>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "focusArea", header: "Focus Area" },
  { accessorKey: "hoursContributed", header: "Hours" },
  { accessorKey: "joinedAt", header: "Joined" },
  { accessorKey: "active", header: "Status", cell: ({ row }) => <Badge variant={row.original.active ? "success" : "default"}>{row.original.active ? "Active" : "Inactive"}</Badge> },
];

export default function VolunteersDashboard() {
  const mock = isMockMode();
  return (
    <div>
      {mock && <MockDataBanner />}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {getVolunteersKpis().map((kpi) => <KpiCard key={kpi.label} kpi={kpi} />)}
      </div>
      <Card className="mt-6">
        <CardHeader><div><CardTitle>Volunteer roster</CardTitle><CardDescription>Focus area, hours, and status</CardDescription></div></CardHeader>
        <CardContent><DataTable title="Volunteers" data={getVolunteers()} columns={columns} exportFilename="celoht-volunteers" /></CardContent>
      </Card>
    </div>
  );
}

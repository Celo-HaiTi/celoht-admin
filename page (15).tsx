import type { Metadata } from "next";
import type { ColumnDef } from "@tanstack/react-table";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { MockDataBanner } from "@/components/dashboard/mock-data-banner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/dashboard/data-table";
import { isMockMode } from "@/lib/data-source";
import { getPartnershipsKpis, getPartnerships, type Partnership } from "@/lib/mock-data/partnerships";

export const metadata: Metadata = { title: "Partnerships" };

const statusVariant: Record<Partnership["status"], "success" | "gold" | "info" | "default"> = {
  Active: "success",
  "MoU Signed": "gold",
  "In Discussion": "info",
  Concluded: "default",
};

const columns: ColumnDef<Partnership, unknown>[] = [
  { accessorKey: "partner", header: "Partner" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <Badge variant={statusVariant[row.original.status]}>{row.original.status}</Badge> },
  { accessorKey: "since", header: "Since" },
];

export default function PartnershipsDashboard() {
  const mock = isMockMode();
  return (
    <div>
      {mock && <MockDataBanner />}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {getPartnershipsKpis().map((kpi) => <KpiCard key={kpi.label} kpi={kpi} />)}
      </div>
      <Card className="mt-6">
        <CardHeader>
          <div>
            <CardTitle>Partnerships</CardTitle>
            <CardDescription>Including FreClean — a planned future partner, currently in discussion, not yet formalized</CardDescription>
          </div>
        </CardHeader>
        <CardContent><DataTable title="Partnerships" data={getPartnerships()} columns={columns} exportFilename="celoht-partnerships" /></CardContent>
      </Card>
    </div>
  );
}

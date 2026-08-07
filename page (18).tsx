import type { Metadata } from "next";
import type { ColumnDef } from "@tanstack/react-table";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { MockDataBanner } from "@/components/dashboard/mock-data-banner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/dashboard/data-table";
import { isMockMode } from "@/lib/data-source";
import { getReforestationKpis, getPlantingSites, type PlantingSite } from "@/lib/mock-data/reforestation";

export const metadata: Metadata = { title: "Reforestation" };

const statusVariant: Record<PlantingSite["status"], "success" | "info" | "default"> = {
  "Pilot Active": "success",
  Monitoring: "info",
  Planned: "default",
};

const columns: ColumnDef<PlantingSite, unknown>[] = [
  { accessorKey: "location", header: "Location" },
  { accessorKey: "treesPlanted", header: "Trees Planted" },
  { accessorKey: "survivalRate", header: "Survival Rate", cell: ({ row }) => `${row.original.survivalRate}%` },
  { accessorKey: "volunteersEngaged", header: "Volunteers" },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <Badge variant={statusVariant[row.original.status]}>{row.original.status}</Badge> },
];

export default function ReforestationDashboard() {
  const mock = isMockMode();
  return (
    <div>
      {mock && <MockDataBanner />}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {getReforestationKpis().map((kpi) => <KpiCard key={kpi.label} kpi={kpi} />)}
      </div>
      <Card className="mt-6">
        <CardHeader>
          <div>
            <CardTitle>Planting sites</CardTitle>
            <CardDescription>Reforestation is in design and pilot phase — figures reflect pilot scale, not full operation</CardDescription>
          </div>
        </CardHeader>
        <CardContent><DataTable title="Reforestation" data={getPlantingSites()} columns={columns} exportFilename="celoht-reforestation" /></CardContent>
      </Card>
    </div>
  );
}

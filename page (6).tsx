import type { Metadata } from "next";
import type { ColumnDef } from "@tanstack/react-table";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { MockDataBanner } from "@/components/dashboard/mock-data-banner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/dashboard/data-table";
import { isMockMode } from "@/lib/data-source";
import { getGrantsKpis, getGrants, type Grant } from "@/lib/mock-data/grants";
import { formatUSD } from "@/lib/utils/format";

export const metadata: Metadata = { title: "Grants" };

const statusVariant: Record<Grant["status"], "success" | "gold" | "info" | "danger"> = {
  Awarded: "success",
  "Under Review": "gold",
  Applied: "info",
  Declined: "danger",
};

const columns: ColumnDef<Grant, unknown>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "grantor", header: "Grantor" },
  { accessorKey: "program", header: "Program" },
  { accessorKey: "amountUsd", header: "Amount", cell: ({ row }) => formatUSD(row.original.amountUsd) },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <Badge variant={statusVariant[row.original.status]}>{row.original.status}</Badge> },
  { accessorKey: "submittedAt", header: "Submitted" },
];

export default function GrantsDashboard() {
  const mock = isMockMode();
  return (
    <div>
      {mock && <MockDataBanner />}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {getGrantsKpis().map((kpi) => <KpiCard key={kpi.label} kpi={kpi} />)}
      </div>
      <Card className="mt-6">
        <CardHeader>
          <div>
            <CardTitle>Grant pipeline</CardTitle>
            <CardDescription>Applications, awards, and status by program</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable title="Grants" data={getGrants()} columns={columns} exportFilename="celoht-grants" />
        </CardContent>
      </Card>
    </div>
  );
}

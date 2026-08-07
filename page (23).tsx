import type { Metadata } from "next";
import type { ColumnDef } from "@tanstack/react-table";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { MockDataBanner } from "@/components/dashboard/mock-data-banner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/dashboard/data-table";
import { isMockMode } from "@/lib/data-source";
import { getReportsKpis, getReports, type ReportItem } from "@/lib/mock-data/reports";

export const metadata: Metadata = { title: "Reports" };

const columns: ColumnDef<ReportItem, unknown>[] = [
  { accessorKey: "title", header: "Report" },
  { accessorKey: "type", header: "Type", cell: ({ row }) => <Badge variant="info">{row.original.type}</Badge> },
  { accessorKey: "period", header: "Period" },
  { accessorKey: "publishedAt", header: "Published" },
];

export default function ReportsDashboard() {
  const mock = isMockMode();
  return (
    <div>
      {mock && <MockDataBanner />}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {getReportsKpis().map((kpi) => <KpiCard key={kpi.label} kpi={kpi} />)}
      </div>
      <Card className="mt-6">
        <CardHeader>
          <div>
            <CardTitle>Published reports</CardTitle>
            <CardDescription>Monthly, quarterly, annual, governance, financial, and impact reports — export via the button on each table</CardDescription>
          </div>
        </CardHeader>
        <CardContent><DataTable title="Reports" data={getReports()} columns={columns} exportFilename="celoht-reports-index" /></CardContent>
      </Card>
    </div>
  );
}

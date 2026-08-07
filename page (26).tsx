import type { Metadata } from "next";
import type { ColumnDef } from "@tanstack/react-table";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { MockDataBanner } from "@/components/dashboard/mock-data-banner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/dashboard/data-table";
import { isMockMode } from "@/lib/data-source";
import { getSecurityKpis, getSecurityAlerts, type SecurityAlert } from "@/lib/mock-data/security";

export const metadata: Metadata = { title: "Security" };

const sevVariant: Record<SecurityAlert["severity"], "danger" | "gold" | "info" | "default"> = {
  Critical: "danger",
  High: "gold",
  Medium: "info",
  Low: "default",
};

const columns: ColumnDef<SecurityAlert, unknown>[] = [
  { accessorKey: "title", header: "Alert" },
  { accessorKey: "severity", header: "Severity", cell: ({ row }) => <Badge variant={sevVariant[row.original.severity]}>{row.original.severity}</Badge> },
  { accessorKey: "source", header: "Source" },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <Badge variant={row.original.status === "Open" ? "danger" : "success"}>{row.original.status}</Badge> },
  { accessorKey: "detectedAt", header: "Detected" },
];

export default function SecurityDashboard() {
  const mock = isMockMode();
  return (
    <div>
      {mock && <MockDataBanner />}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {getSecurityKpis().map((kpi) => <KpiCard key={kpi.label} kpi={kpi} />)}
      </div>
      <Card className="mt-6">
        <CardHeader><div><CardTitle>Alerts</CardTitle><CardDescription>Dependabot, CodeQL, and manual review findings</CardDescription></div></CardHeader>
        <CardContent><DataTable title="Security Alerts" data={getSecurityAlerts()} columns={columns} exportFilename="celoht-security-alerts" /></CardContent>
      </Card>
    </div>
  );
}

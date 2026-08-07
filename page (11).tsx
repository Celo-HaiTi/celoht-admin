import type { Metadata } from "next";
import type { ColumnDef } from "@tanstack/react-table";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { MockDataBanner } from "@/components/dashboard/mock-data-banner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/dashboard/data-table";
import { isMockMode } from "@/lib/data-source";
import { getAuditKpis, getAuditLog } from "@/lib/mock-data/audit";
import type { AuditLogEntry } from "@/types";

export const metadata: Metadata = { title: "Audit" };

const columns: ColumnDef<AuditLogEntry, unknown>[] = [
  { accessorKey: "actorEmail", header: "Actor" },
  { accessorKey: "action", header: "Action" },
  { accessorKey: "target", header: "Target" },
  { accessorKey: "timestamp", header: "Timestamp" },
];

export default function AuditDashboard() {
  const mock = isMockMode();
  return (
    <div>
      {mock && <MockDataBanner />}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {getAuditKpis().map((kpi) => <KpiCard key={kpi.label} kpi={kpi} />)}
      </div>
      <Card className="mt-6">
        <CardHeader><div><CardTitle>Audit log</CardTitle><CardDescription>Every administrative action, who did it, and when</CardDescription></div></CardHeader>
        <CardContent><DataTable title="Audit Log" data={getAuditLog()} columns={columns} exportFilename="celoht-audit-log" /></CardContent>
      </Card>
    </div>
  );
}

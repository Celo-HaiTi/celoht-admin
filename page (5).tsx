import type { Metadata } from "next";
import type { ColumnDef } from "@tanstack/react-table";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { MockDataBanner } from "@/components/dashboard/mock-data-banner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/dashboard/data-table";
import { isMockMode } from "@/lib/data-source";
import { getAmbassadorsKpis, getAmbassadors, type Ambassador } from "@/lib/mock-data/ambassadors";

export const metadata: Metadata = { title: "Ambassadors" };

const tierVariant: Record<Ambassador["tier"], "gold" | "info" | "default"> = {
  Core: "gold",
  Regional: "info",
  Campus: "default",
};

const columns: ColumnDef<Ambassador, unknown>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "region", header: "Region" },
  { accessorKey: "tier", header: "Tier", cell: ({ row }) => <Badge variant={tierVariant[row.original.tier]}>{row.original.tier}</Badge> },
  { accessorKey: "eventsHosted", header: "Events Hosted" },
  { accessorKey: "referrals", header: "Referrals" },
];

export default function AmbassadorsDashboard() {
  const mock = isMockMode();
  return (
    <div>
      {mock && <MockDataBanner />}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {getAmbassadorsKpis().map((kpi) => <KpiCard key={kpi.label} kpi={kpi} />)}
      </div>
      <Card className="mt-6">
        <CardHeader><div><CardTitle>Ambassador roster</CardTitle><CardDescription>Region, tier, events, and referrals</CardDescription></div></CardHeader>
        <CardContent><DataTable title="Ambassadors" data={getAmbassadors()} columns={columns} exportFilename="celoht-ambassadors" /></CardContent>
      </Card>
    </div>
  );
}

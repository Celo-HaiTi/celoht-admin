import type { Metadata } from "next";
import type { ColumnDef } from "@tanstack/react-table";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { MockDataBanner } from "@/components/dashboard/mock-data-banner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/dashboard/data-table";
import { isMockMode } from "@/lib/data-source";
import { getDonationKpis, getDonations, type Donation } from "@/lib/mock-data/donations";
import { formatUSD } from "@/lib/utils/format";

export const metadata: Metadata = { title: "Donations" };

const columns: ColumnDef<Donation, unknown>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "donor", header: "Donor" },
  { accessorKey: "amountUsd", header: "Amount", cell: ({ row }) => formatUSD(row.original.amountUsd) },
  { accessorKey: "channel", header: "Channel" },
  { accessorKey: "date", header: "Date" },
  {
    accessorKey: "recurring",
    header: "Recurring",
    cell: ({ row }) => (
      <Badge variant={row.original.recurring ? "gold" : "default"}>
        {row.original.recurring ? "Recurring" : "One-time"}
      </Badge>
    ),
  },
];

export default function DonationsDashboard() {
  const mock = isMockMode();
  const kpis = getDonationKpis();
  const donations = getDonations();

  return (
    <div>
      {mock && <MockDataBanner />}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <div>
            <CardTitle>Donation ledger</CardTitle>
            <CardDescription>By donor, channel, and recurrence</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable title="Donations" data={donations} columns={columns} exportFilename="celoht-donations" />
        </CardContent>
      </Card>
    </div>
  );
}

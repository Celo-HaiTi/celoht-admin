"use client";

import type { Metadata } from "next";
import { MockDataBanner } from "@/components/dashboard/mock-data-banner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CategoryBarChart } from "@/components/charts/category-bar-chart";
import { isMockMode } from "@/lib/data-source";
import { getFundAllocation, getComplianceChecklist, getRecentDisclosures } from "@/lib/mock-data/transparency";

export const metadata: Metadata = { title: "Transparency" };

const statusVariant = {
  Complete: "success",
  "In progress": "gold",
  Planned: "default",
} as const;

export default function TransparencyDashboard() {
  const mock = isMockMode();
  const allocation = getFundAllocation();
  const checklist = getComplianceChecklist();
  const disclosures = getRecentDisclosures();

  return (
    <div>
      {mock && <MockDataBanner />}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Fund allocation by pillar</CardTitle>
              <CardDescription>Percentage of total spend, current period</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <CategoryBarChart data={allocation} valueFormatter={(v) => `${v}%`} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Compliance checklist</CardTitle>
              <CardDescription>Apache 2.0, No Token Policy, financial review</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {checklist.map((c) => (
                <li key={c.item} className="flex items-center justify-between rounded-md border border-[--card-border] px-3 py-2 text-sm">
                  <span>{c.item}</span>
                  <Badge variant={statusVariant[c.status]}>{c.status}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <div>
            <CardTitle>Recent disclosures</CardTitle>
            <CardDescription>Public record of governance and financial updates</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-[--card-border]">
            {disclosures.map((d) => (
              <li key={d.id} className="flex items-center justify-between py-2 text-sm">
                <span>{d.title}</span>
                <span className="tabular text-[--muted]">{d.date}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

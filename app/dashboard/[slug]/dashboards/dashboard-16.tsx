"use client";

import type { Metadata } from "next";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { MockDataBanner } from "@/components/dashboard/mock-data-banner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CategoryBarChart } from "@/components/charts/category-bar-chart";
import { isMockMode } from "@/lib/data-source";
import { getImpactKpis, getImpactByPillar } from "@/lib/mock-data/impact";

export const metadata: Metadata = { title: "Impact" };

export default function ImpactDashboard() {
  const mock = isMockMode();
  return (
    <div>
      {mock && <MockDataBanner />}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {getImpactKpis().map((kpi) => <KpiCard key={kpi.label} kpi={kpi} />)}
      </div>
      <Card className="mt-6">
        <CardHeader>
          <div>
            <CardTitle>People reached by pillar</CardTitle>
            <CardDescription>Education · Agent Network · Reforestation - measurable outcomes, not projections</CardDescription>
          </div>
        </CardHeader>
        <CardContent><CategoryBarChart data={getImpactByPillar()} /></CardContent>
      </Card>
    </div>
  );
}

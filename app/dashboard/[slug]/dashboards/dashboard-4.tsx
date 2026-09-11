"use client";

import type { Metadata } from "next";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { MockDataBanner } from "@/components/dashboard/mock-data-banner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TrendChart } from "@/components/charts/trend-chart";
import { CategoryBarChart } from "@/components/charts/category-bar-chart";
import { isMockMode } from "@/lib/data-source";
import { getExecutiveKpis, getGrowthTrend, getPillarBreakdown } from "@/lib/mock-data/executive";

export const metadata: Metadata = { title: "Executive" };

export default function ExecutiveDashboard() {
  const mock = isMockMode();
  const kpis = getExecutiveKpis();
  const trend = getGrowthTrend();
  const pillars = getPillarBreakdown();

  return (
    <div>
      {mock && <MockDataBanner />}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Ecosystem growth</CardTitle>
              <CardDescription>Wallets onboarded, cumulative</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <TrendChart data={trend} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Budget by pillar</CardTitle>
              <CardDescription>Education · Agent Network · Reforestation</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <CategoryBarChart data={pillars} valueFormatter={(v) => `${v}%`} />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <div>
            <CardTitle>Roadmap status</CardTitle>
            <CardDescription>Phase 1 Foundation (2026 Q2–Q3) is complete</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ol className="grid gap-3 sm:grid-cols-4">
            {[
              { phase: "Phase 1 · Foundation", window: "2026 Q2–Q3", status: "Complete" },
              { phase: "Phase 2 · Validation", window: "2026 Q4–2027 Q1", status: "In progress" },
              { phase: "Phase 3 · Growth", window: "2027", status: "Planned" },
              { phase: "Phase 4 · Maturity", window: "2028+", status: "Planned" },
            ].map((p) => (
              <li key={p.phase} className="rounded-md border border-[--card-border] p-3">
                <p className="text-sm font-medium">{p.phase}</p>
                <p className="text-xs text-[--muted]">{p.window}</p>
                <p
                  className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    p.status === "Complete"
                      ? "bg-success-100 text-success-500"
                      : p.status === "In progress"
                        ? "bg-gold-100 text-gold-600"
                        : "bg-[--muted-bg] text-[--muted]"
                  }`}
                >
                  {p.status}
                </p>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}

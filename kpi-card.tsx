import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BarGlyph } from "@/components/dashboard/bar-glyph";
import { formatNumber, formatPercent, formatUSD, formatCUSD } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { KPI } from "@/types";

function formatValue(kpi: KPI): string {
  switch (kpi.format) {
    case "usd":
      return formatUSD(kpi.value, { compact: kpi.value >= 100_000 });
    case "cusd":
      return formatCUSD(kpi.value);
    case "percent":
      return `${kpi.value.toFixed(1)}%`;
    default:
      return formatNumber(kpi.value, kpi.value >= 10_000);
  }
}

export function KpiCard({ kpi }: { kpi: KPI }) {
  const positive = (kpi.delta ?? 0) >= 0;
  return (
    <Card className="overflow-hidden p-5">
      <p className="text-sm text-[--muted]">{kpi.label}</p>
      <p className="tabular mt-2 font-display text-2xl font-semibold">{formatValue(kpi)}</p>
      {kpi.delta !== undefined && (
        <div
          className={cn(
            "mt-2 inline-flex items-center gap-1 text-xs font-medium",
            positive ? "text-success-500" : "text-danger-500",
          )}
        >
          {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          <span className="tabular">{formatPercent(kpi.delta)}</span>
          {kpi.deltaLabel && <span className="text-[--muted]">{kpi.deltaLabel}</span>}
        </div>
      )}
      <BarGlyph className="bar-glyph text-navy-900 dark:text-gold-300" />
    </Card>
  );
}

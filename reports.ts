import { seededRandom, seededRange } from "./seed";
import type { KPI } from "@/types";

/** MOCK_REPORTS_DATA - seeded placeholder. Real "download" actions should
 *  call the same export pipeline (src/lib/utils/export.ts) against live
 *  Supabase queries scoped to the report's period. */
export interface ReportItem {
  id: string;
  title: string;
  type: "Monthly" | "Quarterly" | "Annual" | "Governance" | "Financial" | "Impact";
  period: string;
  publishedAt: string;
}

const REPORT_TITLES: { title: string; type: ReportItem["type"] }[] = [
  { title: "July 2026 Treasury Snapshot", type: "Monthly" },
  { title: "Q2 2026 Transparency Report", type: "Quarterly" },
  { title: "Phase 1 Completion Summary", type: "Governance" },
  { title: "June 2026 Financial Statement", type: "Financial" },
  { title: "Reforestation Pilot Impact Note", type: "Impact" },
  { title: "Q3 2026 Governance Summary", type: "Governance" },
];

export function getReportsKpis(): KPI[] {
  return [
    { label: "Reports Published (YTD)", value: 9, format: "number", delta: 28.5 },
    { label: "Next Report Due", value: 12, format: "number" },
    { label: "Avg. Pages", value: 6, format: "number" },
    { label: "Formats Available", value: 3, format: "number" },
  ];
}

export function getReports(): ReportItem[] {
  const rand = seededRandom(48);
  return REPORT_TITLES.map((r, i) => {
    const month = seededRange(rand, 3, 8);
    const day = seededRange(rand, 1, 28);
    return {
      id: `MOCK-RPT-${1800 + i}`,
      title: r.title,
      type: r.type,
      period: `2026-${String(month).padStart(2, "0")}`,
      publishedAt: `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    };
  });
}

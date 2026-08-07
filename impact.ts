import type { KPI } from "@/types";

/** MOCK_IMPACT_DATA — seeded placeholder measurable-impact figures.
 *  Per CeloHT's AI content rule: lead with measurable impact, never
 *  investment framing. */
export function getImpactKpis(): KPI[] {
  return [
    { label: "People Reached", value: 4820, format: "number", delta: 13.4 },
    { label: "Financial Inclusion (wallets active)", value: 1360, format: "number", delta: 5.1 },
    { label: "Students Certified", value: 214, format: "number", delta: 9.1 },
    { label: "Trees Planted (pilot)", value: 1250, format: "number", delta: 3.0 },
    { label: "Est. CO₂ Offset (pilot)", value: 3.1, format: "number" },
    { label: "Women Entrepreneurs Reached", value: 210, format: "number", delta: 7.8 },
  ];
}

export function getImpactByPillar() {
  return [
    { label: "Education", value: 460 },
    { label: "Agent Network", value: 2140 },
    { label: "Reforestation", value: 1250 },
  ];
}

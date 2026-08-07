import { seededRandom, seededRange } from "./seed";

/** MOCK_TRANSPARENCY_DATA — seeded placeholder. This mirrors what a
 *  public transparency report would show; wire to real Supabase views
 *  before publishing externally. */
export function getFundAllocation() {
  return [
    { label: "Education", value: 38 },
    { label: "Agent Network", value: 27 },
    { label: "Reforestation", value: 19 },
    { label: "Operations", value: 11 },
    { label: "Tooling", value: 5 },
  ];
}

export function getComplianceChecklist() {
  return [
    { item: "Apache 2.0 license applied to all repos", status: "Complete" as const },
    { item: "No Token Policy statement published", status: "Complete" as const },
    { item: "Quarterly transparency report", status: "In progress" as const },
    { item: "Independent financial review", status: "Planned" as const },
    { item: "Annual impact report (2026)", status: "Planned" as const },
  ];
}

export function getRecentDisclosures() {
  const rand = seededRandom(61);
  const items = [
    "Published Phase 1 completion summary",
    "Disclosed Maintainer Council seat change",
    "Posted monthly treasury snapshot",
    "Updated Security Policy changelog",
  ];
  return items.map((title, i) => {
    const month = seededRange(rand, 3, 8);
    const day = seededRange(rand, 1, 28);
    return { id: `MOCK-DISC-${i}`, title, date: `2026-0${month}-${String(day).padStart(2, "0")}` };
  });
}

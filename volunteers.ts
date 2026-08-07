import { seededRandom, seededRange } from "./seed";
import type { KPI } from "@/types";

/** MOCK_VOLUNTEERS_DATA — seeded placeholder. */
export interface Volunteer {
  id: string;
  name: string;
  focusArea: "Education" | "Agent Network" | "Reforestation" | "Events";
  hoursContributed: number;
  joinedAt: string;
  active: boolean;
}

export function getVolunteersKpis(): KPI[] {
  return [
    { label: "Active Volunteers", value: 96, format: "number", delta: 9.0 },
    { label: "Hours Contributed (YTD)", value: 3120, format: "number", delta: 17.5 },
    { label: "New This Month", value: 11, format: "number" },
    { label: "Retention Rate", value: 78, format: "percent", delta: 2.1 },
  ];
}

export function getVolunteers(): Volunteer[] {
  const rand = seededRandom(72);
  const areas: Volunteer["focusArea"][] = ["Education", "Agent Network", "Reforestation", "Events"];
  const rows: Volunteer[] = [];
  for (let i = 0; i < 24; i++) {
    const month = seededRange(rand, 1, 7);
    const day = seededRange(rand, 1, 28);
    rows.push({
      id: `MOCK-VOL-${800 + i}`,
      name: `Placeholder Volunteer #${i + 1}`,
      focusArea: areas[seededRange(rand, 0, 3)]!,
      hoursContributed: seededRange(rand, 4, 220),
      joinedAt: `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      active: rand() > 0.2,
    });
  }
  return rows;
}

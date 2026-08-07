import { seededRandom, seededRange } from "./seed";
import type { KPI } from "@/types";

/** MOCK_REFORESTATION_DATA — seeded placeholder. CeloHT's reforestation
 *  pillar is still in design/pilot phase — figures here represent pilot
 *  scale, not full operation. Don't let this dashboard's polish imply
 *  the program is further along than it is; see docs/DATA_SOURCES.md. */
export interface PlantingSite {
  id: string;
  location: string;
  treesPlanted: number;
  survivalRate: number;
  volunteersEngaged: number;
  status: "Pilot Active" | "Monitoring" | "Planned";
}

const LOCATIONS = ["Léogâne Watershed A", "Léogâne Watershed B", "Coastal Buffer Zone", "School Grounds Pilot", "Community Farm Plot"];

export function getReforestationKpis(): KPI[] {
  return [
    { label: "Trees Planted (pilot)", value: 1250, format: "number", delta: 3.0 },
    { label: "Survival Rate", value: 74, format: "percent", delta: 1.2 },
    { label: "Active Pilot Sites", value: 3, format: "number" },
    { label: "Volunteers Engaged", value: 42, format: "number", delta: 5.0 },
  ];
}

export function getPlantingSites(): PlantingSite[] {
  const rand = seededRandom(75);
  const statuses: PlantingSite["status"][] = ["Pilot Active", "Monitoring", "Planned"];
  return LOCATIONS.map((location, i) => ({
    id: `MOCK-REF-${1000 + i}`,
    location,
    treesPlanted: seededRange(rand, 80, 480),
    survivalRate: seededRange(rand, 55, 88),
    volunteersEngaged: seededRange(rand, 4, 20),
    status: statuses[seededRange(rand, 0, 2)]!,
  }));
}

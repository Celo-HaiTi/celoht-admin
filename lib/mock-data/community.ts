import { seededRandom, seededRange } from "./seed";
import type { KPI } from "@/types";

/** MOCK_COMMUNITY_DATA - seeded placeholder. */
export interface RegionCommunity {
  id: string;
  country: string;
  members: number;
  coordinator: string;
  growthPercent: number;
}

const REGIONS = [
  { country: "Haiti", coordinator: "Léogâne Regional Team" },
  { country: "Dominican Republic", coordinator: "Cross-border Liaison" },
  { country: "United States (Diaspora)", coordinator: "Diaspora Coordinator" },
  { country: "Canada (Diaspora)", coordinator: "Diaspora Coordinator" },
  { country: "France (Diaspora)", coordinator: "Diaspora Coordinator" },
];

export function getCommunityKpis(): KPI[] {
  return [
    { label: "Total Members", value: 1840, format: "number", delta: 12.3 },
    { label: "Countries Represented", value: 5, format: "number" },
    { label: "Active This Month", value: 620, format: "number", delta: 8.7 },
    { label: "Regional Coordinators", value: 5, format: "number" },
  ];
}

export function getRegionCommunities(): RegionCommunity[] {
  const rand = seededRandom(71);
  return REGIONS.map((r, i) => ({
    id: `MOCK-COM-${700 + i}`,
    country: r.country,
    coordinator: r.coordinator,
    members: seededRange(rand, 90, 640),
    growthPercent: seededRange(rand, -3, 22),
  }));
}

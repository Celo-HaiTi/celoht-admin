import type { KPI } from "@/types";

/** MOCK_PARTNERSHIPS_DATA - seeded placeholder. FreClean is CeloHT's
 *  real planned future partner (local entrepreneurship/cleaning services);
 *  it's listed here as "In discussion" - not yet a formal partner. */
export interface Partnership {
  id: string;
  partner: string;
  type: "NGO" | "Web3 Ecosystem" | "Local Business" | "Diaspora Org";
  status: "Active" | "In Discussion" | "MoU Signed" | "Concluded";
  since: string;
}

export function getPartnershipsKpis(): KPI[] {
  return [
    { label: "Active Partnerships", value: 6, format: "number", delta: 20.0 },
    { label: "In Discussion", value: 3, format: "number" },
    { label: "MoUs Signed", value: 2, format: "number" },
    { label: "Combined Reach (est.)", value: 12400, format: "number" },
  ];
}

export function getPartnerships(): Partnership[] {
  return [
    { id: "MOCK-PTN-01", partner: "Celo Foundation", type: "Web3 Ecosystem", status: "Active", since: "2026-03-01" },
    { id: "MOCK-PTN-02", partner: "FreClean", type: "Local Business", status: "In Discussion", since: "2026-06-01" },
    { id: "MOCK-PTN-03", partner: "Léogâne Cooperative Bank", type: "Local Business", status: "MoU Signed", since: "2026-05-12" },
    { id: "MOCK-PTN-04", partner: "Haitian Diaspora Giving Circle", type: "Diaspora Org", status: "Active", since: "2026-04-18" },
    { id: "MOCK-PTN-05", partner: "Reforestation NGO Partner", type: "NGO", status: "Active", since: "2026-02-20" },
    { id: "MOCK-PTN-06", partner: "Regional Web3 Hub", type: "Web3 Ecosystem", status: "In Discussion", since: "2026-07-02" },
  ];
}

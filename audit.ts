import { seededRandom, seededRange } from "./seed";
import type { AuditLogEntry, KPI } from "@/types";

/** MOCK_AUDIT_DATA — seeded placeholder. A real build writes to
 *  supabase.audit_log via triggers/service role on every mutating
 *  action, never from the client directly. */
const ACTIONS = [
  "Updated treasury transaction",
  "Approved governance proposal",
  "Changed user role",
  "Exported financial report",
  "Modified RLS policy",
  "Logged in",
  "Created grant record",
];

export function getAuditKpis(): KPI[] {
  return [
    { label: "Actions Logged Today", value: 14, format: "number" },
    { label: "Admin Actions (7d)", value: 38, format: "number", delta: 6.0 },
    { label: "Failed Logins (7d)", value: 1, format: "number" },
    { label: "Last Reviewed", value: 3, format: "number" },
  ];
}

export function getAuditLog(): AuditLogEntry[] {
  const rand = seededRandom(47);
  const actors = ["director@celoht.com", "council-1@celoht.com", "council-2@celoht.com", "contributor-a@celoht.com"];
  const rows: AuditLogEntry[] = [];
  for (let i = 0; i < 26; i++) {
    const month = seededRange(rand, 6, 8);
    const day = seededRange(rand, 1, 28);
    rows.push({
      id: `MOCK-AUD-${1700 + i}`,
      actorEmail: actors[seededRange(rand, 0, 3)]!,
      action: ACTIONS[seededRange(rand, 0, ACTIONS.length - 1)]!,
      target: `resource/${seededRange(rand, 1000, 9999)}`,
      timestamp: `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${String(seededRange(rand, 0, 23)).padStart(2, "0")}:${String(seededRange(rand, 0, 59)).padStart(2, "0")}:00Z`,
    });
  }
  return rows.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
}

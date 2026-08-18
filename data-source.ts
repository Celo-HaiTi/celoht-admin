/**
 * Every dashboard in this repo reads through this single switch.
 *
 * MOCK MODE is the default until real Supabase credentials are provided.
 * This is intentional: financial and impact dashboards must never present
 * fabricated numbers as if they were live - see /docs/DATA_SOURCES.md.
 * Every mock value is generated deterministically (seeded), labeled at
 * the source, and the UI renders a persistent "Mock Data" banner whenever
 * this flag is true.
 */
export function isMockMode(): boolean {
  const forced = process.env.NEXT_PUBLIC_FORCE_MOCK_DATA === "true";
  const hasSupabase =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return forced || !hasSupabase;
}

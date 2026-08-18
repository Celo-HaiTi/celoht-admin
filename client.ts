import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

/**
 * Browser-side Supabase client. Safe to call from Client Components.
 * Returns null (rather than throwing) when env vars aren't configured yet,
 * so the app can fall back to mock-data mode during local design work -
 * see src/lib/data-source.ts.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createBrowserClient<Database>(url, key);
}

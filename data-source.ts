export const DEV_FIXTURES_ENV = "ENABLE_DEV_FIXTURES";

export function isMockMode(): boolean {
  const fixturesEnabled = process.env[DEV_FIXTURES_ENV] === "true";
  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction) {
    if (fixturesEnabled) {
      throw new Error("Mock mode is forbidden in production");
    }

    throw new Error("Production dashboard providers are not configured");
  }

  const hasSupabase =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return fixturesEnabled || !hasSupabase;
}

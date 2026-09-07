import { createClient } from "@/lib/supabase/server";
import { canAccessDashboard, normalizeRole } from "@/lib/security/access";

export async function getCurrentRole(): Promise<string | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return null;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle<{ role: string | null }>();

  if (profileError || !profile) return null;

  return profile.role ?? null;
}

export async function requireDashboardAccess(slug: string) {
  const role = await getCurrentRole();
  const normalized = normalizeRole(role);

  if (!normalized || !canAccessDashboard(slug, normalized)) {
    throw new Error(`Access denied for dashboard: ${slug}`);
  }

  return normalized;
}

export async function requireKycAccess() {
  const role = await getCurrentRole();
  const normalized = normalizeRole(role);

  if (!normalized || !["administrator", "reviewer", "finance_viewer"].includes(normalized)) {
    throw new Error("KYC access denied");
  }

  return normalized;
}

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

interface AuditEvent {
  action: string;
  resourceType: string;
  resourceId?: string;
  result: "SUCCESS" | "FAILURE";
  failureReason?: string;
  requestId: string;
  metadata?: Record<string, unknown>;
  txHash?: string;
}

export async function recordAuditEvent(event: AuditEvent) {
  const sessionClient = await createClient();
  if (!sessionClient) throw new Error("Supabase authentication is not configured");

  const {
    data: { user },
  } = await sessionClient.auth.getUser();
  if (!user) throw new Error("Authenticated session required");

  const adminClient = createAdminClient();
  const { data: profile, error: profileError } = await adminClient
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) throw new Error("Trusted administrator profile required");

  const { error } = await adminClient.from("audit_log").insert({
    actor_id: user.id,
    actor_role: profile.role,
    action: event.action,
    target: event.resourceId ?? event.resourceType,
    resource_type: event.resourceType,
    resource_id: event.resourceId ?? null,
    result: event.result,
    failure_reason: event.failureReason ?? null,
    request_id: event.requestId,
    metadata: event.metadata ?? null,
    tx_hash: event.txHash ?? null,
  });

  if (error) throw new Error(`Audit event write failed: ${error.message}`);
}
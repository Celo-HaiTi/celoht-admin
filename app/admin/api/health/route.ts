import { NextResponse } from "next/server";

export async function GET() {
  const hasSupabase =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const hasIndexer = !!process.env.CELOHT_INDEXER_URL;
  const hasRpc = !!process.env.CELO_RPC_URL;

  const statuses = {
    database: hasSupabase ? "CONFIGURED" : "UNAVAILABLE",
    authentication: hasSupabase ? "CONFIGURED" : "UNAVAILABLE",
    indexer: hasIndexer ? "CONFIGURED" : "UNAVAILABLE",
    rpc: hasRpc ? "CONFIGURED" : "UNAVAILABLE",
  } as const;

  const degraded = Object.values(statuses).some((status) => status === "UNAVAILABLE");
  return NextResponse.json(
    { status: degraded ? "DEGRADED" : "LIVE", dependencies: statuses },
    { status: degraded ? 503 : 200 },
  );
}
import { NextResponse } from "next/server";

export async function GET() {
  const required = {
    supabase: !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceRole: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    indexer: !!process.env.CELOHT_INDEXER_URL,
    rpc: !!process.env.CELO_RPC_URL,
    fixturesDisabled: process.env.ENABLE_DEV_FIXTURES !== "true",
  };
  const ready = Object.values(required).every(Boolean);

  return NextResponse.json({ status: ready ? "READY" : "NOT_READY", required }, {
    status: ready ? 200 : 503,
  });
}
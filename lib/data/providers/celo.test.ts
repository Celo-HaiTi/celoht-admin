import { afterEach, describe, expect, it, vi } from "vitest";
import { getVerifiedTreasuryBalance } from "./celo";

describe("Celo treasury provider", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("rejects an RPC on the wrong chain", async () => {
    vi.stubEnv("CELO_RPC_URL", "https://rpc.example");
    vi.stubEnv("CELO_CHAIN_ID", "42220");
    vi.stubEnv("TREASURY_ADDRESS", "0x0000000000000000000000000000000000000001");
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ result: "0x1" }))));

    const result = await getVerifiedTreasuryBalance();

    expect(result.systemStatus).toBe("UNAVAILABLE");
    expect(result.provenance.status).toBe("UNAVAILABLE");
  });

  it("returns a verified balance with block provenance", async () => {
    vi.stubEnv("CELO_RPC_URL", "https://rpc.example");
    vi.stubEnv("CELO_CHAIN_ID", "42220");
    vi.stubEnv("TREASURY_ADDRESS", "0x0000000000000000000000000000000000000001");
    const responses = ["0xa4ec", "0x10", "0xde0b6b3a7640000"];
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ result: responses.shift() }))),
    );

    const result = await getVerifiedTreasuryBalance();

    expect(result.systemStatus).toBe("LIVE");
    expect(result.provenance.status).toBe("VERIFIED");
    expect(result.provenance.chainId).toBe(42220);
    expect(result.provenance.blockNumber).toBe(16);
    expect(result.data?.amount).toBe("1");
  });
});
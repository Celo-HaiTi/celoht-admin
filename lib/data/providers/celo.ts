import { unavailable, type ProviderResult } from "@/lib/data/provenance";
import type { TreasuryBalance, TreasuryTransaction } from "@/lib/data/providers/types";

interface RpcResponse<T> {
  result?: T;
  error?: { message?: string };
}

const ADDRESS_PATTERN = /^0x[a-fA-F0-9]{40}$/;

function formatUnits(value: bigint, decimals: number): string {
  const base = 10n ** BigInt(decimals);
  const whole = value / base;
  const fraction = value % base;
  if (fraction === 0n) return whole.toString();
  return `${whole}.${fraction.toString().padStart(decimals, "0").replace(/0+$/, "")}`;
}

async function rpc<T>(url: string, method: string, params: unknown[]): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`RPC request failed with status ${response.status}`);

  const payload = (await response.json()) as RpcResponse<T>;
  if (payload.error || payload.result === undefined) {
    throw new Error(payload.error?.message ?? "RPC response did not contain a result");
  }
  return payload.result;
}

export async function getVerifiedTreasuryBalance(): Promise<ProviderResult<TreasuryBalance>> {
  const rpcUrl = process.env.CELO_RPC_URL;
  const address = process.env.TREASURY_ADDRESS;
  const configuredChainId = Number(process.env.CELO_CHAIN_ID);

  if (!rpcUrl || !address || !ADDRESS_PATTERN.test(address) || !Number.isInteger(configuredChainId)) {
    return unavailable("Celo RPC", "RPC, chain ID, and a valid treasury address are required");
  }

  try {
    const [chainIdHex, blockNumberHex, balanceHex] = await Promise.all([
      rpc<string>(rpcUrl, "eth_chainId", []),
      rpc<string>(rpcUrl, "eth_blockNumber", []),
      rpc<string>(rpcUrl, "eth_getBalance", [address, "latest"]),
    ]);
    const chainId = Number(BigInt(chainIdHex));
    if (chainId !== configuredChainId) {
      return unavailable("Celo RPC", `Configured chain ${configuredChainId} does not match RPC chain ${chainId}`);
    }

    return {
      data: {
        address,
        currency: "CELO",
        amount: formatUnits(BigInt(balanceHex), 18),
        amountUsd: null,
      },
      provenance: {
        source: "Celo RPC",
        status: "VERIFIED",
        synchronizedAt: new Date().toISOString(),
        network: chainId === 42220 ? "celo-mainnet" : `celo-chain-${chainId}`,
        chainId,
        blockNumber: Number(BigInt(blockNumberHex)),
      },
      systemStatus: "LIVE",
    };
  } catch (error) {
    return unavailable("Celo RPC", error instanceof Error ? error.message : "RPC request failed");
  }
}

export async function getIndexedTreasuryTransactions(): Promise<ProviderResult<TreasuryTransaction[]>> {
  return unavailable("CeloHT indexer", "Canonical treasury transaction indexer is not configured");
}
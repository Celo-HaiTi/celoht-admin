export type DataStatus = "VERIFIED" | "PENDING" | "DEGRADED" | "UNAVAILABLE";

export type SystemStatus = "LIVE" | "DEGRADED" | "UNAVAILABLE";

export interface DataProvenance {
  source: string;
  status: DataStatus;
  synchronizedAt: string | null;
  network?: string;
  chainId?: number;
  blockNumber?: number;
  transactionHash?: string;
  freshnessSeconds?: number;
}

export interface ProviderResult<T> {
  data: T | null;
  provenance: DataProvenance;
  systemStatus: SystemStatus;
  error?: string;
}

export function unavailable<T>(source: string, error: string): ProviderResult<T> {
  return {
    data: null,
    provenance: {
      source,
      status: "UNAVAILABLE",
      synchronizedAt: null,
    },
    systemStatus: "UNAVAILABLE",
    error,
  };
}
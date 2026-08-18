/**
 * Formatting helpers used across every dashboard so numbers, currency,
 * and dates render consistently regardless of which widget renders them.
 */

export function formatUSD(value: number, opts: { compact?: boolean } = {}): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: opts.compact ? 1 : 2,
    notation: opts.compact ? "compact" : "standard",
  }).format(value);
}

export function formatUSDm(value: number): string {
  return `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value)} USDm`;
}

export function formatNumber(value: number, compact = false): string {
  return new Intl.NumberFormat("en-US", {
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatPercent(value: number, fractionDigits = 1): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(fractionDigits)}%`;
}

export function formatDate(value: string | Date, style: "short" | "long" = "short"): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: style === "long" ? "long" : "short",
    day: "numeric",
  }).format(date);
}

export function truncateAddress(address: string, chars = 4): string {
  if (!address || address.length < chars * 2 + 2) return address;
  return `${address.slice(0, chars + 2)}…${address.slice(-chars)}`;
}

export function ProductionUnavailable({ dashboard }: { dashboard: string }) {
  return (
    <div className="rounded-lg border border-amber-300 bg-amber-50 p-6 text-amber-950">
      <h1 className="text-lg font-semibold">{dashboard} data unavailable</h1>
      <p className="mt-2 text-sm">
        No verified production provider is configured for this dashboard. Seeded or demo data is
        intentionally not displayed.
      </p>
      <p className="mt-4 text-xs font-medium uppercase tracking-wide">Status: UNAVAILABLE</p>
    </div>
  );
}
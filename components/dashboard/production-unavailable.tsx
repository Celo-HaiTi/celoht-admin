export function ProductionUnavailable({
  dashboard,
  reason = "No verified production provider is configured for this dashboard.",
}: {
  dashboard: string;
  reason?: string;
}) {
  return (
    <div className="rounded-lg border border-amber-300 bg-amber-50 p-6 text-amber-950">
      <h1 className="text-lg font-semibold">{dashboard} data unavailable</h1>
      <p className="mt-2 text-sm">{reason}</p>
      <p className="mt-2 text-sm">
        Seeded or demo data is intentionally not displayed for this operational dashboard.
      </p>
      <p className="mt-4 text-xs font-medium uppercase tracking-wide">Status: UNAVAILABLE</p>
    </div>
  );
}
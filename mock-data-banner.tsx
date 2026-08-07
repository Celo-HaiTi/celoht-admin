import { AlertTriangle } from "lucide-react";

/**
 * Renders whenever isMockMode() is true. This is deliberately impossible
 * to miss: every figure below it is seeded placeholder data, not a live
 * feed from Supabase, GitHub, or the Celo chain. Do not remove this
 * without wiring the dashboard to a real data source — see
 * /docs/DATA_SOURCES.md.
 */
export function MockDataBanner() {
  return (
    <div className="mb-6 flex items-center gap-3 rounded-md border border-gold-300 bg-gold-100 px-4 py-3 text-sm text-navy-950 dark:border-gold-600 dark:bg-navy-850 dark:text-gold-200">
      <AlertTriangle className="h-4 w-4 shrink-0 text-gold-600 dark:text-gold-400" />
      <p>
        <span className="font-semibold">Mock data mode.</span> Figures on this page are seeded
        placeholders (labeled <code className="tabular text-xs">MOCK_*</code> in source), not
        live financials or chain data. Connect Supabase in{" "}
        <code className="text-xs">.env.local</code> to switch to real data — see{" "}
        <code className="text-xs">docs/DATA_SOURCES.md</code>.
      </p>
    </div>
  );
}

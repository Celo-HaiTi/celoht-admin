/** The recurring signature glyph — the ascending-bar arrow from the CeloHT
 *  mark, redrawn as a minimal watermark. Appears bottom-right on every KPI
 *  card as a quiet, consistent unit of measurement across the platform. */
export function BarGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 20" className={className ?? "bar-glyph"} fill="none" aria-hidden="true">
      <rect x="1" y="12" width="4" height="7" fill="currentColor" />
      <rect x="8" y="7" width="4" height="12" fill="currentColor" />
      <rect x="15" y="2" width="4" height="17" fill="currentColor" />
      <path d="M21 10 L27 4 L33 8 L39 1" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M33 1 L39 1 L39 7" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}

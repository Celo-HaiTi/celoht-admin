import { Card, CardContent } from "@/components/ui/card";
import { BarGlyph } from "@/components/dashboard/bar-glyph";

/**
 * Shell rendered for dashboards not yet fully built out. Every route in
 * nav-config.ts resolves to something real — no dead links — while making
 * unambiguous what's built vs. planned. See docs/BUILD_STATUS.md for the
 * build order across sessions.
 */
export function ComingSoon({ label }: { label: string }) {
  return (
    <Card className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
      <CardContent className="flex flex-col items-center gap-3 pt-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-600 dark:bg-navy-850 dark:text-gold-300">
          <BarGlyph className="h-5 w-8 opacity-100" />
        </div>
        <h2 className="font-display text-lg font-medium">{label} dashboard</h2>
        <p className="max-w-sm text-sm text-[--muted]">
          This dashboard is scoped in <code className="text-xs">nav-config.ts</code> and scheduled
          for a future build pass — see <code className="text-xs">docs/BUILD_STATUS.md</code> for
          the current order. The layout, RBAC, and data-source pattern from the finished
          dashboards apply directly once it's built.
        </p>
      </CardContent>
    </Card>
  );
}

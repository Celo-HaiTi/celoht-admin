import { notFound } from "next/navigation";
import { ALL_SLUGS } from "@/lib/nav-config";
import { ProductionUnavailable } from "@/components/dashboard/production-unavailable";
import { createClient } from "@/lib/supabase/server";
import { requireDashboardAccess } from "@/lib/server/rbac";

export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

export default async function DashboardPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!ALL_SLUGS.includes(slug as (typeof ALL_SLUGS)[number])) {
    notFound();
  }

  const supabase = await createClient();
  if (!supabase) {
    return <ProductionUnavailable dashboard={slug} reason="Authentication required" />;
  }

  try {
    await requireDashboardAccess(slug);
  } catch {
    return <ProductionUnavailable dashboard={slug} reason="Access denied" />;
  }

  if (process.env.NODE_ENV === "production") {
    return <ProductionUnavailable dashboard={slug} reason="Production provider unavailable" />;
  }

  const { developmentDashboardMap } = await import("./development-map");
  const Component = developmentDashboardMap[slug as keyof typeof developmentDashboardMap];

  return <Component />;
}

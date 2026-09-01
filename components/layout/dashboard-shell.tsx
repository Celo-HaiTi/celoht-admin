import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { createClient } from "@/lib/supabase/server";

export async function DashboardShell({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  let userLabel = "DV";

  if (supabase) {
    const { data } = await supabase.auth.getUser();
    if (data.user?.email) {
      userLabel = data.user.email.slice(0, 2).toUpperCase();
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar userLabel={userLabel} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

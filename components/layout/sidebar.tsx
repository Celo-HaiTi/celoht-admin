"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Circle } from "lucide-react";
import { NAV } from "@/lib/nav-config";
import { cn } from "@/lib/utils/cn";
import { BarGlyph } from "@/components/dashboard/bar-glyph";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-navy-800 bg-[--sidebar-bg] text-[--sidebar-fg] md:flex">
      <div className="flex items-center gap-2 border-b border-navy-800 px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gold-400 text-navy-950">
          <BarGlyph className="h-4 w-6 opacity-100" />
        </div>
        <div className="leading-tight">
          <p className="font-display text-sm font-semibold text-white">CeloHT Admin</p>
          <p className="text-[11px] text-navy-100/60">Operational control center</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {NAV.map((group) => (
          <div key={group.group} className="mb-5">
            <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-navy-100/40">
              {group.group}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const href = `/dashboard/${item.slug}`;
                const active = pathname === href;
                return (
                  <li key={item.slug}>
                    <Link
                      href={href}
                      className={cn(
                        "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-colors",
                        active
                          ? "bg-[--sidebar-active] text-white"
                          : "text-navy-100/80 hover:bg-[--sidebar-active] hover:text-white",
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="flex-1 truncate">{item.label}</span>
                      {!item.built && (
                        <Circle className="h-1.5 w-1.5 shrink-0 fill-gold-400 text-gold-400" aria-label="Coming soon" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

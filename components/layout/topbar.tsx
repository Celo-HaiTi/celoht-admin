"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { NAV } from "@/lib/nav-config";
import { Button } from "@/components/ui/button";

function currentLabel(pathname: string): string {
  for (const group of NAV) {
    for (const item of group.items) {
      if (pathname === `/dashboard/${item.slug}`) return item.label;
    }
  }
  return "Dashboard";
}

export function Topbar({ userLabel }: { userLabel: string }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex h-14 items-center justify-between border-b border-[--card-border] bg-[--card] px-5">
      <h1 className="font-display text-lg font-medium">{currentLabel(pathname)}</h1>
      <div className="flex items-center gap-2">
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[--muted]" />
          <input
            placeholder="Search anything… (⌘K)"
            aria-label="Global search"
            className="h-8 w-56 rounded-md border border-[--card-border] bg-[--background] pl-8 pr-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[--ring]"
          />
        </div>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-4 w-4 dark:hidden" />
          <Moon className="hidden h-4 w-4 dark:block" />
        </Button>
        <div className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-navy-900 text-xs font-semibold text-white dark:bg-gold-400 dark:text-navy-950">
          {userLabel}
        </div>
      </div>
    </header>
  );
}

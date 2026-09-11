"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportToCSV, exportToPDF } from "@/lib/utils/export";

interface ExportMenuProps {
  filename: string;
  title: string;
  rows: Record<string, unknown>[];
}

/** Dropdown attached to every dashboard/table: Export -> CSV / PDF. */
export function ExportMenu({ filename, title, rows }: ExportMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button variant="outline" size="sm" onClick={() => setOpen((v) => !v)} aria-haspopup="menu" aria-expanded={open}>
        <Download className="h-3.5 w-3.5" />
        Export
      </Button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 z-10 mt-1 w-40 overflow-hidden rounded-md border border-[--card-border] bg-[--card] shadow-md"
          onMouseLeave={() => setOpen(false)}
        >
          {[
            { label: "CSV", fn: () => exportToCSV(filename, rows) },
            { label: "PDF", fn: () => exportToPDF(filename, title, rows) },
          ].map((opt) => (
            <button
              key={opt.label}
              role="menuitem"
              className="block w-full px-3 py-2 text-left text-sm hover:bg-[--muted-bg]"
              onClick={() => {
                opt.fn();
                setOpen(false);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

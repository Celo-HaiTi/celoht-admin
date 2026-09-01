"use client";

import { useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowUpDown, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { ExportMenu } from "@/components/dashboard/export-menu";
import { Button } from "@/components/ui/button";

interface DataTableProps<T> {
  title: string;
  data: T[];
  columns: ColumnDef<T, unknown>[];
  exportFilename: string;
}

/**
 * Shared table shell for every dashboard: search, sortable headers,
 * pagination, and the Export menu. Individual dashboards only need to
 * supply column defs and rows.
 */
export function DataTable<T>({ title, data, columns, exportFilename }: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  });

  const exportRows = useMemo(
    () => table.getFilteredRowModel().rows.map((r) => r.original as Record<string, unknown>),
    [table],
  );

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[--muted]" />
          <input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search…"
            aria-label={`Search ${title}`}
            className="h-8 rounded-md border border-[--card-border] bg-[--background] pl-8 pr-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[--ring]"
          />
        </div>
        <ExportMenu filename={exportFilename} title={title} rows={exportRows} />
      </div>

      <div className="overflow-x-auto rounded-md border border-[--card-border]">
        <table className="w-full text-sm">
          <thead className="bg-[--muted-bg] text-left">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th key={header.id} className="whitespace-nowrap px-3 py-2 font-medium">
                    {header.isPlaceholder ? null : (
                      <button
                        className="inline-flex items-center gap-1"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && <ArrowUpDown className="h-3 w-3 opacity-50" />}
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t border-[--card-border] hover:bg-[--muted-bg]">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="tabular whitespace-nowrap px-3 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-3 py-8 text-center text-[--muted]">
                  No results match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-[--muted]">
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {Math.max(1, table.getPageCount())}
        </span>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

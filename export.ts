import Papa from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * Shared export pipeline used by every dashboard's "Export" menu.
 * Accepts plain row objects so it works identically whether the data
 * came from mock generators or a live Supabase query.
 */
export function exportToCSV(filename: string, rows: Record<string, unknown>[]) {
  const csv = Papa.unparse(rows);
  downloadBlob(csv, `${filename}.csv`, "text/csv;charset=utf-8;");
}

export function exportToPDF(filename: string, title: string, rows: Record<string, unknown>[]) {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text(title, 14, 16);
  doc.setFontSize(9);
  doc.text(`Generated ${new Date().toISOString().split("T")[0]} · CeloHT Admin`, 14, 22);

  if (rows.length > 0) {
    const columns = Object.keys(rows[0]!);
    autoTable(doc, {
      startY: 28,
      head: [columns],
      body: rows.map((row) => columns.map((c) => String(row[c] ?? ""))),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [10, 26, 48] },
    });
  }
  doc.save(`${filename}.pdf`);
}

function downloadBlob(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

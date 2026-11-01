"use client";

import { cn } from "@/lib/utils";
import { formatMeters, type KarigarEntry } from "@/lib/karigar-schema";

export interface PrintSheetProps {
  entry: KarigarEntry | null;
}

/** `2026-10-20` -> `20-10-2026` (no timezone shifting, no extra dependency). */
function formatDate(value: string): string {
  const [year, month, day] = value.split("-");

  if (!year || !month || !day) return value;

  return `${day}-${month}-${year}`;
}

/**
 * Print only document.
 *
 * The component is mounted in the DOM but hidden on screen (`.print-document`)
 * and becomes the only visible content when the browser prints the page.
 * Every fabric column keeps its own subtotal, the grand total closes the sheet.
 */
export function PrintSheet({ entry }: PrintSheetProps) {
  if (!entry) return null;

  return (
    <div className="print-document" aria-hidden="true">
      <div className="print-page">
        <header className="print-header">
          <div>
            <h1 className="print-title">Karigar Cloth Meter Entry</h1>
            <p className="print-subtitle">Cloth Meter Register</p>
          </div>

          <dl className="print-meta">
            <div className="print-meta-row">
              <dt>Company</dt>
              <dd>{entry.company}</dd>
            </div>
            <div className="print-meta-row">
              <dt>Vendor / Karigar</dt>
              <dd>{entry.vendor}</dd>
            </div>
            <div className="print-meta-row">
              <dt>Entry Date</dt>
              <dd>{formatDate(entry.entryDate)}</dd>
            </div>
            {entry.remark !== "" && (
              <div className="print-meta-row">
                <dt>Remark</dt>
                <dd>{entry.remark}</dd>
              </div>
            )}
          </dl>
        </header>

        <table className="print-table">
          <thead>
            <tr>
              <th className="print-col-serial">#</th>
              <th className="print-col-column">Column</th>
              <th className="print-col-fabric">Fabric</th>
              <th className="print-col-number">Meters / Than</th>
              <th className="print-col-number">Thans</th>
              <th className="print-col-number">Total Meters</th>
            </tr>
          </thead>

          <tbody>
            {entry.columns.map((column) => (
              <ColumnLines
                key={column.column}
                column={column}
                serialOffset={Math.max(
                  0,
                  entry.lines.findIndex((line) => line.column === column.column),
                )}
              />
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={4} className="print-total-label">
                Grand Total ({entry.occupiedSlots} entries)
              </td>
              <td className="print-col-number print-total-value">
                {entry.totalThans}
              </td>
              <td className="print-col-number print-total-value">
                {formatMeters(entry.totalMeters)}
              </td>
            </tr>
          </tfoot>
        </table>

        <div className="print-signatures">
          <div className="print-signature">
            <span className="print-signature-line" />
            <span>Prepared By</span>
          </div>
          <div className="print-signature">
            <span className="print-signature-line" />
            <span>Received By</span>
          </div>
        </div>

        <p className={cn("print-footer")}>
          Printed on {formatDate(new Date().toISOString().slice(0, 10))} -{" "}
          {entry.lines.length} cloth entries
        </p>
      </div>
    </div>
  );
}

function ColumnLines({
  column,
  serialOffset,
}: {
  column: KarigarEntry["columns"][number];
  serialOffset: number;
}) {
  return (
    <>
      {column.lines.map((line, index) => (
        <tr key={line.serial}>
          <td className="print-col-serial">{serialOffset + index + 1}</td>
          <td className="print-col-column">{column.label}</td>
          <td className="print-col-fabric">{line.fabric}</td>
          <td className="print-col-number">{formatMeters(line.meters)}</td>
          <td className="print-col-number">{line.thans}</td>
          <td className="print-col-number">{formatMeters(line.totalMeters)}</td>
        </tr>
      ))}

      <tr className="print-subtotal-row">
        <td colSpan={4} className="print-total-label">
          {column.label} subtotal ({column.fabric || "fabric not set"})
        </td>
        <td className="print-col-number print-total-value">
          {column.totalThans}
        </td>
        <td className="print-col-number print-total-value">
          {formatMeters(column.totalMeters)}
        </td>
      </tr>
    </>
  );
}

export default PrintSheet;

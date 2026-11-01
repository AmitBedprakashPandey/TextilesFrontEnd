"use client";

import { Fragment } from "react";
import { useWatch, type Control } from "react-hook-form";

import {
  COLUMN_COUNT,
  computeColumnsTotals,
  formatMeters,
  type KarigarFormValues,
  type KarigarTotals,
} from "@/lib/karigar-schema";

export interface GridFooterProps {
  control: Control<KarigarFormValues>;
}

/**
 * Sticky footer of the register: every fabric column keeps its own totals
 * (total meters and total thans) exactly like the printed sheet.
 *
 * The subscription lives in this component only, so the register grid itself
 * is never re-rendered while typing.
 */
export function GridFooter({ control }: GridFooterProps) {
  const totals = useWatch<
    KarigarFormValues,
    "columns",
    KarigarFormValues,
    KarigarTotals
  >({
    control,
    name: "columns",
    compute: (columns) => computeColumnsTotals(columns),
  });

  return (
    <tfoot className="sticky bottom-0 z-20 bg-muted shadow-[0_-1px_0_0_var(--border)]">
      <tr>
        <th
          scope="row"
          className="bg-muted px-1 py-1 text-center align-middle text-[10px] font-semibold uppercase tracking-wide text-muted-foreground"
        >
          Total
        </th>

        {Array.from({ length: COLUMN_COUNT }, (_, columnIndex) => {
          const column = totals.columns[columnIndex];

          return (
            <Fragment key={columnIndex}>
              <td
                className="px-1 py-1 text-right align-middle text-xs font-semibold tabular-nums"
                title={`${column?.label ?? "Column"} total meters`}
              >
                {formatMeters(column?.totalMeters ?? 0)}
                <span className="ml-1 text-[10px] font-normal text-muted-foreground">
                  m
                </span>
              </td>
              <td
                className="px-1 py-1 text-right align-middle text-xs font-semibold tabular-nums"
                title={`${column?.label ?? "Column"} total thans`}
              >
                {column?.totalThans ?? 0}
                <span className="ml-1 text-[10px] font-normal text-muted-foreground">
                  th
                </span>
              </td>
            </Fragment>
          );
        })}
      </tr>
    </tfoot>
  );
}

export default GridFooter;

"use client";

import { useWatch, type Control } from "react-hook-form";

import { cn } from "@/lib/utils";
import {
  COLUMN_COUNT,
  TOTAL_SLOTS,
  computeColumnsTotals,
  formatMeters,
  type KarigarFormValues,
  type KarigarTotals,
} from "@/lib/karigar-schema";

export interface TotalsBarProps {
  control: Control<KarigarFormValues>;
  className?: string;
}

/**
 * Sticky live totals of the whole register plus the totals of every column.
 *
 * Only the `columns` array is watched (and it is watched inside this
 * component only), so a keystroke re-renders the totals bar but never the
 * register grid. The `compute` callback keeps the re-renders minimal: the bar
 * only re-renders when one of the totals actually changes.
 */
export function TotalsBar({ control, className }: TotalsBarProps) {
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

  const usedSlots = totals.occupiedSlots;
  const usedPercent = Math.round((usedSlots / TOTAL_SLOTS) * 100);

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-6 gap-y-2 border border-border bg-card px-3 py-2 shadow-sm",
        className,
      )}
    >
      <Total label="Total Meters" value={formatMeters(totals.totalMeters)} />

      <Total label="Total Thans" value={String(totals.totalThans)} />

      <Total label="Occupied Slots" value={`${usedSlots} / ${TOTAL_SLOTS}`} />

      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {Array.from({ length: COLUMN_COUNT }, (_, columnIndex) => {
          const column = totals.columns[columnIndex];

          return (
            <div
              key={columnIndex}
              className="text-[11px] leading-tight text-muted-foreground"
            >
              <div className="font-medium text-foreground">
                {column?.label ?? `Column ${columnIndex + 1}`}
              </div>
              <div className="tabular-nums">
                {formatMeters(column?.totalMeters ?? 0)} m ·{" "}
                {column?.totalThans ?? 0} th
              </div>
            </div>
          );
        })}
      </div>

      <div className="min-w-[10rem] flex-1">
        <div className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
          <span>Remaining Slots</span>
          <span className="font-medium tabular-nums text-foreground">
            {totals.remainingSlots}
          </span>
        </div>
        <div
          className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-label="Slot capacity"
          aria-valuenow={usedSlots}
          aria-valuemin={0}
          aria-valuemax={TOTAL_SLOTS}
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-150"
            style={{ width: `${usedPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function Total({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-[6rem]">
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="text-sm font-semibold tabular-nums">{value}</div>
    </div>
  );
}

export default TotalsBar;

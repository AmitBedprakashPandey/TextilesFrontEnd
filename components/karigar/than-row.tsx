"use client";

import { memo } from "react";
import { Controller, type Control } from "react-hook-form";
import { X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  COLUMN_COUNT,
  sanitizeDecimal,
  sanitizeInteger,
  type KarigarFormValues,
} from "@/lib/karigar-schema";

export interface ThanRowProps {
  /** Zero based row index (identical for every column). */
  rowIndex: number;
  control: Control<KarigarFormValues>;
  /** Clears meters and thans of a single cell. */
  onClearSlot: (columnIndex: number, rowIndex: number) => void;
}

interface ColumnCellProps {
  columnIndex: number;
  rowIndex: number;
  rowNumber: number;
  control: Control<KarigarFormValues>;
  onClearSlot: (columnIndex: number, rowIndex: number) => void;
}

/**
 * One register row: every fabric column contributes a meters and a thans cell.
 *
 * The row and the cell are memoised and only receive stable props, so typing
 * in a single field re-renders that one `Controller` only - never the grid.
 */
const ColumnCell = memo(function ColumnCell({
  columnIndex,
  rowIndex,
  rowNumber,
  control,
  onClearSlot,
}: ColumnCellProps) {
  const columnNumber = columnIndex + 1;
  const metersName = `columns.${columnIndex}.rows.${rowIndex}.meters` as const;
  const thansName = `columns.${columnIndex}.rows.${rowIndex}.thans` as const;

  return (
    <>
      <td
        data-grid-cell={`${rowIndex}-${columnIndex * 2}`}
        className="border-b border-border/60 p-0.5 align-middle"
      >
        <Controller
          name={metersName}
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <Input
                value={field.value ?? ""}
                onChange={(event) =>
                  field.onChange(sanitizeDecimal(event.target.value))
                }
                onBlur={field.onBlur}
                inputMode="decimal"
                placeholder="0.00"
                aria-label={`Column ${columnNumber} row ${rowNumber} meters per than`}
                aria-invalid={fieldState.invalid || undefined}
                className={cn(
                  "h-7 rounded-md px-1.5 text-xs tabular-nums",
                  fieldState.invalid && "border-destructive",
                )}
              />
              {fieldState.error && (
                <p className="px-1 text-[10px] leading-tight text-destructive">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </td>

      <td
        data-grid-cell={`${rowIndex}-${columnIndex * 2 + 1}`}
        className="border-b border-border/60 p-0.5 align-middle"
      >
        <Controller
          name={thansName}
          control={control}
          render={({ field, fieldState }) => (
            <div className="flex items-start gap-0.5">
              <Input
                value={field.value ?? ""}
                onChange={(event) =>
                  field.onChange(sanitizeInteger(event.target.value))
                }
                onBlur={field.onBlur}
                inputMode="numeric"
                placeholder="0"
                aria-label={`Column ${columnNumber} row ${rowNumber} thans`}
                aria-invalid={fieldState.invalid || undefined}
                className={cn(
                  "h-7 min-w-0 flex-1 rounded-md px-1.5 text-xs tabular-nums",
                  fieldState.invalid && "border-destructive",
                )}
              />
              <button
                type="button"
                onClick={() => onClearSlot(columnIndex, rowIndex)}
                aria-label={`Clear column ${columnNumber} row ${rowNumber}`}
                title="Clear this entry"
                className="mt-0.5 rounded p-0.5 text-muted-foreground/70 hover:bg-accent hover:text-foreground"
              >
                <X className="size-3" />
              </button>
            </div>
          )}
        />
      </td>
    </>
  );
});

function ThanRowComponent({
  rowIndex,
  control,
  onClearSlot,
}: ThanRowProps) {
  return (
    <tr className="bg-background hover:bg-muted/30">
      <th
        scope="row"
        className="border-b border-border/60 bg-muted/40 px-1 py-0.5 text-center align-middle text-[11px] font-medium tabular-nums text-muted-foreground"
      >
        {rowIndex + 1}
      </th>

      {Array.from({ length: COLUMN_COUNT }, (_, columnIndex) => (
        <ColumnCell
          key={columnIndex}
          columnIndex={columnIndex}
          rowIndex={rowIndex}
          rowNumber={rowIndex + 1}
          control={control}
          onClearSlot={onClearSlot}
        />
        
      ))}
    </tr>
  );
}

export const ThanRow = memo(ThanRowComponent);

export default ThanRow;

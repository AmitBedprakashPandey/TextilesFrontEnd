import { z } from "zod";

/* -------------------------------------------------------------------------- */
/* Grid dimensions                                                            */
/* -------------------------------------------------------------------------- */

/** Number of register rows of every column. */
export const ROW_COUNT = 100;
/** Number of parallel fabric columns (each with its own fabric and totals). */
export const COLUMN_COUNT = 3;
/** Total cloth slots of the form (3 columns x 100 rows). */
export const TOTAL_SLOTS = ROW_COUNT * COLUMN_COUNT;

/** Column labels used in the UI and on the print sheet. */
export const COLUMN_LABELS = ["Column 1", "Column 2", "Column 3"] as const;

/* -------------------------------------------------------------------------- */
/* Business rules                                                             */
/* -------------------------------------------------------------------------- */

/**
 * How the entered "meters" value has to be interpreted.
 *
 * - "per-than": meters is the measurement of ONE than, therefore the cloth of
 *               a slot is `meters x thans`. This is the default because the
 *               register stores the measurement per than (e.g. 100 m per than).
 * - "per-slot": meters is already the total cloth length of the slot.
 *
 * Additional rule (always applied): a slot whose meters input is 0 (or empty)
 * is not calculated at all - its thans are not added to the column totals.
 *
 * Only `METERS_BASIS` has to be flipped when the business rule changes; every
 * total calculation flows through `computeSlotTotals` / `computeColumnsTotals`.
 */
export type MetersBasis = "per-than" | "per-slot";

export const METERS_BASIS: MetersBasis = "per-than";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

/** Raw form state of a single cloth slot (all values kept as strings). */
export interface ClothSlotValues {
  /** Measurement of one than (e.g. "100"). */
  meters: string;
  /** Number of thans received in this slot (e.g. "3"). */
  thans: string;
}

/** Raw form state of one fabric column (fabric + 100 slots). */
export interface KarigarColumnValues {
  fabric: string;
  rows: ClothSlotValues[];
}

/** Totals of a single column. */
export interface KarigarColumnTotals {
  /** Zero based column index. */
  index: number;
  label: string;
  fabric: string;
  totalMeters: number;
  totalThans: number;
  occupiedSlots: number;
}

/** Totals of the whole register (grand total + per column totals). */
export interface KarigarTotals {
  totalMeters: number;
  totalThans: number;
  occupiedSlots: number;
  remainingSlots: number;
  columns: KarigarColumnTotals[];
}

/** One printed / persisted cloth line. */
export interface KarigarEntryLine {
  serial: number;
  /** One based column number. */
  column: number;
  /** One based row number inside the column. */
  row: number;
  fabric: string;
  /** Measurement per than, as entered by the user. */
  meters: number;
  thans: number;
  /** Calculated cloth of the slot (`meters x thans`). */
  totalMeters: number;
}

/** Normalised column of the entry. */
export interface KarigarEntryColumn {
  column: number;
  label: string;
  fabric: string;
  lines: KarigarEntryLine[];
  totalMeters: number;
  totalThans: number;
  occupiedSlots: number;
}

/** Normalised, ready to print and ready to post entry. */
export interface KarigarEntry {
  company: string;
  vendor: string;
  entryDate: string;
  remark: string;
  columns: KarigarEntryColumn[];
  lines: KarigarEntryLine[];
  totalMeters: number;
  totalThans: number;
  occupiedSlots: number;
  remainingSlots: number;
}

/* -------------------------------------------------------------------------- */
/* Validation helpers                                                         */
/* -------------------------------------------------------------------------- */

/** Accepts "", "12", "12.5", "12.50" - rejects negatives and broken decimals. */
export function isValidMeters(value: string): boolean {
  const trimmed = value.trim();

  if (trimmed === "") return true;
  if (!/^\d*\.?\d*$/.test(trimmed)) return false;

  const [integerPart, decimalPart] = trimmed.split(".");

  if (integerPart.length === 0 && (decimalPart?.length ?? 0) === 0) return false;
  if ((decimalPart?.length ?? 0) > 2) return false;
  if (integerPart.length > 5) return false;

  return true;
}

/** Accepts "" and whole numbers only (no decimals, no negatives). */
export function isValidThans(value: string): boolean {
  const trimmed = value.trim();

  if (trimmed === "") return true;

  return /^\d{1,4}$/.test(trimmed);
}

/** Keeps only numeric characters and a single decimal point (max 2 decimals). */
export function sanitizeDecimal(raw: string): string {
  const cleaned = raw.replace(/[^\d.]/g, "");
  const firstDot = cleaned.indexOf(".");

  if (firstDot === -1) return cleaned.slice(0, 5);

  const integerPart = cleaned.slice(0, firstDot).slice(0, 5);
  const decimalPart = cleaned.slice(firstDot + 1).replace(/\./g, "").slice(0, 2);

  return `${integerPart}.${decimalPart}`;
}

/** Keeps digits only (max 4 digits). */
export function sanitizeInteger(raw: string): string {
  return raw.replace(/\D/g, "").slice(0, 4);
}

/** Parses a meter string, treating empty/invalid values as zero. */
export function parseMeters(value: string): number {
  const parsed = Number.parseFloat(value.trim());

  return Number.isFinite(parsed) ? parsed : 0;
}

/** Parses a than string, treating empty/invalid values as zero. */
export function parseThans(value: string): number {
  const parsed = Number.parseInt(value.trim(), 10);

  return Number.isFinite(parsed) ? parsed : 0;
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

/* -------------------------------------------------------------------------- */
/* Zod schema                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * A slot may stay completely empty. As soon as a value is present it has to be
 * a valid number - an empty slot is simply not counted.
 */
export const clothSlotSchema = z
  .object({
    meters: z.string(),
    thans: z.string(),
  })
  .superRefine((slot, ctx) => {
    const meters = slot.meters.trim();
    const thans = slot.thans.trim();

    if (meters === "" && thans === "") return;

    if (!isValidMeters(meters)) {
      ctx.addIssue({
        code: "custom",
        path: ["meters"],
        message: "Enter a valid meter value (max 5 digits, 2 decimals)",
      });
    }

    if (!isValidThans(thans)) {
      ctx.addIssue({
        code: "custom",
        path: ["thans"],
        message: "Thans must be a whole number",
      });
    }
  });

/** One fabric column: the fabric is mandatory as soon as the column has data. */
export const karigarColumnSchema = z
  .object({
    fabric: z.string().trim(),
    rows: z
      .array(clothSlotSchema)
      .length(ROW_COUNT, `Every column must contain ${ROW_COUNT} rows`),
  })
  .superRefine((column, ctx) => {
    const hasEntries = column.rows.some(isSlotOccupied);

    if (hasEntries && column.fabric === "") {
      ctx.addIssue({
        code: "custom",
        path: ["fabric"],
        message: "Fabric is required for a column that has entries",
      });
    }
  });

export const karigarEntrySchema = z.object({
  company: z.string().trim().min(1, "Company is required"),
  vendor: z.string().trim().min(1, "Vendor / Karigar is required"),
  entryDate: z.string().min(1, "Entry date is required"),
  remark: z.string().trim().max(500, "Remark must be 500 characters or fewer"),
  columns: z
    .array(karigarColumnSchema)
    .length(COLUMN_COUNT, `The register must contain ${COLUMN_COUNT} columns`),
});

export type KarigarFormValues = z.infer<typeof karigarEntrySchema>;

/* -------------------------------------------------------------------------- */
/* Form helpers                                                               */
/* -------------------------------------------------------------------------- */

/** Creates the 3 empty columns (each with 100 empty slots). */
export function createEmptyColumns(): KarigarColumnValues[] {
  return Array.from({ length: COLUMN_COUNT }, () => ({
    fabric: "",
    rows: Array.from({ length: ROW_COUNT }, () => ({
      meters: "",
      thans: "",
    })),
  }));
}

/** Today's date as `yyyy-mm-dd` in the local timezone. */
export function todayAsInputValue(date: Date = new Date()): string {
  const offsetMs = date.getTimezoneOffset() * 60_000;

  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 10);
}

/** A slot counts as occupied when it carries any measurement. */
export function isSlotOccupied(slot: ClothSlotValues): boolean {
  return slot.meters.trim() !== "" || slot.thans.trim() !== "";
}

/**
 * Totals of the slots of one column.
 *
 * - A slot with an empty meters input (or 0) is not calculated: neither its
 *   meters nor its thans are added to the totals.
 * - Otherwise the slot contributes `meters x thans` (per than) to the meters
 *   and its thans to the than total.
 *
 * Missing values are treated as zero for the calculation only - the form state
 * itself is never mutated.
 */
export function computeSlotTotals(
  slots: readonly ClothSlotValues[],
  basis: MetersBasis = METERS_BASIS,
): { totalMeters: number; totalThans: number; occupiedSlots: number } {
  let totalMeters = 0;
  let totalThans = 0;
  let occupiedSlots = 0;

  for (const slot of slots) {
    if (!isSlotOccupied(slot)) continue;

    occupiedSlots += 1;

    const meters = parseMeters(slot.meters);
    const thans = parseThans(slot.thans);

    // Input value 0 -> the slot (and its thans) is not calculated.
    if (meters <= 0) continue;

    totalThans += thans;
    totalMeters += basis === "per-than" ? meters * thans : meters;
  }

  return {
    totalMeters: round2(totalMeters),
    totalThans,
    occupiedSlots,
  };
}

/** Grand totals of the register plus the totals of every single column. */
export function computeColumnsTotals(
  columns: readonly KarigarColumnValues[],
  basis: MetersBasis = METERS_BASIS,
): KarigarTotals {
  const columnTotals = columns.map((column, index) => {
    const totals = computeSlotTotals(column.rows, basis);

    return {
      index,
      label: COLUMN_LABELS[index] ?? `Column ${index + 1}`,
      fabric: column.fabric.trim(),
      totalMeters: totals.totalMeters,
      totalThans: totals.totalThans,
      occupiedSlots: totals.occupiedSlots,
    };
  });

  const totalMeters = columnTotals.reduce(
    (sum, column) => sum + column.totalMeters,
    0,
  );
  const totalThans = columnTotals.reduce(
    (sum, column) => sum + column.totalThans,
    0,
  );
  const occupiedSlots = columnTotals.reduce(
    (sum, column) => sum + column.occupiedSlots,
    0,
  );

  return {
    totalMeters: round2(totalMeters),
    totalThans,
    occupiedSlots,
    remainingSlots: TOTAL_SLOTS - occupiedSlots,
    columns: columnTotals,
  };
}

/**
 * Converts the raw form values into the normalised entry that is printed and
 * posted to the API.
 */
export function normalizeKarigarEntry(values: KarigarFormValues): KarigarEntry {
  const lines: KarigarEntryLine[] = [];
  const columns: KarigarEntryColumn[] = [];

  values.columns.forEach((column, columnIndex) => {
    const fabric = column.fabric.trim();
    const columnLines: KarigarEntryLine[] = [];

    column.rows.forEach((slot, rowIndex) => {
      if (!isSlotOccupied(slot)) return;

      const meters = parseMeters(slot.meters);
      const thans = parseThans(slot.thans);

      columnLines.push({
        serial: lines.length + 1,
        column: columnIndex + 1,
        row: rowIndex + 1,
        fabric,
        meters,
        thans,
        totalMeters: round2(
          METERS_BASIS === "per-than" ? meters * thans : meters,
        ),
      });
    });

    const totals = computeSlotTotals(column.rows);

    columns.push({
      column: columnIndex + 1,
      label: COLUMN_LABELS[columnIndex] ?? `Column ${columnIndex + 1}`,
      fabric,
      lines: columnLines,
      totalMeters: totals.totalMeters,
      totalThans: totals.totalThans,
      occupiedSlots: totals.occupiedSlots,
    });

    lines.push(...columnLines);
  });

  const totals = computeColumnsTotals(values.columns);

  return {
    company: values.company.trim(),
    vendor: values.vendor.trim(),
    entryDate: values.entryDate,
    remark: values.remark.trim(),
    columns,
    lines,
    totalMeters: totals.totalMeters,
    totalThans: totals.totalThans,
    occupiedSlots: totals.occupiedSlots,
    remainingSlots: totals.remainingSlots,
  };
}

/** Stable signature used to detect that the form still matches a saved entry. */
export function entrySignature(entry: KarigarEntry): string {
  return JSON.stringify([
    entry.company,
    entry.vendor,
    entry.entryDate,
    entry.remark,
    entry.columns.map((column) => [
      column.fabric,
      column.lines.map((line) => [line.row, line.meters, line.thans]),
    ]),
  ]);
}

/** `12.5` -> `12.50`, keeps the register readable. */
export function formatMeters(value: number): string {
  return value.toFixed(2);
}

import { apiClient } from "@/lib/api/config";
import type { KarigarEntry } from "@/lib/karigar-schema";

/**
 * ---------------------------------------------------------------------------
 * API INTEGRATION POINT
 * ---------------------------------------------------------------------------
 * `submitKarigarEntry()` is the only place that talks to the backend. The
 * payload it builds is exactly what a `POST /karigar/cloth-entry` endpoint
 * expects, so connecting the real backend is a one line change (see the
 * `USE_LIVE_API` switch below).
 *
 * Example request:
 *
 *   POST /karigar/cloth-entry
 *   Content-Type: application/json
 *
 *   {
 *     "company": "rajesh-textiles",
 *     "vendor": "ramesh-kumar",
 *     "entryDate": "2026-10-20",
 *     "remark": "Lot 42",
 *     "columns": [
 *       {
 *         "column": 1,
 *         "fabric": "cotton-cambric",
 *         "totalMeters": 300,
 *         "totalThans": 3,
 *         "occupiedSlots": 1,
 *         "lines": [
 *           { "serial": 1, "row": 1, "fabric": "cotton-cambric", "meters": 100, "thans": 3, "totalMeters": 300 }
 *         ]
 *       }
 *     ],
 *     "totals": { "meters": 300, "thans": 3, "occupiedSlots": 1 }
 *   }
 *
 * No karigar endpoint exists on the backend yet, therefore the default
 * implementation only simulates the round trip and reports `persisted: false`
 * so the UI never pretends that something was written to a database.
 * ---------------------------------------------------------------------------
 */

export const KARIGAR_ENTRY_ENDPOINT = "/karigar/cloth-entry";

/** Set to `true` once the backend exposes the karigar cloth entry route. */
const USE_LIVE_API = false;

export interface KarigarEntryPayload {
  company: string;
  vendor: string;
  entryDate: string;
  remark: string;
  columns: Array<{
    column: number;
    fabric: string;
    totalMeters: number;
    totalThans: number;
    occupiedSlots: number;
    lines: Array<{
      serial: number;
      row: number;
      fabric: string;
      meters: number;
      thans: number;
      totalMeters: number;
    }>;
  }>;
  totals: {
    meters: number;
    thans: number;
    occupiedSlots: number;
  };
}

export interface KarigarSubmitResult {
  id: string;
  /** `true` only when the entry really reached the backend. */
  persisted: boolean;
  savedAt: string;
}

/** Maps the normalised entry onto the wire format. */
export function toKarigarEntryPayload(entry: KarigarEntry): KarigarEntryPayload {
  return {
    company: entry.company,
    vendor: entry.vendor,
    entryDate: entry.entryDate,
    remark: entry.remark,
    columns: entry.columns.map((column) => ({
      column: column.column,
      fabric: column.fabric,
      totalMeters: column.totalMeters,
      totalThans: column.totalThans,
      occupiedSlots: column.occupiedSlots,
      lines: column.lines.map((line) => ({
        serial: line.serial,
        row: line.row,
        fabric: line.fabric,
        meters: line.meters,
        thans: line.thans,
        totalMeters: line.totalMeters,
      })),
    })),
    totals: {
      meters: entry.totalMeters,
      thans: entry.totalThans,
      occupiedSlots: entry.occupiedSlots,
    },
  };
}

export async function submitKarigarEntry(
  payload: KarigarEntryPayload,
): Promise<KarigarSubmitResult> {
  if (USE_LIVE_API) {
    const response = await apiClient.post(KARIGAR_ENTRY_ENDPOINT, payload);
    const data = response.data as { _id?: string } | undefined;

    return {
      id: data?._id ?? "unknown",
      persisted: true,
      savedAt: new Date().toISOString(),
    };
  }

  // Simulated round trip - no backend route exists yet.
  await new Promise((resolve) => setTimeout(resolve, 350));

  return {
    id: `LOCAL-${Date.now()}`,
    persisted: false,
    savedAt: new Date().toISOString(),
  };
}

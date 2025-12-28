import { z } from "zod";

export const unitSchema = z.object({
  unitName: z.string().min(1, "Unit name is required"),
  unitShort: z.string().min(1, "Short name is required"),
});

export type UnitFormValues = z.infer<typeof unitSchema>;

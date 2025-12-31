import { z } from "zod";

export const serialNumberSchema = z.object({
  prefix: z.string().min(1, "Prefix is required"),
  startNumber: z.number().min(1, "Start number required"),
  currentNumber: z.number().min(1, "Current number required"),
});

export type SerialNumberFormValues = z.infer<typeof serialNumberSchema>;

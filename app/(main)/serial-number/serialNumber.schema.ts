import { z } from "zod";

export const serialNumberSchema = z.object({
  _id: z.string(),
  prefix: z.string().min(1, "Prefix is required"),
  startNumber: z.number(),
  currentNumber: z.number(),
});

export type SerialNumberFormValues = z.infer<typeof serialNumberSchema>;

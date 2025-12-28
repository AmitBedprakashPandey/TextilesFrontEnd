import { z } from "zod";

export const areaSchema = z.object({
  areaName: z.string().min(2, "Area name is required"),
  cityId: z.string().min(1, "City is required"),
});

export type AreaFormValues = z.infer<typeof areaSchema>;

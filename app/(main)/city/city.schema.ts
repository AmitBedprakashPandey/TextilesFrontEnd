import { z } from "zod";

export const citySchema = z.object({
  cityName: z.string().min(2, "City name required"),
});

export type CityFormValues = z.infer<typeof citySchema>;

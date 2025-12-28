"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { citySchema, CityFormValues } from "./city.schema";

export function CityForm({ onSubmit }: { onSubmit: (v: CityFormValues) => void }) {
  const form = useForm<CityFormValues>({
    resolver: zodResolver(citySchema),
    defaultValues: { cityName: "", cityCode: "" },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-muted p-4 rounded-xl">
        <FormField
          control={form.control}
          name="cityName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City Name *</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cityCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City Code</FormLabel>
              <FormControl><Input {...field} /></FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">SAVE</Button>
      </form>
    </Form>
  );
}

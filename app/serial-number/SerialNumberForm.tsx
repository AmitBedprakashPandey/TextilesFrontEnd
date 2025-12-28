"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  serialNumberSchema,
  SerialNumberFormValues,
} from "./serialNumber.schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  onSubmit: (data: SerialNumberFormValues) => void;
}

export default function SerialNumberForm({ onSubmit }: Props) {
  const form = useForm<SerialNumberFormValues>({
    resolver: zodResolver(serialNumberSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-muted p-4 rounded-xl"
      >
        <FormField
          control={form.control}
          name="prefix"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prefix *</FormLabel>
              <FormControl>
                <Input {...field} placeholder="INV" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Number *</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currentNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Number *</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Save Serial
        </Button>
      </form>
    </Form>
  );
}

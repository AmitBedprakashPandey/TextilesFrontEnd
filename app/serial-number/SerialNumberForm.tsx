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
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { useEffect } from "react";
import z from "zod";
import { createSerialNumber } from "../Redux/features/serialNumberSlice";

export default function SerialNumberForm() {
  const dispatch = useAppDispatch();
  const { currentSerialNumber, loading } = useAppSelector(
    (state) => state.serialNumber
  );

  const form = useForm<SerialNumberFormValues>({
    resolver: zodResolver(serialNumberSchema),
  });

  useEffect(() => {
    if (currentSerialNumber) {
      form.setValue("prefix", currentSerialNumber.prefix);
      form.setValue("startNumber", currentSerialNumber.startNumber);
      form.setValue("currentNumber", currentSerialNumber.currentNumber);
    }
  }, [currentSerialNumber, form]);

  function onSubmit(values: z.infer<typeof serialNumberSchema>) {
    try {
      if(currentSerialNumber){
          // dispatch(createSerialNumber(values));
      }else{

      }
    } catch (error) {
      
    }
    console.log(values);
  }

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
                <Input type="text" inputMode="numeric"  {...field} 
                onChange={(e) => {
            // Remove letters, symbols, decimals
            const cleaned = e.target.value.replace(/[^0-9]/g, "");

            // Convert to number or empty
            field.onChange(cleaned ? Number(cleaned) : "");
          }}
                />
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
                <Input type="text" inputMode="numeric" {...field} 
                onChange={(e) => {
            // Remove letters, symbols, decimals
            const cleaned = e.target.value.replace(/[^0-9]/g, "");

            // Convert to number or empty
            field.onChange(cleaned ? Number(cleaned) : "");
          }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
         {currentSerialNumber ? 
          <Button type="submit" className="w-full">
            UPDATE
          </Button> :
          <Button type="submit" className="w-full">
            SAVE
          </Button>
          } 
        </div>
      </form>
    </Form>
  );
}

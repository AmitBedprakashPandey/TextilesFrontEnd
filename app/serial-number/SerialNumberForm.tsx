"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import z, { set } from "zod";
import { useRef } from "react";
import { clearCurrentSerialNumber, createSerialNumber, setCloseModel, updateSerialNumber } from "../Redux/features/serialNumberSlice";

const serialNumberSchema = z.object({
  prefix: z.string().min(1, "Prefix is required"),
  startNumber: z.number().min(1, "Start number required"),
  currentNumber: z.number().min(0, "Current number required"),
});


export default function SerialNumberForm() {

  const prefixRef = useRef<HTMLInputElement>(null);
  const startRef = useRef<HTMLInputElement>(null);
  const currentRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const { currentSerialNumber } = useAppSelector((state) => state.serialNumber);

  const form = useForm<z.infer<typeof serialNumberSchema>>({
    resolver: zodResolver(serialNumberSchema),
  });

  const focusNext =
    (nextRef?: React.RefObject<HTMLInputElement | null>) =>
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          e.preventDefault();
          nextRef?.current?.focus();
        }
      };

  useEffect(() => {
    if (currentSerialNumber != null) {
      form.reset(currentSerialNumber);
    }
  }, [currentSerialNumber]);

  function onSubmit(values: z.infer<typeof serialNumberSchema>) {
    try {
      if (currentSerialNumber) {
        dispatch(updateSerialNumber({...values, _id: currentSerialNumber._id})).unwrap();
        toast.success("Updated Successfully");
        dispatch(clearCurrentSerialNumber());
      } else {
        dispatch(createSerialNumber(values));
        toast.success("Created Successfully");
      }
      form.reset({
          prefix: "",
          startNumber: 0,
          currentNumber: 0,
        });
        dispatch(setCloseModel());
    } catch (error) {
      alert(error)
    }
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
                <Input autoFocus {...field} ref={prefixRef} placeholder="INV" onKeyDown={focusNext(startRef)} />
              </FormControl>
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
                <Input  {...field}
                  ref={startRef}
                  onKeyDown={focusNext(currentRef)}
                  onChange={(e) => {
                    // Remove letters, symbols, decimals
                    const cleaned = e.target.value.replace(/[^0-9]/g, "");

                    // Convert to number or empty
                    field.onChange(cleaned ? Number(cleaned) : 0);
                  }}
                />
              </FormControl>
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
                <Input  {...field}
                  ref={currentRef}
                  onChange={(e) => {
                    // Remove letters, symbols, decimals
                    const cleaned = e.target.value.replace(/[^0-9]/g, "");

                    // Convert to number or empty
                    field.onChange(cleaned ? Number(cleaned) : 0);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end">
        
          <Button type="submit" className="w-full">
          {currentSerialNumber ? "Update" : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

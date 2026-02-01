"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { unitSchema, UnitFormValues } from "./unit.schema";

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
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { clearCurrentUnit, createUnit, setCloseModel, updateUnit, type unitUpdateState } from "../Redux/features/unitsSlices";
import z, { set } from "zod";


export default function UnitForm() {
  const dispatch = useAppDispatch();
  const unitNameRef = useRef<HTMLInputElement>(null);
  const unitShortRef = useRef<HTMLInputElement>(null);
  const subBtnRef = useRef<HTMLButtonElement>(null);

  const { currentUnit, loading } = useAppSelector((state) => state.unitSlice);

  const form = useForm<z.infer<typeof unitSchema>>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      unitName: "",
      unitShort: "",
    },
  });

  useEffect(() => {
    if (currentUnit) {
      form.reset(currentUnit);
    }
  }, [currentUnit]);

  function onSubmit(data: z.infer<typeof unitSchema>) {

    try {
      if (currentUnit) {
        dispatch(updateUnit({ ...data, _id: currentUnit._id})).unwrap();
        toast.success("Updated Successfully");
        form.reset();
        dispatch(setCloseModel())
        dispatch(clearCurrentUnit())
      } else {
        dispatch(createUnit(data)).unwrap();
        toast.success("Saved Successfully");
        form.reset();
        dispatch(setCloseModel())
        dispatch(clearCurrentUnit())
      }
    } catch (error) {
      toast.error("Something went wrong");
    }


  }

  const focusNext = (nextRef: React.RefObject<HTMLInputElement | HTMLButtonElement | null>) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef.current?.focus();
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
          name="unitName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit Name *</FormLabel>
              <FormControl>
                <Input {...field} ref={unitNameRef} autoFocus onFocus={(e) => e.target.select()} onKeyDown={focusNext(unitShortRef)} placeholder="Kilogram" />
              </FormControl>

            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="unitShort"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit Short *</FormLabel>
              <FormControl>
                <Input {...field} ref={unitShortRef} onFocus={(e) => e.target.select()} onKeyDown={focusNext(subBtnRef)} placeholder="kg" />
              </FormControl>

            </FormItem>
          )}
        />

        <Button type="submit" className="w-full focus:bg-green-500 focus:text-white " disabled={loading} ref={subBtnRef}>
          {currentUnit ? "Update" : "Save"}
        </Button>
      </form>
    </Form>
  );
}

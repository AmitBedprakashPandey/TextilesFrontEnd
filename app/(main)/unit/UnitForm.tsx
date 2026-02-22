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
import { useEnterNavigation } from "@/components/ReuseFunction";
import { clearCurrentUnit, createUnit, setCloseModel, updateUnit, type unitUpdateState } from "../Redux/features/unitsSlices";
import z, { set } from "zod";


export default function UnitForm() {
  const dispatch = useAppDispatch();
const formRef = useRef<HTMLFormElement>(null);

const {handleKeyDown} = useEnterNavigation({formRef,reactSelectClassName: "react-select-container"});
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

    
      if (currentUnit) {
        dispatch(updateUnit({ ...data, _id: currentUnit._id})).unwrap();
        form.reset();
        dispatch(setCloseModel())
        dispatch(clearCurrentUnit())
      } else {
        dispatch(createUnit(data)).unwrap();
        form.reset();
        dispatch(setCloseModel())
        dispatch(clearCurrentUnit())
      }
    


  }

  


  return (
    <Form {...form}>
      <form
        ref={formRef}
        onKeyDown={handleKeyDown}
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
                <Input {...field}  autoFocus onFocus={(e) => e.target.select()}  placeholder="Kilogram" />
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
                <Input {...field} onFocus={(e) => e.target.select()} placeholder="kg" />
              </FormControl>

            </FormItem>
          )}
        />

        <Button type="submit" className="w-full focus:bg-green-500 focus:text-white " disabled={loading}>
          {currentUnit ? "Update" : "Save"}
        </Button>
      </form>
    </Form>
  );
}

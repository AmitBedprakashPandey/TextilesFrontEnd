"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import Select from "react-select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { use, useEffect } from "react";
import z, { set } from "zod";
import { useRef } from "react";
import { type companyUpateState ,fetchCompanys} from "@/app/(main)/Redux/features/CompanySlice";
import { clearCurrentSerialNumber, createSerialNumber, setCloseModel, updateSerialNumber } from "../Redux/features/serialNumberSlice";
import { useEnterNavigation } from "@/components/ReuseFunction";
const serialNumberSchema = z.object({
  prefix: z.string().min(1, "Prefix is required"),
  startNumber: z.string().min(1, "Start number is required"),
  currentNumber: z.string().min(1, "Current number is required"),
  companyid: z.string().min(1, "Company is required"),
});


export default function SerialNumberForm() {

  const formRef = useRef<HTMLFormElement>(null);

  const {handleKeyDown} = useEnterNavigation({formRef,reactSelectClassName: "react-select-container"});

  const dispatch = useAppDispatch();
  const { currentSerialNumber } = useAppSelector((state) => state.serialNumber);
  const { company } = useAppSelector((state) => state.company);
  const form = useForm<z.infer<typeof serialNumberSchema>>({
    resolver: zodResolver(serialNumberSchema),
  });

  useEffect(() => {
    if (currentSerialNumber != null) {
      form.reset(currentSerialNumber);
    }
    if(company.length === 0){
        dispatch(fetchCompanys());
    }
  }, [currentSerialNumber]);

  function onSubmit(values: z.infer<typeof serialNumberSchema>) {
    try {
      if (currentSerialNumber) {
        dispatch(updateSerialNumber({...values, _id: currentSerialNumber._id})).unwrap();
        dispatch(clearCurrentSerialNumber());
      } else {
        dispatch(createSerialNumber(values));
      }
      form.reset({
          prefix: "",
          startNumber: '',
          currentNumber: "",
          companyid: ""
        });
        dispatch(setCloseModel());
    } catch (error) {
      alert(error)
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
          name="companyid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Company *</FormLabel>
              <FormControl>
                <Select<companyUpateState>
                  value={company.find((c) => c._id === field.value) || null}
                  onChange={(option) => field.onChange(option?._id)}
                  options={company}
                  autoFocus
                  getOptionLabel={(option) => option.companyName}
                  getOptionValue={(option) => option._id }
                  placeholder="Select Company"
                  classNamePrefix="react-select-container"
                  isSearchable={true}
                  isClearable={true}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      neutral0: "var(--background)",
                      neutral80: "var(--foreground)",
                      primary25: "var(--accent)",
                      primary: "var(--ring)",
                    },
                  })}
                />
              </FormControl>
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="prefix"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prefix *</FormLabel>
              <FormControl>
                <Input autoFocus {...field}  placeholder="INV"  />
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

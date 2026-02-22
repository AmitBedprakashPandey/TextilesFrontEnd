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
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { stateData } from "@/app/(main)/Redux/MockData";
import {
  companyFormSchema,
  CompanyFormValues,
} from "./companyFormSchema";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { toast } from "sonner";
import { createCompany, setCloseModel, updateCompany, clearCurrentCompany } from "../Redux/features/CompanySlice";
import { useEnterNavigation } from "@/components/ReuseFunction";

type OptionType = {
  name: string
  code: string
}

export default function CompanyForm() {
  const dispatch = useAppDispatch();
  const { currentCompany, loading } = useAppSelector((state) => state.company);


  const formRef = useRef<HTMLFormElement>(null);

  const { handleKeyDown } = useEnterNavigation({ formRef, reactSelectClassName: "react-select-container" })


  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
  });


  useEffect(() => {
    if (currentCompany) {
      form.reset(currentCompany);
    }
  }, [currentCompany, form]);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + S (Windows/Linux) OR Cmd + S (Mac)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();

        form.handleSubmit(onSubmit)();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [form, onSubmit]);

  function onSubmit(values: CompanyFormValues) {

    if (currentCompany) {
      dispatch(updateCompany({ ...values, _id: currentCompany._id })).unwrap();
      dispatch(clearCurrentCompany())
    } else {
      dispatch(createCompany(values)).unwrap();
      dispatch(clearCurrentCompany())
    }
    dispatch(setCloseModel())
    form.reset()


  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onKeyDown={handleKeyDown}

        onSubmit={form.handleSubmit(onSubmit)}
        onErrorCapture={() => console.log(form.formState.errors)}
        className="space-y-6 max-w-4xl mx-auto p-6 rounded-xl"
      >
        {/* Company Info */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Company Name *</FormLabel>
                <FormControl>
                  <Input {...field} autoFocus onChange={(e) => {
                    const val = e.target.value.replace(/[^a-z A-Z .]/g, "");
                    field.onChange(val);
                  }} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ownerName"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Owner Name *</FormLabel>
                <FormControl>
                  <Input {...field}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^a-z A-Z]/g, "");
                      field.onChange(val);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />



        </div>




        {/* Billing Address */}
        <h3 className="font-semibold">Billing Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="billingStreet1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street 1 *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="billingStreet2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street 2</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="billingStreet3"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street 3</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="billingMobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile No *</FormLabel>
                <FormControl>
                  <Input {...field}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, "");
                      field.onChange(val.slice(0, 10));
                    }}
                  />
                </FormControl>

              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="billingPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone No</FormLabel>
                <FormControl>
                  <Input {...field}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, "");
                      field.onChange(val.slice(0, 10));
                    }}
                  />
                </FormControl>

              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="billingEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gstin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GSTIN</FormLabel>
                <FormControl>
                  <Input {...field}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
                      field.onChange(val.slice(0, 15));
                    }}
                  />
                </FormControl>

              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PAN</FormLabel>
                <FormControl>
                  <Input {...field}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
                      field.onChange(val.slice(0, 10));
                    }}
                  />
                </FormControl>

              </FormItem>
            )}
          />
        </div>

        {/* state/city/pincode */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">
                  State *
                </FormLabel>
                <FormControl>
                  <Select<OptionType>
                    tabIndex={0}
                    classNamePrefix={"react-select"}
                    value={stateData.find(o => o.name === field.value) ?? null}
                    onChange={(val) => field.onChange(val?.name)}
                    options={stateData}
                    getOptionValue={(opt) => opt.name}
                    getOptionLabel={(opt) => opt.name}
                    isSearchable={true}
                    isClearable={true}
                    placeholder="Select state"
                    className="col-span-4"
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        neutral0: "var(--background)",
                        neutral80: "var(--foreground)",
                        primary25: "var(--accent)",
                        primary: "var(--ring)",
                      },
                    })} />

                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">
                  City *
                </FormLabel>
                <FormControl>
                  <Input type="text" className="w-full" {...field}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^a-zA-Z]/g, "");
                      field.onChange(val);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pincode *</FormLabel>
                <FormControl>
                  <Input className="w-full" {...field}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      field.onChange(val.slice(0, 6));
                    }}

                  />
                </FormControl>
              </FormItem>
            )}
          />


        </div>

        <div className="flex justify-end">

          <Button type="submit" variant="default" className="focus:bg-green-500">
            {currentCompany ? "UPDATE" : "SAVE"}
          </Button>
        </div>
      </form>
    </Form>
  );
}


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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import {
  companyFormSchema,
  CompanyFormValues,
} from "./companyFormSchema";
import { useEffect } from "react";

export default function CompanyForm() {
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      companyName: "",
      ownerName: "",
      gstin: "",
    },
  });

  useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (
      (e.ctrlKey || e.metaKey) &&
      e.key.toLowerCase() === "s"
    ) {
      e.preventDefault(); // stop browser save
      form.handleSubmit(onSubmit)();
      close();
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [form]);


  function onSubmit(values: CompanyFormValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
                  <Input {...field} />
                </FormControl>                
              </FormItem>
            )}
          />

            <FormField
            control={form.control}
            name="ownerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Owner Name *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

         

        

          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank & Branch</FormLabel>
                <FormControl>
                  <Input className="w-full" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bankAccNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank A/C No</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* State / City / Area / Tax */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {["state", "city", "area"].map((name) => (
            <FormField
              key={name}
              control={form.control}
              name={name as keyof CompanyFormValues}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {name.replace(/([A-Z])/g, " $1") + "*"}
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={`Select ${name}`} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                    </SelectContent>
                  </Select>
                  
                </FormItem>
              )}
            />
          ))}
             <FormField
            control={form.control}
            name="pincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pincode *</FormLabel>
                <FormControl>
                  <Input className="w-full" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Billing Address */}
        <h3 className="font-semibold">Billing Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField form={form} name="billingStreet1" label="Street 1 *" />
          <InputField form={form} name="billingStreet2" label="Street 2" />
          <InputField form={form} name="billingStreet3" label="Street 3" />
          <InputField form={form} name="billingMobile" label="Mobile No *"  />
          <InputField form={form} name="billingPhone" label="Phone No" />
          <InputField form={form} name="billingEmail" label="Email" />
        </div>

        {/* Shipping Address */}
        <h3 className="font-semibold">Shipping Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField form={form} name="shippingStreet1" label="Street 1" />
          <InputField form={form} name="shippingStreet2" label="Street 2" />
          <InputField form={form} name="shippingStreet3" label="Street 3" />
          <InputField form={form} name="shippingMobile" label="Mobile No" />
          <InputField form={form} name="shippingPhone" label="Phone No" />
          <InputField form={form} name="shippingEmail" label="Email" />
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="default">SAVE</Button>
          <Button type="submit" variant="default">UPDATE</Button>
        </div>
      </form>
    </Form>
  );
}

function InputField({
  form,
  name,
  label,
}: {
  form: any;
  name: string;
  label: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          
        </FormItem>
      )}
    />
  );
}

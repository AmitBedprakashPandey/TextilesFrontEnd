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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

import { vendorSchema, VendorFormValues } from "./vendorSchema";
import { useEffect, useRef } from "react";
import { Separator } from "@/components/ui/separator";

export default function VendorForm() {

    const form = useForm<VendorFormValues>({
        resolver: zodResolver(vendorSchema),
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


    const onSubmit = (data: VendorFormValues) => {
        console.log(data);
    };



    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 p-6 bg-muted rounded-xl"
            >
                {/* Vendor Category */}
                <FormField
                    control={form.control}
                    name="vendorCategory"

                    render={({ field }) => (
                        <FormItem className="max-w-sm">
                            <FormLabel>Vendor Category *</FormLabel>
                            <Select onValueChange={field.onChange} defaultOpen>
                                <FormControl>
                                    <SelectTrigger className="min-w-sm">
                                        <SelectValue placeholder="Select Vendor Category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="local">Local</SelectItem>
                                    <SelectItem value="international">International</SelectItem>
                                </SelectContent>
                            </Select>

                        </FormItem>
                    )}
                />

                {/* Row 1 */}




                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputField form={form} name="companyName" label="Company Name *" />
                    <InputField form={form} name="nickName" label="Nick Name" />
                    <FormField
                        control={form.control}
                        name="ownerName"

                        render={({ field }) => (
                            <FormItem className="">
                                <FormLabel>Owner Name *</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />


                </div>
                <div>

                    <InputField form={form} name="gstin" label="GSTIN" />
                </div>
                <Separator />

                <div>
                    <InputField form={form} name="street1" label="Street 1 *" />
                    <InputField form={form} name="street2" label="Street 2" />

                </div>
                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <SelectField form={form} name="state" label="State *" />
                    <SelectField form={form} name="city" label="City *" />
                    <SelectField form={form} name="area" label="Area *" />
                    <InputField form={form} name="pincode" label="Pincode" />
                </div>

                <Separator />

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputField form={form} name="bankName" label="Bank Name" />
                    <InputField form={form} name="bankAccNo" label="Bank Acc No" />


                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputField form={form} name="mobile" label="Mobile No *" />
                    <InputField form={form} name="phone" label="Phone No" />
                    <InputField form={form} name="email" label="Email" />

                </div>



                <div className="flex justify-end">
                    <Button type="submit">SAVE</Button>
                    <Button type="submit">UPDATE</Button>
                </div>
            </form>
        </Form>
    );
}

/* ---------- Reusable Components ---------- */

function InputField({ form, name, label }: any) {
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

function SelectField({ form, name, label }: any) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Select onValueChange={field.onChange}>
                        <FormControl>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={`Select ${label}`} />
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
    );
}

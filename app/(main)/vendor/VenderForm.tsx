"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { stateData, vendorCategoryData } from "@/app/(main)/Redux/MockData";
import { VendorFormValues, vendorUpdateSchema } from "./vendorSchema";
import { useEffect, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { updateVendor, createVendor, setCloseModel, clearCurrentVendor } from "@/app/(main)/Redux/features/VendorSlice";
import { fetchvendorCatagory } from "@/app/(main)/Redux/features/vendorCatagorySlice";
import { useEnterNavigation } from "@/components/ReuseFunction";
import { toast } from "sonner";
import { RefreshCcw } from "lucide-react";

interface SelectOption {
    name: string;
}
export default function VendorForm() {

    const dispatch = useAppDispatch();
    const { currentVendor, loading } = useAppSelector((state) => state.vendor);

    const formRef = useRef<HTMLFormElement>(null);

    const { handleKeyDown } = useEnterNavigation({ formRef, reactSelectClassName: "vendor-container" })

    const form = useForm<VendorFormValues>({
        resolver: zodResolver(vendorUpdateSchema),
    });

    const onSubmit = (data: VendorFormValues) => {
            if (currentVendor) {
                dispatch(updateVendor({ ...data, _id: currentVendor._id }))
                dispatch(clearCurrentVendor())
                dispatch(setCloseModel())

            } else {
                dispatch(createVendor(data))
                dispatch(setCloseModel())
                dispatch(clearCurrentVendor())
            }

    };

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

    useEffect(() => {
        if (currentVendor) {
            form.reset(currentVendor);
        }
    }, [currentVendor]);

    return (
        <Form {...form}>
            <form
            ref={formRef}
            onKeyDown={handleKeyDown}
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3 p-6 rounded-xl relative"
            >
                {/* Vendor Category */}
                <FormField
                            control={form.control}
                            name="vendorCategory"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="capitalize">
                                  Vendor Category *
                                </FormLabel>
                                <FormControl>
                                  <Select<SelectOption>
                                    tabIndex={0}
                                    classNamePrefix={"react-select"}
                                    value={vendorCategoryData.find(option => option.name === field.value) || null}
                                    onChange={(val) => field.onChange(val?.name)}
                                    options={vendorCategoryData}
                                    getOptionValue={(opt) => opt.name}
                                    getOptionLabel={(opt) => opt.name}
                                    isSearchable={true}
                                    isClearable={true}
                                    autoFocus
                                    placeholder="Select vendor category"
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

                <Separator />
                <div className="grid grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="vendorname"

                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormLabel>Company Name *</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="ownername"

                        render={({ field }) => (
                            <FormItem className="max-w-sm">
                                <FormLabel>Owner Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>

                            </FormItem>
                        )}
                    />


                </div>

                <Separator />
                <div className="grid grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="gstin"

                        render={({ field }) => (
                            <FormItem className="max-w-sm">
                                <FormLabel>GST</FormLabel>
                                <FormControl>
                                    <Input {...field} onChange={(e)=>{
                                            field.onChange(e.target.value.slice(0, 15));
                                            
                                    }}/>
                                </FormControl>

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="pan"

                        render={({ field }) => (
                            <FormItem className="max-w-sm">
                                <FormLabel>PAN</FormLabel>
                                <FormControl>
                                    <Input {...field} 
                                    onChange={(e)=>field.onChange(e.target.value.slice(0,10))}
                                    />
                                </FormControl>

                            </FormItem>
                        )}
                    />
                </div>

                <Separator />
                <div className="flex items-center gap-3">
                    <FormField
                        control={form.control}
                        name="address"

                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Address *</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="address1"

                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Address 1</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>

                            </FormItem>
                        )}
                    />

                </div>

                <Separator />
                <div className="grid grid-cols-3 gap-3">
                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>State *</FormLabel>
                                <FormControl>
                                    <Select<SelectOption>
                                        options={stateData}
                                        getOptionLabel={(option) => option.name}
                                        getOptionValue={(option) => option.name}
                                        onChange={(option) => form.setValue("state", option ? option.name : "")}
                                        value={stateData.find(option => option.name === field.value) || null}
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
                                        })}

                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem className="max-w-sm">
                                <FormLabel>City *</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>

                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="pincode"
                        render={({ field }) => (
                            <FormItem className="max-w-sm">
                                <FormLabel>Pin Code *</FormLabel>
                                <FormControl>
                                    <Input {...field} 
                                    
                                    onChange={(e)=>field.onChange(e.target.value.slice(0,6))}
                                    />
                                </FormControl>

                            </FormItem>
                        )}
                    />



                </div>

                <Separator />
                <div className="grid grid-cols-3 gap-3">
                    <FormField
                        control={form.control}
                        name="mobile"

                        render={({ field }) => (
                            <FormItem className="max-w-sm">
                                <FormLabel>Mobile No. *</FormLabel>
                                <FormControl>
                                    <Input inputMode="numeric" {...field} 
                                    onChange={(e)=>{
                                        const val = e.target.value.replace(/[^0-9]/g,"")
                                        field.onChange(val.slice(0,10))
                                    }}
                                    />
                                </FormControl>

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem className="max-w-sm">
                                <FormLabel>Phone No.</FormLabel>
                                <FormControl>
                                    <Input inputMode="numeric" {...field} 
                                    onChange={(e)=>{
                                        const val = e.target.value.replace(/[^0-9]/g,"")
                                        field.onChange(val.slice(0,10))
                                    }}
                                    />
                                </FormControl>

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="max-w-sm">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>

                            </FormItem>
                        )}
                    />


                </div>

                <Separator />

                <div className="grid grid-cols-4 gap-3">
                    <FormField
                        control={form.control}
                        name="bankname"
                        render={({ field }) => (
                            <FormItem className="max-w-sm">
                                <FormLabel>Bank Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="accountno"
                        render={({ field }) => (
                            <FormItem className="max-w-sm">
                                <FormLabel>Account No.</FormLabel>
                                <FormControl>
                                    <Input {...field} 
                                    onChange={(e)=>{
                                        const val = e.target.value.replace(/^[0-9]/g,"")
                                        field.onChange(val.slice(0,18))
                                    }}
                                    />
                                </FormControl>
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="ifsc"
                        render={({ field }) => (
                            <FormItem className="max-w-sm">
                                <FormLabel>IFSC Code</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                    onChange={(e)=>{
                                        
                                        field.onChange(e.target.value.slice(0,11))
                                    }}
                                    />
                                </FormControl>
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="branch"
                        render={({ field }) => (
                            <FormItem className="max-w-sm">
                                <FormLabel>Branch</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )} />


                </div>
                <Separator />


                <div className="flex justify-end">
                    <Button type="submit" variant="default" disabled={loading}>
                        {loading && <div className="animate-spin h-5 w-5 mr-2"><RefreshCcw /></div>}{currentVendor ? "UPDATE" : "SAVE"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}



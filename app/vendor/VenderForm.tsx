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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { VendorFormValues, vendorUpdateSchema } from "./vendorSchema";
import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { updateVendor, createVendor, setCloseModel, clearCurrentVendor } from "@/app/Redux/features/VendorSlice";
import { fetchvendorCatagory } from "@/app/Redux/features/vendorCatagorySlice";
import { toast } from "sonner";
import { RefreshCcw } from "lucide-react";

export default function VendorForm() {

    const dispatch = useAppDispatch();
    const { vendorCatagory } = useAppSelector((state) => state.vendorCategory);
    const { currentVendor, loading } = useAppSelector((state) => state.vendor);

    useEffect(() => {
        dispatch(fetchvendorCatagory());
    }, [dispatch]);

    const form = useForm<VendorFormValues>({
        resolver: zodResolver(vendorUpdateSchema),
    });

    const onSubmit = (data: VendorFormValues) => {
        try {
            if(currentVendor){
                dispatch(updateVendor({...data,_id:currentVendor._id}))
                 toast.success("Vendor Updated Successfully")
                dispatch(clearCurrentVendor())
                dispatch(setCloseModel())

            }else{
                dispatch(createVendor(data))
                toast.success("Vendor Created Successfully")
                dispatch(setCloseModel())
                dispatch(clearCurrentVendor())
            }
        } catch (error) {
            console.log(error)
            toast.error("Something Went Wrong")
            
        }

    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3 p-6 rounded-xl relative"
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
                                    {vendorCatagory.map((Item, index) => (
                                        <SelectItem key={index} value={Item.name}>{Item.name}</SelectItem>
                                    ))}

                                </SelectContent>
                            </Select>

                        </FormItem>
                    )}
                />

                <Separator />
                <div className="flex items-center gap-3">
                    <FormField
                        control={form.control}
                        name="companyname"

                        render={({ field }) => (
                            <FormItem className="max-w-sm">
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
                    <FormField
                        control={form.control}
                        name="gstin"

                        render={({ field }) => (
                            <FormItem className="max-w-sm">
                                <FormLabel>GST</FormLabel>
                                <FormControl>
                                    <Input {...field} />
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
                                    <Input {...field} />
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
                                    <Select {...field} onValueChange={(e)=>form.setValue("state" ,e)}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select State" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                                            <SelectItem value="Arunachal Pradesh">Arunachal Pradesh</SelectItem>
                                            <SelectItem value="Assam">Assam</SelectItem>
                                            <SelectItem value="Bihar">Bihar</SelectItem>
                                            <SelectItem value="Chhattisgarh">Chhattisgarh</SelectItem>
                                            <SelectItem value="Goa">Goa</SelectItem>
                                            <SelectItem value="Gujarat">Gujarat</SelectItem>
                                            <SelectItem value="Haryana">Haryana</SelectItem>
                                            <SelectItem value="Himachal Pradesh">Himachal Pradesh</SelectItem>
                                            <SelectItem value="Jharkhand">Jharkhand</SelectItem>
                                            <SelectItem value="Karnataka">Karnataka</SelectItem>
                                            <SelectItem value="Kerala">Kerala</SelectItem>
                                            <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
                                            <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                                            <SelectItem value="Manipur">Manipur</SelectItem>
                                            <SelectItem value="Meghalaya">Meghalaya</SelectItem>
                                            <SelectItem value="Mizoram">Mizoram</SelectItem>
                                            <SelectItem value="Nagaland">Nagaland</SelectItem>
                                            <SelectItem value="Odisha">Odisha</SelectItem>
                                            <SelectItem value="Punjab">Punjab</SelectItem>
                                            <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                                            <SelectItem value="Sikkim">Sikkim</SelectItem>
                                            <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                                            <SelectItem value="Telangana">Telangana</SelectItem>
                                            <SelectItem value="Tripura">Tripura</SelectItem>
                                            <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                                            <SelectItem value="Uttarakhand">Uttarakhand</SelectItem>
                                            <SelectItem value="West Bengal">West Bengal</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                        name="mobile"

                        render={({ field }) => (
                            <FormItem className="max-w-sm">
                                <FormLabel>Mobile No. *</FormLabel>
                                <FormControl>
                                    <Input inputMode="numeric" {...field} />
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
                                    <Input {...field} />
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
                                    <Input {...field} />
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
                                    <Input {...field} />
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

                <div>
                    <FormField
                        control={form.control}
                        name="gsttype"
                        render={({ field }) => (
                            <FormItem className="max-w-sm">
                                <FormLabel>GST Type</FormLabel>
                                <FormControl>
                                <Select {...field} onValueChange={(e)=>form.setValue("gsttype" ,e)}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select GST Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="CGST/SGST">CGST/SGST</SelectItem>
                                            <SelectItem value="IGST">IGST</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                </div>


                <div className="flex justify-end">
                    <Button type="submit" variant="default" disabled={loading}>
                        {loading && <div className="animate-spin h-5 w-5 mr-2"><RefreshCcw/></div>}{currentVendor ? "UPDATE" : "SAVE"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}



"use client"
import CustomDialog from "@/components/CustomDialog";
import VendorForm from "./VenderForm";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";
import {fetchVendor,setOpenModel,setCloseModel,clearCurrentVendor}from "@/app/Redux/features/VendorSlice" 
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import VenderTable from "./VenderTable";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";

export default function page() {
    const dispatch = useAppDispatch();
    const {loading,openModel} = useAppSelector((state) => state.vendor);
    const [open, setOpen] = useState(false);
    return (
        <div className="max-h-full overflow-y-auto p-5">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center py-3" >
                        <Label className="text-2xl">Vendor</Label>
                        <Button type="button" variant={"default"} onClick={() => { dispatch(setOpenModel(true)); dispatch(clearCurrentVendor())}}><Plus />Create</Button>
                    </div>
                </CardHeader>
            </Card>
            <Card className="mt-">
                <CardContent>
                    <CustomDialog open={openModel} children={<VendorForm />} title="Vendor Details" close={() => dispatch(setCloseModel())} />
                    <VenderTable />
                </CardContent>
            </Card>
        </div>)
}
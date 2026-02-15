"use client"
import CustomDialog from "@/components/CustomDialog";
import VendorForm from "./VenderForm";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";
import { fetchVendor, setOpenModel, setCloseModel, clearCurrentVendor } from "@/app/(main)/Redux/features/VendorSlice"
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import VenderTable from "./VenderTable";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import CustomLoading from "@/components/CustomLoading";

export default function page() {
    const dispatch = useAppDispatch();
    const { loading, openModel } = useAppSelector((state) => state.vendor);
    const [open, setOpen] = useState(false);
    return (<div className="w-full h-full relative overflow-hidden">
        <div className="w-full flex items-center justify-between mb-5">
            <Label className="text-2xl">Vendor</Label>
            <Button type="button" variant={"default"} onClick={() => { dispatch(setOpenModel(true)); dispatch(clearCurrentVendor()) }}><Plus />Create</Button>
        </div>

                <CustomDialog open={openModel} children={<VendorForm />} title="Vendor Details" close={() => dispatch(setCloseModel())} />
                <VenderTable />
                {loading && <CustomLoading />}

    </div>)
}
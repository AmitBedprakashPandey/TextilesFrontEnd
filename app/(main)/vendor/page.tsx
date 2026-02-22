"use client"
import CustomDialog from "@/components/CustomDialog";
import VendorForm from "./VenderForm";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCcw } from "lucide-react";
import { Label } from "@/components/ui/label";
import { setOpenModel, setCloseModel, clearCurrentVendor, clearMessage, clearError, fetchVendor} from "@/app/(main)/Redux/features/VendorSlice";
import VenderTable from "./VenderTable";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import CustomLoading from "@/components/CustomLoading";
import { use, useEffect } from "react";
import { toast } from "sonner";

export default function page() {
    const dispatch = useAppDispatch();
    const { vendorList,loading, openModel, error, message} = useAppSelector((state) => state.vendor);

    useEffect(() => {
        if(vendorList.length === 0){
            dispatch(fetchVendor());
        }
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
        if (message) {
            toast.success(message);
            dispatch(clearMessage());
        }
    }, [error, message, dispatch]);

    

    return (<div className="w-full h-full relative overflow-hidden">
        <div className="w-full flex items-center justify-between mb-5">
            <Label className="text-2xl">Vendor</Label>
                <div className="flex gap-3 items-center">
                <Button type="button" variant={"default"} onClick={() => { dispatch(setOpenModel(true)); dispatch(clearCurrentVendor()) }}><Plus />Create</Button>
                <Button type="button" variant={"default"} ><RefreshCcw /></Button>
                </div>
        </div>

            <CustomDialog open={openModel} children={<VendorForm />} title="Vendor Details" close={() => dispatch(setCloseModel())} />
            <VenderTable />
    
            {loading && <CustomLoading />}

    </div>)
}
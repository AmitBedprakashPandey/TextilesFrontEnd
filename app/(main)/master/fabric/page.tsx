"use client"
import { Button } from "@/components/ui/button";
import { Plus, RefreshCcw } from "lucide-react";
import FabricCatagoryTable from "./FabricCatagoryTable";
import CustomDialog from "@/components/CustomDialog";
import FabricCatagoryForm from "./FabricCatagoryForm";
import { useState } from "react";

export default function FabricPage() {
    const [open, setOpen] = useState<boolean>(false);

    return (
        (<div className="w-full h-full">

            <div className="flex justify-between items-center">
                Fabric Catagory

                <div className="flex gap-3 items-center">
                    <Button type="button" variant={"default"} onClick={() => setOpen(true)}><Plus/> Create</Button>
                    <Button type="button" variant={"default"}><RefreshCcw/></Button>
                </div>


            </div>
                <FabricCatagoryTable/>
                <CustomDialog children={<FabricCatagoryForm/>} open={open} close={() => setOpen(false)} title="Fabric Catagory" />
        </div>
        )
    )
}
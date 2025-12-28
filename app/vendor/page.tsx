"use client"
import CustomDialog from "@/components/CustomDialog";
import VendorForm from "./VenderForm";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import VenderTable from "./VenderTable";

export default function page() {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <div className="max-h-full overflow-y-auto p-5">
            <Card>
                <CardHeader>
            <div className="flex justify-between items-center py-3" >
                <Label className="text-2xl">Vendor</Label>
                <Button type="button" variant={"default"} onClick={() => setOpen(true)}><Plus />Create</Button>
            </div>

                </CardHeader>
                </Card>
                <Card className="mt-3">
                    <CardContent>
            <CustomDialog open={open} children={<VendorForm />} title="Vendor Details" close={() => setOpen(false)} />
                    <VenderTable/>
                    </CardContent>
                    </Card>

           


        </div>)
}
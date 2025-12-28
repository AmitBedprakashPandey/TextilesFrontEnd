"use client";

import { useState } from "react";
import SerialNumberForm from "./SerialNumberForm";
import SerialNumberList from "./SerialNumberList";
import { SerialNumberFormValues } from "./serialNumber.schema";
import CustomDialog from "@/components/CustomDialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SerialNumberPage() {
    const [serials, setSerials] = useState<any[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    return (
        <div className="p-5 max-h-full overflow-y-auto">
            <Card>
                <CardHeader>

            <div className="flex justify-between px-5 py-3">
                <Label className="font-bold text-2xl">Serial Number</Label>
                <Button onClick={() => setOpen(true)} className="capitalize"><Plus /> Create</Button>
            </div>
                </CardHeader>
            </Card>
            <Card className="mt-3">
                <CardContent>
<CustomDialog open={open} close={() => setOpen(false)} title="Serial Number Details"
                children={<SerialNumberForm onSubmit={(data: SerialNumberFormValues) => setSerials([...serials, { id: Date.now(), ...data }])} />} />


            <SerialNumberList data={serials} />
                </CardContent>
            </Card>

            
        </div>
    );
}

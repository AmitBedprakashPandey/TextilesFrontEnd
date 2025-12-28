"use client"
import { useState } from "react";
import CompanyForm from "./CompanyForm"
import CustomeDialog from "@/components/CustomDialog";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Label } from "@/components/ui/label";
import { Edit, Plus, Trash } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CompanyTable from "./CompanyTable";

export default function page() {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <div className="max-h-full overflow-y-auto  p-5">
            <Card>
                <CardHeader>

            <div className="flex  justify-between py-3">

                <Label className="font-bold text-2xl">Company List</Label>
                <Button onClick={() => setOpen(true)} className="capitalize"><Plus /> Create</Button>
            </div>
                </CardHeader>
            </Card>
            <Card  className="mt-3">
<CardContent >
            <CustomeDialog open={open} close={() => setOpen(false)} title="Company Details" children={<CompanyForm />} />
<CompanyTable/>
</CardContent>
            </Card>
           

        </div>
    )
}

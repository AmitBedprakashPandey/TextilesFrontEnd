"use client"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, IndianRupee, PackagePlus, Printer, Receipt, Trash, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useState } from "react";
import FabriRecivedForm from "./FabricForm";
import PaymentForm from "./PaymentForm";
import { useAppSelector,useAppDispatch } from "../Redux/hooks";
import CustomDialog from "@/components/CustomDialog";
import { setOpenFabric,setOpenPayment } from "@/app/(main)/Redux/features/TailorFabricSlice";
import { openInNewTab } from "@/components/ReuseFunction";
import CustomeCofirmDailog from "@/components/CustomeCofirmDailog";

export default function FabricTable() {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState({open:false,id:""});
const dispatch = useAppDispatch()
    const { fabricStatus,openFabric,openPayment } = useAppSelector((state) => state.TailorFabric)

    const printPaper = () => {
        // openInNewTab({data});
    }

    const handleDelete = (id: string) => {
        // Implement delete logic here, e.g., call an API to delete the item
        console.log(`Deleting item with id: ${id}`);
        setDeleteDialogOpen({open:false,id:""});
    }


    return (<div className="w-full relative">
        <div className=" p-2 border-b">
            <div className="px-3 flex items-center gap-10">
                <div>
                    <Label>Bill No.</Label>
                    <Input type="text" placeholder="enter number" className="max-w-28 mt-1" />
                </div>
                <div>
                    <Label>Search Vendor Name</Label>
                    <Input type="text" placeholder="enter name" className="max-w-56 mt-1" />
                </div>
                <div>
                    <Label>Search Date</Label>
                    <Input type="date" placeholder="select date" className="max-w-56 mt-1" />
                </div>
            </div>
        </div>
        <div className="h-[80dvh] relative overflow-y-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-10">#</TableHead>
                        <TableHead>Bill No.</TableHead>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Vendor Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Total Meters</TableHead>
                        <TableHead>Total Thaans</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">1</TableCell>
                        <TableCell>110</TableCell>
                        <TableCell>Sheetal</TableCell>
                        <TableCell>Mujeeb</TableCell>
                        <TableCell>23/07/2025</TableCell>
                        <TableCell>1262.20</TableCell>
                        <TableCell>60</TableCell>
                        <TableCell className="flex justify-center items-center gap-2">
                            <Button type="button" ><Edit /></Button>
                            <Button type="button" onClick={() => dispatch(setOpenFabric(true))}><PackagePlus /></Button>
                            <Button type="button" onClick={() => dispatch(setOpenPayment(true))}><IndianRupee /></Button>
                            <Button type="button" onClick={printPaper} ><Printer /></Button>
                            <Button type="button" ><Receipt /></Button>
                            <Button type="button" onClick={() => setDeleteDialogOpen({open:true,id:"123"})}><Trash /></Button>
                            
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>


        {/* Recived Fabric & Payment */}
       
<CustomeCofirmDailog open={deleteDialogOpen.open} close={() => setDeleteDialogOpen({open:false,id:""})} confirm={() => {}} lable="Delete" />
        <CustomDialog   open={openPayment} close={() => dispatch(setOpenPayment(false))} title="Payment Entry"> <PaymentForm /> </CustomDialog>

        <CustomDialog   open={openFabric} close={() => dispatch(setOpenFabric(false))} title="Fabric Received Entry"> <FabriRecivedForm /> </CustomDialog>


    </div>
    )
}


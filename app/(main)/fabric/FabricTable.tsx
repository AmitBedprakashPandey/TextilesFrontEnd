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


export default function FabricTable() {
const dispatch = useAppDispatch()
    const { fabricStatus,openFabric,openPayment } = useAppSelector((state) => state.TailorFabric)

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
                            <Button type="button" ><Printer /></Button>
                            <Button type="button" ><Receipt /></Button>
                            <AlertDialog>
                                <AlertDialogTrigger> <Button type="button" variant="destructive" className="rounded-full"><Trash /></Button></AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your account
                                            and remove your data from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>


        {/* Recived Fabric & Payment */}
       

        <CustomDialog   open={openPayment} close={() => dispatch(setOpenPayment(false))} title="Payment Entry"> <PaymentForm /> </CustomDialog>

        <CustomDialog   open={openFabric} close={() => dispatch(setOpenFabric(false))} title="Fabric Received Entry"> <FabriRecivedForm /> </CustomDialog>


    </div>
    )
}


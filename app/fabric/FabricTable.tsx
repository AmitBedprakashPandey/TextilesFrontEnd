"use client"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, IndianRupee, PackagePlus, Trash, X } from "lucide-react";
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
import { setOpenFabric,setOpenPayment } from "@/app/Redux/features/TailorFabricSlice";


export default function FabricTable() {
const dispatch = useAppDispatch()
    const { fabricStatus,openFabric,openPayment } = useAppSelector((state) => state.TailorFabric)

    return (<>
        <div className=" p-2 border-b">
            <div className="px-3 flex items-center gap-10">
                <div>
                    <Label>Bill No.</Label>
                    <Input type="text" placeholder="enter number" className="max-w-28 mt-1" />
                </div>
                <div>
                    <Label>Search Name</Label>
                    <Input type="text" placeholder="enter name" className="max-w-56 mt-1" />
                </div>
                <div>
                    <Label>Search Date</Label>
                    <Input type="date" placeholder="select date" className="max-w-56 mt-1" />
                </div>
            </div>
        </div>
        <div>
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
                            <Button type="button" onClick={() => setOpen(true)}><PackagePlus /></Button>
                            <Button type="button" onClick={() => setOpenPayment(true)} variant="outline"><IndianRupee /></Button>
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
        {false && <div onKeyDown={() => addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false))} className="absolute top-0 bottom-0 overflow-hidden max-h-screen left-0 right-0 p-5 bg-gray-500/30 z-50">
            <div className="bg-white dark:bg-slate-800 w-full h-full relative" >
                {/* <div className="flex scale-95 items-center justify-between px-5 py-3 border-b">
                    <h1>Recived Fabric & Payment Entry</h1>
                    <Button type="button" onClick={() => setOpen(false)} variant={"destructive"} className="rounded-full"><X /></Button>
                </div>
                <div className="grid scale-95 grid-cols-2 gap-2 max-h-full relative">
                    <div className="flex flex-col gap-3">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center gap-3">
                                <Label>Fabric Recived</Label>
                                
                                <div className="flex items-center gap-3">
                                    <p>Total Meters : <strong>12652.25</strong></p>
                                    <p>Balance Meters : <strong>12652.25</strong></p>
                                </div>

                                </div>
                            </CardHeader>
                            <CardContent>
                                <FabriRecivedForm />
                            </CardContent>
                        </Card>

                    </div>

                    <div className="flex flex-col gap-3">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between ga-3">

                                <Label>Payment Status</Label>
                                <div className="flex items-center gap-3">
                                    <p>Total Amount : <strong>12652.25</strong></p>
                                    <p>Balance Amount : <strong>12652.25</strong></p>
                                </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <PaymentForm />
                            </CardContent>
                        </Card>

                    </div>
                </div> */}
                {/* narration */}
                {/* <div className="absolute bottom-0 left-0 right-0 bg-slate-900 flex justify-between items-center gap-3 px-5">
                    <div className="w-2xl p-2">
                        <Label>Narration</Label>
                        <Textarea name="narr" rows={4} maxLength={400} className="max-h-lg mt-3 resize-y" placeholder="Enter Narration" />
                    </div>
                    <div className="flex items-center gap-3 mt-5 justify-end">
                        <div className="flex flex-col gap-3">
                            <Label>Grand Meters</Label>
                            <Input inputMode="decimal" value={fabricStatus.grandMeters} disabled type="number" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Diff. Meters</Label>
                            <Input inputMode="decimal" value={fabricStatus.diffMeters} disabled type="number" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Grand Amount</Label>
                            <Input inputMode="numeric" disabled type="number" value={fabricStatus.grandAmount} />
                        </div>

                        <div className="flex flex-col gap-3">
                            <Label>Pending Amount</Label>
                            <Input inputMode="numeric" disabled type="number" value={fabricStatus.pendingAmount} />
                        </div>
                        <Button type="button" className="mt-6" >Save</Button>
                    </div>
                </div> */}
            </div>
        </div>}

        <CustomDialog   open={openPayment} close={() => setOpenPayment(false)} title="Payment Entry"> <PaymentForm /> </CustomDialog>

<CustomDialog   open={open} close={() => setOpen(false)} title="Fabric Received Entry"> <FabriRecivedForm /> </CustomDialog>


    </>
    )
}


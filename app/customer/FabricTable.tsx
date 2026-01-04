import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
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
} from "@/components/ui/alert-dialog"

export default function FabricTable() {
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
                        <TableCell className="flex justify-center items-center gap-5">
                            <Button type="button" ><Edit /></Button>
                            <AlertDialog>
                                <AlertDialogTrigger><Trash /></AlertDialogTrigger>
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
    </>
    )
}
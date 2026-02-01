import { Button } from "@/components/ui/button";
import { Table,TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import {  Edit, Trash } from "lucide-react";
import { use } from "react";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { setOpenModel } from "../Redux/features/CompanySlice";

export default function CompanyTable() {
    const {company} = useAppSelector((state) => state.company);
    const dispatch = useAppDispatch();

    return(<>
     <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-10">#</TableHead>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Area</TableHead>
                        <TableHead>Pincode</TableHead>
                        <TableHead className="">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>

                        <TableCell className="font-medium">1</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell className="">
                            <div className="flex gap-3">
                                <Button type="button" onClick={()=>dispatch(setOpenModel(true))} ><Edit /></Button>
                                <Button type="button" variant={"destructive"}><Trash /></Button>
                            </div>
                        </TableCell>

                    </TableRow>
                </TableBody>
            </Table>
    
    </>)
}
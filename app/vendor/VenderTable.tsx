import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { setOpenModel,SetCurrentVendor} from "@/app/Redux/features/VendorSlice";

export default function VenderTable() {

    const dispatch= useAppDispatch()
    const {vendorList,loading} = useAppSelector((state)=>state.vendor);

return (<>

        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-10">#</TableHead>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Pincode</TableHead>
                    <TableHead>Vendor Type</TableHead>
                    <TableHead className="">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                    {vendorList.map((item,index) => (
                <TableRow key={index}>
                        
                    <TableCell className="font-medium">{index+1}</TableCell>
                    <TableCell>{item.companyname}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell>{item.state}</TableCell>
                    <TableCell>{item.city}</TableCell>
                    <TableCell>{item.pincode}</TableCell>
                    <TableCell>{item.vendorCategory}</TableCell>
                    <TableCell className="">
                        <div className="flex gap-3">
                            <Button type="button" onClick={()=>{dispatch(SetCurrentVendor(item));dispatch(setOpenModel(true))}}><Edit /></Button>
                            <Button type="button" variant={"destructive"}><Trash /></Button>
                        </div>
                    </TableCell>

                </TableRow>
                    ))}
            </TableBody>
        </Table>
    </>)
}
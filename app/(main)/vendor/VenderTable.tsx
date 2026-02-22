import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { setOpenModel, SetCurrentVendor, deleteVendor } from "@/app/(main)/Redux/features/VendorSlice";
import CustomeCofirmDailog from "@/components/CustomeCofirmDailog";
import { useState } from "react";
import { toast } from "sonner";

export default function VenderTable() {
const [openDeleteDialog,setOpenDeleteDialog] = useState({open:false,vendorId:""});
    const dispatch= useAppDispatch()
    const {vendorList} = useAppSelector((state)=>state.vendor);

    



    const handleDelete = () => {
        // Implement delete logic here, e.g., dispatch a delete action

        dispatch(deleteVendor(openDeleteDialog.vendorId)).unwrap();
        toast.success("Vendor deleted successfully");
        setOpenDeleteDialog({open:false,vendorId:''});
    }

return (<div className="w-full h-[90dvh] relative overflow-auto">
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
                 <TableRow>
                        <TableCell className="font-medium">{index+1}</TableCell>
                        <TableCell>{item.vendorname}</TableCell>
                        <TableCell>{item.address}</TableCell>
                        <TableCell>{item.state}</TableCell>
                        <TableCell>{item.city}</TableCell>
                        <TableCell>{item.pincode}</TableCell>
                        <TableCell>{item.vendorCategory}</TableCell>
                        <TableCell className="">
                            <div className="flex gap-3">
                                <Button type="button" onClick={()=>{dispatch(SetCurrentVendor(item));dispatch(setOpenModel(true))}} ><Edit /></Button>
                                <Button type="button" variant={"destructive"} onClick={()=>setOpenDeleteDialog({open:true,vendorId:item._id})}><Trash /></Button>
                            </div>
                        </TableCell>
                    </TableRow>                  
                ))}  
            </TableBody>
        </Table>

<CustomeCofirmDailog open={openDeleteDialog.open} close={()=>setOpenDeleteDialog({open:false,vendorId:""})} confirm={handleDelete} />

    </div>)
}
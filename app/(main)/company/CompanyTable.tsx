import { Button } from "@/components/ui/button";
import { Table,TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import {  Edit, Trash } from "lucide-react";
import { use, useState } from "react";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { deleteCompany, setOpenModel,setCurrentCompany,clearCurrentCompany } from "../Redux/features/CompanySlice";
import CustomeCofirmDailog from "@/components/CustomeCofirmDailog";
import { toast } from "sonner";

export default function CompanyTable() {
    const [openConfirm, setOpenConfirm] = useState({
        open: false,
        id: ""
    });
    const {company} = useAppSelector((state) => state.company);
    const dispatch = useAppDispatch();


    const handleDelete = () => {
        dispatch(deleteCompany(openConfirm.id)).unwrap()
        setOpenConfirm({open:false,id:""})
        dispatch(clearCurrentCompany())
    }

    return(<div className="w-full h-[90dvh] relative overflow-auto">
     <Table className="">
                <TableHeader className="">
                    <TableRow>
                        <TableHead className="w-10">#</TableHead>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Mobile</TableHead>
                        <TableHead>Pincode</TableHead>
                        <TableHead className="">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {company.map((item,index) => (

                        <TableRow>

                        <TableCell className="font-medium">{index+1}</TableCell>
                        <TableCell>{item.companyName}</TableCell>
                        <TableCell>{item.billingStreet1}</TableCell>
                        <TableCell>{item.state}</TableCell>
                        <TableCell>{item.city}</TableCell>
                        <TableCell>{item.billingMobile}</TableCell>
                        <TableCell>{item.pincode}</TableCell>
                        <TableCell className="">
                            <div className="flex gap-3">
                                <Button type="button" onClick={()=>{dispatch(setCurrentCompany(item));dispatch(setOpenModel(true))}} ><Edit /></Button>
                                <Button type="button" variant={"destructive"} onClick={()=>setOpenConfirm({open:true,id:item._id})}><Trash /></Button>
                            </div>
                        </TableCell>
``
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
    

<CustomeCofirmDailog close={()=>setOpenConfirm({open:false,id:""})} open={openConfirm.open} confirm={handleDelete}/>


    </div>)
}
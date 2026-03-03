"use client"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Printer, Receipt, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import CustomeCofirmDailog from "@/components/CustomeCofirmDailog";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { toast } from "sonner";
import { fetchFabricCustomer,deleteFabricCustomer, clearNotification,setOpenModel,setCloseModel,setCurrentFabricCustomer,clearCurrentFabricCustomer } from "../Redux/features/CustomerFabricSlice";
import CustomLoading from "@/components/CustomLoading";




export default function FabricTable() {
    const [open, setOpen] = useState({_id:"",open:false});
    const dispatch=useAppDispatch();
   const {fabricStatus,loading} = useAppSelector(state=>state.CustomerFabric) 

    const handleDelete = () => {
        if(open._id){
            dispatch(deleteFabricCustomer(open._id)).unwrap();
            setOpen({_id:"",open:false});
            
        }
    }


  



        




    return (<>
        <div className="w-[70vw] p-2 border-b">
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
        <div className="w-full h-[80dvh] relative overflow-auto">
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
                    {fabricStatus.map((item) => (
                        <TableRow>
                        <TableCell className="font-medium">{item._id}</TableCell>
                        <TableCell>110</TableCell>
                        <TableCell>{item.company}</TableCell>
                        <TableCell>{item.vendor}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.grandTotalMeters}</TableCell>
                        <TableCell>{item.grandTotalThaans}</TableCell>
                        <TableCell className="flex justify-center items-center gap-2">
                            <Button type="button" onClick={()=>{dispatch(setCurrentFabricCustomer(item));dispatch(setCloseModel())}} ><Edit /></Button>
                            <Button type="button" ><Printer/></Button>
                            <Button type="button" ><Receipt /></Button>
                            <Button type="button" variant={"destructive"} onClick={()=>setOpen({_id:item._id,open:true})}><Trash/></Button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        <CustomeCofirmDailog close={()=>setOpen({_id:"",open:false})} confirm={handleDelete } open={open.open} lable="Delete"/>
            {loading && <CustomLoading />}
    </>
    )
}
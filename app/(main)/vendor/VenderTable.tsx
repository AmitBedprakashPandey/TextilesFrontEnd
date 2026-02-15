import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { setOpenModel,SetCurrentVendor} from "@/app/(main)/Redux/features/VendorSlice";
import CustomLoading from "@/components/CustomLoading";

export default function VenderTable() {

    const dispatch= useAppDispatch()
    const {vendorList,loading} = useAppSelector((state)=>state.vendor);

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
        {loading && <CustomLoading />}
    </div>)
}
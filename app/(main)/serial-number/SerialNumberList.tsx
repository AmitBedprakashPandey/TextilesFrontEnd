import { Button } from "@/components/ui/button";
import { deleteSerialNumber, fetchSerialNumbers, type serialNumberUpateState, setCurrentSerialNumber, setOpenModel } from "../Redux/features/serialNumberSlice";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { useEffect, useState } from "react";
import { AlertCircle, Edit, Trash } from "lucide-react";
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
import { toast } from "sonner";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
export default function SerialNumberList() {

  const [deleteModel, setDeleteModel] = useState<{
    open: boolean;
    _id: string | null;
  }>({
    open: false,
    _id: null,
  });


  const dispatch = useAppDispatch();
  const { serialNumber, currentSerialNumber } = useAppSelector((state) => state.serialNumber);



  function onEdit(item: serialNumberUpateState) {
    dispatch(setCurrentSerialNumber(item));
    dispatch(setOpenModel(true));
  }

  function onDelete(_id: string) {
    try {
      dispatch(deleteSerialNumber(_id)).unwrap();
      toast.success("Deleted Successfully");
      setDeleteModel({ open: false, _id: "" });
    } catch (error) {
      toast.warning("Something went wrong");
    }
  }


  return (
    <div className="w-full h-[90dvh] relative overflow-auto">


      <Table className="">
        <TableHeader className="">
          <TableRow>
            <TableHead className="p-2 text-left">#</TableHead>
            <TableHead className="p-2 text-left">Prefix</TableHead>
            <TableHead className="p-2 text-left">Start</TableHead>
            <TableHead className="p-2 text-left">Current</TableHead>
            <TableHead className="p-2 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {serialNumber.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="p-4 text-center text-muted-foreground">
                No serial numbers found
              </TableCell>
            </TableRow>
          )}

          {serialNumber.map((item, i) => (
            <TableRow key={item._id} className="border-t">
              <TableCell className="px-2">{i + 1}</TableCell>
              <TableCell className="p-2">{item.prefix}</TableCell>
              <TableCell className="p-2">{item.startNumber}</TableCell>
              <TableCell className="p-2">{item.currentNumber}</TableCell>
              <TableCell className="p-2 flex justify-end gap-2">
                <Button size="sm" variant="default" type="button" onClick={() => onEdit(item)}>
                  <Edit />
                </Button>
                <Button size="sm" variant="destructive" type="button" onClick={() => setDeleteModel({ open: true, _id: item._id })}>
                  <Trash />
                </Button>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={deleteModel?.open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteModel({ open: false, _id: "" })}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (deleteModel?._id) { onDelete(deleteModel?._id) } }} className="bg-red-600 text-white hover:bg-red-800 ">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

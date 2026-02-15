"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { Edit, Trash } from "lucide-react";
import CustomLoading from "@/components/CustomLoading";
import { SetCurrentUnit, deleteUnit, fetchUnit, setOpenModel, type unitUpdateState } from "@/app/(main)/Redux/features/unitsSlices";
import { useEffect, useState } from "react";
import { on } from "events";
import { toast } from "sonner";
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
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function UnitList() {
  const [deleteModel, setDeleteModel] = useState<{ open: boolean; _id: string | null; }>({ open: false, _id: null, });

  const dispatch = useAppDispatch();
  const { unit, loading } = useAppSelector((state) => state.unitSlice);



  function onEdit(params: unitUpdateState) {
    dispatch(SetCurrentUnit(params));
    dispatch(setOpenModel(true));
  }

  function onDelete(_id: string) {
    try {
      dispatch(deleteUnit(_id)).unwrap();
      toast.success("Deleted Successfully");
      setDeleteModel({ open: false, _id: "" });
    } catch (error) {
      toast.error("Something went wrong");
    }

  }

  return (
    <div className="w-full h-[80dvh] relative overflow-auto">
      <Table className="w-full text-sm">
        <TableHeader className="">
          <TableRow>
            <TableHead className="p-2 text-left">#</TableHead>
            <th className="p-2 text-left">Unit Name</th>
            <th className="p-2 text-left">Short</th>
            <th className="p-2 text-right">Action</th>
          </TableRow>
        </TableHeader>
        <TableBody>
          {unit.length === 0 && (
            <TableRow>
              <td colSpan={4} className="p-4 text-center text-muted-foreground">
                No units found
              </td>
            </TableRow>
          )}

          {unit.map((unit, i) => (
            <TableRow key={unit._id} className="border-t">
              <td className="p-2">{i + 1}</td>
              <td className="p-2">{unit.unitName}</td>
              <td className="p-2">{unit.unitShort}</td>
              <td className="p-2 text-right flex gap-3 justify-end">
                <Button size="sm" variant="outline" onClick={() => onEdit(unit)}>
                  <Edit />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => setDeleteModel({ open: true, _id: unit._id })}>
                  <Trash />
                </Button>
              </td>
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
            <AlertDialogCancel onClick={() => setDeleteModel({ _id: null, open: false })}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (deleteModel._id) { onDelete(deleteModel._id) } }}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {loading && <CustomLoading />}
    </div>
  );
}

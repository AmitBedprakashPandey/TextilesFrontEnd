"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { Edit, Trash } from "lucide-react";
import CustomLoading from "@/components/CustomLoading";
import { SetCurrentUnit, deleteUnit, setOpenModel, type unitUpdateState } from "@/app/(main)/Redux/features/unitsSlices";
import { useState } from "react";

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CustomeCofirmDailog from "@/components/CustomeCofirmDailog";

export default function UnitList() {
  const [deleteModel, setDeleteModel] = useState<{ open: boolean; _id: string | null; }>({ open: false, _id: null, });

  const dispatch = useAppDispatch();
  const { unit, loading } = useAppSelector((state) => state.unitSlice);



  function onEdit(params: unitUpdateState) {
    dispatch(SetCurrentUnit(params));
    dispatch(setOpenModel(true));
  }

  function onDelete(_id: string) {
      dispatch(deleteUnit(_id)).unwrap();
      setDeleteModel({ open: false, _id: "" });

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
      
      <CustomeCofirmDailog open={deleteModel.open} close={() => setDeleteModel({ _id: null, open: false })} confirm={() => { if (deleteModel._id) { onDelete(deleteModel._id) } }} />
      {loading && <CustomLoading />}
    </div>
  );
}

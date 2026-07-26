"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash, Edit, Plus } from "lucide-react";
import CustomeCofirmDailog from "@/components/CustomeCofirmDailog";
import ReadymadeForm from "@/app/readymade/form/ReadyMadeForm";
import { useState } from "react";
import CustomDialog from "@/components/CustomDialog";

export default function page() {
  const [openConfirmModel, SetOpenConfirmModel] = useState<boolean>(false);
  const [openFormModel, SetOpenFormModel] = useState<boolean>(false);
  function onDeleteHandler() {
    SetOpenConfirmModel(false);
  }
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Readymade</TableHead>
            <TableHead className="text-right">Rate</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="">1</TableCell>
            <TableCell>Camric Night Suit</TableCell>
            <TableCell className="text-right">445</TableCell>
            <TableCell className="flex justify-end">
              <div className="flex gap-3">
                <Button
                  className="w-8 h-8"
                  onClick={() => SetOpenFormModel(true)}
                >
                  <Edit />
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => SetOpenConfirmModel(true)}
                  className="w-8 h-8"
                >
                  <Trash />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="absolute bottom-10 right-10 z-10">
        <Button className="rounded-full w-14 h-14" onClick={()=>SetOpenFormModel(true)}>
          <Plus />
        </Button>
      </div>

      <CustomDialog
        close={() => SetOpenFormModel(false)}
        open={openFormModel}
        title="Readymade Form"
        key={"Form"}
        children={<ReadymadeForm />}
      />

      <CustomeCofirmDailog
        close={() => SetOpenConfirmModel(false)}
        confirm={onDeleteHandler}
        open={openConfirmModel}
        key={"readasd"}
        lable="Delete"
      />
    </>
  );
}

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
import { useEffect } from "react";
import CustomDialog from "@/components/CustomDialog";
import { useAppDispatch, useAppSelector } from "@/lib/Redux/hooks";
import {
  getReadyMades,
  setSelectedItem,
  clearSelectedItem,
  setOpenConfirm,
  setOpenFrom,
  deleteReadyMade,
} from "@/lib/Redux/Reducers/RadymadeSlice";
import { toast } from "sonner";

export default function page() {
  const dispatch = useAppDispatch();
  const { selectedItem, items, openConfirm, openfrom } = useAppSelector(
    (state) => state.ReadyMadeItems,
  );

  async function onDeleteHandler() {
    if(!selectedItem) return;
        
    try {
      await dispatch(deleteReadyMade(selectedItem._id)).unwrap();
      toast.success("Delete Successfull");
    } catch (error) {
      toast.error("Delete Failed");
    }
    dispatch(setOpenConfirm(false));
  }

  useEffect(() => {
    dispatch(getReadyMades());
  }, [dispatch]);

  async function handleSelectItems(data: any) {
    await dispatch(setSelectedItem(data));
    dispatch(setOpenFrom(true));
  }

  function handleSelectedItemsClear() {
    dispatch(clearSelectedItem());
    dispatch(setOpenFrom(true));
  }

  return (
    <div className="block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12.5">#</TableHead>
            <TableHead>Readymade</TableHead>
            <TableHead className="text-right">Rate</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={item._id}>
              <TableCell className="">{index + 1}</TableCell>
              <TableCell>{item.itemName}</TableCell>
              <TableCell className="text-right">{item.rate}</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex gap-3">
                  <Button
                    className="w-8 h-8"
                    onClick={() => handleSelectItems(item)}
                  >
                    <Edit />
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      (dispatch(setSelectedItem(item)),
                        dispatch(setOpenConfirm(true)));
                    }}
                    className="w-8 h-8"
                  >
                    <Trash />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="absolute bottom-5 right-5">
        <Button
          className="rounded-full w-14 h-14"
          onClick={() => handleSelectedItemsClear()}
        >
          <Plus />
        </Button>
      </div>

      <CustomDialog
        close={() => dispatch(setOpenFrom(false))}
        open={openfrom}
        title="Readymade Form"
        key={"Form"}
        children={<ReadymadeForm />}
      />

      <CustomeCofirmDailog
        close={() => dispatch(setOpenConfirm(false))}
        confirm={onDeleteHandler}
        open={openConfirm}
        key={"readasd"}
        lable="Delete"
      />
    </div>
  );
}

"use client";

import { use, useState } from "react";
import SerialNumberForm from "./SerialNumberForm";
import SerialNumberList from "./SerialNumberList";
import { SerialNumberFormValues } from "./serialNumber.schema";
import CustomDialog from "@/components/CustomDialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCcw } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { fetchSerialNumbers, setOpenModel, setCloseModel, clearCurrentSerialNumber,clearMessage,clearError } from "../Redux/features/serialNumberSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { Spinner } from "@/components/ui/spinner";
import CustomLoading from "@/components/CustomLoading";
import { toast } from "sonner";

export default function SerialNumberPage() {
  const [serials, setSerials] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { openModel, loading,error,message } = useAppSelector((state) => state.serialNumber);

  const refresh = () => {
    dispatch(fetchSerialNumbers());
  };


    useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if(message){
      toast.success(message);
      dispatch(clearMessage());
    }


  }, [error,message]);


  useEffect(() => {
    refresh();
  }, [dispatch]);

  return (
    <div className="w-full h-full relative overflow-hidden">

      <div className="w-full flex items-center justify-between mb-5">
        <Label className="font-bold">Serial Number</Label>
        <div className="flex gap-3">
          <Button onClick={() => { dispatch(setOpenModel(true)); dispatch(clearCurrentSerialNumber()) }} className="capitalize">
            <Plus /> Create
          </Button>
          <Button onClick={refresh} className="capitalize" disabled={loading}>
            <RefreshCcw />
          </Button>
        </div>
      </div>

      <SerialNumberList />

      <CustomDialog
        close={() => dispatch(setCloseModel())}
        open={openModel}
        title={`Serial Number Details`}
        children={<SerialNumberForm />}
      />

      {loading && <CustomLoading />}
    </div>
  );
}

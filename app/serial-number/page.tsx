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
import { fetchSerialNumbers, setOpenModel, setCloseModel, clearCurrentSerialNumber } from "../Redux/features/serialNumberSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { Spinner } from "@/components/ui/spinner";
import CustomLoading from "@/components/CustomLoading";

export default function SerialNumberPage() {
  const [serials, setSerials] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { openModel, loading } = useAppSelector((state) => state.serialNumber);

  const refresh = () => {
    dispatch(fetchSerialNumbers());
  };
  
    useEffect(() => {
        refresh();
    }, [dispatch]);

  return (
    <div className="p-3 max-h-full overflow-y-auto">

      <Card >
        <CardHeader className="flex justify-between items-center px-5">

        <Label className="font-bold">Serial Number</Label>
        <div className="flex gap-3">
          <Button onClick={() => { dispatch(setOpenModel(true)); dispatch(clearCurrentSerialNumber()) }} className="capitalize">
            <Plus /> Create
          </Button>
          <Button onClick={refresh} className="capitalize" disabled={loading}>
            <RefreshCcw />
          </Button>
        </div>
        </CardHeader>
      </Card>

      <Card className="mt-0">
        <CardContent>
          <SerialNumberList />
        </CardContent>
      </Card>

      {openModel &&
        <CustomDialog
          close={() => dispatch(setCloseModel())}
          open={openModel}
          title={`Serial Number Details`}
          children={<SerialNumberForm />}
        />
      }
      {loading && <CustomLoading /> }
    </div>
  );
}

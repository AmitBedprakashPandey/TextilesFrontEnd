"use client";

import UnitForm from "./UnitForm";
import UnitList from "./UnitList";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCcw } from "lucide-react";
import CustomDialog from "@/components/CustomDialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { fetchUnit, setOpenModel, setCloseModel, clearCurrentUnit } from "../Redux/features/unitsSlices";
import { useEffect } from "react";

export default function UnitPage() {
  const { openModel } = useAppSelector((state) => state.unitSlice);
  const dispatch = useAppDispatch();

  function refresh() {
    dispatch(fetchUnit())
  }
    useEffect(() => {
        dispatch(fetchUnit());
    }, [dispatch]);




  return (
    <div className="p-5 max-h-full overflow-y-auto">
      <Card>
        <CardHeader className="flex justify-between items-center">

        <Label className="font-bold text-2xl">Unit</Label>
        <div className="flex gap-3">

          <Button onClick={() => { dispatch(setOpenModel(true)); dispatch(clearCurrentUnit()) }} className="capitalize"><Plus /> Create</Button>
          <Button onClick={refresh} className="capitalize" disabled={openModel}><RefreshCcw /></Button>
        </div>

        </CardHeader>
      </Card>

      <Card className="">
        <CardContent>
          <CustomDialog open={openModel} close={() => dispatch(setCloseModel())} title="Serial Number Details" children={<UnitForm />} />
          <UnitList />
        </CardContent>
      </Card>
    </div>
  );
}

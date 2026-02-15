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
import CustomLoading from "@/components/CustomLoading";

export default function UnitPage() {
  const { openModel, loading } = useAppSelector((state) => state.unitSlice);
  const dispatch = useAppDispatch();

  function refresh() {
    dispatch(fetchUnit())
  }
  useEffect(() => {
    dispatch(fetchUnit());
  }, [dispatch]);

  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="w-full flex items-center justify-between mb-5">
        <Label className="font-bold text-2xl">Unit</Label>
        <div className="flex gap-3">

          <Button onClick={() => { dispatch(setOpenModel(true)); dispatch(clearCurrentUnit()) }} className="capitalize"><Plus /> Create</Button>
          <Button onClick={refresh} className="capitalize" disabled={openModel}><RefreshCcw /></Button>
        </div>
      </div>


      <CustomDialog open={openModel} close={() => dispatch(setCloseModel())} title="Serial Number Details" children={<UnitForm />} />
      <UnitList />

      {loading && <CustomLoading />}
    </div>
  );
}

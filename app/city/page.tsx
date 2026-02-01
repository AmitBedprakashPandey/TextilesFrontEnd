"use client";
import { useState } from "react";
import { CityForm } from "./CityForm";
import { CityList } from "./CityList";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CustomDialog from "@/components/CustomDialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../Redux/hooks";
import { setCloseModel, setOpenModel, fetchCity, clearCurrentCity } from "@/app/Redux/features/CitySlice";
import CustomLoading from "@/components/CustomLoading";
export default function CityPage() {
  const dispatch = useDispatch();
  const { loading, openModel } = useAppSelector((state) => state.City);

  return (
    <div className="p-5 max-h-full overflow-y-auto">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <Label className="font-bold text-2xl">City</Label>
            <Button onClick={() => { dispatch(clearCurrentCity()); dispatch(setOpenModel(true)) }} className="capitalize"><Plus /> Create</Button>
          </div>
        </CardHeader>
      </Card>
      <Card className="">
        <CardContent>
          <CustomDialog open={openModel} close={() => dispatch(setCloseModel())} title="Serial Number Details"
            children={<CityForm />}/>
          <CityList/>
        </CardContent>
      </Card>
      {loading && <CustomLoading/>}
    </div>
  );
}

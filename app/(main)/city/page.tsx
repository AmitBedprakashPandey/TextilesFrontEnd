"use client";
import { useState } from "react";
import { CityForm } from "./CityForm";
import { CityList } from "./CityList";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCcw } from "lucide-react";
import CustomDialog from "@/components/CustomDialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { setCloseModel, setOpenModel, fetchCity, clearCurrentCity } from "@/app/(main)/Redux/features/CitySlice";
import CustomLoading from "@/components/CustomLoading";
export default function CityPage() {
  const dispatch = useAppDispatch();
  const { loading, openModel } = useAppSelector((state) => state.City);

  return (
    <div className="w-full h-full relative overflow-hidden">
            <div className="w-full flex items-center justify-between mb-5">
            <Label className="font-bold text-2xl">City</Label>
            <div className="flex items-center gap-3">
            <Button onClick={() => { dispatch(clearCurrentCity()); dispatch(setOpenModel(true)) }} className="capitalize"><Plus /> Create</Button>
            <Button onClick={() => dispatch(fetchCity())} className="capitalize"><RefreshCcw/></Button>
          </div>
        </div>
      
      
          <CustomDialog open={openModel} close={() => dispatch(setCloseModel())} title="Serial Number Details" children={<CityForm />}/>
          <CityList/>
      
      {loading && <CustomLoading/>}
    </div>
  );
}

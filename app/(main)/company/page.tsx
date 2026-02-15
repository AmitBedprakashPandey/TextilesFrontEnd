"use client"
import { use, useEffect, useState } from "react";
import CompanyForm from "./CompanyForm"
import CustomeDialog from "@/components/CustomDialog";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Label } from "@/components/ui/label";
import { Edit, Plus, RefreshCcw, Trash } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CompanyTable from "./CompanyTable";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { clearCurrentCompany, setOpenModel, setCloseModel, fetchCompanys, setCurrentCompany, } from "@/app/(main)/Redux/features/CompanySlice";
import CustomLoading from "@/components/CustomLoading";
export default function page() {
    const { openModel, loading } = useAppSelector((state) => state.company);
    const dispatch = useAppDispatch();

    function refresh() {
        dispatch(fetchCompanys());
    }

    useEffect(() => {
        refresh();
    }, [dispatch]);


    return (
        <div className="w-full h-full relative overflow-hidden">
            <div className="w-full flex items-center justify-between mb-5">
                <Label className="font-bold text-3xl">Company</Label>
                <div className="flex items-center gap-3">
                    <Button onClick={() => { dispatch(setOpenModel(true)); dispatch(clearCurrentCompany()) }} type="button" variant="default" className="capitalize"><Plus /> Create</Button>
                    <Button onClick={refresh} className="capitalize"><RefreshCcw /></Button>
                </div>
            </div>
            <CustomeDialog open={openModel} close={() => { dispatch(clearCurrentCompany()); dispatch(setCloseModel()) }} title="Company Details" children={<CompanyForm />} />
            <CompanyTable />
            {loading && <CustomLoading />}

        </div>
    )
}

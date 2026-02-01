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
import { clearCurrentCompany, setOpenModel, setCloseModel, fetchCompanys, setCurrentCompany, } from "@/app/Redux/features/CompanySlice";
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
        <div className="max-h-full overflow-y-auto  p-5">
            <Card>
                <CardHeader>

                    <div className="flex  justify-between py-3">

                        <Label className="font-bold text-2xl">Company List</Label>
                        <div className="flex items-center gap-3">
                            <Button onClick={() => { dispatch(setOpenModel(true)); dispatch(clearCurrentCompany()) }} type="button" variant="default" className="capitalize"><Plus /> Create</Button>
                            <Button onClick={refresh} className="capitalize"><RefreshCcw /></Button>

                        </div>
                    </div>
                </CardHeader>
            </Card>
            <Card className="">
                <CardContent >
                    <CustomeDialog open={openModel} close={() => { dispatch(clearCurrentCompany()); dispatch(setCloseModel()) }} title="Company Details" children={<CompanyForm />} />
                    <CompanyTable />
                </CardContent>
            </Card>
            {loading && <CustomLoading />}

        </div>
    )
}

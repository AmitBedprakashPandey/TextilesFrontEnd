"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import Select from 'react-select'
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent } from "@/components/ui/card"
import FabricTable from "./FabricTable"
import CustomDialog from "@/components/CustomDialog"
import { useAppDispatch, useAppSelector } from "../Redux/hooks"
import { type companyUpateState } from "@/app/(main)/Redux/features/CompanySlice"
import { type vendorUpdateState } from "@/app/(main)/Redux/features/VendorSlice"
import { setOpenModel, setCloseModel, updateFabricCustomer, createFabricCustomer, clearCurrentFabricCustomer, clearNotification, fetchFabricCustomer } from "@/app/(main)/Redux/features/CustomerFabricSlice"
import { useNewtabOpener } from "@/components/ReuseFunction"

type OptionType = {
    value: string
    label: string
}

const options: OptionType[] = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

const METER_GROUPS = 3
const TOTAL_INPUTS = 100

const formSchema = z.object({
    company: z.string().min(1),
    vendor: z.string().min(1),
    date: z.string().min(1),
    groups: z.array(z.object({
        groupNo: z.number().min(1),
        pattern: z.string().nullable(),
        rate: z.number(),
        meters: z.array(z.number().min(0)),
        totalMeters: z.number().min(0),
        thaans: z.number().min(0),
    })).min(1).refine(
        groups =>
            groups.some(
                g =>
                    g.pattern &&
                    g.pattern.trim() !== "" &&
                    g.meters.some(m => m > 0)
            ),
        {
            message: "Select a Fabric and enter at least one meter",


        }
    ),
    grandTotalMeters: z.number().min(0),
    grandTotalThaans: z.number().min(0),
});

export default function Page() {

    const { company } = useAppSelector(state => state.company)
    const { vendorList } = useAppSelector(state => state.vendor)
    const {openModel,currentFabricCustomer,error,message} = useAppSelector(state => state.CustomerFabric)
    const dispatch = useAppDispatch();
    
      useEffect(() => {
        if(error){
            toast.error(error)
        }
        if(message){
            toast.success(message)
        }

        dispatch(clearNotification())
    
            dispatch(fetchFabricCustomer())

    }, [error,message,dispatch])


    const [meters, setMeters] = useState<number[][]>(
        Array.from({ length: METER_GROUPS }, () =>
            Array(TOTAL_INPUTS).fill(0)
        )
    )



    // one ref per input (stable)

    const handleChange = (
        groupIndex: number,
        inputIndex: number,
        value: number
    ) => {
        setMeters(prev => {
            const copy = prev.map(arr => [...arr])
            copy[groupIndex][inputIndex] = value
            return copy
        })
    }

    const getTotalMeters = (groupIndex: number) => meters[groupIndex].reduce((sum, val) => sum + (val > 0 ? val : 0), 0)
    const getTotalThaans = (groupIndex: number) => meters[groupIndex].reduce((sum, val) => sum + (val !== 0 ? 1 : 0), 0)

    // meters = number[][], each sub-array is a group
    const getGrandTotalMeters = () => meters.reduce((grandSum, group) => grandSum + group.reduce((sum, val) => sum + val, 0), 0)

    const getGrandTotalThaans = () => meters.reduce((grandSum, group) => grandSum + group.reduce((sum, val) => sum + (val !== 0 ? 1 : 0), 0), 0)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            company: "",
            vendor: "",
            date: new Date().toISOString().split("T")[0],
            groups: Array.from({ length: METER_GROUPS }, () => ({
                groupNo: 1,
                pattern: "",
                rate: 0,
                meters: Array(TOTAL_INPUTS).fill(0),
                totalMeters: 0,
                thaans: 0,
            })),
            grandTotalMeters: getGrandTotalMeters(),
            grandTotalThaans: getGrandTotalThaans(),
        }
    });

   useEffect(() => {
    if (!currentFabricCustomer) return

    // ✅ Always build 3 groups
    const rebuiltMeters = Array.from({ length: METER_GROUPS }, (_, index) => {
        const existingGroup = currentFabricCustomer.groups[index]

        const arr = Array(TOTAL_INPUTS).fill(0)

        if (existingGroup?.meters) {
            existingGroup.meters.forEach((val, i) => {
                arr[i] = val
            })
        }

        return arr
    })

    setMeters(rebuiltMeters)

    form.reset({
        company: currentFabricCustomer.company,
        vendor: currentFabricCustomer.vendor,
        date: new Date(currentFabricCustomer.date)
            .toISOString()
            .split("T")[0],

        groups: Array.from({ length: METER_GROUPS }, (_, index) => {
            const existingGroup = currentFabricCustomer.groups[index]

            return {
                groupNo: index + 1,
                pattern: existingGroup?.pattern ?? "",
                rate: existingGroup?.rate ?? 0,
                meters: rebuiltMeters[index],
                totalMeters: existingGroup?.totalMeters ?? 0,
                thaans: existingGroup?.thaans ?? 0,
            }
        }),

        grandTotalMeters: currentFabricCustomer.grandTotalMeters,
        grandTotalThaans: currentFabricCustomer.grandTotalThaans,
    })

}, [currentFabricCustomer])


    const onSubmit = (data: z.infer<typeof formSchema>) => {
        const filteredGroups = data.groups
            .map(group => ({
                ...group,
                meters: group.meters.filter(m => m > 0),
            }))
            .filter(
                group =>
                    group.pattern &&
                    group.pattern.trim() !== "" &&
                    group.meters.length > 0
            );

        const finalPayload = {
            ...data,
            groups: filteredGroups,
        };

        const {company,vendor,date,groups,grandTotalMeters,grandTotalThaans} = data


        console.log(finalPayload);
        if(currentFabricCustomer){
            dispatch(updateFabricCustomer({...finalPayload,_id:currentFabricCustomer._id}))
            resetForm()
        }else{
            dispatch(createFabricCustomer(finalPayload))
            resetForm()
        }

        

        // ✅ RESET FORM AND METERS
        // form.reset({
        //     company: "",
        //     vendor: "",
        //     date: new Date().toISOString().split("T")[0],
        //     groups: Array.from({ length: METER_GROUPS }, () => ({
        //         groupNo: 1,
        //         pattern: "",
        //         rate: 0,
        //         meters: Array(TOTAL_INPUTS).fill(0),
        //         totalMeters: 0,
        //         thaans: 0,
        //     })),
        //     grandTotalMeters: 0,
        //     grandTotalThaans: 0,
        // });

        useNewtabOpener("http://localhost:3000/print")

        setMeters(
            Array.from({ length: METER_GROUPS }, () => Array(TOTAL_INPUTS).fill(0))
        );
        alert("Data submitted! Check console.")
        // You can replace console.log with a POST request to your backend
    }

    const { setValue } = form

    const submitForm = form.handleSubmit(onSubmit, (error) => { toast.warning(error.groups?.root?.message) });

    useEffect(() => {
        const handleCtrlS = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {

                e.preventDefault(); // only prevent when Ctrl+S
                if (openModel) return; // 🚫 Don't submit if dialog open
                submitForm();
                resetForm();
            }
        };

        window.addEventListener("keydown", handleCtrlS);
        return () => window.removeEventListener("keydown", handleCtrlS);
    }, [open, submitForm]);


    // calculate total meters/ thans
    useEffect(() => {
        let grandMeters = 0
        let grandThaans = 0

        meters.forEach((group, groupIndex) => {
            const totalMeters = group.reduce(
                (sum, val) => sum + (val > 0 ? val : 0),
                0
            )

            const thaans = group.filter(val => val !== 0).length

            // ✅ STORE ONLY NON-ZERO METERS
            const nonZeroMeters = group.filter(val => val !== 0)

            setValue(`groups.${groupIndex}.meters`, nonZeroMeters, {
                shouldDirty: true,
                shouldValidate: true,
            });

            // 🔹 set group totals
            setValue(`groups.${groupIndex}.totalMeters`, totalMeters)
            setValue(`groups.${groupIndex}.thaans`, thaans)

            grandMeters += totalMeters
            grandThaans += thaans
        })

        // 🔹 set grand totals
        setValue("grandTotalMeters", grandMeters)
        setValue("grandTotalThaans", grandThaans)
    }, [meters, setValue])

    const formRef = useRef<HTMLFormElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key !== "Enter") return;

        e.preventDefault(); // 🚫 never submit

        const form = formRef.current;
        if (!form) return;

        const focusable = Array.from(
            form.querySelectorAll<HTMLElement>(
                `
      input:not([disabled]),
      textarea:not([disabled]),
      button:not([disabled]),
      [tabindex]:not([tabindex="-1"])
      `
            )
        ).filter(el => el.offsetParent !== null);

        // 🔥 detect react-select inner input
        const current =
            (e.target as HTMLElement).closest(".rs__input")?.querySelector("input") ||
            (e.target as HTMLElement);

        const index = focusable.indexOf(current as HTMLElement);
        if (index === -1) return;

        // ⬇️ ENTER / SHIFT+ENTER
        const nextIndex = e.shiftKey ? index - 1 : index + 1;
        const next = focusable[nextIndex];

        if (!next) return;

        // 🔥 react-select focus fix
        if (next.classList.contains("rs__control")) {
            (next.querySelector("input") as HTMLInputElement)?.focus();
        } else {
            next.focus();
        }
    };


    const resetForm = () => {
    // 1️⃣ Reset meters grid state
    const emptyMeters = Array.from(
        { length: METER_GROUPS },
        () => Array(TOTAL_INPUTS).fill(0)
    )

    setMeters(emptyMeters)

    // 2️⃣ Reset react-hook-form
    form.reset({
        company: "",
        vendor: "",
        date: new Date().toISOString().split("T")[0],
        groups: Array.from({ length: METER_GROUPS }, (_, index) => ({
            groupNo: index + 1,
            pattern: "",
            rate: 0,
            meters: Array(TOTAL_INPUTS).fill(0),
            totalMeters: 0,
            thaans: 0,
        })),
        grandTotalMeters: 0,
        grandTotalThaans: 0,
    })

    // 3️⃣ Clear redux edit state
    dispatch(clearCurrentFabricCustomer())
}
    return (
        <div className="">
            <div className="flex justify-between items-center">
                <Label>Customer Fabric Entry</Label>
                {currentFabricCustomer ? <Button type="button" onClick={resetForm}>Cancel</Button>
            :    <Button type="button" onClick={() => dispatch(setOpenModel(true))} className="cursor-pointer">Fabric Entry List</Button>
            }
            </div>

            <Form  {...form}>
                <form onKeyDown={handleKeyDown} ref={formRef} onSubmit={submitForm}>
                    <div className="space-y-3 ">
                        <Card className="mt-3">
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                                <FormField
                                    control={form.control}
                                    name="company"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Company Name</FormLabel>
                                            <FormControl>
                                                <Select<companyUpateState>
                                                    tabIndex={0}
                                                    classNamePrefix={"react-select"}
                                                    value={company.find(o => o._id === field.value) ?? null}
                                                    onChange={(val) => field.onChange(val?._id)}
                                                    options={company}
                                                    getOptionValue={(opt) => opt._id}
                                                    getOptionLabel={(opt) => opt.companyName}
                                                    isSearchable={true}
                                                    isClearable={true}
                                                    placeholder="Select Company"
                                                    autoFocus
                                                    theme={(theme) => ({
                                                        ...theme,
                                                        colors: {
                                                            ...theme.colors,
                                                            neutral0: "var(--background)",
                                                            neutral80: "var(--foreground)",
                                                            primary25: "var(--accent)",
                                                            primary: "var(--ring)",
                                                        },
                                                    })} />
                                            </FormControl>
                                        </FormItem>
                                    )} />

                                <FormField
                                    control={form.control}
                                    name="vendor"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Vendor Name</FormLabel>
                                            <FormControl>
                                                <Select<vendorUpdateState>
                                                    tabIndex={0}
                                                    classNamePrefix={"react-select"}
                                                    value={vendorList.find(o => o._id === field.value) ?? null}
                                                    onChange={(val) => field.onChange(val?._id)}
                                                    options={vendorList}
                                                    getOptionValue={(opt) => opt._id}
                                                    getOptionLabel={(opt) => opt.vendorname}
                                                    isSearchable={true}
                                                    placeholder="Select vendor"
                                                    theme={(theme) => ({
                                                        ...theme,
                                                        colors: {
                                                            ...theme.colors,
                                                            neutral0: "var(--background)",
                                                            neutral80: "var(--foreground)",
                                                            primary25: "var(--accent)",
                                                            primary: "var(--ring)",
                                                        },
                                                    })} />
                                            </FormControl>
                                        </FormItem>
                                    )} />

                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Date</FormLabel>
                                            <FormControl>
                                                <Input type="date"  {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )} />
                                <FormField
                                    control={form.control}
                                    name="grandTotalMeters"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Qty.</FormLabel>
                                            <FormControl>
                                                <Input type="number" disabled {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )} />
                                <FormField
                                    control={form.control}
                                    name="grandTotalThaans"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Thaans</FormLabel>
                                            <FormControl>
                                                <Input type="number" disabled  {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )} />
                            </CardContent>
                        </Card>
                        <Separator />
                        {/* Meter Grid 3 time */}
                        <div className="grid grid-cols-1  lg:grid-cols-1  gap-4">
                            {meters.map((group, groupIndex) => (
                                <div key={groupIndex} className="flex gap-3">
                                    <div className="">
                                        {/* HEADER */}
                                        <div className="flex items-center gap-2 mb-2">
                                            <div>No. {groupIndex + 1}</div>
                                            <FormField
                                                control={form.control}
                                                name={`groups.${groupIndex}.pattern`}
                                                render={({ field }) => (
                                                    <FormItem className="w-sm">
                                                        <FormLabel>Fabri</FormLabel>
                                                        <FormControl>
                                                            <Select<OptionType>
                                                                {...field}
                                                                classNamePrefix={"react-select"}
                                                                value={options.find(o => o.value === field.value) ?? null}
                                                                onChange={(val) => field.onChange(val?.value)}
                                                                options={options}
                                                                getOptionValue={(opt) => opt.value}
                                                                getOptionLabel={(opt) => opt.label}
                                                                isSearchable={true}
                                                                isClearable={true}
                                                                placeholder="Select Company"

                                                                theme={(theme) => ({
                                                                    ...theme,
                                                                    colors: {
                                                                        ...theme.colors,
                                                                        neutral0: "var(--background)",
                                                                        neutral80: "var(--foreground)",
                                                                        primary25: "var(--accent)",
                                                                        primary: "var(--ring)",
                                                                    },
                                                                })} />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />


                                            <FormField
                                                control={form.control}
                                                name={`groups.${groupIndex}.rate`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Rate</FormLabel>
                                                        <FormControl>
                                                            <Input onFocus={e => e.target.select()} type="number" {...field} onChange={(e) => form.setValue(`groups.${groupIndex}.rate`, Number(e.target.value))} />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`groups.${groupIndex}.totalMeters`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Qty.</FormLabel>
                                                        <FormControl>
                                                            <Input disabled type="number" {...field} />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name={`groups.${groupIndex}.thaans`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Thaans</FormLabel>
                                                        <FormControl>
                                                            <Input disabled type="number" {...field} />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* 100 INPUTS */}
                                        <div className="grid grid-cols-12  gap-2 mb-3">
                                            {group.map((value, inputIndex) => (
                                                <Input
                                                    key={inputIndex}
                                                    type="number"
                                                    min={0}
                                                    className=""
                                                    value={value}
                                                    onFocus={e => e.target.select()}
                                                    onChange={e =>
                                                        handleChange(
                                                            groupIndex,
                                                            inputIndex,
                                                            Number(e.target.value) || 0
                                                        )
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>


                                </div>
                            ))}
                        </div>
                        <Separator />
                        <div className="w-full flex justify-end py-5">
                            {currentFabricCustomer?._id ?
                        <Button type="submit" className="col-span-full w-56">Update</Button>
                        :    
                            <Button type="submit" className="col-span-full w-56">Submit</Button>
                        }
                        </div>
                    </div>
                </form>
            </Form>

            <CustomDialog open={openModel} close={() => dispatch(setCloseModel())} title="Fabric Customer Entry List" children={<FabricTable />} />







        </div >
    )
}

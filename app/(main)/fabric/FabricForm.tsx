import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label, Separator } from "@radix-ui/react-dropdown-menu";
import { Equal, Edit, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { addFabric, addGrandTotal, deleteFabric, updateFabric } from "../Redux/features/TailorFabricSlice";

const itemSchema = z.object({
    itemName: z.string().min(1),
    pcs: z.string().min(1),
    avgMtrs: z.string().min(1),
    rate: z.string().min(1),
    date: z.string(),
});

interface tableProps {
    itemName: string
    pcs: string
    avgMtrs: string
    rate: string
    date: string
    totalMtrs: string
    totalAmt: string
}

interface submitSchema {
    fabric: tableProps[],
    narration: string
    grandMeters: number
    diffMeters: number
    grandAmount: number
    pendingAmount: number
}

type ItemForm = z.infer<typeof itemSchema>

export default function FabriRecivedForm() {
    const itemRef = useRef<HTMLInputElement>(null)
    const pcsRef = useRef<HTMLInputElement>(null)
    const avgRef = useRef<HTMLInputElement>(null)
    const rateRef = useRef<HTMLInputElement>(null)
    const dateRef = useRef<HTMLInputElement>(null)
    const subBtnRef = useRef<HTMLButtonElement>(null)
    const [narration, setNarration] = useState<string>("")
    const disptach = useAppDispatch();
    const { fabricStatus } = useAppSelector((state) => state.TailorFabric)

    const [items, setItems] = useState<tableProps[]>([])
    const [editIndex, setEditIndex] = useState<number | null>(null)

    const form = useForm<ItemForm>({
        resolver: zodResolver(itemSchema),
        defaultValues: {
            itemName: "",
            pcs: "",
            avgMtrs: "",
            rate: "",
            date: new Date().toISOString().split("T")[0],
        },
    });

    const pcsVal = form.watch("pcs")
    const avgVal = form.watch("avgMtrs")
    const rateVal = form.watch("rate")


    const autoTotalMtrs = Number(pcsVal) * Number(avgVal)
    const autoTotalAmt = Number(pcsVal) * Number(rateVal)
    const diffMtrs = autoTotalMtrs - autoTotalAmt;
    const garndAmount = fabricStatus.fabric.reduce((acc, item) => acc + Number(item.totalAmt), 0)
    const grandMeters = fabricStatus.fabric.reduce((acc, item) => acc + Number(item.totalMtrs), 0)

    useEffect(()=>{
        disptach(addGrandTotal({grandAmount: garndAmount, grandMeters: grandMeters}))
    },[grandMeters,garndAmount])

    const onSubmit = (data: ItemForm) => {

        const finalPayload = {
            ...data,
            totalMtrs: autoTotalMtrs.toFixed(2).toString(),
            totalAmt: autoTotalAmt.toFixed(2).toString(),
        }

        if (editIndex !== null) {
            disptach(updateFabric({ index: editIndex, item: finalPayload }));
            setEditIndex(null)
        } else {
            disptach(addFabric(finalPayload))
        }
        form.reset({
            itemName: "",
            pcs: "",
            avgMtrs: "",
            rate: "",
        })
        itemRef.current?.focus
    }

    const onEdit = (index: number) => {
        const item = fabricStatus.fabric[index]

        form.reset({
            itemName: item.itemName,
            pcs: item.pcs,
            avgMtrs: item.avgMtrs,
            rate: item.rate,
            date: item.date,
        })

        setEditIndex(index)
    }

    const onDelete = (index: number) => {
        disptach(deleteFabric(index))
    }


    const finalSubmit = () => {

        const finalData: submitSchema = {
            fabric: items,
            grandMeters,
            diffMeters: diffMtrs,
            grandAmount: garndAmount,
            narration,
            pendingAmount: autoTotalMtrs - garndAmount
        }
        console.log(finalData);



    }


    return (
        <div className="w-full h-[90dvh] relative">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex grow gap-2 items-center ">

                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Date
                                    </FormLabel>
                                    <FormControl ref={dateRef}>
                                        <Input type="date" {...field} onFocus={(e) => e.target.select} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), itemRef.current?.focus())} />
                                    </FormControl>
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="itemName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Item Name
                                    </FormLabel>
                                    <FormControl ref={itemRef}>
                                        <Input
                                            autoFocus
                                            {...field} onFocus={(e) => e.target.select}
                                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), pcsRef.current?.focus())}
                                        />
                                    </FormControl>
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="pcs"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        No. Prices
                                    </FormLabel>
                                    <FormControl ref={pcsRef}>
                                        <Input type="number" inputMode="numeric"  {...field}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/[^0-9]/g, "");
                                                field.onChange(value);
                                            }}
                                            onFocus={(e) => e.target.select}
                                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), avgRef.current?.focus())}
                                        />
                                    </FormControl>
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="avgMtrs"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Avg. Meters
                                    </FormLabel>
                                    <FormControl ref={avgRef}>
                                        <Input inputMode="decimal" {...field}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/[^0-9.]/g, "");
                                                field.onChange(value);
                                            }}
                                            onFocus={(e) => e.target.select}
                                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), rateRef.current?.focus())}
                                        />
                                    </FormControl>
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="rate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Rate
                                    </FormLabel>
                                    <FormControl ref={rateRef}>
                                        <Input inputMode="numeric" type="number" {...field}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/[^0-9]/g, "");
                                                field.onChange(value);
                                            }}
                                            onFocus={(e) => e.target.select}
                                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), subBtnRef.current?.focus())}
                                        />
                                    </FormControl>
                                </FormItem>
                            )} />

                        <div>
                            <Label>Total Meters</Label>
                            <Input inputMode="decimal" disabled type="number" className="mt-2" value={autoTotalMtrs.toFixed(2)} name="totalMtrs" />
                        </div>

                        <div>
                            <Label>Total Amount</Label>
                            <Input inputMode="decimal" disabled type="number" className="mt-2" value={autoTotalAmt.toFixed(2)} name="totalAmt" />
                        </div>

                        <Button type="submit" ref={subBtnRef}
                            className="focus:bg-green-500  focus:text-white col-span-full mt-5">{editIndex !== null ? "Edit" : "Add"}</Button>
                    </div>

                    <Separator className="my-3" />
                    <div className="relative max-h-64 overflow-y-auto ">
                        <Table className="sticky top-0 bg-background z-10">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Item</TableHead>
                                    <TableHead>Pcs</TableHead>
                                    <TableHead>Avg Mtrs</TableHead>
                                    <TableHead>Total Mtrs</TableHead>
                                    <TableHead>Rate</TableHead>
                                    <TableHead>Total Amt</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className=" overflow-y-auto">
                                {fabricStatus.fabric.map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell>{row.itemName}</TableCell>
                                        <TableCell>{row.pcs}</TableCell>
                                        <TableCell>{row.avgMtrs}</TableCell>
                                        <TableCell>{row.totalMtrs}</TableCell>
                                        <TableCell>{row.rate}</TableCell>
                                        <TableCell>{row.totalAmt}</TableCell>
                                        <TableCell>
                                            <Button size="sm" variant="outline" type="button" onClick={() => onEdit(i)}><Edit /></Button>
                                            <Button size="sm" variant="outline" type="button" onClick={() => onDelete(i)}><Trash /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </form>
            </Form>
        </div>
    )
}
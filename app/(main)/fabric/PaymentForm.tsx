import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import Select , {SelectInstance}from "react-select";
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import z, { date } from "zod"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { addFabric, addGrandAmt, addPayment, addPendingAmount, deleteFabric, deletePayment, updateFabric, updatePayment } from "../Redux/features/TailorFabricSlice";

interface OptionType {
    value: string
}

const options: OptionType[] = [
    { value: "CASH" },
    { value: "UPI" },
    { value: "CHEQUE" },
    { value: "BANK TRANSFER" },
    { value: "CREDIT CARD" },
]

const formSchema = z.object({
    date: z.string().min(1),
    paymentType: z.string().min(1),
    amount: z.string().min(1),
    recipt: z.string().min(1).optional(),
    paidby: z.string().min(1),
})

export default function PaymentForm() {
    const dateRef = useRef<HTMLInputElement>(null)
    const paymentRef = useRef<SelectInstance<OptionType>>(null)
    const amtRef = useRef<HTMLInputElement>(null)
    const reciptRef = useRef<HTMLInputElement>(null)
    const paidbyRef = useRef<HTMLInputElement>(null)
    const submitRef = useRef<HTMLButtonElement>(null)
    const [previewImg, setPreviewImg] = useState<string | null>(null)

    const disptach = useAppDispatch();
    const {fabricStatus} =useAppSelector((state) => state.TailorFabric)


    const focusNext =
        (nextRef: React.RefObject<any>) =>
            (e: React.KeyboardEvent) => {
                if (e.key === "Enter") {
                    e.preventDefault()
                    nextRef.current?.focus()
                }
            }


    const [editIndex, setEditIndex] = useState<number | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: new Date().toISOString().split("T")[0],
        }
    });

    const totalAmt = fabricStatus.payment.reduce((acc, item) => acc + Number(item.amount), 0)

    useEffect(()=>{
        disptach(addPendingAmount(totalAmt))
    },[totalAmt])


    const onSubmit = (data: z.infer<typeof formSchema>) => {
        if (editIndex !== null) {
            disptach(updatePayment({index:editIndex, item: data}))
            setEditIndex(null)
            disptach(addGrandAmt(totalAmt))
        } else {
            disptach(addPayment(data))            
        }

        form.reset({
            amount: "",
            date: new Date().toISOString().split("T")[0],
            paymentType: "",
            recipt: "",
            paidby: "",
        })

        paymentRef.current?.focus()
    }

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = error => reject(error)
        })
    }


    const onEdit = (index: number) => {
        const item = fabricStatus.payment[index]
        form.reset({
            date: item.date,
            paymentType: item.paymentType,
            amount: item.amount,
            recipt: item.recipt,
            paidby: item.paidby,
        })
        setEditIndex(index)
    }

    const onDelete = (index: number) => {
      disptach(deletePayment(index))
    }

    return <div className="w-[100dvh]">

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-6 gap-3 py-1">
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Date
                                </FormLabel>
                                <FormControl>
                                    <Input type="date" {...field}  autoFocus ref={dateRef} onKeyDown={focusNext(paymentRef)}/>
                                </FormControl>
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="paymentType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Payment Type
                                </FormLabel>
                                <FormControl>
                                    <Select<OptionType>
                                        options={options}
                                        placeholder="Payment"
                                        getOptionValue={(opt) => opt.value}
                                        getOptionLabel={(opt) => opt.value}
                                        classNamePrefix={"react-select"}
                                        value={options.find(o => o.value === field.value) ?? null}
                                        onChange={(val) => field.onChange(val?.value)}                                        
                                        ref={paymentRef}
                                        onKeyDown={focusNext(amtRef)}
                                        theme={(theme) => ({
                                            ...theme,
                                            colors: {
                                                ...theme.colors,
                                                neutral0: "var(--background)",
                                                neutral80: "var(--foreground)",
                                                primary25: "var(--accent)",
                                                primary: "var(--ring)",
                                            },
                                        })}
                                    />
                                </FormControl>
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Amount
                                </FormLabel>
                                <FormControl>
                                    <Input inputMode="numeric" {...field}
                                    ref={amtRef}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/[^0-9]/g, "");
                                            field.onChange(value);
                                        }}
                                        onKeyDown={focusNext(reciptRef)}
                                    />
                                </FormControl>
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="recipt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Recipt
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/"

                                        // {...field}
                                        ref={reciptRef}
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0]
                                            if (!file) return

                                            // ❌ reject non-image
                                            if (!file.type.startsWith("image/")) {
                                                alert("Only image files allowed")
                                                e.target.value = ""
                                                return
                                            }

                                            const base64 = await fileToBase64(file)
                                            field.onChange(base64)
                                        }}
                                        onKeyDown={focusNext(paidbyRef)}

                                    />
                                </FormControl>
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="paidby"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Paid By
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} ref={paidbyRef} onKeyDown={focusNext(submitRef)}/>
                                </FormControl>
                            </FormItem>
                        )} />
                    <Button type="submit" ref={submitRef} className="mt-6 focus:bg-green-500  focus:text-white">{editIndex !== null ? "Edit" : "Add"}</Button>
                </div>
            </form>
        </Form>

        <Separator className="my-3" />
        <div className="relative max-h-96 overflow-y-auto border rounded-md">
            <Table>
                <TableHeader className="sticky top-0 bg-background z-0">
                    <TableRow>
                        <TableHead className="">Date</TableHead>
                        <TableHead>Payment Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="">Paid By</TableHead>
                        <TableHead className="">Image</TableHead>
                        <TableHead className="">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {fabricStatus.payment.map((row, i) => (
                        <TableRow>
                            <TableCell className="font-medium">{row.date}</TableCell>
                            <TableCell>{row.paymentType}</TableCell>
                            <TableCell className="">₹{row.amount}</TableCell>
                            <TableCell className="">{row.paidby}</TableCell>
                            <TableCell className=""><img src={row.recipt} onClick={() => setPreviewImg(row.recipt || null)} alt="recipt" width={50} height={50} className="border cursor-pointer" /></TableCell>
                            <TableCell className="">
                                <Button size="sm" variant="outline" type="button" onClick={() => onEdit(i)} className="mr-2"><Edit /></Button>
                                <Button size="sm" variant="outline" type="button" onClick={() => onDelete(i)}><Trash /></Button>
                            </TableCell>
                        </TableRow>))}
                </TableBody>
            </Table>
        </div>
        <Dialog open={!!previewImg} onOpenChange={() => setPreviewImg(null)}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Receipt Preview</DialogTitle>
                </DialogHeader>

                {previewImg && (
                    <img
                        src={previewImg}
                        alt="Receipt Preview"
                        className="w-full max-h-[70vh] object-contain rounded"
                    />
                )}
            </DialogContent>
        </Dialog>

    </div>

}
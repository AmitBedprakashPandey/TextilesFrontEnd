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
import { useDirectFocus, useEnterNavigation } from "@/components/ReuseFunction";
import { log } from "console";
interface OptionType {
    value: string
    label: string
}


const options: OptionType[] = [
    { value: "CASH" , label: "CASH"},
    { value: "UPI" , label: "UPI"},
    { value: "CHEQUE" , label: "CHEQUE"},
    { value: "BANK TRANSFER" , label: "BANK TRANSFER"},
    { value: "CREDIT CARD" , label: "CREDIT CARD"},
]

const formSchema = z.object({
    date: z.string().min(1),
    paymentType: z.string().min(1),
    amount: z.string().min(1),
    recipt: z.string().min(1).optional(),
    paidby: z.string().min(1),
})

export default function PaymentForm() {
    
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

    const formRef = useRef<HTMLFormElement>(null);
    
    const {handleKeyDown} = useEnterNavigation({formRef})
       
useEffect(() => {
console.log("formRef", formRef.current?.getElementsByTagName("input")?.namedItem("amount")?.focus())
}, []);



    return <div className="w-[100dvh] h-[80dvh]">

        <Form {...form}>
            <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Date
                                </FormLabel>
                                <FormControl>
                                    <Input type="date" {...field}  autoFocus />
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
                                                    tabIndex={0}
                                                    classNamePrefix={"react-selectss"}
                                                    value={options.find(o => o.value === field.value) ?? null}
                                                    onChange={(val) => field.onChange(val?.value)}
                                                    options={options}
                                                    getOptionValue={(opt) => opt.value}
                                                    getOptionLabel={(opt) => opt.label}
                                                    isSearchable={true}
                                                    placeholder="Select type"
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
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Amount
                                </FormLabel>
                                <FormControl>
                                    <Input inputMode="numeric" {...field}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/[^0-9]/g, "");
                                            field.onChange(value);
                                        }}
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
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                    <Button type="submit" onKeyDown={() => useDirectFocus({element:"input",name:"date",nextRef:formRef}) } className="mt-6 focus:bg-green-500  focus:text-white">{editIndex !== null ? "Edit" : "Add"}</Button>
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
import Link from "next/link";
import { ThemeToggle } from "../components/theme-toggle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Home, LayoutDashboard } from "lucide-react";

const items = [
    {
        value: "item-1",
        trigger: "Master",
        content: <div className="flex flex-col">
            <Link href={'/company'} className="px-6 py-1 hover:bg-red-600">- Company</Link>
            <Link href={'/vendor'} className="px-6 py-1 hover:bg-red-600">- Vender</Link>
            <Link href={'/city'} className="px-6 py-1 hover:bg-red-600">- City</Link>
            <Link href={'/unit'} className="px-6 py-1 hover:bg-red-600">- Unit</Link>
            <Link href={'/serial-number'} className="px-6 py-1 hover:bg-red-600">- Serial Number</Link>
        </div>
    },
    {
        value: "item-2",
        trigger: "Fabric",
        content: <div className="flex flex-col">
            <Link href={'/customer'} className="px-6 py-1 hover:bg-red-600">- Customer</Link>
            <Link href={'/fabric'} className="px-6 py-1 hover:bg-red-600">- Fabric</Link>
        </div>
    },
    {
        value: "item-3",
        trigger: "Custom Challan",
        content: <div className="flex flex-col">
            <Link href={'/custom-challan'} className="px-6 py-1 hover:bg-red-600">- Road Challan</Link>
            <Link href={'/custom-challan-sales'} className="px-6 py-1 hover:bg-red-600">- Sales Challan </Link>
        </div>
    },
    
]


export default function NavBar() {
    return (<div className="w-72 h-[100vh] bg-red-500 relative">
        <div className="bg-linear-to-l from-red-500 to-orange-500 flex  items-center justify-between p-3">
            <h1 className="text-white  font-bold flex  gap-2"><LayoutDashboard />Dashboard</h1>
            <ThemeToggle />
        </div>
        <div className="flex flex-col justify-start">
            <div className="">
                <Link href={'/'} className="block w-full text-left px-3 py-2 font-bold hover:bg-red-600 hover:underline gap-2">Home</Link>
            </div>
            <Accordion type="single" defaultValue={"item-2"} className="max-w-lg">
                {items.map((item) => (
                    <AccordionItem key={item.value} value={item.value}>
                        <AccordionTrigger className="uppercase cursor-pointer px-3 py-2 font-bold hover:bg-red-600">{item.trigger}</AccordionTrigger>
                        <AccordionContent>{item.content}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
        <div className="absolute bottom-0 w-full p-3 bg-red-500 flex items-center justify-between">
            <p className="text-white text-xs">© 2025 Textiles Managers. All rights reserved.</p>
        </div>
    </div>)
}
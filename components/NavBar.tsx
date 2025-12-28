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
export default function NavBar() {
    return (<div className="flex py-3 px-10 justify-between items-center border-b z-50 bg-red-500">
        <div>
            <h1 className="text-white">Dashboard</h1>
        </div>
        <div className="flex gap-5 items-center">
            <DropdownMenu>
                <Link href={'/'} >
                    <DropdownMenuTrigger  className="focus-visible:outline-none text-white">Home</DropdownMenuTrigger>
                </Link>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger className="focus-visible:outline-none text-white">Master</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <Link href={'/company'}>
                        <DropdownMenuItem>Company</DropdownMenuItem>
                    </Link>
                    <Link href={'/vendor'}>
                    <DropdownMenuItem>Vender</DropdownMenuItem>
                    </Link>
                    <Link href={'/city'}>
                    <DropdownMenuItem>City</DropdownMenuItem>
                    </Link>
                    <Link href={'/area'}>
                    <DropdownMenuItem>Area</DropdownMenuItem>
                    </Link>
                    <Link href={'/unit'}>
                    <DropdownMenuItem>Unit</DropdownMenuItem>
                    </Link>
                    <Link href={'/serial-number'}>

                    <DropdownMenuItem>Serial Number</DropdownMenuItem>
                    </Link>
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger className="focus-visible:outline-none text-white">Fabric</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Customer</DropdownMenuItem>
                    <DropdownMenuItem>Tailor</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
        <div className="flex gap-5 items-center">
            <ThemeToggle />

        </div>
    </div>)
}
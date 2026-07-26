"use client";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useState } from "react";


const MenuList = [
    {name:"Readymade",url:"/readymade"}
]

export default function NavBar() {
    const [openSheet, setOpenSheet] = useState<boolean>(false);
  return (
    <>
      <div className="bg-red-500 flex items-center p-3 gap-5 ">
            <Menu className="text-white" onClick={()=>setOpenSheet(true)} />
        <h1 className="text-white font-bold">Textiles Managers</h1>
      </div>
        <Sheet open={openSheet} onOpenChange={setOpenSheet}>          
          <SheetContent  side="left" showCloseButton={false}>
            <SheetHeader >
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>This action cannot be undone.</SheetDescription>
            </SheetHeader>
            <SheetDescription>
                {MenuList.map((item,index)=>{
                    return <Link key={index} href={item.url} onClick={()=>setOpenSheet(false)}>{item.name}</Link>
                })}
                </SheetDescription>
          </SheetContent>
        </Sheet>
    </>
  );
}

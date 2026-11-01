"use client";
import { ChevronDown, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,  
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import {
  CollapsibleContent,
  CollapsibleTrigger,
  Collapsible,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/Redux/Store";

const MenuList = [
  { name: "Home", url: "/" },
  { name: "Ready made List", url: "/readymade" },
];

export default function NavBar() {
  const [openSheet, setOpenSheet] = useState<boolean>(false);



  return (
    <>
      <div className="bg-red-500 flex items-center p-3 gap-5 ">
        <Menu className="text-white" onClick={() => setOpenSheet(true)} />
        <h1 className="text-white font-bold">Textiles Managers</h1>
      </div>
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent side="left" showCloseButton={false}>
          <SheetHeader>
            <SheetTitle>Bussines Solustion</SheetTitle>
          </SheetHeader>
          <div className="">
            <nav className="flex flex-col gap-1">
              {MenuList.map((item) => {
               

                return (
                  <Link
                    key={item.url}
                    href={item.url}
                    className="rounded-md px-3 py-2 text-sm hover:bg-accent"
                    
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <SheetFooter>Copyright©️ 2026 All Rights Reserved.</SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

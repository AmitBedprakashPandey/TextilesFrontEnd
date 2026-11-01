"use client";
import { ChevronDown, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";
import {
  CollapsibleContent,
  CollapsibleTrigger,
  Collapsible,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/Redux/Store";

const MenuList = [
  { name: "Home", url: "/" },
  {
    name: "Master",
    subItems: [
      { url: "/master/company", name: "Company" },
      { url: "/master/vendor", name: "vendor" },
      {url:"/readymade/file-upload", name:"File Upload" }      
    ],
  },
  { name: "Ready made List", url: "/readymade" },
  { name: "Order Form", url: "/orderform" },
  { name: "Karigar Cloth Entry", url: "/karigar" },
  {name : "Dispatch",url:"#"}
];

export default function NavBar() {
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.ReadyMadeItems);

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
                // Has submenu
                if (item.subItems) {
                  return (
                    <Collapsible key={item.name}>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-between"
                        >
                          <span>{item.name}</span>
                          <ChevronDown className="size-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                        </Button>
                      </CollapsibleTrigger>

                      <CollapsibleContent className="space-y-1 pl-4">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.url}
                            href={subItem.url}
                            className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  );
                }

                // Normal menu item
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

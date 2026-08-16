"use client";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReadyMades } from "@/lib/Redux/Reducers/RadymadeSlice";
import { RootState } from "@/lib/Redux/Store";


const MenuList = [
  {name:"Home", url:"/"},
    {name:"Ready made",url:"/readymade"},
]

export default function NavBar() {
    const [openSheet, setOpenSheet] = useState<boolean>(false);
    const dispatch = useDispatch();
const {items} = useSelector((state: RootState)=>state.ReadyMadeItems)

    useEffect(()=>{
if(!items){

}
    },[dispatch])
  return (
    <>
      <div className="bg-red-500 flex items-center p-3 gap-5 ">
            <Menu className="text-white" onClick={()=>setOpenSheet(true)} />
        <h1 className="text-white font-bold">Textiles Managers</h1>
      </div>
        <Sheet open={openSheet} onOpenChange={setOpenSheet}>          
          <SheetContent  side="left" showCloseButton={false}>
            <SheetHeader >
              <SheetTitle>Bussines Solustion</SheetTitle>
            </SheetHeader>
            <div className="">
                {MenuList.map((item,index)=>{
                    return <Link key={index} href={item.url} onClick={()=>setOpenSheet(false)}
                    className="block w-full hover:bg-red-500 capitalize hover:text-white p-3 font-bold"
                    
                    >{item.name}</Link>
                })}

                </div>
                <SheetFooter>
                  Copyright©️ 2026 All Rights Reserved.
                </SheetFooter>
          </SheetContent>
        </Sheet>
    </>
  );
}

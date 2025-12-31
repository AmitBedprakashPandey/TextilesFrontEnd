"use client"

import { Button } from "./ui/button"
import { X } from "lucide-react"
import React,{ useEffect } from "react"

interface props {
    open: boolean,
    close: () => void,
    title: string,
    children: React.ReactNode
}
export default function CustomDialog({ close, children, open, title }: props) {

  // ESC key handler
  useEffect(() => {
    if (!open) return

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close()
      }
    }

    window.addEventListener("keydown", handleEsc)

    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [open, close])

    return <>
        {open &&
            <div className="bg-black/30 absolute top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center">

                <div className="min-w-48 min-h-48 p-3 max-h-fit max-w-fit bg-white dark:bg-gray-800 rounded-2xl">
                    <div className="flex  items-center justify-between">

                        <h1 className="font-bold text-2xl ml-5">{title}</h1>
                        <Button type="button" variant={"destructive"} className="rounded-full" onClick={close}><X size={50} /></Button>
                    </div>
                    {children}

                </div>




            </div>
        }
    </>
}

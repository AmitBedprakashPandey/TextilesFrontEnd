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
            <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs flex items-center justify-center">
                <div className="min-w-96 min-h-48 p-3 max-h-fit max-w-max bg-white dark:bg-gray-800 rounded-2xl">
                    <div className="flex  items-center justify-between">
                        <h1 className="font-bold text-md ml-5">{title}</h1>
                        <Button type="button" variant={"destructive"} className="rounded-full" onClick={close}><X size={50} /></Button>
                    </div>
                    {children}
                </div>
            </div>
        }
    </>
}

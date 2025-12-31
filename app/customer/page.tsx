"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import Select from 'react-select'
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

type FabricRow = {
    rate: number
    qty: number
    thaans: number
    meters: number[]
}

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]


type NumberFields = "rate" | "qty" | "thaans"

const METER_GROUPS = 3
const TOTAL_INPUTS = 100


export default function Page() {

     const [company, setCompany] = useState<typeof options[0] | null>(null)
  const [vendor, setVendor] = useState<typeof options[0] | null>(null)
  const [date, setDate] = useState("")
 const [patterns, setPatterns] = useState<(typeof options[0] | null)[]>(
    Array(METER_GROUPS).fill(null)
  )


    const [meters, setMeters] = useState<number[][]>(
        Array.from({ length: METER_GROUPS }, () =>
            Array(TOTAL_INPUTS).fill(null)
        )
    )



    // one ref per input (stable)
    const inputRefs = useRef<(HTMLInputElement | null)[][]>([])

    useEffect(() => {
        document.body.style.overflowX = "hidden"
        return () => {
            document.body.style.overflowX = "auto"
        }

    }, [])

    


    const handleChange = (
        groupIndex: number,
        inputIndex: number,
        value: number
    ) => {
        setMeters(prev => {
            const copy = prev.map(arr => [...arr])
            copy[groupIndex][inputIndex] = value
            return copy
        })
    }


    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        groupIndex: number,
        inputIndex: number
    ) => {
        if (e.key === "Enter") {
            e.preventDefault()
            const nextInput = inputRefs.current[groupIndex]?.[inputIndex + 1]
            if (nextInput) {
                nextInput.focus();
                nextInput.select();
            }
        }
    }

    const getTotalMeters = (groupIndex: number) => meters[groupIndex].reduce((sum, val) => sum + (val > 0 ? val : 0), 0)
    const getTotalThaans = (groupIndex: number) => meters[groupIndex].reduce((sum, val) => sum + (val !== 0 ? 1 : 0), 0)

    // meters = number[][], each sub-array is a group
    const getGrandTotalMeters = () => meters.reduce((grandSum, group) => grandSum + group.reduce((sum, val) => sum + val, 0), 0)

    const getGrandTotalThaans = () => meters.reduce((grandSum, group) => grandSum + group.reduce((sum, val) => sum + (val !== 0 ? 1 : 0), 0), 0)



const onSubmit = () => {
    const payload = meters.map((group, groupIndex) => {
        if(!patterns[groupIndex]) return null
        return{

            groupNo: groupIndex + 1,
            pattern: patterns[groupIndex]?.value || null,
            meters: group,
            totalMeters: getTotalMeters(groupIndex),
            thaans: getTotalThaans(groupIndex),
        }
    })

    const dataToSave = {
      company: company?.value || null,
      vendor: vendor?.value || null,
      date,
      groups: payload,
      grandTotalMeters: getGrandTotalMeters(),
      grandTotalThaans: getGrandTotalThaans(),
    }

    console.log("Submitted Data:", dataToSave)
    alert("Data submitted! Check console.")
    // You can replace console.log with a POST request to your backend
  }

useEffect(() => {
  const handleCtrlS = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "s") { // Ctrl+S (or Cmd+S on Mac)
      e.preventDefault() // prevent browser save
      onSubmit()
    }
  }

  window.addEventListener("keydown", handleCtrlS)
  return () => window.removeEventListener("keydown", handleCtrlS)
}, [])

    return (
        <div className="w-full max-w-11/12 px-3  overflow-x-hidden relative mx-auto">
            <div className="p-3 flex justify-between items-center">
                <Label>Customer Fabric Entry</Label>
                <Button type="button" >Fabric Entry List</Button>
            </div>
            <div className="space-y-3 ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                    <div className="">
                        <Label className="pb-3">Company Name</Label>
                        <Select options={options} autoFocus theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                neutral0: "var(--background)",
                                neutral80: "var(--foreground)",
                                primary25: "var(--accent)",
                                primary: "var(--ring)",
                            },
                        })} />
                    </div>

                    <div className="">
                        <Label className="pb-3">Vendor Name</Label>
                        <Select options={options} theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                neutral0: "var(--background)",
                                neutral80: "var(--foreground)",
                                primary25: "var(--accent)",
                                primary: "var(--ring)",
                            },
                        })} />
                    </div>

                    <div className="">
                        <Label className="pb-3">Date</Label>
                        <Input type="date" className="w-48" />
                    </div>

                    <div className="">
                        <Label className="pb-3">Total Qty.</Label>
                        <Input type="number" value={getGrandTotalMeters()} placeholder="Total Quantity" className="max-w-" disabled />
                    </div>

                    <div className="">
                        <Label className="pb-3">Total Thaans.</Label>
                        <Input type="number" value={getGrandTotalThaans()} placeholder="Total Thaans" className="max-w-72" disabled />
                    </div>
                </div>
                <Separator />
                {/* Meters 100 time each input calculate value sum */}
                <div className="grid grid-cols-1  lg:grid-cols-3  gap-4">


                    {meters.map((group, groupIndex) => (
                        <div key={groupIndex} className="flex gap-3">
                            <div className="">
                                {/* HEADER */}
                                <div className="flex items-center gap-2 mb-2">
                                    <div>No. {groupIndex + 1}</div>

                                    <div>
                                        <Label className="pb-3">Patterns</Label>
                                        <Select options={options} className="w-64" theme={(theme) => ({
                                            ...theme,
                                            colors: {
                                                ...theme.colors,
                                                neutral0: "var(--background)",
                                                neutral80: "var(--foreground)",
                                                primary25: "var(--accent)",
                                                primary: "var(--ring)",
                                            },
                                        })}
                                        value={patterns[groupIndex]}
                        onChange={(val) => {
                          const newPatterns = [...patterns]
                          newPatterns[groupIndex] = val
                          setPatterns(newPatterns)
                        }}
                                        
                                        />
                                    </div>

                                    <div>
                                        <Label>Qty.</Label>
                                        <Input
                                            type="number"
                                            value={getTotalMeters(groupIndex)}
                                            disabled
                                            className="w-32"
                                        />
                                    </div>

                                    <div>
                                        <Label>Thaans</Label>
                                        <Input
                                            type="number"
                                            value={getTotalThaans(groupIndex)}
                                            disabled
                                            className="w-32"
                                        />
                                    </div>
                                </div>

                                {/* 100 INPUTS */}
                                <div className="grid grid-cols-4  gap-2">
                                    {group.map((value, inputIndex) => (
                                        <Input
                                            key={inputIndex}
                                            ref={el => {
                                                if (!inputRefs.current[groupIndex]) {
                                                    inputRefs.current[groupIndex] = []
                                                }
                                                inputRefs.current[groupIndex][inputIndex] = el
                                            }}
                                            type="number"
                                            min={0}
                                            value={value}
                                            onChange={e =>
                                                handleChange(
                                                    groupIndex,
                                                    inputIndex,
                                                    Number(e.target.value) || 0
                                                )
                                            }
                                            onKeyDown={e =>
                                                handleKeyDown(e, groupIndex, inputIndex)
                                            }
                                        />
                                    ))}
                                </div>
                            </div>

                            {groupIndex < meters.length - 1 && (
                                <Separator orientation="vertical" />
                            )}
                        </div>
                    ))}



                </div>
            </div>
        </div>
    )
}

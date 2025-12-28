"use client";

import { useState } from "react";
import UnitForm from "./UnitForm";
import UnitList from "./UnitList";
import { UnitFormValues } from "./unit.schema";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CustomDialog from "@/components/CustomDialog";
import { Card,CardContent,CardHeader } from "@/components/ui/card";

export default function UnitPage() {
  const [units, setUnits] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="p-5 max-h-full overflow-y-auto">
      <Card>
        <CardHeader>

      <div className="flex justify-between">
        <Label className="font-bold text-2xl">Unit</Label>
        <Button onClick={() => setOpen(true)} className="capitalize"><Plus /> Create</Button>
      </div>

        </CardHeader>
      </Card>
      <Card className="mt-3">
<CardContent>

      <CustomDialog open={open} close={() => setOpen(false)} title="Serial Number Details" children={<UnitForm
        onSubmit={(data: UnitFormValues) =>
          setUnits([...units, { id: Date.now(), ...data }])
        }
        />}
        
        />


      <UnitList data={units} />
        </CardContent>
        </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
import AreaForm from "./AreaForm";
import AreaList from "./AreaList";
import { AreaFormValues } from "./area.schema";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CustomDialog from "@/components/CustomDialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";


export default function AreaPage() {
  const [areas, setAreas] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="p-5 max-h-full overflow-y-auto">
<Card>
<CardHeader>

      <div className="flex justify-between">
        <Label className="font-bold text-2xl">Area</Label>
        <Button onClick={() => setOpen(true)} className="capitalize"><Plus /> Create</Button>
      </div>
</CardHeader>
</Card>
<Card className="mt-3">
  <CardContent>
      <CustomDialog open={open} close={() => setOpen(false)} title="Serial Number Details"
        children={<AreaForm
          onSubmit={(data: AreaFormValues) =>
            setAreas([...areas, { id: Date.now(), ...data }])
          }
        />}
      />

      <AreaList data={areas} />

  </CardContent>
</Card>
    </div>
  );
}


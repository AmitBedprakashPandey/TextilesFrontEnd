"use client";
import { useState } from "react";
import { CityForm } from "./CityForm";
import { CityList } from "./CityList";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CustomDialog from "@/components/CustomDialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function CityPage() {
  const [cities, setCities] = useState<any[]>([]);
const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="p-5 max-h-full overflow-y-auto">
      <Card>
<CardHeader>
      <div className="flex justify-between">
        <Label className="font-bold text-2xl">City</Label>
        <Button onClick={() => setOpen(true)} className="capitalize"><Plus /> Create</Button>
      </div>
</CardHeader>
</Card>
<Card className="mt-3">
<CardContent>

      <CustomDialog open={open} close={() => setOpen(false)} title="Serial Number Details" 
        children={
          <CityForm onSubmit={(v) => setCities([...cities, { id: Date.now(), ...v }])} />
          
        }
        
        />

      <CityList data={cities} />
        </CardContent>
        </Card>
    </div>
  );
}

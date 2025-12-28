"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function EditClientForm() {
  return (
    <Card className="max-w-6xl mx-auto">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-xl font-semibold">Edit Client</h2>

        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label>Salutation</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Dr." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dr">Dr.</SelectItem>
                <SelectItem value="Mr">Mr.</SelectItem>
                <SelectItem value="Mrs">Mrs.</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <Label>Name</Label>
            <Input placeholder="Angad Dinesh Patel" />
          </div>

          <div>
            <Label>Code</Label>
            <Input placeholder="1500004" />
          </div>
        </div>

        {/* Address & Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left */}
          <div className="space-y-3">
            <Label>Address</Label>
            <Input placeholder="We Care Dental Clinic" />
            <Input placeholder="Prince apt, Gopal Gali" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Dr." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dr">Dr.</SelectItem>
                <SelectItem value="Mr">Mr.</SelectItem>
                <SelectItem value="Mrs">Mrs.</SelectItem>
              </SelectContent>
            </Select>
            <div className="">
                <Label>State</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Dr." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dr">Dr.</SelectItem>
                <SelectItem value="Mr">Mr.</SelectItem>
                <SelectItem value="Mrs">Mrs.</SelectItem>
              </SelectContent>
            </Select>
              <Input placeholder="Mumbai" />
              <Input placeholder="400086" />
            </div>

            <Label>Office Phone</Label>
            <Input placeholder="02225107996" />
            <Input placeholder="02225155268" />

            <Label>Cell Phone</Label>
            <Input placeholder="9930846161" />

            <Label>Email</Label>
            <Input placeholder="patelangad@gmail.com" />
          </div>

          {/* Right */}
          <div className="space-y-3">
            <Label>Delivery Method</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Local Driver" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="local">Local Driver</SelectItem>
                <SelectItem value="courier">Courier</SelectItem>
              </SelectContent>
            </Select>

            <Label>Working Hours</Label>
            <Input placeholder="9.00 - 12.30, 3.00 - 8.00" />

            <Label>Price Band</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="International" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="international">International</SelectItem>
                <SelectItem value="local">Local</SelectItem>
              </SelectContent>
            </Select>

            <Label>Categories</Label>
            <Input placeholder="General" />

            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label>Credit Limit</Label>
                <Input placeholder="1000" />
              </div>
              <div>
                <Label>Payment Terms (Days)</Label>
                <Input placeholder="10" />
              </div>
              <div>
                <Label>Opening Balance</Label>
                <Input placeholder="34" />
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <Checkbox />
              <Label>Dr</Label>
              <Checkbox />
              <Label>Cr</Label>
            </div>

            <Label>Bill To</Label>
            <Input placeholder="Dinesh Patel" />

            <Label>Notes</Label>
            <Textarea />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="destructive">Delete</Button>
          <div className="flex gap-3">
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

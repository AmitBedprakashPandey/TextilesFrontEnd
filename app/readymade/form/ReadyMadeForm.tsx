import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const formSchema = z.object({
  itemName: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z]*$/),
  rate: z.number().min(1).max(10),
});

export default function ReadyMadeForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: "",
      rate: 0,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {}

  return (
    <>
      <div className="flex flex-col gap-3">
        <FieldGroup>
          <Field>
            <FieldLabel>Enter Item Name</FieldLabel>
            <Input type="text" placeholder="Enter item name" />
          </Field>
        </FieldGroup>
        <FieldGroup>
          <Field>
            <FieldLabel>Enter Rate</FieldLabel>
            <Input type="number" placeholder="Enter rate" />
          </Field>
        </FieldGroup>

        <FieldGroup>
            <Field>
                <FieldLabel>Upload Image <p className="text-xs text-red-500">(Max 5)</p></FieldLabel>
                <Input type="file" />
            </Field>
            <FieldDescription>
                <div className="border w-14 h-14 relative">
                    <Button className="absolute -top-0 right-0 w-5 h-5 " variant={"destructive"}><Trash/></Button>
                </div>
            </FieldDescription>
        </FieldGroup>

        <Button
          variant={"default"}
          onClick={form.handleSubmit(onSubmit)}
          className="w-full h-10 mt-4"
        >
          SAVE
        </Button>
      </div>
    </>
  );
}

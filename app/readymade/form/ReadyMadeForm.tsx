import { Form, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  itemName: z
    .string()
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .regex(
      /^[a-zA-Z ]+$/,
      "Only letters and spaces are allowed"
    ),

  rate: z
    .string()
    .min(1, "Rate must be at least 1")
    .max(100000, "Rate is too high"),

  avg: z
    .string()
    .min(1, "Average meter must be at least 1")
    .max(100000, "Average meter is too high"),

  popline: z
    .string()
    .min(1, "Popline meter must be at least 1")
    .max(100000, "Popline meter is too high"),

  border: z
    .string()
    .min(1, "Border meter must be at least 1")
    .max(100000, "Border meter is too high"),

});

export default function ReadyMadeForm() {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: "",
      rate: "",
      avg: "",
      popline: "",
      border: "",
    },
  });

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files || []);

    if (images.length + selectedFiles.length > 5) {
      alert("You can upload a maximum of 5 images.");
      return;
    }

    const newImages = [...images, ...selectedFiles];

    setImages(newImages);
      

    const newPreviews = newImages.map((file) => URL.createObjectURL(file));

    setImagePreviews(newPreviews);



    // Reset input so the same image can be selected again
    event.target.value = "";
  }

  function removeImage(index: number) {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    setImages(updatedImages);
    setImagePreviews(updatedPreviews);
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data,images);
    
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <form id="form-readymade" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="itemName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Enter Item Name</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    type="text"
                    placeholder="Enter item name"
                  />
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="rate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Enter Rate</FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    inputMode="numeric"
                    placeholder="Enter Rate"
                  />
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup>
            <Controller
              name="avg"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Enter Avg. Mtr</FieldLabel>

                  <Input
                    {...field}
                    type="number"
                    inputMode="numeric"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    placeholder="Enter mtr"
                  />
                </Field>
              )}
            />            
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="popline"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Enter Popline Mtr</FieldLabel>
                  <Input
                    type="number"
                    {...field}
                    inputMode="numeric"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    placeholder="Enter mtr"
                  />
                </Field>
              )}
            />
            
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="border"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Enter Border Mtr</FieldLabel>
                  <Input
                    type="number"
                    {...field}
                    inputMode="numeric"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    placeholder="Enter mtr"
                  />
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup>
            <Field>            
              <FieldLabel>
                Upload Image <p className="text-xs text-red-500">(Max 5)</p>
              </FieldLabel>
              <Input
                type="file"
                accept="image/*"
                capture="environment"
                multiple
                disabled={images.length >= 5}
                onChange={handleImageChange}
              />
            </Field>            
            <FieldDescription>
              <div className="flex flex-wrap gap-3">
                {imagePreviews.map((preview, index) => (
                  <div
                    key={preview}
                    className="relative w-20 h-20 border rounded overflow-hidden"
                  >
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />

                    <Button
                      variant={"destructive"}
                      size={"icon-sm"}
                      className="absolute top-1 right-1 w-5 h-5 bg-white"
                      onClick={() => removeImage(index)}
                    >
                      <Trash className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
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
        </form>
      </div>
    </>
  );
}

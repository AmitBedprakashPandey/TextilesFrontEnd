import { useForm, Controller } from "react-hook-form";
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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  createReadyMade,
  updateReadyMade,
  setOpenFrom,
} from "@/lib/Redux/Reducers/RadymadeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/Redux/hooks";
import CustomLoading from "@/components/CustomLoading";
const formSchema = z.object({
  itemName: z
    .string()
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .regex(/^[a-zA-Z ]+$/, "Only letters and spaces are allowed"),

  rate: z
    .number()
    .min(1, "Rate must be at least 1")
    .max(999, "Rate is too high")
    .optional(),

  avg: z
    .number()
    .min(0, "Average meter must be at least 1")
    .max(5, "Average meter is too high")
    .optional(),

  popline: z
    .number()
    .min(0, "Popline meter must be at least 1")
    .max(1, "Popline meter is too high")
    .optional(),

  border: z
    .number()
    .min(0, "Border meter must be at least 1")
    .max(1, "Border meter is too high")
    .optional(),
});

export default function ReadyMadeForm() {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { selectedItem, openfrom,loading } = useAppSelector(
    (state) => state.ReadyMadeItems,
  );

  useEffect(() => {
    if (selectedItem) {
      form.reset(selectedItem);
    }
  }, [selectedItem]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: "",
      rate: 0,
      avg: 0,
      popline: 0,
      border: 0,
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

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const inputs = Array.from(
        e.currentTarget.form?.querySelectorAll<HTMLInputElement>(
          "input:not([disabled])",
        ) ?? [],
      );

      const currentIndex = inputs.indexOf(e.currentTarget);

      if (currentIndex !== -1 && currentIndex < inputs.length - 1) {
        inputs[currentIndex + 1].focus();
        inputs[currentIndex + 1].select();
      }
    }
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      if (selectedItem === null) {
        await dispatch(createReadyMade(data)).unwrap();
        dispatch(setOpenFrom(false));
        toast.success("Create Successfull");
      } else {
        await dispatch(
          updateReadyMade({ _id: selectedItem._id, ...data }),
        ).unwrap();
        dispatch(setOpenFrom(false));
        toast.success("Update Successfull");
      }
    } catch (error) {
      console.log(error);
    }
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
                    autoFocus
                    className="capitalize"
                    onKeyDown={handleEnter}
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
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    aria-invalid={fieldState.invalid}
                    onFocus={(e) => e.target.select()}
                    autoComplete="off"
                    inputMode="decimal"
                    onKeyDown={handleEnter}
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
                    onKeyDown={handleEnter}
                    aria-invalid={fieldState.invalid}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    onFocus={(e) => e.target.select()}
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
                    onKeyDown={handleEnter}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    onFocus={(e) => e.target.select()}
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
                    onKeyDown={handleEnter}
                    aria-invalid={fieldState.invalid}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    onFocus={(e) => e.target.select()}
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
                Upload Image <h5 className="text-xs text-red-500">(Max 5)</h5>
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
            {selectedItem === null ? "SAVE" : "UPDATE"}
          </Button>
        </form>
      </div>

      {loading && <CustomLoading />}
    </>
  );
}

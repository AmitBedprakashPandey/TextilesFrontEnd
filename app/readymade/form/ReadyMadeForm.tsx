import { useForm, Controller, useFieldArray } from "react-hook-form";
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
import { Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CustomSelectInput from "@/components/CustomSelectInput";
import {
  createReadyMade,
  updateReadyMade,
  setOpenFrom,
  ImagesList,
} from "@/lib/Redux/Reducers/RadymadeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/Redux/hooks";
import CustomLoading from "@/components/CustomLoading";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SizeList } from "@/lib/constants/sizeData";

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
  size: z
    .array(
      z.object({
        size: z.string(),
        rate: z.string(),
      }),
    )
    .default([])
    .optional(),
  tempSize: z.string().optional(),
});

export default function ReadyMadeForm() {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [currentSize, setCurrentSize] = useState("");
  const [currentRate, setCurrentRate] = useState("");
  const dispatch = useAppDispatch();
  const [imageTrash, setImageTrash] = useState<ImagesList[]>([]);

  const { items, selectedItem, loading } = useAppSelector((state) => state.ReadyMadeItems);

  useEffect(() => {
    if (selectedItem) {
      form.reset(selectedItem);
      setImagePreviews(selectedItem.images?.map((image) => image.url) || []);
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
      size: [],
      tempSize: "",
    },
  });

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? []);

    const remainingSlots = 5 - images.length;

    if (remainingSlots <= 0) {
      toast.warning("You can upload a maximum of 5 images.");
      return;
    }

    if (selectedFiles.length > remainingSlots) {
      toast.warning(`You can only add ${remainingSlots} more image(s).`);
    }

    const filesToAdd = selectedFiles.slice(0, remainingSlots);

    setImages([...images, ...filesToAdd]);

    setImagePreviews([
      ...imagePreviews,
      ...filesToAdd.map((file) => URL.createObjectURL(file)),
    ]);

    event.target.value = "";
  }

  function removeImage(index: number) {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    const trash = imagePreviews.filter((_,i)=>i == index);
   
    const d = items.flatMap((item)=>item.images ?? []).find((ite)=>ite.url === trash[0])
    if(d){
      setImageTrash((prev) => [...prev, d]);
        }
    
    
    
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

  const itemSearch = form.watch("itemName");

  const { fields, append, remove } = useFieldArray({control: form.control, name: "size"});

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      if (selectedItem === null) {
        // CREATE
        await dispatch(createReadyMade({ ...data,
          //  images: images 
          })).unwrap();
        console.log("Images to be uploaded:", images);
        toast.success("Create Successful");
      } else {
        // UPDATE
        console.log("Selected Item ID:", images);
        await dispatch(
          updateReadyMade({
            _id: selectedItem._id,
            ...data,
            // images: images,
            trash:imageTrash
          }),
        ).unwrap();

        toast.success("Update Successful");
      }

      dispatch(setOpenFrom(false));

      form.reset({
        itemName: "",
        rate: 0,
        avg: 0,
        popline: 0,
        border: 0,
        size: [],
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }



  return (
    <>
      <div className="flex flex-col gap-3">
        <form id="form-readymade" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <CustomSelectInput
              control={form.control}
              name="itemName"
              label="Enter Item Name"
              placeholder="Enter item name"
              inputLabel="itemName"
              inputValue="_id"
              items={items}
              selectedItem={selectedItem}
              itemSearch={itemSearch}
              handleEnter={handleEnter}
              autoFocus={true}
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
          <Card className="mt-3">
            <CardHeader>
              <h1 className="font-bold text-md ml-5">Select Size</h1>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">

              <CustomSelectInput
                control={form.control}
                name={"tempSize"}
                label="Select Size"
                placeholder="Select size"
                inputLabel="size"
                inputValue="size"
                items={SizeList}
                itemSearch={form.watch("tempSize") || ""}
                onSelect={(selected) => {
                  if (selected) {
                    setCurrentSize(selected.size);
                  }
                }}
                handleEnter={handleEnter}
              />
              <Field>
                <FieldLabel>Enter Rate</FieldLabel>
                <Input
                  type="text"
                  value={currentRate}
                  onChange={(e) => setCurrentRate(e.target.value)}
                  placeholder="Enter rate"
                />
              </Field>

              <Button
                type="button"
                variant="default"
                className="mt-7"
                onClick={() => {
                  append({ size: currentSize, rate: currentRate });
                  setCurrentSize("");
                  setCurrentRate("");
                  form.setValue("tempSize", "");                  
                }}
              >
                <Plus /> Add Size
              </Button>
              </div>
              <div className="p-3 grid grid-cols-3 gap-2">
                {fields.map((field, index) => (
                  <div key={field.id} className=" gap-2">
                    {field.size} - {field.rate}
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Trash />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          {/* <FieldGroup>
            <Field>
              <FieldLabel>
                Upload Image{" "}
                <span className="text-xs text-red-500">
                  (Max {imagePreviews.length}/5)
                </span>
              </FieldLabel>
              <Input
                type="file"
                accept="image/*"
                capture="environment"
                multiple
                disabled={imagePreviews.length >= 5}
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
                    <Image
                      src={preview}
                      width={80}
                      height={80}
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
          </FieldGroup> */}
          <Button variant={"default"} className="w-full h-10 mt-4">
            {selectedItem ? "UPDATE" : "SAVE"}
          </Button>
        </form>
      </div>

      {loading && <CustomLoading />}
    </>
  );
}

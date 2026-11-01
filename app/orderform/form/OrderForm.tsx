"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/lib/Redux/hooks";
import { getReadyMades } from "@/lib/Redux/Reducers/RadymadeSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit3, Plus, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const orderItemSchema = z.object({
  item: z
    .string()
    .trim()
    .min(1, "Item is required")
    .regex(/^[a-zA-Z ]+$/, "Only letters and spaces are allowed"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  rate: z.number().min(1, "Rate must be at least 1"),
});

const formSchema = z.object({
  company: z.string().trim().min(1, "Company is required"),
  vendor: z.string().trim().min(1, "Vendor is required"),
  listitem: z.array(orderItemSchema).min(1, "Add at least one item"),
});

type OrderItem = z.infer<typeof orderItemSchema>;
type OrderFormValues = z.infer<typeof formSchema>;

const emptyOrderItem: OrderItem = {
  item: "",
  quantity: 0,
  rate: 0,
};

const emptyLineItems: OrderItem[] = [];

const numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

export default function OrderForm() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.ReadyMadeItems);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showItemSearch, setShowItemSearch] = useState(false);

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      vendor: "",
      listitem: [],
    },
  });

  const itemForm = useForm<OrderItem>({
    resolver: zodResolver(orderItemSchema),
    defaultValues: emptyOrderItem,
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "listitem",
  });

  const lineItems = useWatch({
    control: form.control,
    name: "listitem",
    defaultValue: emptyLineItems,
  });
  const itemSearch =
    useWatch({ control: itemForm.control, name: "item" }) ?? "";

  useEffect(() => {
    void dispatch(getReadyMades());
  }, [dispatch]);

  const filteredItems = useMemo(() => {
    const search = itemSearch.trim().toLowerCase();

    if (!search) {
      return [];
    }

    return items
      .filter((item) => item.itemName.toLowerCase().includes(search))
      .slice(0, 8);
  }, [items, itemSearch]);

  const orderTotal = useMemo(
    () =>
      lineItems.reduce(
        (total, item) => total + item.quantity * item.rate,
        0,
      ),
    [lineItems],
  );

  function resetItemEditor() {
    itemForm.reset(emptyOrderItem);
    setEditingIndex(null);
    setShowItemSearch(false);
  }

  function selectReadyMadeItem(item: (typeof items)[number]) {
    itemForm.setValue("item", item.itemName, {
      shouldDirty: true,
      shouldValidate: true,
    });

    if (item.rate !== undefined) {
      itemForm.setValue("rate", item.rate, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }

    setShowItemSearch(false);
    itemForm.setFocus("quantity");
  }

  function saveLineItem(data: OrderItem) {
    const lineItem = { ...data, item: data.item.trim() };

    if (editingIndex === null) {
      append(lineItem);
      toast.success("Item added");
    } else {
      update(editingIndex, lineItem);
      toast.success("Item updated");
    }

    form.clearErrors("listitem");
    resetItemEditor();
  }

  function editLineItem(index: number) {
    const lineItem = form.getValues(`listitem.${index}`);

    if (!lineItem) {
      return;
    }

    itemForm.reset(lineItem);
    setEditingIndex(index);
    setShowItemSearch(false);
    window.requestAnimationFrame(() => itemForm.setFocus("item"));
  }

  function deleteLineItem(index: number) {
    remove(index);

    if (editingIndex === index) {
      resetItemEditor();
    } else if (editingIndex !== null && index < editingIndex) {
      setEditingIndex(editingIndex - 1);
    }

    toast.success("Item removed");
  }

  function onSubmit(data: OrderFormValues) {    
    console.log("Order form data", data);
    toast.success("Order is ready to save", {
      description: `${data.listitem.length} item${data.listitem.length === 1 ? "" : "s"} added to this order.`,
    });
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-3 py-4 sm:gap-6 sm:p-6">
      <div className="flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between sm:border-0 sm:pb-0">
        <div>
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Order Form
          </h1>          
        </div>
        <Button
          type="submit"
          form="orderForm"
          className="h-11 w-full text-base sm:h-8 sm:w-auto sm:text-sm"
        >
          Save order
        </Button>
      </div>

      <form
        id="orderForm"
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 sm:gap-6"
      >
        <FieldGroup className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <Controller
            name="company"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="company">Company</FieldLabel>
                <Input
                  {...field}
                  id="company"
                  aria-invalid={fieldState.invalid}
                  autoComplete="organization"
                  placeholder="Enter company name"
                  className="h-11 text-base sm:h-8 sm:text-sm"
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            name="vendor"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="vendor">Vendor</FieldLabel>
                <Input
                  {...field}
                  id="vendor"
                  aria-invalid={fieldState.invalid}
                  autoComplete="organization"
                  placeholder="Enter vendor name"
                  className="h-11 text-base sm:h-8 sm:text-sm"
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        </FieldGroup>

        <section className="rounded-lg border bg-card p-3 shadow-sm sm:rounded-xl sm:p-5">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold">
                {editingIndex === null ? "Add item" : "Update item"}
              </h2>
              <div className="text-sm text-muted-foreground">
                Search a saved ready-made item or enter a new one manually.
              </div>
            </div>
            {editingIndex !== null && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-10 w-full sm:h-7 sm:w-auto"
                onClick={resetItemEditor}
              >
                <X />
                Cancel edit
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-[minmax(0,1fr)_10rem_10rem_auto] md:items-end">
            <Controller
              name="item"
              control={itemForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="order-item">Item</FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="order-item"
                      value={field.value ?? ""}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      placeholder="Search or enter item"
                      className="h-11 text-base sm:h-8 sm:text-sm"
                      onFocus={() => setShowItemSearch(true)}
                      onBlur={() => {
                        field.onBlur();
                        window.setTimeout(() => setShowItemSearch(false), 120);
                      }}
                      onChange={(event) => {
                        field.onChange(event.target.value);
                        setShowItemSearch(true);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Escape") {
                          setShowItemSearch(false);
                        }

                        if (event.key === "Enter") {
                          event.preventDefault();
                          itemForm.setFocus("quantity");
                        }
                      }}
                    />

                    {showItemSearch && itemSearch.trim() && (
                      <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-md border bg-popover shadow-md">
                        {filteredItems.length > 0 ? (
                          <div className="max-h-52 overflow-y-auto py-1">
                            {filteredItems.map((item) => (
                              <button
                                key={item._id}
                                type="button"
                                className="flex min-h-11 w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm hover:bg-muted"
                                onMouseDown={(event) => {
                                  event.preventDefault();
                                  selectReadyMadeItem(item);
                                }}
                              >
                                <span className="font-medium">{item.itemName}</span>
                                {item.rate !== undefined && (
                                  <span className="text-muted-foreground">
                                    Rate {numberFormatter.format(item.rate)}
                                  </span>
                                )}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="px-3 py-2 text-sm text-muted-foreground">
                            No saved item found. You can add this as a new item.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Controller
              name="quantity"
              control={itemForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="order-quantity">Quantity</FieldLabel>
                  <Input
                    {...field}
                    id="order-quantity"
                    value={field.value ?? ""}
                    type="number"
                    min="1"
                    step="1"
                    inputMode="numeric"
                    aria-invalid={fieldState.invalid}
                    placeholder="0"
                    className="h-11 text-base sm:h-8 sm:text-sm"
                    onFocus={(event) => event.target.select()}
                    onChange={(event) =>
                      field.onChange(
                        event.target.value === ""
                          ? undefined
                          : event.target.valueAsNumber,
                      )
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        itemForm.setFocus("rate");
                      }
                    }}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Controller
              name="rate"
              control={itemForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="order-rate">Rate</FieldLabel>
                  <Input
                    {...field}
                    id="order-rate"
                    value={field.value ?? ""}
                    type="number"
                    min="1"
                    step="0.01"
                    inputMode="decimal"
                    aria-invalid={fieldState.invalid}
                    placeholder="0.00"
                    className="h-11 text-base sm:h-8 sm:text-sm"
                    onFocus={(event) => event.target.select()}
                    onChange={(event) =>
                      field.onChange(
                        event.target.value === ""
                          ? undefined
                          : event.target.valueAsNumber,
                      )
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        void itemForm.handleSubmit(saveLineItem)();
                      }
                    }}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Button
              type="button"
              className="h-11 w-full text-base md:h-8 md:w-auto md:text-sm"
              onClick={itemForm.handleSubmit(saveLineItem)}
            >
              {editingIndex === null ? <Plus /> : <Edit3 />}
              {editingIndex === null ? "Add item" : "Update item"}
            </Button>
          </div>
        </section>

        <section className="overflow-hidden rounded-lg border bg-card shadow-sm sm:rounded-xl">
          <div className="flex items-center justify-between border-b px-3 py-3 sm:px-5">
            <div>
              <h2 className="font-semibold">Items</h2>
              <div className="text-sm text-muted-foreground">
                {fields.length} item{fields.length === 1 ? "" : "s"} in this order
              </div>
              <div className="mt-1 text-xs text-muted-foreground sm:hidden">
                Swipe the table to see all columns.
              </div>
            </div>
          </div>

          <Table className="min-w-[40rem] sm:min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Rate</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-32 text-right sm:w-28">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-28 text-center text-muted-foreground"
                  >
                    No items added yet.
                  </TableCell>
                </TableRow>
              ) : (
                fields.map((field, index) => {
                  const item = lineItems[index] ?? field;
                  const amount = item.quantity * item.rate;

                  return (
                    <TableRow key={field.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{item.item}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {numberFormatter.format(item.quantity)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {numberFormatter.format(item.rate)}
                      </TableCell>
                      <TableCell className="text-right font-medium tabular-nums">
                        {numberFormatter.format(amount)}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="size-11 sm:size-7"
                            aria-label={`Edit ${item.item}`}
                            onClick={() => editLineItem(index)}
                          >
                            <Edit3 />
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="size-11 sm:size-7"
                            aria-label={`Delete ${item.item}`}
                            onClick={() => deleteLineItem(index)}
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
            {fields.length > 0 && (
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4} className="text-right">
                    Total
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {numberFormatter.format(orderTotal)}
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableFooter>
            )}
          </Table>

          <FieldError
            className="px-3 pb-3 sm:px-5 sm:pb-4"
            errors={[form.formState.errors.listitem]}
          />
        </section>
      </form>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomLoading from "@/components/CustomLoading";
import { INDIA_STATES } from "@/lib/constants/indiaStates";
import { COMPANY_TYPES } from "@/lib/constants/companyTypes";
import { useAppDispatch, useAppSelector } from "@/lib/Redux/hooks";
import {
  Company,
  CompanyPayload,
  clearSelectedItem,
  createCompany,
  setOpenFrom,
  updateCompany,
} from "@/lib/Redux/Reducers/CompanySlice";

export const companySchema = z.object({
  type: z.string().min(1, "Please select a type"),

  companyName: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be at most 100 characters"),

  ownerName: z
    .string()
    .trim()
    .min(2, "Owner name must be at least 2 characters")
    .max(100, "Owner name must be at most 100 characters"),

  address1: z
    .string()
    .trim()
    .min(3, "Address 1 must be at least 3 characters")
    .max(200, "Address 1 must be at most 200 characters"),

  address2: z
    .string()
    .trim()
    .min(3, "Address 2 must be at least 3 characters")
    .max(200, "Address 2 must be at most 200 characters"),

  state: z.string().min(1, "Please select a state"),

  city: z
    .string()
    .trim()
    .min(2, "City must be at least 2 characters")
    .max(100, "City must be at most 100 characters"),

  pincode: z
    .string()
    .trim()
    .regex(/^[0-9]{6}$/, "Enter a valid 6-digit PIN code"),

  email: z.string().trim().email("Please enter a valid email address"),

  gstno: z
    .string()
    .trim()
    .regex(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/,
      "Enter a valid 15-character GSTIN",
    ),

  phone1: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Enter a valid 10-digit phone number"),

  phone2: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Enter a valid 10-digit phone number"),
});

export type CompanyFormValues = z.infer<typeof companySchema>;

const DEFAULT_VALUES: CompanyFormValues = {
  type: "",
  companyName: "",
  ownerName: "",
  address1: "",
  address2: "",
  state: "",
  city: "",
  pincode: "",
  email: "",
  gstno: "",
  phone1: "",
  phone2: "",
};

function companyToFormValues(company: Company): CompanyFormValues {
  return {
    type: company.type ?? "",
    companyName: company.companyName ?? "",
    ownerName: company.ownerName ?? "",
    address1: company.billingStreet1 ?? "",
    address2: company.billingStreet2 ?? "",
    state: company.state ?? "",
    city: company.city ?? "",
    pincode: company.pincode ?? "",
    email: company.email ?? "",
    gstno: company.gstin ?? "",
    phone1: company.phone ?? "",
    phone2: company.mobile ?? "",
  };
}

function formValuesToPayload(values: CompanyFormValues): CompanyPayload {
  return {
    type: values.type,
    companyName: values.companyName.trim(),
    ownerName: values.ownerName.trim(),
    billingStreet1: values.address1.trim(),
    billingStreet2: values.address2.trim(),
    state: values.state,
    city: values.city.trim(),
    pincode: values.pincode.trim(),
    email: values.email.trim(),
    gstin: values.gstno.trim().toUpperCase(),
    phone: values.phone1.trim(),
    mobile: values.phone2.trim(),
  };
}

export default function CompanyForm() {
  const dispatch = useAppDispatch();
  const { selectedItem, loading } = useAppSelector((state) => state.CompanyItems);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  useEffect(() => {
    form.reset(selectedItem ? companyToFormValues(selectedItem) : DEFAULT_VALUES);
  }, [selectedItem, form]);

  function handleEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;

    event.preventDefault();

    const inputs = Array.from(
      formRef.current?.querySelectorAll<HTMLInputElement>("input:not([disabled])") ??
        [],
    );

    const currentIndex = inputs.indexOf(event.currentTarget);

    if (currentIndex !== -1 && currentIndex < inputs.length - 1) {
      inputs[currentIndex + 1].focus();
      inputs[currentIndex + 1].select();
    }
  }

  async function onSubmit(values: CompanyFormValues) {
    const payload = formValuesToPayload(values);

    try {
      if (selectedItem) {
        await dispatch(
          updateCompany({ _id: selectedItem._id, ...payload }),
        ).unwrap();
        toast.success("Company updated successfully");
      } else {
        await dispatch(createCompany(payload)).unwrap();
        toast.success("Company created successfully");
      }

      dispatch(clearSelectedItem());
      dispatch(setOpenFrom(false));
      form.reset(DEFAULT_VALUES);
    } catch (error) {
      console.error(error);
      const message =
        typeof error === "string" ? error : "Something went wrong";
      toast.error(
        message.includes("duplicate key")
          ? "A company with this GSTIN, phone or email already exists."
          : message,
      );
    }
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <>
      <form
        ref={formRef}
        id="form-company"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldGroup className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Controller
            name="type"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="type">Type</FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    field.onBlur();
                  }}
                >
                  <SelectTrigger
                    id="type"
                    className="w-full"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    {COMPANY_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            name="companyName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="companyName">Company Name</FieldLabel>
                <Input
                  {...field}
                  id="companyName"
                  value={field.value ?? ""}
                  aria-invalid={fieldState.invalid}
                  autoComplete="organization"
                  placeholder="Enter company name"
                  onKeyDown={handleEnter}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            name="ownerName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="ownerName">Owner Name</FieldLabel>
                <Input
                  {...field}
                  id="ownerName"
                  value={field.value ?? ""}
                  aria-invalid={fieldState.invalid}
                  autoComplete="name"
                  placeholder="Enter owner name"
                  onKeyDown={handleEnter}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            name="address1"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="address1">Address 1</FieldLabel>
                <Textarea
                  {...field}
                  id="address1"
                  value={field.value ?? ""}
                  aria-invalid={fieldState.invalid}
                  autoComplete="address-line1"
                  rows={2}
                  placeholder="Enter address line 1"
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            name="address2"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="address2">Address 2</FieldLabel>
                <Textarea
                  {...field}
                  id="address2"
                  value={field.value ?? ""}
                  aria-invalid={fieldState.invalid}
                  autoComplete="address-line2"
                  rows={2}
                  placeholder="Enter address line 2"
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            name="state"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="state">State</FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    field.onBlur();
                  }}
                >
                  <SelectTrigger
                    id="state"
                    className="w-full"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDIA_STATES.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            name="city"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="city">City</FieldLabel>
                <Input
                  {...field}
                  id="city"
                  value={field.value ?? ""}
                  aria-invalid={fieldState.invalid}
                  autoComplete="address-level2"
                  placeholder="Enter city"
                  onKeyDown={handleEnter}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            name="pincode"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="pincode">Pincode</FieldLabel>
                <Input
                  {...field}
                  id="pincode"
                  value={field.value ?? ""}
                  aria-invalid={fieldState.invalid}
                  autoComplete="postal-code"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Enter 6-digit pincode"
                  onChange={(event) =>
                    field.onChange(event.target.value.replace(/\D/g, ""))
                  }
                  onKeyDown={handleEnter}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  value={field.value ?? ""}
                  type="email"
                  aria-invalid={fieldState.invalid}
                  autoComplete="email"
                  placeholder="Enter email address"
                  onKeyDown={handleEnter}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            name="gstno"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="gstno">GST No</FieldLabel>
                <Input
                  {...field}
                  id="gstno"
                  value={field.value ?? ""}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  maxLength={15}
                  className="uppercase"
                  placeholder="Enter 15-character GSTIN"
                  onChange={(event) =>
                    field.onChange(event.target.value.toUpperCase())
                  }
                  onKeyDown={handleEnter}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            name="phone1"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="phone1">Phone 1</FieldLabel>
                <Input
                  {...field}
                  id="phone1"
                  value={field.value ?? ""}
                  aria-invalid={fieldState.invalid}
                  autoComplete="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="Enter 10-digit phone number"
                  onChange={(event) =>
                    field.onChange(event.target.value.replace(/\D/g, ""))
                  }
                  onKeyDown={handleEnter}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            name="phone2"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="phone2">Phone 2</FieldLabel>
                <Input
                  {...field}
                  id="phone2"
                  value={field.value ?? ""}
                  aria-invalid={fieldState.invalid}
                  autoComplete="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="Enter 10-digit phone number"
                  onChange={(event) =>
                    field.onChange(event.target.value.replace(/\D/g, ""))
                  }
                  onKeyDown={handleEnter}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        </FieldGroup>

        <Button
          type="submit"
          className="mt-5 w-full"
          disabled={isSubmitting || loading}
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {selectedItem ? "UPDATE" : "SAVE"}
        </Button>
      </form>

      {loading && <CustomLoading />}
    </>
  );
}

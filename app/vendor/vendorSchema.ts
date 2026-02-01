import { z } from "zod";

const GSTIN_REGEX =
  /^[0-9]{2}[A-Z]{5}[0-9]{3}[A-Z]{1}[1-9A-Z]{2}Z[0-9A-Z]{1}$/;

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

const PINCODE_REGEX = /^[1-9][0-9]{5}$/;

const PHONE_REGEX = /^[6-9][0-9]{9}$/;




export const vendorUpdateSchema = z.object({
  _id: z.string().optional(),

  vendorCategory: z.string().min(1, "Vendor category is required"),

  companyname: z.string().min(2, "Company name is too short"),
  ownername: z.string().min(2, "Owner name is required").optional(),

  gstin: z
    .string()
    // .regex(GSTIN_REGEX, "Invalid GSTIN")
    .optional(),

  pan: z
    .string()
    // .regex(PAN_REGEX, "Invalid PAN")
    .optional(),

  phone: z
    .string()
    // .regex(PHONE_REGEX, "Invalid phone number")
    .optional(),

  mobile: z
    .string()
    // .regex(PHONE_REGEX, "Invalid mobile number")
    ,

  email: z
    .string()
    .email("Invalid email address")
    .optional(),

  address: z.string().min(5, "Address is required"),
  address1: z.string().optional(),

  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),

  pincode: z
    .string()
    .regex(PINCODE_REGEX, "Invalid pincode"),

  bankname: z.string().optional(),

  accountno: z
    .string()
    .min(9, "Invalid account number")
    .max(18, "Invalid account number")
    .optional(),

  ifsc: z
    .string()
    // .regex(IFSC_REGEX, "Invalid IFSC code")
    .optional(),

  branch: z.string().optional(),

  gsttype: z.string().min(1, "GST type is required"),
});

export type VendorFormValues = z.infer<typeof vendorUpdateSchema>;
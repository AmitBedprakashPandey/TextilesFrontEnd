import { z } from "zod";

const GSTIN_REGEX =
  /^[0-9]{2}[A-Z]{5}[0-9]{3}[A-Z]{1}[1-9A-Z]{2}Z[0-9A-Z]{1}$/;

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

const PINCODE_REGEX = /^[1-9][0-9]{5}$/;

const PHONE_REGEX = /^[6-9][0-9]{9}$/;




export const vendorUpdateSchema = z.object({
  _id: z.string().optional(),

  vendorCategory: z.string(),

  vendorname: z.string(),
  ownername: z.string().optional(),

  gstin: z.string().optional(),

  pan: z.string().optional(),

  phone: z
    .string()
    .optional(),

  mobile: z.string(),

  email: z
    .string()
    .optional(),

  address: z.string(),
  address1: z.string().optional(),

  state: z.string(),
  city: z.string(),

  pincode: z
    .string()
  ,
  bankname: z.string().optional(),

  accountno: z
    .string()

    .optional(),

  ifsc: z
    .string()
    .optional(),

  branch: z.string().optional(),


});

export type VendorFormValues = z.infer<typeof vendorUpdateSchema>;
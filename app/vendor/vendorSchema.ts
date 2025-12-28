import { z } from "zod";

export const vendorSchema = z.object({
  vendorCategory: z.string().min(1, "Required"),
  companyName: z.string().min(2),
  nickName: z.string().optional(),
  ownerName: z.string().optional(),

  state: z.string().min(1),
  city: z.string().min(1),
  area: z.string().min(1),
  street1: z.string(),
  street2: z.string().optional(),
  pincode: z.string(),

  bankName: z.string().optional(),
  bankAccNo: z.string().optional(),
  gstin: z.string().length(15).optional(),
  
  mobile: z.string().min(10),
  phone: z.string().optional(),
  email: z.string().email().optional(),

});

export type VendorFormValues = z.infer<typeof vendorSchema>;

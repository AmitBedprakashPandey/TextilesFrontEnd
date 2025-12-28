import z from "zod";

export const companyFormSchema = z.object({
  companyName: z.string().min(2),
  
  ownerName: z.string().min(2),
  bankName: z.string().optional(),
  bankAccNo: z.string().optional(),
  gstin: z.string().length(15, "GSTIN must be 15 characters"),

  state: z.string().min(1),
  city: z.string().min(1),
  area: z.string().min(1),
  pincode:z.string().min(6).max(6),
  taxType: z.string().min(1),

  billingStreet1: z.string().min(1),
  billingStreet2: z.string().optional(),
  billingStreet3: z.string().optional(),
  billingMobile: z.string().min(10),
  billingPhone: z.string().optional(),
  billingEmail: z.string().email().optional(),

  shippingStreet1: z.string().min(1).optional(),
  shippingStreet2: z.string().optional(),
  shippingStreet3: z.string().optional(),
  shippingMobile: z.string().min(10).optional(),
  shippingPhone: z.string().optional(),
  shippingEmail: z.string().email().optional(),
});

export type CompanyFormValues = z.infer<typeof companyFormSchema>;
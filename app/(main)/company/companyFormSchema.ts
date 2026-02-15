import z from "zod";

export const companyFormSchema = z.object({
  companyName: z.string().min(2),  
  ownerName: z.string().min(2),

  bankName: z.string().optional(),
  bankAccNo: z.string().optional(),
  ifsc: z.string().optional(),
  branch: z.string().optional(),

  gstin: z.string().length(15, "GSTIN must be 15 characters"),
  pan: z.string().length(10, "PAN must be 10 characters"),


  state: z.string().min(1),
  city: z.string().min(1),
  pincode:z.string().min(6).max(6),

  billingStreet1: z.string().min(1),
  billingStreet2: z.string().optional(),
  billingStreet3: z.string().optional(),
  billingMobile: z.string().min(10),
  billingPhone: z.string().optional(),
  billingEmail: z.string().email().optional(),
});

export type CompanyFormValues = z.infer<typeof companyFormSchema>;
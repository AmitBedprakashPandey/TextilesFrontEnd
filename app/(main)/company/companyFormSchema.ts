import z from "zod";

export const companyFormSchema = z.object({
  companyName: z.string().min(2),  
  ownerName: z.string().optional(),

  gstin: z.string().optional(),
  pan: z.string().optional(),



  state: z.string().optional(),
  city: z.string().optional(),
  pincode:z.string().optional(),

  billingStreet1: z.string().min(1),
  billingStreet2: z.string().optional(),
  billingStreet3: z.string().optional(),
  billingMobile: z.string().optional(),
  billingPhone: z.string().optional(),
  billingEmail: z.string().optional(),
});

export type CompanyFormValues = z.infer<typeof companyFormSchema>;
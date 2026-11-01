export const COMPANY_TYPES = ["Customer", "Vendor", "Karigar"] as const;

export type CompanyType = (typeof COMPANY_TYPES)[number];

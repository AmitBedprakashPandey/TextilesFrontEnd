/**
 * Static option lists used by the Karigar cloth meter entry form.
 *
 * These are realistic dummy values so the screen can be exercised end to end.
 * To connect real data, replace the exported constants with API results that
 * keep the same shape (`{ value, label, detail? }`) - no component changes are
 * required because every dropdown consumes `KarigarOption[]`.
 */

export interface KarigarOption {
  /** Stable value stored in the form state and sent to the API. */
  value: string;
  /** Human readable label shown in the dropdown and on the print sheet. */
  label: string;
  /** Optional secondary text (city, GSTIN, rate, ...). */
  detail?: string;
}

export const COMPANY_OPTIONS: readonly KarigarOption[] = [
  { value: "rajesh-textiles", label: "Rajesh Textiles", detail: "Surat" },
  { value: "shree-ram-fabrics", label: "Shree Ram Fabrics", detail: "Mumbai" },
  { value: "maa-sarada-textiles", label: "Maa Sarada Textiles", detail: "Ahmedabad" },
  { value: "krishna-cloth-house", label: "Krishna Cloth House", detail: "Indore" },
  { value: "patel-textiles", label: "Patel Textiles", detail: "Vadodara" },
  { value: "om-sai-enterprises", label: "Om Sai Enterprises", detail: "Jaipur" },
  { value: "balaji-textiles", label: "Balaji Textiles", detail: "Coimbatore" },
  { value: "ganga-weavers", label: "Ganga Weavers", detail: "Varanasi" },
];

export const KARIGAR_OPTIONS: readonly KarigarOption[] = [
  { value: "ramesh-kumar", label: "Ramesh Kumar", detail: "Karigar - Andheri" },
  { value: "suresh-tailor", label: "Suresh Tailor", detail: "Karigar - Andheri" },
  { value: "anil-stitching-works", label: "Anil Stitching Works", detail: "Vendor - Malad" },
  { value: "sunita-bai", label: "Sunita Bai", detail: "Karigar - Goregaon" },
  { value: "vijay- tailoring", label: "Vijay Tailoring", detail: "Vendor - Kurla" },
  { value: "rashmi-embroidery", label: "Rashmi Embroidery", detail: "Vendor - Bhiwandi" },
  { value: "gopal-verma", label: "Gopal Verma", detail: "Karigar - Thane" },
  { value: "jyoti-prakash", label: "Jyoti Prakash", detail: "Vendor - Vasai" },
];

export const FABRIC_OPTIONS: readonly KarigarOption[] = [
  { value: "cotton-cambric", label: "Cotton Cambric" },
  { value: "cotton-lawn", label: "Cotton Lawn" },
  { value: "cotton-poplin", label: "Cotton Poplin" },
  { value: "cotton-voile", label: "Cotton Voile" },
  { value: "cotton-slub", label: "Cotton Slub" },
  { value: "polyester-satin", label: "Polyester Satin" },
  { value: "viscose-georgette", label: "Viscose Georgette" },
  { value: "rayon-crepe", label: "Rayon Crepe" },
  { value: "linen-blend", label: "Linen Blend" },
  { value: "nylon-saree-material", label: "Nylon Saree Material" },
  { value: "silk-dupatta", label: "Silk Dupatta" },
  { value: "tussar-silk", label: "Tussar Silk" },
  { value: "chanderi", label: "Chanderi" },
  { value: "denim", label: "Denim" },
  { value: "cotton-flannel", label: "Cotton Flannel" },
  { value: "polyester-ruffle", label: "Polyester Ruffle" },
];

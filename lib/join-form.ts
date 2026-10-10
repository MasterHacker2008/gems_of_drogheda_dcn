export const involvementOptions = [
  { value: "pop-up-stall", label: "Pop-Up Stall", hint: "Trade at a Gems of Drogheda market" },
  { value: "register-retail", label: "Register Retail", hint: "List your shop in the directory" },
  { value: "register-hospitality", label: "Register Hospitality", hint: "Cafés, restaurants, pubs and stays" },
  { value: "sponsor", label: "Sponsor", hint: "Back the quest and the community" },
  { value: "advertise", label: "Advertise", hint: "Put your business in front of locals" },
  { value: "join-network", label: "Join Network", hint: "Meet and collaborate with other makers" },
  { value: "feature-gems", label: "Feature in Gems of Drogheda", hint: "Get a story, profile or spotlight" },
] as const;

/** Options that make the "category of products" question relevant. */
export const productOptionValues: readonly string[] = ["pop-up-stall", "register-retail"];

export const countryCodes = [
  { code: "+353", label: "Ireland (+353)" },
  { code: "+44", label: "United Kingdom (+44)" },
  { code: "+1", label: "United States / Canada (+1)" },
  { code: "+33", label: "France (+33)" },
  { code: "+34", label: "Spain (+34)" },
  { code: "+39", label: "Italy (+39)" },
  { code: "+49", label: "Germany (+49)" },
  { code: "+48", label: "Poland (+48)" },
  { code: "+61", label: "Australia (+61)" },
] as const;

export type JoinFormValues = {
  businessName: string;
  fullName: string;
  involvement: string[];
  productCategory: string;
  email: string;
  countryCode: string;
  mobile: string;
  instagram: string;
  website: string;
  inDirectory: "yes" | "no";
};

export const initialJoinValues: JoinFormValues = {
  businessName: "",
  fullName: "",
  involvement: [],
  productCategory: "",
  email: "",
  countryCode: "+353",
  mobile: "",
  instagram: "",
  website: "",
  inDirectory: "yes",
};

export type JoinErrors = Partial<Record<keyof JoinFormValues, string>>;

export const stepFields: (keyof JoinFormValues)[][] = [
  ["businessName", "fullName"],
  ["involvement", "productCategory"],
  ["email", "mobile", "instagram", "website"],
  ["inDirectory"],
];

export function needsProductCategory(involvement: string[]) {
  return involvement.some((value) => productOptionValues.includes(value));
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validWebsite(value: string) {
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return url.hostname.includes(".");
  } catch {
    return false;
  }
}

export function validateJoin(values: JoinFormValues): JoinErrors {
  const errors: JoinErrors = {};
  const mobileDigits = values.mobile.replace(/[\s()-]/g, "");

  if (!values.businessName.trim()) errors.businessName = "Tell us your business name.";
  if (!values.fullName.trim()) errors.fullName = "Tell us your full name.";

  if (values.involvement.length === 0) errors.involvement = "Pick at least one way to get involved.";
  if (needsProductCategory(values.involvement) && !values.productCategory.trim()) {
    errors.productCategory = "Tell us what category of products you sell.";
  }

  if (!values.email.trim()) errors.email = "Enter your email address.";
  else if (!emailPattern.test(values.email.trim())) errors.email = "That doesn't look like a valid email, e.g. name@example.ie.";

  if (!mobileDigits) errors.mobile = "Enter your mobile number.";
  else if (!/^\d{6,12}$/.test(mobileDigits)) errors.mobile = "Use digits only, 6 to 12 of them (no country code).";

  const instagram = values.instagram.trim();
  if (instagram && !/^@?[A-Za-z0-9._]{1,30}$/.test(instagram) && !/^(https?:\/\/)?(www\.)?instagram\.com\/\S+$/i.test(instagram)) {
    errors.instagram = "Use a handle like @yourbusiness or an instagram.com link.";
  }

  const website = values.website.trim();
  if (website && !validWebsite(website)) errors.website = "Enter a valid website, e.g. yourbusiness.ie.";

  return errors;
}

export function stepIsValid(step: number, values: JoinFormValues) {
  const errors = validateJoin(values);
  return stepFields[step].every((field) => !errors[field]);
}

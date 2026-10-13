// Shared definition and validation for the trip inquiry, used by both the
// form (client) and the API route (server).

export const durationOptions = ["Up to a week", "8 to 11 nights", "12 to 15 nights", "More than two weeks", "Not sure yet"] as const;

export const budgetOptions = [
  "Under US$4,000 per person",
  "US$4,000 to 7,000 per person",
  "US$7,000 to 10,000 per person",
  "Over US$10,000 per person",
  "I'd like guidance",
] as const;

export const interestOptions = [
  "Wildlife",
  "Rainforest and cloud forest",
  "Volcanoes and hot springs",
  "Beaches and coast",
  "Food and culture",
  "Hiking and adventure",
  "Wellbeing and rest",
  "Travelling with children",
] as const;

export const stayOptions = ["Eco-lodges in nature", "Small boutique hotels", "Private villas", "A mix", "Not sure yet"] as const;

export type InquiryInput = {
  name: string;
  email: string;
  dates: string;
  duration: string;
  adults: string;
  children: string;
  budget: string;
  interests: string[];
  stay: string;
  message: string;
  journey: string;
  /** Honeypot: real visitors never see or fill this. */
  website: string;
};

export type InquiryErrors = Partial<Record<keyof InquiryInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS: Partial<Record<keyof InquiryInput, number>> = {
  name: 120,
  email: 200,
  dates: 200,
  message: 4000,
  journey: 120,
};

export function emptyInquiry(journey = ""): InquiryInput {
  return { name: "", email: "", dates: "", duration: "", adults: "2", children: "0", budget: "", interests: [], stay: "", message: "", journey, website: "" };
}

export function validateInquiry(input: InquiryInput): InquiryErrors {
  const errors: InquiryErrors = {};
  if (!input.name.trim()) errors.name = "Please tell us your name.";
  if (!input.email.trim()) errors.email = "Please add an email address so we can reply.";
  else if (!EMAIL.test(input.email.trim())) errors.email = "That email address doesn't look quite right.";
  if (!input.dates.trim()) errors.dates = "Approximate dates or a month are fine, or let us know you're flexible.";
  if (!input.duration) errors.duration = "Please choose an approximate length.";

  const adults = Number(input.adults);
  if (!Number.isInteger(adults) || adults < 1 || adults > 30) errors.adults = "Please enter at least one adult.";
  const children = Number(input.children || 0);
  if (!Number.isInteger(children) || children < 0 || children > 30) errors.children = "Please enter a number from 0.";

  if (input.duration && !(durationOptions as readonly string[]).includes(input.duration)) errors.duration = "Please choose an option.";
  if (input.budget && !(budgetOptions as readonly string[]).includes(input.budget)) errors.budget = "Please choose an option.";
  if (input.stay && !(stayOptions as readonly string[]).includes(input.stay)) errors.stay = "Please choose an option.";
  if (input.interests.some((i) => !(interestOptions as readonly string[]).includes(i))) errors.interests = "Please choose from the list.";

  for (const [key, max] of Object.entries(LIMITS) as [keyof InquiryInput, number][]) {
    const value = input[key];
    if (typeof value === "string" && value.length > max) errors[key] = `Please keep this under ${max} characters.`;
  }
  return errors;
}

/** Coerce untrusted JSON into an InquiryInput shape. */
export function parseInquiry(raw: unknown): InquiryInput {
  const o = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const str = (k: string) => (typeof o[k] === "string" ? (o[k] as string) : typeof o[k] === "number" ? String(o[k]) : "");
  return {
    name: str("name"),
    email: str("email"),
    dates: str("dates"),
    duration: str("duration"),
    adults: str("adults"),
    children: str("children"),
    budget: str("budget"),
    interests: Array.isArray(o.interests) ? o.interests.filter((i): i is string => typeof i === "string").slice(0, 20) : [],
    stay: str("stay"),
    message: str("message"),
    journey: str("journey"),
    website: str("website"),
  };
}

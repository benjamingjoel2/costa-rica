// Global brand and site settings. Change the brand name, descriptor or contact
// details here and they update across the whole site.

function normaliseUrl(url: string) {
  return url.replace(/\/+$/, "");
}


export const site = {
  name: "Selvora",
  descriptor: "Tailor-made Costa Rica journeys",
  description:
    "Selvora plans tailor-made journeys through Costa Rica: rainforest and cloud forest, volcanoes, wildlife and two very different coastlines, shaped around the way you like to travel.",
  // Used for canonical URLs, the sitemap and social cards. Set NEXT_PUBLIC_SITE_URL in production.
  url: normaliseUrl(process.env.NEXT_PUBLIC_SITE_URL || "https://selvora.tourground.com"),
  locale: "en",
  // The one public address for the brand ({brand}@tourground.com).
  contactEmail: "selvora@tourground.com" as string | null,
  // Business address. The owner approved a premium coworking address in San José; the exact
  // street address still has to be filled in (see README, "Before launch").
  address: { locality: "San José", country: "Costa Rica", countryCode: "CR" },
  // Social sharing image: the homepage hero photograph.
  ogImage: "/images/photos/heroArenal.jpg",
} as const;

export const mainNav = [
  { label: "Journeys", href: "/journeys" },
  { label: "Destinations", href: "/destinations" },
  { label: "Experiences", href: "/experiences" },
  { label: "Our approach", href: "/approach" },
  { label: "Journal", href: "/journal" },
] as const;

export const planHref = "/plan";

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

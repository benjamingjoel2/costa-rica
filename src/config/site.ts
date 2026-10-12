// Global brand and site settings. Change the brand name, descriptor or contact
// details here and they update across the whole site.

function normaliseUrl(url: string) {
  return url.replace(/\/+$/, "");
}

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || null;

export const site = {
  name: "Selvora",
  descriptor: "Tailor-made Costa Rica journeys",
  description:
    "Selvora plans tailor-made journeys through Costa Rica: rainforest and cloud forest, volcanoes, wildlife and two very different coastlines, shaped around the way you like to travel.",
  // Used for canonical URLs, the sitemap and social cards. Set NEXT_PUBLIC_SITE_URL in production.
  url: normaliseUrl(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  locale: "en",
  // Only shown when configured; see .env.example.
  contactEmail,
  // Add real profile URLs here when they exist; empty entries are never rendered.
  social: [] as { label: string; href: string }[],
  ogImage: "/og.jpg",
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

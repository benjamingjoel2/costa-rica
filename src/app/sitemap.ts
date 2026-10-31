import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { destinations } from "@/content/destinations";
import { articles } from "@/content/journal";
import { journeys } from "@/content/journeys";
import { locales, localizeHref } from "@/i18n/locales";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/journeys", "/destinations", "/experiences", "/approach", "/about", "/journal", "/plan", "/privacy", "/terms", "/cookies"];
  const entries = [
    ...pages.map((p) => ({ url: absoluteUrl(p), priority: p === "/" ? 1 : p === "/plan" ? 0.9 : 0.7 })),
    ...journeys.map((j) => ({ url: absoluteUrl(`/journeys/${j.slug}`), priority: 0.8 })),
    ...destinations.map((d) => ({ url: absoluteUrl(`/destinations/${d.slug}`), priority: 0.8 })),
    ...articles.map((a) => ({ url: absoluteUrl(`/journal/${a.slug}`), priority: 0.6 })),
  ];
  // Every page in every language, each listing its alternates.
  return entries.flatMap((e) => {
    const path = e.url.replace(absoluteUrl("/").replace(/\/$/, ""), "") || "/";
    const languages = Object.fromEntries(locales.map((l) => [l, absoluteUrl(localizeHref(l, path))]));
    return locales.map((l) => ({ ...e, url: absoluteUrl(localizeHref(l, path)), alternates: { languages } }));
  });
}

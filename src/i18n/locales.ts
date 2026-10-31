// Locale list and URL helpers, shared by server and client code.
export const locales = ["en", "fr", "de", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const localeNames: Record<Locale, string> = { en: "English", fr: "Français", de: "Deutsch", es: "Español" };
export const ogLocales: Record<Locale, string> = { en: "en_GB", fr: "fr_FR", de: "de_DE", es: "es_ES" };

export const isLocale = (v: unknown): v is Locale => typeof v === "string" && (locales as readonly string[]).includes(v);

/** English lives at the unprefixed URLs; the others under /fr, /de, /es. */
export function localizeHref(locale: Locale, href: string) {
  if (locale === defaultLocale || !href.startsWith("/") || href.startsWith("//")) return href;
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

/** "/fr/journeys/x" -> "/journeys/x" */
export function stripLocale(pathname: string) {
  const m = pathname.match(/^\/(fr|de|es|en)(?=\/|$)/);
  const rest = m ? pathname.slice(m[0].length) : pathname;
  return rest || "/";
}

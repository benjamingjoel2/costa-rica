// Server-side translation. Pages call setLocale() with their [locale] param; every
// server component below can then call t() for UI text and tr() for content objects.
// Dictionaries are keyed by the English text (src/i18n/{fr,de,es}.json; "=" keeps the
// English). A missing translation fails the build, so no page ships half in English.
import { appendFileSync } from "node:fs";
import { cache } from "react";
import de from "./de.json";
import es from "./es.json";
import fr from "./fr.json";
import { defaultLocale, isLocale, type Locale } from "./locales";

const dicts: Record<Exclude<Locale, "en">, Record<string, string>> = { fr, de, es };
// Already-translated values pass through unchanged, so t() can safely run twice.
const values = Object.fromEntries(Object.entries(dicts).map(([l, d]) => [l, new Set(Object.values(d))])) as Record<Exclude<Locale, "en">, Set<string>>;

const store = cache(() => ({ locale: defaultLocale as Locale }));

export function setLocale(locale: string) {
  store().locale = isLocale(locale) ? locale : defaultLocale;
}
export function getLocale(): Locale {
  return store().locale;
}

const HAS_WORD = /\p{L}{2,}/u;

export function translate(locale: Locale, s: string): string {
  if (locale === "en" || !HAS_WORD.test(s)) return s;
  const v = dicts[locale][s];
  if (v === "=") return s;
  if (v) return v;
  if (values[locale].has(s)) return s;
  if (process.env.I18N_COLLECT) {
    appendFileSync(process.env.I18N_COLLECT, JSON.stringify(s) + "\n");
    return s;
  }
  throw new Error(`Missing ${locale} translation for: ${JSON.stringify(s)} (add it to src/i18n/${locale}.json)`);
}

/** Translate a UI string into the current page's language. */
export function t(s: string): string {
  return translate(getLocale(), s);
}

/** Like t(), with {name} placeholders filled after translating the template. */
export function tf(s: string, vars: Record<string, string | number>): string {
  return Object.entries(vars).reduce((acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)), t(s));
}

// Fields that hold slugs, keys or URLs rather than reader-facing text.
const SKIP = new Set(["slug", "href", "src", "credit", "blurDataURL", "position", "image", "secondaryImage", "destinations", "journeys", "relatedJourneys", "relatedDestinations", "pairsWith", "type", "widths", "id"]);

/** Deep-translate a content object (journeys, destinations, articles…). */
export function tr<T>(value: T): T {
  const locale = getLocale();
  if (locale === "en") return value;
  const walk = (v: unknown, key?: string): unknown => {
    if (key && SKIP.has(key)) return v;
    if (typeof v === "string") return translate(locale, v);
    if (Array.isArray(v)) return v.map((x) => walk(x));
    if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x, k)]));
    return v;
  };
  return walk(value) as T;
}

/** The subset of the dictionary that client components need (see CLIENT_STRINGS). */
export function clientMessages(keys: readonly string[]): Record<string, string> {
  const locale = getLocale();
  return Object.fromEntries(keys.map((k) => [k, translate(locale, k)]));
}

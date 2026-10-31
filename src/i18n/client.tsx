"use client";
// Client components read their (few) strings from this provider, filled by the
// server layout with only the keys in CLIENT_STRINGS, so no dictionary ships to the browser.
import { createContext, useContext } from "react";
import { useParams } from "next/navigation";
import { defaultLocale, isLocale, type Locale } from "./locales";

const Messages = createContext<Record<string, string>>({});

export function I18nProvider({ messages, children }: { messages: Record<string, string>; children: React.ReactNode }) {
  return <Messages.Provider value={messages}>{children}</Messages.Provider>;
}

export function useT() {
  const m = useContext(Messages);
  // Edge spaces from JSX text are kept; the dictionary is keyed by the trimmed text.
  return <T,>(s: T): T => {
    if (typeof s !== "string") return s;
    const core = s.trim();
    const v = m[core];
    return (v === undefined ? s : s.slice(0, s.indexOf(core)) + v + s.slice(s.indexOf(core) + core.length)) as T;
  };
}

export function useLocale(): Locale {
  const p = useParams<{ locale?: string }>();
  return isLocale(p?.locale) ? p.locale : defaultLocale;
}

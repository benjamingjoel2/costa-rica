"use client";
// next/link that keeps the visitor in their language: "/journeys" becomes "/fr/journeys" on French pages.
import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLocale } from "./client";
import { localizeHref } from "./locales";

export default function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  const locale = useLocale();
  return <NextLink href={typeof href === "string" ? localizeHref(locale, href) : href} {...props} />;
}

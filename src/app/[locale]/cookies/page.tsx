import type { Metadata } from "next";
import { LegalPage, legalDoc } from "@/components/legal/LegalPage";
import { legal } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

import { setLocale } from "@/i18n/server";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  setLocale((await params).locale);
  return pageMetadata({ title: "Cookie policy", description: legal.en.cookies.description, path: "/cookies" });
}

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  setLocale((await params).locale);
  return <LegalPage title="Cookie policy" href="/cookies" doc={legalDoc("cookies")} />;
}

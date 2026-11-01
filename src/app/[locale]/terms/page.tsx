import type { Metadata } from "next";
import { LegalPage, legalDoc } from "@/components/legal/LegalPage";
import { legal } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

import { setLocale } from "@/i18n/server";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  setLocale((await params).locale);
  return pageMetadata({ title: "Booking terms", description: legal.en.terms.description, path: "/terms" });
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  setLocale((await params).locale);
  return <LegalPage title="Booking terms" href="/terms" doc={legalDoc("terms")} />;
}

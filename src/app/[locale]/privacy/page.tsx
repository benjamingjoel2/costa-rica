import type { Metadata } from "next";
import { LegalPage, legalDoc } from "@/components/legal/LegalPage";
import { legal } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

import { setLocale } from "@/i18n/server";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  setLocale((await params).locale);
  return pageMetadata({ title: "Privacy policy", description: legal.en.privacy.description, path: "/privacy" });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  setLocale((await params).locale);
  return <LegalPage title="Privacy policy" href="/privacy" doc={legalDoc("privacy")} />;
}

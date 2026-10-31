import type { Metadata } from "next";
import Link from "@/i18n/Link";
import { LegalPage } from "@/components/legal/LegalPage";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

import { t, setLocale } from "@/i18n/server";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  setLocale((await params).locale);
  return pageMetadata({
    title: "Cookie policy",
    description: `The cookies and browser storage the ${site.name} website uses, and how to control them.`,
    path: "/cookies",
  });
}

const email = site.contactEmail ?? "";

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  setLocale((await params).locale);
  return (
    <LegalPage title="Cookie policy" href="/cookies">
      <p>
        {t("Cookies are small files a website can store in your browser. Similar technologies, such as local storage, work in the same way. This page lists what the ")}{t(site.name)}{t(" website uses.")}
      </p>
      <h2>{t("What this website uses")}</h2>
      <p>
        {t("This website does not set any cookies of its own, and it does not use advertising, tracking or analytics cookies or similar storage. Pages, fonts and photographs are served from our own website, so no third-party services set cookies when you browse.")}
      </p>
      <p>
        {t("Our hosting provider may use strictly necessary technical measures to deliver pages securely and protect the site from abuse. These do not identify you or track you across other websites, and they do not need consent.")}
      </p>
      <h2>{t("The planning form")}</h2>
      <p>
        {t("The details you type into the planning form are kept in the page only while you fill it in, and are sent to us when you submit it. They are not stored in cookies. How we use them is explained in our ")}<Link href="/privacy">{t("privacy policy")}</Link>.
      </p>
      <h2>{t("Consent and how to withdraw it")}</h2>
      <p>
        {t("Because we only use what is strictly necessary, we do not ask for cookie consent. If we ever add analytics or other optional cookies, we will update this policy and ask for your consent first, and you will be able to withdraw it at any time from a link on every page. You can also block or delete cookies in your browser settings at any time; the website will still work.")}
      </p>
      <h2>{t("Contact")}</h2>
      <p>
        {t("Questions about this policy: ")}<a href={`mailto:${email}`}>{t(email)}</a>.
      </p>
    </LegalPage>
  );
}

import type { Metadata } from "next";
import Link from "@/i18n/Link";
import { LegalPage } from "@/components/legal/LegalPage";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

import { t, setLocale } from "@/i18n/server";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  setLocale((await params).locale);
  return pageMetadata({
    title: "Privacy policy",
    description: `How ${site.name} handles the personal information you share when planning a trip.`,
    path: "/privacy",
  });
}

const email = site.contactEmail ?? "";

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  setLocale((await params).locale);
  return (
    <LegalPage title="Privacy policy" href="/privacy">
      <p>
        {t("This policy explains what personal information ")}{t(site.name)}{t(" collects through this website and when you plan a trip with us, why we collect it, and how it is used. We collect only what we need to answer your enquiry and arrange your journey.")}
      </p>
      <h2>{t("Who we are")}</h2>
      <p>
        {t(site.name)}{t(" plans tailor-made journeys in Costa Rica and is responsible for the personal information described here. You can contact us about privacy at ")}<a href={`mailto:${email}`}>{t(email)}</a>.
      </p>
      <h2>{t("What we collect")}</h2>
      <p>{t("When you send an enquiry through our planning form or by email, we collect the details you choose to give us, which may include:")}</p>
      <ul>
        <li>{t("your name and email address;")}</li>
        <li>{t("approximate travel dates, trip length and the number of adults and children travelling;")}</li>
        <li>{t("your budget range, interests and accommodation preferences;")}</li>
        <li>{t("anything else you include in your message, such as special occasions or accessibility needs.")}</li>
      </ul>
      <p>
        {t("If you go on to book, we also collect what is needed to arrange your trip, such as the names, dates of birth and passport details of the people travelling, dietary or medical information you choose to share, and payment records. Please only share health or other sensitive information when it is needed for your trip, and with the agreement of the people it concerns.")}
      </p>
      <h2>{t("How we use it")}</h2>
      <ul>
        <li>{t("to reply to your enquiry and discuss your plans (taking steps at your request before a contract);")}</li>
        <li>{t("to prepare, book and run your trip (performing our contract with you);")}</li>
        <li>{t("to keep records of our correspondence and bookings, and meet our legal and accounting obligations;")}</li>
        <li>{t("to keep this website secure and working properly (our legitimate interests).")}</li>
      </ul>
      <p>{t("We do not sell your information, and we do not add you to marketing lists without your consent.")}</p>
      <h2>{t("Who we share it with")}</h2>
      <p>
        {t("We share your details only as needed: with the places to stay, guides, drivers and other services that make up your trip; with the providers that host this website and deliver form submissions and email to us; and with authorities where the law requires it. Some of these are outside your country, including in Costa Rica. Where that happens we take reasonable steps to make sure your information is protected.")}
      </p>
      <h2>{t("Cookies")}</h2>
      <p>
        {t("This website does not use advertising or analytics cookies. See our ")}<Link href="/cookies">{t("cookie policy")}</Link>{t(" for details.")}
      </p>
      <h2>{t("How long we keep it")}</h2>
      <p>
        {t("If you enquire but do not travel with us, we keep your enquiry for up to two years in case you come back to your plans, then delete it. If you travel with us, we keep booking records for as long as needed for accounting, tax and legal purposes, usually up to seven years after your trip.")}
      </p>
      <h2>{t("Your rights")}</h2>
      <p>
        {t("Depending on where you live, you may have the right to access the personal information we hold about you, to have it corrected or deleted, to restrict or object to how it is used, to receive a copy in a portable form, and to withdraw any consent you have given. To use any of these rights, email ")}<a href={`mailto:${email}`}>{t(email)}</a>{t(". You also have the right to complain to the data protection authority where you live.")}
      </p>
      <h2>{t("Security")}</h2>
      <p>
        {t("This website is served over an encrypted connection, and we limit access to your information to the people who need it to plan your trip.")}
      </p>
      <h2>{t("Changes")}</h2>
      <p>
        {t("We may update this policy from time to time. The current version is always on this page. Please also read our")}{t(" ")}
        <Link href="/terms">{t("booking terms")}</Link>.
      </p>
    </LegalPage>
  );
}

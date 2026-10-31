import type { Metadata } from "next";
import Link from "@/i18n/Link";
import { LegalPage } from "@/components/legal/LegalPage";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy policy",
  description: `How ${site.name} handles the personal information you share when planning a trip.`,
  path: "/privacy",
});

const email = site.contactEmail ?? "";

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" href="/privacy">
      <p>
        This policy explains what personal information {site.name} collects through this website and when you plan a trip with us, why
        we collect it, and how it is used. We collect only what we need to answer your enquiry and arrange your journey.
      </p>
      <h2>Who we are</h2>
      <p>
        {site.name} plans tailor-made journeys in Costa Rica and is responsible for the personal information described here. You can
        contact us about privacy at <a href={`mailto:${email}`}>{email}</a>.
      </p>
      <h2>What we collect</h2>
      <p>When you send an enquiry through our planning form or by email, we collect the details you choose to give us, which may include:</p>
      <ul>
        <li>your name and email address;</li>
        <li>approximate travel dates, trip length and the number of adults and children travelling;</li>
        <li>your budget range, interests and accommodation preferences;</li>
        <li>anything else you include in your message, such as special occasions or accessibility needs.</li>
      </ul>
      <p>
        If you go on to book, we also collect what is needed to arrange your trip, such as the names, dates of birth and passport details
        of the people travelling, dietary or medical information you choose to share, and payment records. Please only share health or
        other sensitive information when it is needed for your trip, and with the agreement of the people it concerns.
      </p>
      <h2>How we use it</h2>
      <ul>
        <li>to reply to your enquiry and discuss your plans (taking steps at your request before a contract);</li>
        <li>to prepare, book and run your trip (performing our contract with you);</li>
        <li>to keep records of our correspondence and bookings, and meet our legal and accounting obligations;</li>
        <li>to keep this website secure and working properly (our legitimate interests).</li>
      </ul>
      <p>We do not sell your information, and we do not add you to marketing lists without your consent.</p>
      <h2>Who we share it with</h2>
      <p>
        We share your details only as needed: with the places to stay, guides, drivers and other services that make up your trip; with the
        providers that host this website and deliver form submissions and email to us; and with authorities where the law requires it.
        Some of these are outside your country, including in Costa Rica. Where that happens we take reasonable steps to make sure your
        information is protected.
      </p>
      <h2>Cookies</h2>
      <p>
        This website does not use advertising or analytics cookies. See our <Link href="/cookies">cookie policy</Link> for details.
      </p>
      <h2>How long we keep it</h2>
      <p>
        If you enquire but do not travel with us, we keep your enquiry for up to two years in case you come back to your plans, then
        delete it. If you travel with us, we keep booking records for as long as needed for accounting, tax and legal purposes, usually
        up to seven years after your trip.
      </p>
      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access the personal information we hold about you, to have it corrected
        or deleted, to restrict or object to how it is used, to receive a copy in a portable form, and to withdraw any consent you have
        given. To use any of these rights, email <a href={`mailto:${email}`}>{email}</a>. You also have the right to complain to the data
        protection authority where you live.
      </p>
      <h2>Security</h2>
      <p>
        This website is served over an encrypted connection, and we limit access to your information to the people who need it to plan
        your trip.
      </p>
      <h2>Changes</h2>
      <p>
        We may update this policy from time to time. The current version is always on this page. Please also read our{" "}
        <Link href="/terms">booking terms</Link>.
      </p>
    </LegalPage>
  );
}

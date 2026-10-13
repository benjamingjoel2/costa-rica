import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${site.name} handles the personal information you share when planning a trip.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" href="/privacy">
      <p>
        This policy explains what personal information {site.name} collects through this website, why, and how it is used. We aim to
        collect only what we need to respond to your inquiry and plan your trip.
      </p>
      <h2>Who we are</h2>
      <p>[Operating company name, registered address and contact details to be added before launch.]</p>
      <h2>What we collect</h2>
      <p>When you send an inquiry through our planning form, we collect the details you choose to give us, which may include:</p>
      <ul>
        <li>your name and email address;</li>
        <li>approximate travel dates, trip length and the number of adults and children travelling;</li>
        <li>your budget range, interests and accommodation preferences;</li>
        <li>anything else you include in your message, such as special occasions or accessibility needs.</li>
      </ul>
      <p>
        Please only share health or other sensitive information if it is necessary for planning your trip, and only with the
        agreement of the people it concerns.
      </p>
      <h2>How we use it</h2>
      <ul>
        <li>to reply to your inquiry and discuss your plans;</li>
        <li>to prepare and refine an itinerary proposal for you;</li>
        <li>to keep a record of our correspondence.</li>
      </ul>
      <p>We do not sell your information, and we do not add you to marketing lists without your consent.</p>
      <h2>Service providers</h2>
      <p>
        Inquiries submitted through this website are passed to a third-party service that delivers them to us. [List the form,
        email, CRM and hosting providers used, and where they process data, before launch.]
      </p>
      <h2>Cookies and analytics</h2>
      <p>
        This website does not currently set advertising or analytics cookies. If that changes, this policy will be updated and, where
        required, your consent requested first.
      </p>
      <h2>How long we keep it</h2>
      <p>[Retention periods to be confirmed.]</p>
      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct or delete the personal information we hold about you,
        or to object to how it is used. [Contact route for privacy requests to be added.]
      </p>
      <h2>Changes</h2>
      <p>
        We may update this policy from time to time. The current version will always be on this page. You can also read our{" "}
        <Link href="/terms">terms and conditions</Link>.
      </p>
    </LegalPage>
  );
}

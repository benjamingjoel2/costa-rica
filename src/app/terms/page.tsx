import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description: `Terms of use for the ${site.name} website and how trip inquiries work.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms and conditions" href="/terms">
      <h2>About this website</h2>
      <p>
        This website is operated by {site.name}. [Operating company name and registered details to be added.] By using it, you agree
        to these terms.
      </p>
      <h2>Inquiries are not bookings</h2>
      <p>
        Sending an inquiry through this website does not create a booking or a contract, and does not commit you to anything. Any
        trip is arranged separately, on booking terms that will be provided to you in writing before you confirm.
      </p>
      <h2>Itineraries and content</h2>
      <p>
        The journeys, destination guides and articles on this website are for inspiration and general information. Journeys are
        illustrative examples, not fixed packages. Durations, activities and places to stay vary by season and availability, and are
        confirmed only in a written proposal. Information about destinations, seasons and wildlife is offered in good faith but may
        change, and wildlife sightings can never be guaranteed.
      </p>
      <h2>Images</h2>
      <p>Images on this website are illustrative and do not depict specific properties, partners or services.</p>
      <h2>Intellectual property</h2>
      <p>
        The text, design, illustrations and branding on this website belong to {site.name} or are used with permission, and may not be
        reproduced without consent.
      </p>
      <h2>Liability</h2>
      <p>[Limitation of liability and governing law to be drafted with legal advice.]</p>
      <h2>Privacy</h2>
      <p>
        How we handle personal information is explained in our <Link href="/privacy">privacy policy</Link>.
      </p>
    </LegalPage>
  );
}

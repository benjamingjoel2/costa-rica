import type { Metadata } from "next";
import { Suspense } from "react";
import { BoxHeading } from "@/components/kit/BoxHeading";
import { DarkChip } from "@/components/kit/Tag";
import { Doodle } from "@/components/kit/Doodle";
import { InquiryForm } from "@/components/inquiry/InquiryForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { planningSteps } from "@/content/approach";
import { destinations } from "@/content/destinations";
import { journeys } from "@/content/journeys";
import { site } from "@/config/site";
import { pad } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Plan your trip to Costa Rica",
  description: "Tell us about the Costa Rica trip you have in mind: dates, who's travelling and what you enjoy. We'll reply to begin planning a tailor-made itinerary.",
  path: "/plan",
});

export default function PlanPage() {
  const journeyNames = Object.fromEntries(journeys.map((j) => [j.slug, j.title]));
  const destinationNames = Object.fromEntries(destinations.map((d) => [d.slug, d.name]));

  return (
    <div className="frame grid gap-10 pb-16 pt-40 md:grid-cols-2 md:pt-48">
      <aside>
        <div className="md:sticky md:top-6">
          <Breadcrumbs items={[{ label: "Plan your trip", href: "/plan" }]} className="mb-6" />
          <DarkChip>Contact us</DarkChip>
          <BoxHeading as="h1" text="Tell Us About Your Trip" size="l" squiggle={3} className="mt-1.5" />
          <p className="mt-6 max-w-md text-lead">A few details are all we need to begin. Rough ideas are welcome: part of our job is helping you shape them.</p>
          <Doodle name="palm" className="my-10 hidden h-32 w-32 md:block" />
          <p className="label">What happens next</p>
          <ol className="mt-3 border-t border-ink">
            {planningSteps.slice(1).map((s, i) => (
              <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-2 border-b border-ink py-3">
                <span className="mono text-[0.8rem]">{pad(i + 2)}</span>
                <span>
                  <strong className="font-medium">{s.title}.</strong> <span className="label block pt-1">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
          {site.contactEmail && (
            <p className="label mt-6">
              Prefer email? Write to{" "}
              <a href={`mailto:${site.contactEmail}`} className="underline">
                {site.contactEmail}
              </a>
            </p>
          )}
        </div>
      </aside>
      <div className="md:border-l md:border-ink md:pl-6">
        <Suspense fallback={<div className="min-h-[60rem]" aria-hidden />}>
          <InquiryForm journeyNames={journeyNames} destinationNames={destinationNames} contactEmail={site.contactEmail} />
        </Suspense>
      </div>
    </div>
  );
}

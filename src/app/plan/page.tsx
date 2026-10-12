import type { Metadata } from "next";
import { Suspense } from "react";
import { InquiryForm } from "@/components/inquiry/InquiryForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Plate } from "@/components/ui/Plate";
import { planningSteps } from "@/content/approach";
import { destinations } from "@/content/destinations";
import { journeys } from "@/content/journeys";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Plan your trip to Costa Rica",
  description:
    "Tell us about the Costa Rica trip you have in mind: dates, who's travelling and what you enjoy. We'll reply to begin planning a tailor-made itinerary.",
  alternates: { canonical: "/plan" },
};

export default function PlanPage() {
  const journeyNames = Object.fromEntries(journeys.map((j) => [j.slug, j.title]));
  const destinationNames = Object.fromEntries(destinations.map((d) => [d.slug, d.name]));

  return (
    <div className="frame pb-24 pt-32 md:pb-32 md:pt-40">
      <Breadcrumbs items={[{ label: "Plan your trip", href: "/plan" }]} className="mb-12" />
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>Plan your trip</Eyebrow>
            <h1 className="mt-8 text-display-l text-forest">
              Tell us about <em className="italic font-normal">your trip.</em>
            </h1>
            <p className="mt-6 text-stone">
              A few details are all we need to begin. Rough ideas are welcome: part of our job is helping you shape them.
            </p>
            <Plate image="lodge" ratio="aspect-[4/3]" sizes="(min-width: 1024px) 30vw, 100vw" className="mt-10 hidden lg:block" />
            <div className="mt-10 border-t border-charcoal/15 pt-6">
              <p className="label text-stone">What happens next</p>
              <ol className="mt-4 space-y-3 text-[0.95rem]">
                {planningSteps.slice(1).map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[1.5rem_1fr] gap-2">
                    <span className="font-display text-lg text-terra-ink">{i + 2}</span>
                    <span>
                      <strong className="font-semibold">{s.title}.</strong> <span className="text-stone">{s.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            {site.contactEmail && (
              <p className="mt-8 text-sm text-stone">
                Prefer email? Write to{" "}
                <a href={`mailto:${site.contactEmail}`} className="underline decoration-terra underline-offset-4">
                  {site.contactEmail}
                </a>
                .
              </p>
            )}
          </div>
        </aside>
        <div className="lg:col-span-7 lg:col-start-6">
          <Suspense fallback={<div className="min-h-[60rem]" aria-hidden />}>
            <InquiryForm journeyNames={journeyNames} destinationNames={destinationNames} contactEmail={site.contactEmail} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

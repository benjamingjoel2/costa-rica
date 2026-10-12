import type { Metadata } from "next";
import Link from "next/link";
import { ClosingInvitation } from "@/components/sections/ClosingInvitation";
import { PageIntro } from "@/components/sections/PageIntro";
import { Arrow } from "@/components/ui/ArrowLink";
import { Plate } from "@/components/ui/Plate";
import { destinations } from "@/content/destinations";
import { pad } from "@/lib/content";

export const metadata: Metadata = {
  title: "Costa Rica destination guides",
  description:
    "Arenal, Monteverde, Guanacaste, the Nicoya Peninsula, the Central Pacific, the Osa Peninsula and the Caribbean coast: how Costa Rica's regions differ and how they fit together.",
  alternates: { canonical: "/destinations" },
};

// Alternating editorial rhythm: wide feature, then pairs of differently proportioned photographs.
const ratios = ["aspect-[16/9]", "aspect-[4/5]", "aspect-[4/3]"];

export default function DestinationsPage() {
  const [first, ...rest] = destinations;
  return (
    <>
      <PageIntro
        eyebrow="Destinations"
        crumbs={[{ label: "Destinations", href: "/destinations" }]}
        title={
          <>
            Where to go, <em className="italic font-normal">and why.</em>
          </>
        }
        lede="Costa Rica's mountains split it into regions with their own weather, wildlife and way of life. These guides explain what each is like, who it suits and how it fits into a wider journey."
      />

      <section className="frame pb-24 md:pb-32">
        <article className="group relative" data-reveal>
          <div className="overflow-hidden">
            <Plate image={first.image} ratio={ratios[0]} priority sizes="100vw" imgClassName="transition-transform duration-[1400ms] ease-out-soft group-hover:scale-[1.02]" />
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="label text-terra-ink">
                {pad(1)} &middot; {first.area}
              </p>
              <h2 className="mt-4 text-display-m text-forest">
                <Link href={`/destinations/${first.slug}`} className="after:absolute after:inset-0">
                  {first.name}
                </Link>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="font-display text-2xl italic text-charcoal/85">{first.tagline}</p>
              <p className="mt-3 text-stone">{first.summary}</p>
            </div>
          </div>
        </article>

        <ul className="mt-24 grid gap-x-10 gap-y-20 md:grid-cols-2">
          {rest.map((d, i) => (
            <li key={d.slug} className={i % 2 === 1 ? "md:mt-32" : ""}>
              <article className="group relative" data-reveal>
                <div className="overflow-hidden">
                  <Plate image={d.image} ratio={ratios[1 + (i % 2)]} sizes="(min-width: 768px) 45vw, 100vw" imgClassName="transition-transform duration-[1400ms] ease-out-soft group-hover:scale-[1.03]" />
                </div>
                <p className="label mt-6 text-terra-ink">
                  {pad(i + 2)} &middot; {d.area}
                </p>
                <h2 className="mt-3 flex items-center justify-between gap-4 text-display-s text-forest">
                  <Link href={`/destinations/${d.slug}`} className="after:absolute after:inset-0">
                    {d.name}
                  </Link>
                  <Arrow />
                </h2>
                <p className="mt-3 font-display text-xl italic text-charcoal/85">{d.tagline}</p>
                <p className="mt-2 text-[0.98rem] text-stone">{d.summary}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <ClosingInvitation
        title={
          <>
            Not sure which regions <em className="italic font-normal">suit you?</em>
          </>
        }
        text="That's one of the most useful things we can help with. Tell us when you're travelling and what you enjoy, and we'll suggest a combination that works."
        image="river"
        ctaLabel="Find your route"
      />
    </>
  );
}

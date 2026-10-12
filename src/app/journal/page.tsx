import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/sections/PageIntro";
import { ClosingInvitation } from "@/components/sections/ClosingInvitation";
import { Plate } from "@/components/ui/Plate";
import { articles, readingMinutes } from "@/content/journal";

export const metadata: Metadata = {
  title: "Journal: Costa Rica guides and planning notes",
  description:
    "Destination comparisons, seasonal advice and practical planning notes for travelling well in Costa Rica, from the Selvora journal.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  const [lead, second, ...rest] = articles;
  return (
    <>
      <PageIntro
        eyebrow="Journal"
        crumbs={[{ label: "Journal", href: "/journal" }]}
        title={
          <>
            Notes on travelling <em className="italic font-normal">Costa Rica well.</em>
          </>
        }
        lede="Regional comparisons, seasons and the practical questions that shape a good trip."
      />

      <section className="frame pb-20">
        {/* Lead story */}
        <article className="group relative grid gap-8 border-t border-charcoal/20 pt-10 lg:grid-cols-12 lg:gap-10">
          <div className="overflow-hidden lg:col-span-8">
            <Plate image={lead.image} ratio="aspect-[16/10]" priority sizes="(min-width: 1024px) 64vw, 100vw" imgClassName="transition-transform duration-[1400ms] ease-out-soft group-hover:scale-[1.02]" />
          </div>
          <div className="flex flex-col justify-end lg:col-span-4">
            <p className="label text-terra-ink">
              {lead.category} &middot; {readingMinutes(lead)} min read
            </p>
            <h2 className="mt-4 text-display-m text-forest">
              <Link href={`/journal/${lead.slug}`} className="after:absolute after:inset-0">
                {lead.title}
              </Link>
            </h2>
            <p className="mt-4 text-stone">{lead.dek}</p>
          </div>
        </article>

        {/* Second story: text-led, set wide */}
        <article className="group relative mt-20 grid gap-8 border-t border-charcoal/20 pt-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <p className="label text-terra-ink">
              {second.category} &middot; {readingMinutes(second)} min read
            </p>
            <h2 className="mt-4 text-display-l text-forest">
              <Link href={`/journal/${second.slug}`} className="after:absolute after:inset-0">
                {second.title}
              </Link>
            </h2>
            <p className="mt-5 max-w-xl text-lead text-charcoal/80">{second.dek}</p>
          </div>
          <div className="overflow-hidden md:col-span-4 md:col-start-9">
            <Plate image={second.image} ratio="aspect-[4/5]" sizes="(min-width: 768px) 32vw, 100vw" imgClassName="transition-transform duration-[1400ms] ease-out-soft group-hover:scale-[1.03]" />
          </div>
        </article>

        {/* The rest */}
        <ul className="mt-20 grid gap-12 border-t border-charcoal/20 pt-10 md:grid-cols-3 md:gap-10">
          {rest.map((a) => (
            <li key={a.slug}>
              <article className="group relative">
                <div className="overflow-hidden">
                  <Plate image={a.image} ratio="aspect-[3/2]" sizes="(min-width: 768px) 30vw, 100vw" imgClassName="transition-transform duration-[1400ms] ease-out-soft group-hover:scale-[1.03]" />
                </div>
                <p className="label mt-5 text-terra-ink">
                  {a.category} &middot; {readingMinutes(a)} min read
                </p>
                <h2 className="mt-3 font-display text-[1.75rem] leading-tight text-forest">
                  <Link href={`/journal/${a.slug}`} className="after:absolute after:inset-0">
                    {a.title}
                  </Link>
                </h2>
                <p className="mt-2 text-[0.95rem] text-stone">{a.dek}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <ClosingInvitation
        title={
          <>
            Questions the journal <em className="italic font-normal">doesn&rsquo;t answer?</em>
          </>
        }
        text="Every trip raises its own. Send us yours along with a few details, and we'll help you plan."
        image="canal"
        ctaLabel="Ask us about your trip"
      />
    </>
  );
}

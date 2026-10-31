import { setLocale } from "@/i18n/server";
import type { Metadata } from "next";
import { BoxHeading } from "@/components/kit/BoxHeading";
import { Card } from "@/components/kit/Card";
import { PageHero } from "@/components/sections/PageHero";
import { PlanBlock } from "@/components/sections/PlanBlock";
import { articles } from "@/content/journal";
import { articleCard } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  setLocale((await params).locale);
  return pageMetadata({
    title: "Journal: Costa Rica guides and planning notes",
    description: "Destination comparisons, seasonal advice and practical planning notes for travelling well in Costa Rica, from the Selvora journal.",
    path: "/journal",
  });
}

export default async function JournalPage({ params }: { params: Promise<{ locale: string }> }) {
  setLocale((await params).locale);
  return (
    <>
      <PageHero image="whale" kicker="Notes on travelling Costa Rica well" title="The Journal" short crumbs={[{ label: "Journal", href: "/journal" }]} />
      <section className="bg-paper py-12">
        <div className="frame">
          <BoxHeading text="Latest Articles" size="m" squiggle={0} />
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a, i) => (
              <li key={a.slug} className={i === 0 ? "md:col-span-2" : ""}>
                <Card {...articleCard(a)} ratio={i === 0 ? "aspect-[16/8]" : "aspect-[4/3]"} cta="Read" />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <PlanBlock title="Questions The Journal Doesn't Answer?" />
    </>
  );
}

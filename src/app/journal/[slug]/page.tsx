import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClosingInvitation } from "@/components/sections/ClosingInvitation";
import { RelatedJourneys } from "@/components/sections/RelatedJourneys";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { Plate } from "@/components/ui/Plate";
import { absoluteUrl, site } from "@/config/site";
import { images } from "@/content/images";
import { articles, getArticle, readingMinutes } from "@/content/journal";
import type { ArticleBlock } from "@/content/types";
import { destinationsBySlug, journeysBySlug } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.seoDescription,
    alternates: { canonical: `/journal/${a.slug}` },
    openGraph: { type: "article", title: a.title, description: a.seoDescription, images: [{ url: images[a.image].src, alt: images[a.image].alt }] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3);
  const places = destinationsBySlug(article.relatedDestinations);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.seoDescription,
          image: images[article.image].src,
          mainEntityOfPage: absoluteUrl(`/journal/${article.slug}`),
          publisher: { "@type": "Organization", name: site.name, url: absoluteUrl("/") },
        }}
      />
      <article>
        <header className="frame pt-32 md:pt-40">
          <Breadcrumbs
            items={[
              { label: "Journal", href: "/journal" },
              { label: article.title, href: `/journal/${article.slug}` },
            ]}
          />
          <div className="mx-auto mt-14 max-w-4xl text-center">
            <p className="label text-terra-ink">
              {article.category} &middot; {readingMinutes(article)} min read
            </p>
            <h1 className="mt-6 text-display-l text-forest">{article.title}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lead text-charcoal/80">{article.dek}</p>
          </div>
          <Plate image={article.image} ratio="aspect-[16/9]" priority sizes="100vw" className="mt-14" />
        </header>

        <div className="frame py-16 md:py-24">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="prose-selvora lg:col-span-7 lg:col-start-3">
              {article.body.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>
            <aside className="lg:col-span-3 lg:col-start-10">
              <div className="space-y-8 border-t border-charcoal/20 pt-6 lg:sticky lg:top-28">
                <div>
                  <p className="label text-stone">Places in this piece</p>
                  <ul className="mt-3 space-y-1.5">
                    {places.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/destinations/${p.slug}`} className="font-display text-xl text-forest underline decoration-terra/60 underline-offset-4 hover:decoration-terra">
                          {p.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-sage p-6">
                  <p className="font-display text-2xl leading-tight text-forest">Planning a trip?</p>
                  <p className="mt-2 text-sm text-charcoal/80">Tell us your dates and interests, and we&rsquo;ll suggest a route.</p>
                  <Link href="/plan" className="mt-4 inline-block border-b border-forest pb-0.5 text-sm font-semibold text-forest">
                    Plan your trip &rarr;
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <RelatedJourneys journeys={journeysBySlug(article.relatedJourneys)} title="Journeys to start from" />

      <section aria-labelledby="more-reading" className="bg-paper">
        <div className="frame py-20 md:py-28">
          <h2 id="more-reading" className="text-display-m text-forest">
            More from the journal
          </h2>
          <ul className="mt-10 border-t border-charcoal/20">
            {more.map((a) => (
              <li key={a.slug} className="border-b border-charcoal/20">
                <Link href={`/journal/${a.slug}`} className="group grid gap-2 py-6 md:grid-cols-12 md:items-baseline md:gap-8">
                  <span className="label text-terra-ink md:col-span-2">{a.category}</span>
                  <span className="font-display text-[1.7rem] leading-tight text-forest group-hover:underline group-hover:decoration-terra group-hover:underline-offset-4 md:col-span-6">
                    {a.title}
                  </span>
                  <span className="text-[0.95rem] text-stone md:col-span-4">{a.dek}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingInvitation
        title={
          <>
            Turn the reading <em className="italic font-normal">into a route.</em>
          </>
        }
        text="Share a few details about your trip and we'll help you plan it around the places and seasons that suit you."
        image={article.image}
      />
    </>
  );
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h2":
      return <h2>{block.text}</h2>;
    case "list":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "image":
      return (
        <div className="!my-12 lg:-mx-16">
          <Plate image={block.image} ratio="aspect-[3/2]" sizes="(min-width: 1024px) 50vw, 100vw" caption={block.caption} />
        </div>
      );
    case "aside":
      return (
        <aside className="!mt-12 border-l-2 border-terra bg-paper px-6 py-5">
          <p className="label text-terra-ink">{block.title}</p>
          <p className="mt-2 text-base">{block.text}</p>
        </aside>
      );
  }
}

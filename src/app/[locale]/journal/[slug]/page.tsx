import type { Metadata } from "next";
import Link from "@/i18n/Link";
import { notFound } from "next/navigation";
import { BoxButton } from "@/components/kit/BoxButton";
import { BoxHeading } from "@/components/kit/BoxHeading";
import { DarkChip } from "@/components/kit/Tag";
import { CardRow } from "@/components/sections/CardRow";
import { PlanBlock } from "@/components/sections/PlanBlock";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { Plate } from "@/components/ui/Plate";
import { absoluteUrl, site } from "@/config/site";
import { images } from "@/content/images";
import { articles, getArticle, readingMinutes } from "@/content/journal";
import type { ArticleBlock } from "@/content/types";
import { articleCard, destinationsBySlug, journeyCard, journeysBySlug } from "@/lib/content";
import { organizationId, pageMetadata } from "@/lib/seo";

import { t, setLocale } from "@/i18n/server";
type Props = { params: Promise<{ slug: string; locale: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  setLocale((await params).locale);
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return pageMetadata({ title: a.title, description: a.seoDescription, path: `/journal/${a.slug}`, image: images[a.image], type: "article" });
}

export default async function ArticlePage({ params }: Props) {
  setLocale((await params).locale);
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const places = destinationsBySlug(article.relatedDestinations);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.seoDescription,
          image: absoluteUrl(images[article.image].src),
          mainEntityOfPage: absoluteUrl(`/journal/${article.slug}`),
          articleSection: article.category,
          inLanguage: "en",
          author: { "@type": "Organization", "@id": organizationId, name: site.name, url: absoluteUrl("/") },
          publisher: { "@type": "Organization", "@id": organizationId, name: site.name, url: absoluteUrl("/") },
        }}
      />
      <article>
        <header className="frame pt-40 md:pt-48">
          <Breadcrumbs
            items={[
              { label: "Journal", href: "/journal" },
              { label: article.title, href: `/journal/${article.slug}` },
            ]}
            className="mb-6"
          />
          <DarkChip>
            {t(article.category)} · {readingMinutes(article)}{t(" min read")}
          </DarkChip>
          <BoxHeading as="h1" text={article.title} size="l" className="mt-1.5 max-w-6xl" />
          <p className="mt-6 max-w-2xl text-lead">{t(article.dek)}</p>
          <Plate image={article.image} ratio="aspect-[16/8]" priority sizes="100vw" className="mt-8" />
        </header>

        <div className="frame grid gap-10 py-12 md:grid-cols-2">
          <div className="prose-selvora">
            {article.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
          <aside className="md:border-l md:border-ink md:pl-5">
            <div className="md:sticky md:top-6">
              <p className="label">{t("Places in this piece")}</p>
              <ul className="mt-3 border-t border-ink">
                {places.map((p) => (
                  <li key={p.slug} className="border-b border-ink">
                    <Link href={`/destinations/${p.slug}`} className="block py-3 text-[1.8rem] font-medium leading-none tracking-[-0.05em] hover:text-forest">
                      {t(p.name)}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 bg-sage p-5">
                <BoxHeading as="p" text="Planning A Trip?" size="s" />
                <p className="label mt-4">{t("Tell us your dates and interests, and we’ll suggest a route.")}</p>
                <BoxButton href="/plan" className="mt-4">
                  {t("Plan your trip")}
                </BoxButton>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <CardRow id="article-journeys" title="Journeys To Start From" items={journeysBySlug(article.relatedJourneys).map(journeyCard)} grey />
      <CardRow id="more-articles" title="More From The Journal" items={articles.filter((a) => a.slug !== article.slug).map(articleCard)} more={{ label: "All articles", href: "/journal" }} />
      <PlanBlock />
    </>
  );
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return <p>{t(block.text)}</p>;
    case "h2":
      return <h2>{t(block.text)}</h2>;
    case "list":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{t(item)}</li>
          ))}
        </ul>
      );
    case "image":
      return (
        <figure className="!my-10">
          <Plate image={block.image} ratio="aspect-[3/2]" sizes="(min-width: 768px) 48vw, 100vw" />
          {block.caption && <figcaption className="label mt-3">{t(block.caption)}</figcaption>}
        </figure>
      );
    case "aside":
      return (
        <aside className="!mt-10 border border-ink bg-paper p-5">
          <p className="label">{t(block.title)}</p>
          <p className="mt-2 text-base">{t(block.text)}</p>
        </aside>
      );
  }
}

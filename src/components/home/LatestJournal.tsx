import { BoxButton } from "@/components/kit/BoxButton";
import { BoxHeading } from "@/components/kit/BoxHeading";
import { Card } from "@/components/kit/Card";
import { CarouselControls } from "@/components/kit/Carousel";
import { articles, readingMinutes } from "@/content/journal";

export function LatestJournal({ title = "Latest From The Journal" }: { title?: string }) {
  return (
    <section aria-labelledby="journal-title" className="bg-paper py-16">
      <div className="frame grid gap-6 md:grid-cols-[22rem_1fr]">
        <div>
          <BoxHeading id="journal-title" text={title} size="m" />
          <BoxButton href="/journal" className="mt-4">
            View all articles
          </BoxButton>
          <CarouselControls targetId="journal-track" className="mt-6" />
        </div>
        <ul id="journal-track" className="scroller -mr-3 flex gap-5 overflow-x-auto pr-3 md:-mr-8 md:pr-8">
          {articles.map((a, i) => (
            <li key={a.slug} className="w-[85%] shrink-0 snap-start sm:w-[24rem] lg:w-[28rem]">
              <Card
                href={`/journal/${a.slug}`}
                image={a.image}
                ratio={i % 2 === 0 ? "aspect-[4/3]" : "aspect-[16/10]"}
                tags={[a.category]}
                title={a.title}
                meta={[`${readingMinutes(a)} min read`, "Selvora journal"]}
                summary={a.dek}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

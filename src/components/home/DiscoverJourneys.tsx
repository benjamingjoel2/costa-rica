import Link from "@/i18n/Link";
import { BoxHeading } from "@/components/kit/BoxHeading";
import { Plate } from "@/components/ui/Plate";
import { journeys } from "@/content/journeys";
import type { Journey } from "@/content/types";

import { t } from "@/i18n/server";
function JourneyTile({ j, className = "" }: { j: Journey; className?: string }) {
  return (
    <Link href={`/journeys/${j.slug}`} className={`group relative block overflow-hidden ${className}`}>
      <Plate image={j.image} ratio="aspect-[5/3]" sizes="(min-width: 768px) 48vw, 100vw" imgClassName="transition-transform duration-700 group-hover:scale-[1.03]" />
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 to-transparent" />
      <span className="absolute bottom-6 left-6 text-white md:bottom-8 md:left-8">
        <BoxHeading as="p" text={j.title} size="s" className="max-w-[14ch]" />
        <span className="mono mt-1 inline-block rounded-sm bg-ink px-2.5 py-1.5 text-[0.7rem] text-white">{t(j.suggestedLength)}</span>
      </span>
    </Link>
  );
}

function Block({ label, sub, script, items, tone }: { label: string; sub: string; script: string; items: Journey[]; tone: "forest" | "sage" }) {
  return (
    <div className={tone === "forest" ? "bg-forest text-white" : "bg-sage text-ink"}>
      <div className="px-4 pb-4">
        <div className={`flex max-w-sm justify-between border-t-2 pt-2 ${tone === "forest" ? "border-white" : "border-ink"}`}>
          <span className="mono text-[0.72rem]">{t(label)}</span>
          <span className="mono text-[0.72rem]">{t(sub)}</span>
        </div>
        <p aria-hidden className={`mb-6 mt-10 font-script text-[3rem] leading-none md:text-[4.5rem] ${tone === "forest" ? "text-white" : "text-ink"}`}>
          {t(script)}
        </p>
        <div className={`grid gap-4 ${items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {items.map((j) => (
            <JourneyTile key={j.slug} j={j} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function DiscoverJourneys() {
  return (
    <section aria-labelledby="journeys-title">
      <div className="bg-forest px-4 pb-6 pt-12 text-white">
        <BoxHeading id="journeys-title" text="Discover Our Journeys" size="xl" squiggle={1} />
        <p className="mono mt-6 max-w-md text-[0.8rem] text-white/85">
          {t("Illustrative routes, not packages. Each one is rebuilt around your dates, interests and pace.")}
        </p>
      </div>
      <Block label="Experience the north" sub="Volcanoes + forest" script="Pura Vida" items={journeys.slice(0, 2)} tone="forest" />
      <Block label="Experience the coasts" sub="Wild + slow" script="Costa Rica" items={journeys.slice(2)} tone="sage" />
    </section>
  );
}

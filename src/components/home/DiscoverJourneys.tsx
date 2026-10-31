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
      <span className="absolute left-8 top-1/2 -translate-y-1/2">
        <BoxHeading as="p" text={j.title} size="s" className="max-w-[12ch]" />
        <span className="mono mt-1 inline-block rounded-sm bg-ink px-2.5 py-1.5 text-[0.7rem] text-white">{t(j.suggestedLength)}</span>
      </span>
    </Link>
  );
}

function Block({ label, sub, script, items, tone }: { label: string; sub: string; script: string; items: Journey[]; tone: "forest" | "sage" }) {
  return (
    <div className={tone === "forest" ? "bg-forest text-white" : "bg-sage text-ink"}>
      <div className="px-4 pb-4">
        <div className={`mx-auto flex max-w-sm justify-between border-t-2 pt-2 ${tone === "forest" ? "border-white" : "border-ink"}`}>
          <span className="mono text-[0.72rem]">{t(label)}</span>
          <span className="mono text-[0.72rem]">{t(sub)}</span>
        </div>
        <p aria-hidden className={`relative z-10 -mb-14 mt-16 text-center font-script text-[5rem] leading-none md:-mb-24 md:text-[9rem] ${tone === "forest" ? "text-white" : "text-ink"}`}>
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
      <div className="bg-forest pt-10 text-center">
        <BoxHeading id="journeys-title" text="Discover Our Journeys" size="xl" squiggle={1} className="mx-auto max-w-5xl px-4 [&>span]:justify-center" />
        <p className="mono mx-auto mt-6 max-w-md px-4 text-[0.8rem] text-white/85">
          {t("Illustrative routes, not packages. Each one is rebuilt around your dates, interests and pace.")}
        </p>
      </div>
      <Block label="Experience the north" sub="Volcanoes + forest" script="Pura Vida" items={journeys.slice(0, 2)} tone="forest" />
      <Block label="Experience the coasts" sub="Wild + slow" script="Costa Rica" items={journeys.slice(2)} tone="sage" />
    </section>
  );
}

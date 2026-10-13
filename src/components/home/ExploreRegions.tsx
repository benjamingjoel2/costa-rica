import { BoxButton } from "@/components/kit/BoxButton";
import { BoxHeading } from "@/components/kit/BoxHeading";
import { Doodle } from "@/components/kit/Doodle";
import { Plate } from "@/components/ui/Plate";
import type { ImageKey } from "@/content/images";

const regions: { name: string; image: ImageKey; text: string; href: string; cta: string }[] = [
  {
    name: "The North",
    image: "arenal",
    text: "Volcanoes, hot springs and cloud forest. Arenal's cone rising over the plains, the misty reserves of Monteverde, and the dry, sunny coast of Guanacaste. The easiest place to start, and the most varied.",
    href: "/destinations/arenal",
    cta: "Explore",
  },
  {
    name: "The Pacific Coast",
    image: "nicoya",
    text: "Surf towns and long beaches on Nicoya, forest that runs to the sand at Manuel Antonio, whales off Uvita and the wild rainforest of the Osa Peninsula. Slow days and big wildlife.",
    href: "/destinations/nicoya",
    cta: "Explore",
  },
  {
    name: "The Caribbean",
    image: "caribbean",
    text: "Another rhythm entirely. Tortuguero's canals and turtle beaches, reef and forest at Cahuita, and the Afro-Caribbean cooking and culture of Puerto Viejo.",
    href: "/destinations/caribbean",
    cta: "Explore",
  },
];

export function ExploreRegions() {
  return (
    <section aria-labelledby="regions-title" className="frame py-8">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="flex flex-col">
          <BoxHeading id="regions-title" text="Explore Our Regions" size="l" squiggle={1} />
          <Doodle name="volcano" className="mx-auto my-16 h-36 w-36 md:my-auto md:h-44 md:w-44" />
          <p className="max-w-md text-lead">
            From the volcanoes and cloud forests of the north to two very different coastlines, Selvora plans journeys across
            Costa Rica, shaped around the places that suit you, the season and the way you like to travel.
          </p>
        </div>
        <ul className="md:border-l md:border-ink md:pl-5">
          {regions.map((r, i) => (
            <li key={r.name} className={`grid gap-5 py-6 sm:grid-cols-2 ${i > 0 ? "border-t border-ink" : "pt-0"}`}>
              <div className="flex flex-col justify-between gap-6">
                <BoxHeading as="h3" text={r.name} size="s" />
                <BoxButton href={r.href}>{r.cta}</BoxButton>
              </div>
              <div>
                <Plate image={r.image} ratio="aspect-[8/5]" sizes="(min-width: 768px) 24vw, 100vw" />
                <p className="label mt-4">{r.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

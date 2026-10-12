import Link from "next/link";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Plate } from "@/components/ui/Plate";
import { experiences } from "@/content/experiences";

export function ExperiencesLedger() {
  return (
    <section aria-labelledby="experiences-title" className="bg-forest text-ivory">
      <div className="frame py-24 md:py-32">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Eyebrow index="04" tone="light">
              Experiences
            </Eyebrow>
            <h2 id="experiences-title" className="mt-8 text-display-l text-ivory">
              Begin with what you love. The route follows.
            </h2>
            <p className="mt-8 max-w-md text-ivory/80">
              Some travellers come for the animals, some for the walking, some for a week of doing very little by the sea. Most want a
              mix. We use these interests to decide where you go, how long you stay and who you spend your days with.
            </p>
            <div className="mt-12 grid grid-cols-5 gap-4">
              <Plate image="toucan" ratio="aspect-[3/4]" sizes="(min-width: 1024px) 18vw, 50vw" className="col-span-3" />
              <Plate image="macaws" ratio="aspect-square" sizes="(min-width: 1024px) 12vw, 40vw" className="col-span-2 self-end" />
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="border-t border-ivory/15">
              {experiences.map((e) => (
                <li key={e.slug} className="border-b border-ivory/15">
                  <Link href={`/experiences#${e.slug}`} className="group block py-6 md:py-7">
                    <span className="flex items-baseline justify-between gap-6">
                      <span className="font-display text-[1.9rem] leading-tight md:text-[2.3rem]">
                        <span className="text-ivory/60">Travel </span>
                        <em className="italic transition-colors group-hover:text-sage">{e.phrase}</em>
                      </span>
                      <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-terra opacity-0 transition-opacity group-hover:opacity-100" />
                    </span>
                    <span className="mt-2 block max-w-lg text-[0.95rem] text-ivory/70">{e.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <ArrowLink href="/experiences" tone="light" className="mt-10">
              Ways to travel in Costa Rica
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}

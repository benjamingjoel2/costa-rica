import { BoxHeading } from "@/components/kit/BoxHeading";
import { Doodle } from "@/components/kit/Doodle";

import { t } from "@/i18n/server";
type Doodles = "palm" | "volcano" | "toucan" | "binoculars" | "leaf" | "sun";

/** Boxed heading, doodle and paragraph beside ruled rows of short facts. */
export function InfoList({ title, doodle, text, items, squiggle }: { title: string; doodle: Doodles; text: React.ReactNode; items: { title: string; text: string }[]; squiggle?: number }) {
  return (
    <section className="frame grid gap-10 border-t border-ink py-8 md:grid-cols-2">
      <div className="flex flex-col">
        <BoxHeading text={title} size="m" squiggle={squiggle} />
        <Doodle name={doodle} className="mx-auto my-10 h-36 w-36" />
        <div className="max-w-md text-lead">{text}</div>
      </div>
      <dl className="md:border-l md:border-ink md:pl-5">
        {items.map((it) => (
          <div key={it.title} className="grid gap-3 border-t border-ink pb-10 pt-3 sm:grid-cols-2 md:pb-20">
            <dt className="text-[1.15rem] font-medium uppercase tracking-[-0.03em]">{t(it.title)}</dt>
            <dd className="label">{t(it.text)}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

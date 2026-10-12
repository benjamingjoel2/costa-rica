import { BoxHeading } from "@/components/kit/BoxHeading";
import { DarkChip } from "@/components/kit/Tag";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

/** Opening for pages without a lead photograph. */
export function TextHero({ kicker, title, intro, crumbs }: { kicker: string; title: string; intro?: string; crumbs: { label: string; href: string }[] }) {
  return (
    <header className="frame pb-10 pt-40 md:pt-48">
      <Breadcrumbs items={crumbs} className="mb-6" />
      <DarkChip>{kicker}</DarkChip>
      <BoxHeading as="h1" text={title} size="l" className="mt-1.5" />
      {intro && <p className="mt-6 max-w-2xl text-lead">{intro}</p>}
    </header>
  );
}

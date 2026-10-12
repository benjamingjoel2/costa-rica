import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Eyebrow";

type PageIntroProps = {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  crumbs?: { label: string; href: string }[];
  aside?: React.ReactNode;
};

/** Editorial page opening for pages without a full-bleed hero. */
export function PageIntro({ eyebrow, title, lede, crumbs, aside }: PageIntroProps) {
  return (
    <header className="frame pb-16 pt-32 md:pb-20 md:pt-40 lg:pt-44">
      {crumbs && <Breadcrumbs items={crumbs} className="mb-12" />}
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-8 text-display-xl text-forest">{title}</h1>
        </div>
        {(lede || aside) && (
          <div className="lg:col-span-4 lg:pb-3">
            {lede && <p className="text-lead text-charcoal/85">{lede}</p>}
            {aside}
          </div>
        )}
      </div>
    </header>
  );
}

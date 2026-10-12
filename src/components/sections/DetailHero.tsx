import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Plate } from "@/components/ui/Plate";
import type { ImageKey } from "@/content/images";

type DetailHeroProps = {
  image: ImageKey;
  label: string;
  title: string;
  standfirst: string;
  crumbs: { label: string; href: string }[];
};

/** Full-bleed photographic opening for journey and destination pages. */
export function DetailHero({ image, label, title, standfirst, crumbs }: DetailHeroProps) {
  return (
    <header className="relative isolate flex min-h-[88svh] flex-col justify-between overflow-hidden bg-forest-deep text-ivory">
      <Plate image={image} priority sizes="100vw" cover className="-z-10" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep/90 via-forest-deep/25 to-forest-deep/45" />
      <div className="frame pt-28 lg:pt-32">
        <Breadcrumbs items={crumbs} tone="light" />
      </div>
      <div className="frame pb-14 pt-24 md:pb-20">
        <p className="label text-ivory/80">{label}</p>
        <h1 className="mt-5 max-w-5xl text-display-xl text-ivory">{title}</h1>
        <p className="mt-6 max-w-2xl text-lead text-ivory/90">{standfirst}</p>
      </div>
    </header>
  );
}

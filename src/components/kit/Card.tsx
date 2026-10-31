import Link from "@/i18n/Link";
import { Plate } from "@/components/ui/Plate";
import type { ImageKey } from "@/content/images";
import { CircleArrowIcon } from "./BoxButton";
import { Tags } from "./Tag";

type CardProps = {
  href: string;
  image: ImageKey;
  tags: string[];
  title: string;
  meta: string[];
  summary: string;
  cta?: string;
  ratio?: string;
};

/** Carousel card: tagged image, title, rule, two columns of mono detail, then a View button. */
export function Card({ href, image, tags, title, meta, summary, cta = "View", ratio = "aspect-[16/10]" }: CardProps) {
  return (
    <article className="group relative flex h-full flex-col bg-white">
      <div className="relative overflow-hidden">
        <Plate image={image} ratio={ratio} sizes="(min-width: 1024px) 31vw, 85vw" imgClassName="transition-transform duration-700 group-hover:scale-[1.03]" />
        <Tags items={tags} className="absolute left-2 top-2" />
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <h3 className="text-[1.75rem] font-medium leading-[1.02] tracking-[-0.05em]">
          <Link href={href} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h3>
        <div className="mt-3 grid grid-cols-2 gap-3 border-t border-ink pt-3">
          <p className="label">
            {meta.map((m) => (
              <span key={m} className="block">
                {m}
              </span>
            ))}
          </p>
          <p className="label border-l border-ink pl-3">{summary}</p>
        </div>
        <span className="mt-auto inline-flex pt-4">
          <span className="mono flex h-12 items-center border border-ink px-5 text-[0.9rem] group-hover:bg-ink group-hover:text-white">{cta}</span>
          <CircleArrowIcon className="bg-white text-ink" />
        </span>
      </div>
    </article>
  );
}

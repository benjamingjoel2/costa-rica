import Image from "next/image";
import { images, type ImageKey } from "@/content/images";

type PlateProps = {
  image: ImageKey;
  /** Tailwind aspect-ratio class, e.g. "aspect-[4/5]". Omit when the parent sets the size. */
  ratio?: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Decorative images are hidden from screen readers. */
  decorative?: boolean;
  caption?: string;
  /** Absolutely fill the nearest positioned parent (for full-bleed backgrounds). */
  cover?: boolean;
};

/** A cropped, responsive image drawn from the central image manifest. */
export function Plate({ image, ratio, sizes, className = "", imgClassName = "", priority, decorative, caption, cover }: PlateProps) {
  const asset = images[image];
  const media = (
    <div className={`${cover ? "absolute inset-0" : "relative"} overflow-hidden bg-sage ${ratio ?? "h-full w-full"} ${caption ? "" : className}`}>
      <Image
        src={asset.src}
        alt={decorative ? "" : asset.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${imgClassName}`}
        style={asset.position ? { objectPosition: asset.position } : undefined}
      />
    </div>
  );
  if (!caption) return media;
  return (
    <figure className={className}>
      {media}
      <figcaption className="mt-3 text-sm text-stone">{caption}</figcaption>
    </figure>
  );
}

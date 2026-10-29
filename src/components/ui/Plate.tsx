import { preload } from "react-dom";
import { images, type ImageKey } from "@/content/images";

type PlateProps = {
  image: ImageKey;
  /** Tailwind aspect-ratio class, e.g. "aspect-[4/5]". Omit when the parent sets the size. */
  ratio?: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  /** Above-the-fold images: preloaded and fetched at high priority. */
  priority?: boolean;
  /** Decorative images are hidden from screen readers. */
  decorative?: boolean;
  caption?: string;
  /** Absolutely fill the nearest positioned parent (for full-bleed backgrounds). */
  cover?: boolean;
};

/** "/images/photos/arenal.jpg" -> "/images/opt/arenal-1200.avif" */
const avifUrl = (src: string, w: number) => src.replace("/images/photos/", "/images/opt/").replace(/\.jpg$/, `-${w}.avif`);

/**
 * A cropped, responsive image drawn from the central image manifest. Photos are
 * served as pre-built AVIF files (see scripts/optimize-images.mjs) with the JPEG
 * as a fallback, over a tiny blurred preview that shows while they load.
 */
export function Plate({ image, ratio, sizes, className = "", imgClassName = "", priority, decorative, caption, cover }: PlateProps) {
  const asset = images[image];
  const srcSet = asset.widths.length ? asset.widths.map((w) => `${avifUrl(asset.src, w)} ${w}w`).join(", ") : undefined;
  if (priority && srcSet) {
    preload(avifUrl(asset.src, asset.widths[0]), { as: "image", type: "image/avif", imageSrcSet: srcSet, imageSizes: sizes, fetchPriority: "high" });
  }

  const media = (
    <div
      className={`${cover ? "absolute inset-0" : "relative"} overflow-hidden bg-sage bg-cover ${ratio ?? "h-full w-full"} ${caption ? "" : className}`}
      style={asset.blurDataURL ? { backgroundImage: `url(${asset.blurDataURL})`, backgroundPosition: asset.position } : undefined}
    >
      <picture>
        {srcSet && <source type="image/avif" srcSet={srcSet} sizes={sizes} />}
        {/* Plain <img>: photos are pre-built static AVIFs, so next/image's on-demand resizing isn't needed. */}
        <img
          src={asset.src}
          alt={decorative ? "" : asset.alt}
          width={asset.width}
          height={asset.height}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
          style={asset.position ? { objectPosition: asset.position } : undefined}
        />
      </picture>
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

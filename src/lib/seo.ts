import type { Metadata } from "next";
import { absoluteUrl, site } from "@/config/site";
import type { ImageAsset } from "@/content/images";

type PageMetaInput = {
  /** Page title; the layout template appends "| Selvora" unless `absoluteTitle` is set. */
  title: string;
  absoluteTitle?: boolean;
  /** Aim for 160 characters or fewer so search results show it in full. */
  description: string;
  /** Site-relative path, used for the canonical URL and og:url. */
  path: string;
  image?: ImageAsset;
  type?: "website" | "article";
};

/** Builds consistent page metadata: canonical URL, Open Graph and Twitter card. */
export function pageMetadata({ title, absoluteTitle, description, path, image, type = "website" }: PageMetaInput): Metadata {
  const ogImage = image
    ? { url: image.src, width: image.width, height: image.height, alt: image.alt }
    : { url: site.ogImage, alt: `${site.name}: ${site.descriptor}` };
  const socialTitle = absoluteTitle ? title : `${title} | ${site.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: absoluteUrl(path),
      siteName: site.name,
      locale: "en_GB",
      title: socialTitle,
      description,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: [ogImage.url] },
  };
}

/** The organisation node shared by structured data across the site. */
export const organizationId = absoluteUrl("/#organization");

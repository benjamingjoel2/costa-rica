import Link from "@/i18n/Link";
import { absoluteUrl } from "@/config/site";
import { JsonLd } from "./JsonLd";

import { t } from "@/i18n/server";
type Crumb = { label: string; href: string };

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. */
export function Breadcrumbs({ items, tone = "dark", className = "" }: { items: Crumb[]; tone?: "light" | "dark"; className?: string }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label={t("Breadcrumb")} className={className}>
        <ol className={`label flex flex-wrap items-center gap-x-2 gap-y-1 ${tone === "light" ? "text-ivory/80" : "text-stone"}`}>
          {all.map((c, i) => (
            <li key={c.href} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden>/</span>}
              {i === all.length - 1 ? (
                <span aria-current="page">{t(c.label)}</span>
              ) : (
                <Link href={c.href} className="hover:underline underline-offset-4">
                  {t(c.label)}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: absoluteUrl(c.href) })),
        }}
      />
    </>
  );
}

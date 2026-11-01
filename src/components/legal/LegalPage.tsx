import Link from "@/i18n/Link";
import { BoxHeading } from "@/components/kit/BoxHeading";
import { DarkChip } from "@/components/kit/Tag";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { legal, legalUpdated, type LegalDoc } from "@/content/legal";

import { getLocale, t } from "@/i18n/server";

/** Renders "[text](/path)" inside legal text as links. */
function linkify(text: string) {
  return text.split(/(\[[^\]]+\]\(\/[^)]*\))/g).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\((\/[^)]*)\)$/);
    return m ? <Link key={i} href={m[2]}>{m[1]}</Link> : part;
  });
}

export function legalDoc(key: "privacy" | "terms" | "cookies"): LegalDoc {
  return (legal[getLocale()] ?? legal.en)[key];
}

/** Shared layout for the policy pages. `title` is the English title (translated with t()). */
export function LegalPage({ title, href, doc }: { title: string; href: string; doc: LegalDoc }) {
  const locale = getLocale();
  return (
    <div className="frame grid gap-10 pb-16 pt-40 md:grid-cols-2 md:pt-48">
      <header>
        <Breadcrumbs items={[{ label: title, href }]} className="mb-6" />
        <DarkChip>{t("Legal")}</DarkChip>
        <BoxHeading as="h1" text={title} size="l" className="mt-1.5" />
      </header>
      <div className="md:border-l md:border-ink md:pl-6">
        <div className="prose-selvora">
          <p>
            {t("Last updated")} {legalUpdated[locale] ?? legalUpdated.en}
          </p>
          {doc.sections.map((s) => (
            <section key={s.h}>
              <h2>{s.h}</h2>
              {s.p.map((p, i) => (
                <p key={i}>{linkify(p)}</p>
              ))}
              {s.table && (
                <div className="overflow-x-auto">
                  <table>
                    <thead>
                      <tr>
                        {s.table.head.map((c) => (
                          <th key={c} scope="col">{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {s.table.rows.map((r) => (
                        <tr key={r[0]}>
                          {r.map((c, i) => (i === 0 ? <th key={i} scope="row">{c}</th> : <td key={i}>{c}</td>))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

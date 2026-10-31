import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter_Tight, Yellowtail } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { site } from "@/config/site";
import { destinations } from "@/content/destinations";
import { I18nProvider } from "@/i18n/client";
import { CLIENT_STRINGS } from "@/i18n/client-strings";
import { locales, ogLocales } from "@/i18n/locales";
import { clientMessages, getLocale, setLocale, t, tr } from "@/i18n/server";
import "../globals.css";

const grotesk = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-grotesk",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const yellowtail = Yellowtail({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-yellowtail",
  display: "swap",
  // Only used for one decorative word below the fold: don't compete with the hero for bandwidth.
  preload: false,
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LayoutProps = Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>;

export async function generateMetadata({ params }: Pick<LayoutProps, "params">): Promise<Metadata> {
  setLocale((await params).locale);
  return {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${t(site.descriptor)}`,
    template: `%s | ${site.name}`,
  },
  description: t(site.description),
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: ogLocales[getLocale()],
    images: [{ url: site.ogImage, alt: `${site.name}: ${t(site.descriptor)}` }],
  },
  twitter: { card: "summary_large_image" },
  // Search Console / Bing Webmaster verification; see .env.example.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
  };
}

export const viewport: Viewport = {
  themeColor: "#222222",
};

export default async function RootLayout({ children, params }: LayoutProps) {
  setLocale((await params).locale);
  const regions = tr(destinations).map(({ slug, shortName, area }) => ({ slug, shortName, area }));
  return (
    <html lang={getLocale()} className={`${grotesk.variable} ${plexMono.variable} ${yellowtail.variable}`}>
      <body>
        <I18nProvider messages={clientMessages(CLIENT_STRINGS)}>
          <SiteHeader regions={regions} />
          <main id="main" tabIndex={-1} className="outline-none">{children}</main>
          <SiteFooter />
        </I18nProvider>
      </body>
    </html>
  );
}

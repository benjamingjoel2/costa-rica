import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter_Tight, Yellowtail } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { site } from "@/config/site";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.descriptor}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
    images: [{ url: site.ogImage, alt: `${site.name}: ${site.descriptor}` }],
  },
  twitter: { card: "summary_large_image" },
  // Search Console / Bing Webmaster verification; see .env.example.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#222222",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${grotesk.variable} ${plexMono.variable} ${yellowtail.variable}`}>
      <body>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

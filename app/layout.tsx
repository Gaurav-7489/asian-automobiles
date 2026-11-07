import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { addressOneLine, hoursText } from "@/content/business";
import { services } from "@/content/services";
import { displayPhone, mapsHref, telHref, waHref } from "@/lib/links";
import { businessJsonLd, siteUrl } from "@/lib/seo";
import { seo } from "@/content/pages";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileContactBar } from "@/components/layout/mobile-contact-bar";
import { AnalyticsListener } from "@/components/layout/analytics-listener";
import { JsonLd } from "@/components/seo/json-ld";

const manrope = Manrope({ subsets: ["latin"], weight: ["600", "700", "800"], display: "swap", variable: "--font-manrope" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: seo.home.title, template: "%s" },
  description: seo.home.description,
  robots: process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production" ? { index: false, follow: false } : { index: true, follow: true },
  openGraph: { siteName: "Asian Automobiles", locale: "en_IN", type: "website" },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#111820" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <SiteHeader
          services={services.map(({ slug, name, cardText, icon }) => ({ slug, name, cardText, icon }))}
          tel={telHref()}
          phone={displayPhone()}
          wa={waHref("general")}
          maps={mapsHref()}
          address={addressOneLine}
          hours={hoursText()}
        />
        <main id="main" tabIndex={-1} className="pt-[60px] outline-none lg:pt-[72px]">{children}</main>
        <SiteFooter />
        <MobileContactBar tel={telHref()} wa={waHref("general")} maps={mapsHref()} />
        <AnalyticsListener />
        <JsonLd data={businessJsonLd()} />
      </body>
    </html>
  );
}

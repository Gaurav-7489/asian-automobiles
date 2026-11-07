import type { Metadata, Viewport } from "next";
import Script from "next/script";
import localFont from "next/font/local";
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

// Self-hosted Latin variable fonts (OFL, from Fontsource) – no network call at build time.
const manrope = localFont({ src: "./fonts/manrope-latin-wght-normal.woff2", weight: "200 800", display: "swap", variable: "--font-manrope" });
const inter = localFont({ src: "./fonts/inter-latin-wght-normal.woff2", weight: "100 900", display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: seo.home.title, template: "%s" },
  description: seo.home.description,
  robots: process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production" ? { index: false, follow: false } : { index: true, follow: true },
  openGraph: { siteName: "Asian Automobiles", locale: "en_IN", type: "website" },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
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
        {/* Cookieless analytics (spec 21.7) – loads only when a domain is configured. */}
        {process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN && (
          <Script defer data-domain={process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN} src="https://plausible.io/js/script.js" strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}

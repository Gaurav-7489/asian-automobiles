import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./pro-upgrade.css";
import "./design-v8.css";
import "./inner-pages-v9.css";
import "./responsive-fixes.css";
import "./inner-pages-v10.css";
import "./inner-pages-v11.css";
import "./responsive-contrast-v12.css";
import "./inner-pages-v13.css";
import "./contrast-v14.css";
import "./production.css";
import "./connected-flow.css";
import "./responsive-layout.css";
import "./mobile-attraction.css";
import "./spec-design-system.css";
import "./audit-fixes.css";
import "./polish.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { businessFacts, directionsHref } from "@/lib/business-facts";

// Production deployment trigger — responsive baseline.
// Spec 5.3: Manrope for headings, Inter for body. Self-hosted Latin variable fonts (OFL, Fontsource).
const manrope = localFont({ src: "./fonts/manrope-latin-wght-normal.woff2", weight: "200 800", display: "swap", variable: "--font-manrope" });
const inter = localFont({ src: "./fonts/inter-latin-wght-normal.woff2", weight: "100 900", display: "swap", variable: "--font-inter" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asian-automobiles.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#111820",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Asian Automobiles – Multi-Brand Car Service Centre in Irinjalakuda",
  description:
    "Independent car servicing, mechanical repairs, AC service, wheel alignment, tyre care and spare-parts enquiries on Kattoor Road, Irinjalakuda. Call or visit the workshop.",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    title: "Asian Automobiles – Multi-Brand Car Service Centre in Irinjalakuda",
    description:
      "Service. Repair. Parts. In Irinjalakuda.",
    url: "/",
    locale: "en_IN",
    siteName: "Asian Automobiles",
  },
};

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": siteUrl + "/#business",
  name: "Asian Automobiles",
  url: siteUrl,
  description: businessFacts.description,
  // Name, address and phone match the verified Google Business Profile (spec 23.3 / 23.6).
  // Closing time is still unconfirmed, so opening hours are not published as structured data yet.
  telephone: businessFacts.phones.primaryHref,
  hasMap: directionsHref,
  address: {
    "@type": "PostalAddress",
    streetAddress: businessFacts.address.street,
    addressLocality: businessFacts.address.locality,
    addressRegion: businessFacts.address.region,
    postalCode: businessFacts.address.postalCode,
    addressCountry: "IN",
  },
  areaServed: ["Irinjalakuda", ...businessFacts.serviceArea.slice(0, 6)],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
        <a href="#main" className="aa-skip-link">Skip to main content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./styles/index.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { NavigationFeedback } from "@/components/navigation-feedback";
import { MotionProvider } from "@/components/motion-provider";
import { JsonLd } from "@/components/ui/json-ld";
import { businessFacts, directionsHref } from "@/lib/business-facts";
import { siteUrl } from "@/lib/site";

// Spec 5.3: Manrope for headings, Inter for body. Self-hosted Latin variable fonts (OFL, Fontsource).
const manrope = localFont({ src: "./fonts/manrope-latin-wght-normal.woff2", weight: "200 800", display: "swap", variable: "--font-manrope" });
const inter = localFont({ src: "./fonts/inter-latin-wght-normal.woff2", weight: "100 900", display: "swap", variable: "--font-inter" });

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
        <JsonLd data={businessSchema} />
        <a href="#main" className="aa-skip-link">Skip to main content</a>
        <MotionProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
          <NavigationFeedback />
        </MotionProvider>
      </body>
    </html>
  );
}

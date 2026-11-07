import type { Metadata, Viewport } from "next";
import "lenis/dist/lenis.css";
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
import "./mobile-contrast-fixes.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { InteractiveLayer } from "@/components/interactive";
import { SmoothScroll } from "@/components/immersive/smooth-scroll";
import { businessFacts } from "@/lib/business-facts";

// Production deployment trigger — responsive baseline.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asian-automobiles.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#070707",
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
  // Telephone, email and hours are added only once the owner confirms them (spec 23.3).
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kattoor Road, near Government Rest House",
    addressLocality: businessFacts.address.locality,
    addressRegion: businessFacts.address.region,
    postalCode: businessFacts.address.postalCode,
    addressCountry: "IN",
  },
  areaServed: ["Irinjalakuda", ...businessFacts.serviceArea.slice(0, 6)],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
        <SmoothScroll />
        <InteractiveLayer />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

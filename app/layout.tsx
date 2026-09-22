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
  title: "Asian Automobiles | Car Service, Repair & Parts in Irinjalakuda",
  description:
    "Independent multi-brand automobile service, repair, accident restoration, wheel services and spare-parts enquiries in Irinjalakuda, Kerala.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    title: "Asian Automobiles | Irinjalakuda",
    description:
      "Car service, repair, accident restoration, wheel services and automobile parts support in Irinjalakuda, Kerala.",
    url: "/",
  },
};

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  name: "Asian Automobiles",
  url: siteUrl,
  telephone: businessFacts.phones.primaryDisplay,
  address: {
    "@type": "PostalAddress",
    streetAddress: businessFacts.address.street,
    addressLocality: businessFacts.address.locality,
    addressRegion: businessFacts.address.region,
    postalCode: businessFacts.address.postalCode,
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
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

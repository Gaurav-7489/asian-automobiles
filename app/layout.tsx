import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./styles/index.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { NavigationFeedback } from "@/components/navigation-feedback";
import { JsonLd } from "@/components/ui/json-ld";
import { businessFacts, directionsHref } from "@/lib/business-facts";
import { siteUrl } from "@/lib/site";

// Archivo (OFL): one self-hosted variable file, weight 400–800 and width 100–125 %, subset to the
// characters the site uses (31 KB; see app/fonts/README.md). Expanded widths set the display type.
const archivo = localFont({
  src: "./fonts/archivo-subset.woff2",
  weight: "400 800",
  style: "normal",
  display: "swap",
  variable: "--font-archivo",
  declarations: [{ prop: "font-stretch", value: "100% 125%" }],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#14191e",
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
    <html lang="en-IN" className={archivo.variable}>
      <body>
        <JsonLd data={businessSchema} />
        <a href="#main" className="aa-skip-link">Skip to main content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <NavigationFeedback />
      </body>
    </html>
  );
}

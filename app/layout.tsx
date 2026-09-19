import type { Metadata } from "next";
import "./globals.css";
import "./pro-upgrade.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { InteractiveLayer } from "@/components/interactive";

export const metadata: Metadata = {
  title: "Asian Automobiles | Automotive Service in Irinjalakuda",
  description:
    "Asian Automobiles — automotive service, repairs, accident restoration, wheel services, insurance assistance and automobile parts in Irinjalakuda, Kerala.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <InteractiveLayer />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

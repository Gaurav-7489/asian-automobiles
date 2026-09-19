import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { InteractiveLayer } from "@/components/interactive";

const heroImage="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=82";

export const metadata: Metadata = {
  title: "Asian Automobiles | Automotive Service in Irinjalakuda",
  description: "Asian Automobiles — independent multi-brand car service, repairs, accident restoration, wheel services, insurance assistance and automobile parts in Irinjalakuda, Kerala.",
  icons: { icon: "/favicon.ico" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="preload" as="image" href={heroImage}/></head><body><InteractiveLayer/><SiteHeader/>{children}<SiteFooter/></body></html>;
}

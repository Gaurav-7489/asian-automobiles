import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileActions } from "@/components/mobile-actions";
import { CursorTrail } from "@/components/cursor-trail";

export const metadata: Metadata = {
  title: "Asian Automobiles | Premium Automotive Care",
  description: "Asian Automobiles — considered service, repairs and automotive care in Irinjalakuda, Kerala.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <CursorTrail />
        {children}
        <SiteFooter />
        <MobileActions />
      </body>
    </html>
  );
}

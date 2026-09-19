import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileActions } from "@/components/mobile-actions";
import { CursorTrail } from "@/components/cursor-trail";
export const metadata: Metadata={title:"Asian Automobiles | Car Service & Repairs in Irinjalakuda",description:"Premium automotive service, repair, accident restoration, wheels, tyres, AC and spare parts."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><SiteHeader/><CursorTrail/>{children}<SiteFooter/><MobileActions/></body></html>}
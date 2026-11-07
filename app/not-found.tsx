import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found | Asian Automobiles",
  description: "The requested page could not be found.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="aa-production-404">
      <div>
        <span className="eyebrow">404 / WRONG TURN</span>
        <h1>Looks like we took the scenic route.</h1>
        <p>This page is not in the workshop. Head back to Asian Automobiles and choose the service you need.</p>
        <Link href="/">
          <ArrowLeft size={15} />
          <span>Back to the workshop</span>
        </Link>
      </div>
    </main>
  );
}

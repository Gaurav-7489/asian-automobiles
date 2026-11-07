import Link from "next/link";
import { CallButton } from "@/components/ui/button";

export const metadata = { title: "Page not found – Asian Automobiles", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-x max-w-[720px]">
        <p className="eyebrow mb-3">404</p>
        <h1 className="h1">Page not found</h1>
        <p className="lead muted mt-5">The page you’re looking for isn’t here. It may have moved.</p>
        <ul className="mt-8 flex flex-wrap gap-6 font-semibold text-amber-700">
          <li><Link href="/" className="underline-offset-4 hover:underline">Home</Link></li>
          <li><Link href="/services" className="underline-offset-4 hover:underline">Services</Link></li>
          <li><Link href="/contact" className="underline-offset-4 hover:underline">Contact</Link></li>
        </ul>
        <div className="mt-8"><CallButton position="not_found" /></div>
      </div>
    </section>
  );
}

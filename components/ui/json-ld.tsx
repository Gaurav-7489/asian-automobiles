import { serializeJsonLd } from "@/lib/json-ld";

/** Structured data block; content is static and serialised safely. */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}

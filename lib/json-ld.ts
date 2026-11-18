/**
 * Serialises structured data for a <script type="application/ld+json"> block.
 * `<` is escaped so no value can ever close the script element early.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

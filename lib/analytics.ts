/** Cookieless analytics bridge (spec 21.7). No personal data is ever sent. */
type Props = Record<string, string | undefined>;
declare global {
  interface Window { plausible?: (e: string, o?: { props: Props }) => void; umami?: { track: (e: string, p?: Props) => void } }
}
export function track(event: string, props: Props) {
  if (typeof window === "undefined") return;
  window.plausible?.(event, { props });
  window.umami?.track(event, props);
}

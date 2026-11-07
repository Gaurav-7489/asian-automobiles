/** Typographic wordmark (spec ch. 5.8). Single replace point for the real logo once supplied. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 font-display leading-none ${className}`}>
      <span aria-hidden="true" className="h-5 w-[3px] bg-amber-500" />
      <span className="flex flex-col">
        <span className="text-[17px] font-extrabold tracking-[0.12em]">ASIAN</span>
        <span className="mt-0.5 text-[10px] font-semibold tracking-[0.24em] opacity-80">AUTOMOBILES</span>
      </span>
    </span>
  );
}

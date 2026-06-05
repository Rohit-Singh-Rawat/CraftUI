import Link from "next/link";
import { cn } from "@/lib/utils";

const LATEST_CRAFTS_URL = "https://crafts.rohitsinghrawat.com";

export function ArchivedBanner() {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed inset-x-0 top-0 z-[60] min-h-[var(--archived-banner-height)] border-border/70 border-b",
        "bg-background/92 backdrop-blur-md supports-[backdrop-filter]:bg-background/80",
        "animate-in fade-in slide-in-from-top-1 duration-300 ease-out",
        "motion-reduce:animate-none",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-px bg-linear-to-b from-transparent via-foreground/15 to-transparent"
      />
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 py-2.5 text-center text-xs sm:text-sm">
        <span className="rounded-sm bg-red-600 px-1.5 py-0.5 font-doto text-[0.65rem] font-semibold tracking-[0.22em] text-white uppercase dark:bg-red-500">
          Archived
        </span>
        <span className="hidden text-muted-foreground/40 sm:inline" aria-hidden>
          ·
        </span>
        <p className="text-balance text-muted-foreground">
          Latest components are at{" "}
          <Link
            href={LATEST_CRAFTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline decoration-foreground/25 underline-offset-[3px] transition-colors duration-200 ease-out hover:decoration-foreground/60"
          >
            crafts.rohitsinghrawat.com
            <span className="sr-only"> (opens in new tab)</span>
          </Link>
          . Everything here stays{" "}
          <span className="font-serif text-foreground">free to copy and use</span>.
        </p>
      </div>
    </div>
  );
}

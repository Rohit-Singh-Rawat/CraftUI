import { cn } from "@/lib/utils";
import Link from "next/link";

interface HeadingProps {
  heading: string;
  subheading: string;
  className?: string;
}

export function Heading({ heading, subheading, className }: HeadingProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex flex-wrap items-center gap-1 font-light text-muted-foreground min-w-0",
        className,
      )}
    >
      <Link
        href="/diary"
        className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
      >
        Diary
      </Link>
      <span className="text-muted-foreground font-extralight" aria-hidden="true">
        •
      </span>
      <span className="text-pretty min-w-0">{subheading}</span>
      <span className="text-muted-foreground font-extralight" aria-hidden="true">
        •
      </span>
      <h1 className="text-balance min-w-0 text-foreground">{heading}</h1>
    </nav>
  );
}

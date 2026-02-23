"use client";
import { isUnsupportedBrowser } from "@/utils/is-unsupported-browser";
import { cn } from "@/lib/utils";
import { useMemo, memo, useId } from "react";

interface LogoProps {
  size?: number;
  className?: string;
}

const COLORS = [
  "#ef4444",
  "#3b82f6",
  "#eab308",
  "#22c55e",
  "#a855f7",
  "#f97316",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
  "#f59e0b",
  "#8b5cf6",
] as const;

function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function generateLogoElements(seed: number) {
  const random = seededRandom(seed);
  return Array.from({ length: 15 }, (_, i) => ({
    cx: random() * 100,
    cy: random() * 100,
    targetCx: random() * 100,
    targetCy: random() * 100,
    color: COLORS[Math.floor(random() * COLORS.length)],
    duration: 5 + random() * 4,
    key: i,
  }));
}

const LOGO_ELEMENTS = generateLogoElements(42);

const Logo = memo(({ size = 80, className }: LogoProps) => {
  const isUnsupported = useMemo(() => isUnsupportedBrowser(), []);

  // Simple gradient logo for unsupported browsers
  if (isUnsupported) {
    return (
      <div className={cn("logo", className)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={cn(`size-${size} rounded-full`, className)}
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="40" fill="url(#gradient)" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={cn("logo", className)}
      style={{
        WebkitFilter: 'url("#goo")',

        filter: 'url("#goo")',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className={cn(`size-${size} rounded-full bg-black`, className)}
      >
        <defs>
          <filter className="goo" id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
          </filter>
        </defs>
        {LOGO_ELEMENTS.map((element) => (
          <circle
            key={element.key}
            cx={element.cx}
            filter="url(#goo)"
            cy={element.cy}
            r="24%"
            fill={element.color}
          >
            <animate
              attributeName="cx"
              values={`${element.cx};${element.targetCx};${element.cx}`}
              dur={`${element.duration}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values={`${element.cy};${element.targetCy};${element.cy}`}
              dur={`${element.duration}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  );
});

Logo.displayName = "Logo";

export default Logo;

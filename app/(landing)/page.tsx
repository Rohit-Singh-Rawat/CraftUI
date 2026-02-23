import { Ruler } from "@/components/landing-ruler";
import { AnimatedCompass } from "@/components/animated-compass";
import { LandingHero } from "@/components/landing-hero";
import Logo from "@/components/navigation/logo";
import type { Metadata } from "next";
import { generateMetadata, cn } from "@/lib/utils";


export const metadata: Metadata = generateMetadata();

export default function Page() {
  return (
    <main className="w-full min-h-[1500vh] bg-white dark:bg-[#0a0a0a] font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black relative">
      <div className="w-full h-screen sticky top-0 flex relative bg-white dark:bg-[#0a0a0a] overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="bg-grid-pattern"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <g
                fillRule="evenodd"
                className="fill-black/5 dark:fill-white/5"
              >
                <g>
                  <path
                    opacity=".3"
                    d="M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z"
                  />
                  <path opacity={'1'} d="M6 5V0H5v5H0v1h5v94h1V6h94V5H6z" />
                </g>
              </g>
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#bg-grid-pattern)"
            style={{
              maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
            }}
          />
        </svg>

        <Ruler side="left" className="hidden lg:flex" />

        <div
          className="flex-1 grid h-full grid-cols-1 md:grid-cols-[1fr_2fr] grid-rows-[1fr_auto_1fr] relative border-x border-[#e5e5e5] dark:border-[#222]"
        >
          <div className="bg-white dark:bg-[#0a0a0a] relative h-full w-full border-0 md:border-b md:border-r border-[#e5e5e5] dark:border-[#222] md:col-start-1 md:row-start-1 flex items-center p-4 justify-center">
            <div className="flex items-center gap-3">
              <Logo size={40} />
              <span className="font-medium text-4xl tracking-tight font-serif">Craft</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0a0a0a] flex flex-col items-start justify-center p-6 sm:p-8 md:p-12 lg:p-16 xl:p-24 relative border-0 md:border-b md:border-t md:border-l border-[#e5e5e5] dark:border-[#222] md:col-start-2 md:row-start-2">
            <Corner className="hidden md:block -top-2 -left-2" />
            <Corner className="hidden md:block -bottom-2 -left-2" />
          

            <LandingHero />
          </div>

          <div className="bg-white dark:bg-[#0a0a0a] relative flex items-end justify-start h-full min-h-[400px] overflow-hidden border-0 md:border-t md:border-r border-[#e5e5e5] dark:border-[#222] md:col-start-1 md:row-start-3">
            <div className="absolute inset-0 flex flex-col justify-between items-end overflow-hidden">
              <span
                className="text-black/40 dark:text-white/40 font-mono text-sm tracking-widest uppercase relative z-10 p-8"
                style={{
                  fontFamily: "var(--font-doto)",
                  letterSpacing: "0.2em",
                }}
              >
                Craft
              </span>

              <AnimatedCompass className="w-[600px] md:w-[756px] h-[600px] md:h-[756px] max-md:left-1/2 max-md:-translate-x-1/2 md:left-0 md:-translate-x-1/2 translate-y-1/2" />
            </div>
          </div>
        </div>

        <Ruler side="right" className="hidden lg:flex" />
      </div>
    </main>
  );
}
const Corner = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "absolute size-3 bg-white dark:bg-[#0a0a0a] border border-[#e5e5e5] dark:border-[#222] z-20",
      className
    )}
  />
);

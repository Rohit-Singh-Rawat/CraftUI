"use client";

import { useAnimate, motion, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import { LandingCompass } from "@/components/landing-compass";
import { cn } from "@/lib/utils";

interface AnimatedCompassProps {
  className?: string;
}

export function AnimatedCompass({ className }: AnimatedCompassProps) {
  const [scope, animate] = useAnimate();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !scope.current) return;

    const sequenceAnimations = async () => {
      await animate(
        scope.current,
        { scale: 1, opacity: 1, rotate: -90 },
        { duration: 0.8, ease: [0.32, 0.72, 0, 1] },
      );

      await animate(
        scope.current,
        { rotate: 0 },
        { type: "spring", damping: 20, stiffness: 100 },
      );
    };

    sequenceAnimations();
  }, [animate, scope, prefersReducedMotion]);

  return (
    <div className={cn("absolute bottom-0", className)} aria-hidden="true">
      <motion.div
        ref={scope}
        className="w-full h-full origin-center"
        initial={
          prefersReducedMotion
            ? { scale: 1, opacity: 1, rotate: 0 }
            : { scale: 0.6, opacity: 0.5, rotate: -90 }
        }
      >
        <LandingCompass className="w-full h-full" />
      </motion.div>
    </div>
  );
}

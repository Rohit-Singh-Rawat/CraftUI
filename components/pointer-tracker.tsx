"use client";

import { useMotionValue, useTransform, motion } from "motion/react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export function PointerTracker({ className }: { className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(Math.round(e.clientX));
      y.set(Math.round(e.clientY));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  // Transform values to strings before rendering
  const xStr = useTransform(x, (v) => v.toString().padStart(4, "0"));
  const yStr = useTransform(y, (v) => v.toString().padStart(4, "0"));

  return (
    <div 
      className={cn("flex flex-col gap-1 text-black/40 dark:text-white/40 text-xs tracking-widest", className)}
      style={{ fontFamily: "var(--font-doto)" }}
    >
      <div className="flex gap-4 justify-between">
        <span>X</span>
        <motion.span>{xStr}</motion.span>
      </div>
      <div className="flex gap-4 justify-between">
        <span>Y</span>
        <motion.span>{yStr}</motion.span>
      </div>
    </div>
  );
}

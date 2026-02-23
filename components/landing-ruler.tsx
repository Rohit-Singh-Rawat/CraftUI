"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface RulerProps {
  side: "left" | "right";
  className?: string;
}

export function Ruler({ side, className }: RulerProps) {
  const startNum = 3.8;
  const endNum = 8.5;
  const tickCount = Math.floor((endNum - startNum) * 10);

  // Memoize the array of ticks to avoid unnecessary re-creation on re-renders,
  // matching performance best practices for scalable frontends.
  const ticks = useMemo(() => Array.from({ length: tickCount }), [tickCount]);

  return (
    <div
      className={cn(
        "hidden md:flex flex-col relative w-28 h-full bg-[#f8f8f8] dark:bg-[#111111] border-gray-200 dark:border-[#222] overflow-hidden shrink-0 select-none",
        side === "left" ? "border-r items-end" : "border-l items-start",
        className
      )}
    >
      <div className="absolute inset-0 bg-[#F5F5F5] dark:bg-[#111111] opacity-80 mix-blend-overlay pointer-events-none z-0" />

      <div className="absolute inset-0 flex flex-col justify-between py-10 z-10">
        {ticks.map((_, i) => {
          const val = startNum + i * 0.1;
          const isWhole = Math.abs(val % 1) < 0.01;
          const isHalf = Math.abs((val % 1) - 0.5) < 0.01;
          const isTickWithLabel = isWhole || isHalf;

          const tickWidth = isWhole ? "w-8" : isHalf ? "w-5" : "w-3";

          return (
            <div
              key={i}
              className={cn(
                "relative flex items-center w-full group h-[0px] justify-end",
              )}
            >
              <div className="absolute inset-x-0 h-4 -top-2 z-10 cursor-pointer" />

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{
                  delay: i * 0.02,
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className={cn(
                  "h-px bg-foreground/20 absolute transition-all duration-200 ease-out group-hover:bg-foreground/40",
                  tickWidth,
                  side === "left" ? "right-0 origin-right group-hover:scale-x-[1.5]" : "left-0 origin-left group-hover:scale-x-[1.5]",
                )}
              />

              {isTickWithLabel && val >= 4 && val <= 8 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 + 0.1, duration: 0.3 }}
                  className={cn(
                    "absolute text-[10px] text-foreground/40 font-mono flex items-center justify-center transition-colors duration-200 group-hover:text-foreground/70",
                    side === "left" ? "right-10" : "left-10",
                  )}
                  style={{
                    transform:
                      side === "left" ? "rotate(-90deg)" : "rotate(90deg)",
                  }}
                >
                  {val.toFixed(isHalf ? 1 : 0)}
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

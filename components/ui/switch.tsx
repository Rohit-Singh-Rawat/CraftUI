"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    return (
      <motion.label
        animate={{
          backgroundColor: checked ? "rgb(251, 146, 60)" : "rgb(229, 231, 235)",
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          ref={ref}
          {...props}
        />
        <motion.span
          initial={false}
          animate={{ x: checked ? 20 : 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 35, mass: 1 }}
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0"
          )}
        />
      </motion.label>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };

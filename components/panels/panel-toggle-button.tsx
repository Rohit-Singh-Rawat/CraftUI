"use client";

import * as React from "react";
import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowShrink01Icon,
  ArrowExpand01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

interface PanelToggleButtonProps {
  isMaximized: boolean;
  onToggle: () => void;
  className?: string;
  side?: "left" | "right";
}

export function PanelToggleButton({
  isMaximized,
  onToggle,
  className,
  side = "left",
}: PanelToggleButtonProps): React.ReactElement {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      className={cn(
        "absolute top-16 z-30 panel-toggle-button panel-button relative rounded-l-xl bg-background p-2.5 min-h-10 min-w-10 shadow-none backdrop-blur-sm hover:bg-background/90 outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-0 transition-colors touch-manipulation",
        side === "left" ? "right-0" : "left-4",
        className,
      )}
      aria-label={isMaximized ? "Show side panel" : "Hide side panel"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isMaximized ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <HugeiconsIcon
          icon={isMaximized ? ArrowShrink01Icon : ArrowExpand01Icon}
          size={20}
          color="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </motion.div>
    </motion.button>
  );
}

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import CopyIcon from "@/components/icons/copy";
import { cn } from "@/lib/utils";

interface CopyCodeButtonProps {
  code: string;
  className?: string;
}

export function CopyCodeButton({ code, className }: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy code"}
      className={cn(
        "flex min-h-10 min-w-10 items-center justify-center rounded-md p-2 group bg-muted hover:bg-muted/80 border border-border relative outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-0 active:bg-muted transition-colors",
        copied ? "text-green-600" : "",
        className,
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {copied ? (
          <motion.div
            key="tick"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <HugeiconsIcon
              icon={Tick02Icon}
              size={16}
              strokeWidth={1.5}
              className="text-primary"
              aria-hidden="true"
            />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <CopyIcon
              aria-hidden="true"
              className="group-hover:text-primary transition-colors duration-300 text-muted-foreground size-4 stroke-[1.5] relative"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

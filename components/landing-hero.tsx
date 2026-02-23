"use client";

import { motion, type Variants } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PointerTracker } from "@/components/pointer-tracker";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 15 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      ease: [0.32, 0.72, 0, 1], // iOS-style ease, referenced from Emil Kowalski animations guide
      duration: 0.8,
    },
  },
};

export function LandingHero() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-start w-full relative"
    >
      <PointerTracker className="hidden md:flex absolute top-0 right-0 z-10" />

      <motion.div variants={itemVariants} className="w-full">
        <h1 className="text-6xl sm:text-6xl md:text-6xl lg:text-7xl font-serif leading-[1.1] font-medium text-black dark:text-gray-100 mb-4 text-balance md:tracking-tight max-w-[800px]">
          A Collection of Digital Crafts
        </h1>
      </motion.div>

      <motion.div variants={itemVariants} className="w-full">
        <p className="text-gray-600 font-serif text-muted-foreground text-lg sm:text-xl md:text-xl lg:text-[22px] max-w-[600px] mb-8 lg:mb-10 leading-relaxed font-normal">
          A diary of crafts including CSS, SVG, motion, and more
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        <Link href="/diary" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-none px-6 py-5 text-sm font-medium transition-all flex items-center gap-2">
            View Diary <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <Link href="/crafts" className="w-full sm:w-auto">
          <Button
            variant="outline"
            className="w-full sm:w-auto bg-background border border-border text-foreground hover:bg-accent hover:text-accent-foreground rounded-none px-6 py-5 text-sm font-medium transition-all"
          >
            Explore Crafts
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}

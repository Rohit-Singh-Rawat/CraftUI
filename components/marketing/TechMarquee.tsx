'use client';

import { motion } from 'motion/react';
import { Marquee } from '@/components/crafts/Marquee';
import { FramerMotion } from '@/components/icons/FramerMotion';
import Nextjs from '@/components/icons/Nextjs';
import { Shadcn } from '@/components/icons/Shadcn';
import { Css } from '@/components/icons/css';
import { ReactIcon } from '@/components/icons/react';
import { Tailwind } from '@/components/icons/tailwindcss';

const techIcons = [
  Nextjs,
  ReactIcon,
  Css,
  Tailwind,
  FramerMotion,
  Shadcn,
  Nextjs,
  ReactIcon,
  Css,
  Tailwind,
  FramerMotion,
  Shadcn,
];

const TechMarquee = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mt-8 w-full overflow-hidden sm:mt-12 sm:w-4/5 md:w-3/5 lg:w-2/5"
    >
      <Marquee icons={techIcons} gap="25px" direction="left" fade />
    </motion.div>
  );
};

export default TechMarquee;

'use client';
import { motion } from 'motion/react';
import Link from 'next/link';

import { Marquee } from '@/components/crafts/Marquee';
import { FramerMotion } from '@/components/icons/FramerMotion';
import Nextjs from '@/components/icons/Nextjs';
import { Shadcn } from '@/components/icons/Shadcn';
import { Css } from '@/components/icons/css';
import Logo from '@/components/icons/logo';
import { ReactIcon } from '@/components/icons/react';
import { Tailwind } from '@/components/icons/tailwindcss';
import CTAButtons from '@/components/marketing/CTAButtons';
import Footer from '@/components/marketing/Footer';
import Hero from '@/components/marketing/Hero';
import TechMarquee from '@/components/marketing/TechMarquee';

function MarketingPage() {
  return (
    <div className="gridGradient flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white px-4 sm:px-6 lg:px-8 dark:bg-black">
      <Hero />
      <CTAButtons />
      <TechMarquee />
      <Footer />
    </div>
  );
}

export default MarketingPage;

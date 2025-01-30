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

function MarketingPage() {
  return (
    <div className="gridGradient flex min-h-[calc(100vh-120px)] flex-col items-center justify-center bg-white dark:bg-black">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        {' '}
        <motion.div
          initial={{ y: -10, rotate: -5.5 }}
          animate={{ y: 0, rotate: 5.5 }}
          transition={{
            duration: 4,
            ease: 'easeInOut',
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse',
          }}
          className="flex justify-center"
        >
          <Logo className="h-28 dark:invert" />
        </motion.div>
        <h1 className="mb-6 font-extrabold text-3xl text-gray-800 dark:text-gray-200">
          Craft Your Unique Components Today
        </h1>
        <p className="mb-8 text-gray-700 text-xl dark:text-gray-300">
          A minimalist UI component library
        </p>
        <div className="flex items-center justify-center space-x-4">
          <motion.a
            href="/components"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="gridGradient rounded-full bg-[#F4F6EF]/60 px-6 py-2 font-medium text-base text-gray-800 shadow-sm transition-all hover:bg-[#f4f6ef] dark:bg-[#1A1C1E] dark:text-[#F4F6EF] dark:hover:bg-[#1e1717]"
          >
            Explore Components
          </motion.a>
          <motion.a
            href="https://github.com/Rohit-Singh-Rawat/CraftUI"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center rounded-full bg-[#E5E6E1] px-6 py-2 font-medium text-base text-gray-800 hover:bg-[#DADBD5] dark:bg-[#1a1e1c] dark:text-[#F4F6EF] dark:hover:bg-[#272f2b]"
          >
            <svg
              className="mr-2 size-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            Star on GitHub
          </motion.a>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-12 flex w-2/5 items-center justify-center overflow-hidden"
      >
        <Marquee
          icons={[
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
          ]}
          gap="25px"
          direction="left"
          fade
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-8 text-gray-500 text-sm dark:text-[#F4F6EF]"
      >
        Made with ❤️ by{' '}
        <Link
          href="https://rohitsinghrawat.tech"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:underline dark:text-[#F4F6EF]"
        >
          Rohit Singh Rawat
        </Link>
      </motion.div>
    </div>
  );
}

export default MarketingPage;

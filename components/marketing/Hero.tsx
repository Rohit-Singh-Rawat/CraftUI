'use client';

import { motion } from 'motion/react';
import Logo from '@/components/icons/logo';

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mx-auto w-full max-w-4xl text-center"
    >
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
        <Logo className="h-20 sm:h-24 md:h-28 dark:invert" />
      </motion.div>
      <h1 className="mb-4 font-extrabold text-2xl text-black sm:mb-6 sm:text-3xl md:text-4xl dark:text-gray-200">
        Craft Your Unique Components Today
      </h1>
      <p className="mb-6 text-gray-700 text-lg sm:mb-8 sm:text-xl dark:text-gray-300">
        A minimalist UI component library
      </p>
    </motion.div>
  );
};

export default Hero;

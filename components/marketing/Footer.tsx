'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mt-8 text-gray-500 text-xs sm:mt-12 sm:text-sm dark:text-[#F4F6EF]"
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
  );
};

export default Footer;

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavLinks = () => {
  const pathname = usePathname();

  return (
    <>
      <Link
        href={'/components'}
        className={`text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white ${
          pathname === '/components' ? 'text-black dark:text-white' : ''
        }`}
      >
        Components
      </Link>
      <Link
        href={'https://github.com/Rohit-Singh-Rawat/CraftUI'}
        target="_blank"
        className="text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white"
      >
        Github
      </Link>
      <Link
        href={'https://x.com/intent/follow?screen_name=Spacing_Whale'}
        className="text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white"
        target="_blank"
      >
        Twitter
      </Link>
    </>
  );
};

import Link from 'next/link';
import Craft from '../../icons/Craft';
import Logo from '../../icons/logo';

export const NavbarLogo = () => {
  return (
    <Link
      href={'/'}
      className="flex items-center gap-1 text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white"
    >
      <Logo className="h-8 sm:h-10 dark:invert" />
      <Craft className="h-10 w-24 sm:h-12 sm:w-28 dark:invert" />
    </Link>
  );
};

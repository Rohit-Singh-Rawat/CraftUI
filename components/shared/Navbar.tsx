import Link from 'next/link';

import Craft from '../icons/Craft';
import Logo from '../icons/logo';

import { CommandDialogDemo } from './Command';
import ThemeSwitch from './ThemeSwitch';

const Navbar = () => {
  return (
    <div className="sticky top-0 z-1 flex items-center justify-between bg-white/20 p-2 px-10 py-3 shadow-ssm backdrop-blur-xs dark:bg-black/20">
      <div className="flex items-center gap-2">
        <Link
          href={'/'}
          className="flex items-center gap-1 text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white"
        >
          <Logo className="h-10 dark:invert" />
          <Craft className="h-12 w-28 dark:invert" />
        </Link>{' '}
        <Link
          href={'/components'}
          className="text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white"
        >
          Components
        </Link>
      </div>

      <div className="flex items-center gap-5">
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

        <ThemeSwitch />
        <CommandDialogDemo />
      </div>
    </div>
  );
};
export default Navbar;

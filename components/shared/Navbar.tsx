'use client';

import { CommandDialogDemo } from './Command';
import ThemeSwitch from './ThemeSwitch';
import { NavLinks } from './navbar/NavLinks';
import { NavbarLogo } from './navbar/Logo';
import { MobileNav } from './navbar/MobileNav';

const Navbar = () => {
  return (
    <div className="fixed top-0 z-50 flex w-full items-center justify-between bg-white/20 p-2 px-4 py-3 shadow-ssm backdrop-blur-xs sm:px-10 dark:bg-black/20">
      <div className="flex items-center gap-2">
        <NavbarLogo />
        <div className="hidden items-center gap-5 sm:flex">
          <NavLinks />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <ThemeSwitch />
        <CommandDialogDemo />
        <MobileNav />
      </div>
    </div>
  );
};

export default Navbar;

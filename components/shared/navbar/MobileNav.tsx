'use client';

import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavLinks } from './NavLinks';
import { ComponentGroup } from '../leftSideBar/ComponentGroup';
import { useComponentGroups } from '../leftSideBar/useComponentGroups';

export const MobileNav = () => {
  const pathname = usePathname();
  const sortedGroups = useComponentGroups();

  return (
    <Sheet>
      <SheetTrigger className="block sm:hidden">
        <Menu className="h-6 w-6 text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] p-6">
        <div className="mt-8 flex flex-col gap-4">
          <NavLinks />
        </div>
        <div className="mt-3">
          <h2 className="mb-4 font-semibold text-gray-900 text-sm dark:text-[#F4F6EF]">
            Components
          </h2>
          {sortedGroups.map(([group, components]) => (
            <ComponentGroup
              key={group}
              group={group}
              components={components}
              pathname={pathname}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

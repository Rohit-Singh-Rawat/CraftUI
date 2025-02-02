'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';

import { components } from '@/config/components';
import { ComponentGroup } from './leftSideBar/ComponentGroup';
import { useComponentGroups } from './leftSideBar/useComponentGroups';

const LeftSideBar = () => {
  const pathname = usePathname();
  const sortedGroups = useComponentGroups();

  return (
    <aside className="-ml-2 fixed top-[80px] hidden h-[calc(100vh-80px)] w-full text-gray-900 text-sm lg:sticky lg:block lg:self-start dark:text-[#F4F6EF]">
      <div className="custom-scrollbar h-full overflow-auto p-10">
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
    </aside>
  );
};

export default LeftSideBar;

'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { componentsInfo } from '@/util/constant';

const LeftSideBar = () => {
  const pathname = usePathname();

  const groupedComponents = Object.values(componentsInfo).reduce(
    (
      acc: Record<
        string,
        (typeof componentsInfo)[keyof typeof componentsInfo][]
      >,
      component,
    ) => {
      if (!acc[component.group]) {
        acc[component.group] = [];
      }
      acc[component.group].push(component);
      return acc;
    },
    {},
  );

  return (
    <aside className="-ml-2 fixed top-[80px] hidden h-[calc(100vh-80px)] w-full text-gray-900 text-sm lg:sticky lg:block lg:self-start dark:text-[#F4F6EF]">
      <div className="custom-scrollbar h-full overflow-auto p-10">
        <h2 className="mb-4 font-semibold text-gray-900 text-sm dark:text-[#F4F6EF]">
          Components
        </h2>
        {Object.entries(groupedComponents).map(([group, groupComponents]) => (
          <div key={group} className="mb-4">
            <h3 className="mb-2 font-semibold text-sm dark:text-[#F4F6EF]">
              {group}
            </h3>
            <ul className="space-y-1">
              {groupComponents.map((component) => (
                <li key={component.title}>
                  <Link
                    href={component.path}
                    className={`block rounded-xl px-3 py-1.5 text-gray-900 transition-colors duration-200 dark:text-[#F4F6EF]/70 ${
                      pathname === component.path
                        ? 'bg-[#F4F6EF] dark:bg-[#F4F6EF]/10 dark:text-[#F4F6EF]'
                        : 'hover:bg-[#F4F6EF] dark:hover:bg-[#F4F6EF]/10'
                    }`}
                  >
                    <span className="font-medium text-xs">
                      {component.title}
                    </span>
                    {component.tag && (
                      <span className="ml-2 inline-flex items-center rounded-md bg-[#aebe7b] px-1.5 py-0.5 font-semibold text-[#F4F6EF] text-xs dark:bg-[#F4F6EF]/20">
                        {component.tag}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default LeftSideBar;

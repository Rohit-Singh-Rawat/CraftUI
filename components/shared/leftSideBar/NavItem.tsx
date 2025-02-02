'use client';
import type { ComponentCategory } from '@/config/components';
import Link from 'next/link';

interface NavItemProps {
  component: ComponentCategory;
  group: string;
  isActive: boolean;
}

export const NavItem = ({ component, group, isActive }: NavItemProps) => {
  const href = `/components/${component.slug}`;

  return (
    <li>
      <Link
        href={href}
        className={`block rounded-lg px-3 py-1.5 text-gray-900 transition-colors duration-200 dark:text-[#F4F6EF]/70 ${
          isActive
            ? 'bg-[#F4F6EF] dark:bg-[#F4F6EF]/10 dark:text-[#F4F6EF]'
            : 'hover:bg-[#F4F6EF] dark:hover:bg-[#F4F6EF]/10'
        }`}
      >
        <span className="font-medium text-xs">{component.name}</span>
        {component.tag && (
          <span className="ml-2 inline-flex items-center rounded-md bg-[#aebe7b] px-1.5 py-0.5 font-semibold text-[#F4F6EF] text-xs dark:bg-[#F4F6EF]/20">
            {component.tag}
          </span>
        )}
      </Link>
    </li>
  );
};

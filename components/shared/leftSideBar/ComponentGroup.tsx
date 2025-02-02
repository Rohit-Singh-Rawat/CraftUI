'use client';
import type { ComponentCategory } from '@/config/components';
import { NavItem } from './NavItem';

interface ComponentGroupProps {
  group: string;
  components: ComponentCategory[];
  pathname: string;
}

export const ComponentGroup = ({
  group,
  components,
  pathname,
}: ComponentGroupProps) => {
  return (
    <div className="mb-4">
      {group !== 'Ungrouped' && (
        <h3 className="mb-2 font-semibold text-sm dark:text-[#F4F6EF]">
          {group}
        </h3>
      )}
      <ul className="space-y-1">
        {components.map((component) => (
          <NavItem
            key={component.name}
            component={component}
            group={group}
            isActive={pathname === `/components/${component.slug}`}
          />
        ))}
      </ul>
    </div>
  );
};

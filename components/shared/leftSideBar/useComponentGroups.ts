import { type ComponentCategory, components } from '@/config/components';
import { useMemo } from 'react';

export const useComponentGroups = () => {
  return useMemo(() => {
    const groupedComponents = components.reduce(
      (acc, category) => {
        const group = category.group || 'Ungrouped';
        if (!acc[group]) acc[group] = [];
        acc[group].push(category);
        return acc;
      },
      {} as Record<string, ComponentCategory[]>,
    );

    const sortedGroups = Object.entries(groupedComponents).sort(([a], [b]) =>
      a === 'Ungrouped' ? -1 : b === 'Ungrouped' ? 1 : a.localeCompare(b),
    );

    return sortedGroups;
  }, []);
};

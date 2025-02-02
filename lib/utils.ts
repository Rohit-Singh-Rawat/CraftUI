import registry from '@/registry.json';
import { type ClassValue, clsx } from 'clsx';
import type { RegistryItem } from 'shadcn/registry';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const components = registry.items as unknown as RegistryItem[];

export const getComponentsByNames = (names: string[]): RegistryItem[] => {
  const componentsMap = new Map(components.map((comp) => [comp.name, comp]));
  console.log(componentsMap, names);
  return names
    .map((name) => componentsMap.get(name))
    .filter((comp): comp is RegistryItem => comp !== undefined);
};
// export const convertRegistryPaths = (content: string): string => {
//   return content
//     .replace(/@\/registry\/default\/ui/g, "@/components/ui")
//     .replace(/@\/registry\/default\/compositions/g, "@/components")
//     .replace(/@\/registry\/default\/hooks/g, "@/hooks")
//     .replace(/@\/registry\/default\/lib/g, "@/lib");
// };

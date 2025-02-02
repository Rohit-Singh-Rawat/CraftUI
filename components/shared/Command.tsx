'use client';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Circle, Grid, MessageSquarePlus, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import * as React from 'react';
import Search from '../icons/Search';
import { useComponentGroups } from './leftSideBar/useComponentGroups';

export function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const sortedGroups = useComponentGroups();
  const { setTheme, theme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex cursor-pointer items-center gap-3 rounded-md border border-black/10 bg-gray-100/60 p-1 px-3 text-muted-foreground text-sm transition-colors hover:bg-gray-100 hover:text-foreground max-sm:hidden dark:border-white/10 dark:bg-zinc-950/60 dark:hover:bg-zinc-950"
      >
        <Search className="size-6" />
        <span className="hidden lg:inline">Search Components</span>
        <kbd className="pointer-events-none ml-2 inline-flex h-5 select-none items-center gap-1 rounded border border-black/10 bg-gray-100 px-1.5 font-medium font-mono text-[10px] text-muted-foreground opacity-100 dark:border-white/10 dark:bg-zinc-900 dark:text-gray-300">
          <span className="text-xs">⌘</span>
          <span>K</span>
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a component name..." />
        <CommandList>
          <CommandEmpty>No components found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem asChild onSelect={() => setOpen(false)}>
              <Link
                href="/components"
                className="flex w-full cursor-pointer items-center"
              >
                <Grid className="mr-2 h-4 w-4" />
                <span>View All Components</span>
              </Link>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                window.open(
                  'https://github.com/Rohit-Singh-Rawat/CraftUI/issues/new?assignees=&labels=component+request&template=component_request.md&title=%5BComponent+Request%5D',
                  '_blank',
                )
              }
            >
              <MessageSquarePlus className="mr-2 h-4 w-4" />
              <span>Request a Component</span>
            </CommandItem>
            <CommandItem
              onSelect={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <Sun className="mr-2 h-4 w-4" />
              ) : (
                <Moon className="mr-2 h-4 w-4" />
              )}
              <span>
                {theme === 'dark'
                  ? 'Switch to Light Mode'
                  : 'Switch to Dark Mode'}
              </span>
            </CommandItem>
          </CommandGroup>
          {sortedGroups.map(([groupName, components]) => (
            <CommandGroup key={groupName} heading={groupName}>
              {components.map((item) => (
                <CommandItem
                  key={item.name}
                  asChild
                  onSelect={() => {
                    setOpen(false);
                  }}
                >
                  <Link
                    href={`/components/${item.slug}`}
                    className="flex w-full cursor-pointer items-center"
                  >
                    <Circle className="mr-2 h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}

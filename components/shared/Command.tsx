'use client';

import { Calendar, Mail, Rocket, Settings, Smile, User } from 'lucide-react';
import * as React from 'react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';

import Search from '../icons/Search';

export function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false);

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
        className="flex items-center gap-3 rounded-md border border-black/10 bg-gray-100/60 p-1 px-3 text-muted-foreground text-sm transition-colors hover:bg-gray-100 hover:text-foreground dark:border-white/10 dark:bg-zinc-950/60 dark:hover:bg-zinc-950"
      >
        <Search className="size-6" />
        Search Components{' '}
        <kbd className="pointer-events-none ml-2 inline-flex h-5 select-none items-center gap-1 rounded border border-black/10 bg-gray-100 px-1.5 font-medium font-mono text-[10px] text-muted-foreground opacity-100 dark:border-white/10 dark:bg-zinc-900 dark:text-gray-300">
          <span className="text-xs">⌘</span>
          <span>K</span>
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar className="mr-2 size-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile className="mr-2 size-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Rocket className="mr-2 size-4" />
              <span>Launch</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User className="mr-2 size-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Mail className="mr-2 size-4" />
              <span>Mail</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 size-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
        <CommandSeparator />
        <CommandGroup heading="Bottom">
          <CommandItem>
            {/* <ArrowDown className="mr-2 size-4" /> */}
            <span>Scroll to Bottom</span>
            <CommandShortcut>⌘↓</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandDialog>
    </>
  );
}

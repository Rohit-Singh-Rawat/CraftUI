"use client";

import React from "react";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  BraveSearch,
  type SearchResult,
} from "@/craft/components/brave-search";
import {
  Cancel01Icon,
  Mail01Icon,
  AtIcon,
  Bookmark01Icon,
  Settings01Icon,
  MoreHorizontalIcon,
} from "@hugeicons/core-free-icons";

const TABS = [
  { icon: Cancel01Icon, label: "Close" },
  { icon: Mail01Icon, label: "Email" },
  { icon: AtIcon, label: "Mentions" },
  { icon: Bookmark01Icon, label: "Bookmarks" },
  { icon: Settings01Icon, label: "Settings" },
  { icon: MoreHorizontalIcon, label: "More" },
] as const;

const SEARCH_RESULTS: SearchResult[] = [
  {
    id: 1,
    title: "Getting Started with Brave",
    description: "Learn the basics of using Brave Search",
    category: "Documentation",
  },
  {
    id: 2,
    title: "Advanced Search Techniques",
    description: "Master powerful search operators and filters",
    category: "Tutorial",
  },
  {
    id: 3,
    title: "Keyboard Shortcuts",
    description: "Speed up your workflow with shortcuts",
    category: "Tips",
  },
  {
    id: 4,
    title: "Integration Guide",
    description: "Connect Brave with your favorite tools",
    category: "Documentation",
  },
  {
    id: 5,
    title: "Privacy & Security",
    description: "How we keep your data safe",
    category: "Legal",
  },
  {
    id: 6,
    title: "API Reference",
    description: "Build custom integrations with our API",
    category: "Developer",
  },
  {
    id: 7,
    title: "Release Notes v2.0",
    description: "See what's new in the latest update",
    category: "News",
  },
  {
    id: 8,
    title: "Community Forum",
    description: "Join discussions with other users",
    category: "Community",
  },
];

const BOTTOM_CARDS = [
  { id: 1, title: "Analytics", description: "View your stats" },
  { id: 2, title: "Reports", description: "Weekly summary" },
  { id: 3, title: "Activity", description: "Recent actions" },
  { id: 4, title: "Help Center", description: "Get support" },
];

interface TabButtonProps {
  icon: IconSvgElement;
  label: string;
}

function TabButton({ icon, label }: TabButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex flex-col items-center gap-1"
    >
      <span className="size-14 backdrop-blur-md rounded-xl flex items-center justify-center cursor-pointer transition-[colors,transform] duration-200 ease-out hover:scale-105 active:scale-[0.96] bg-muted-foreground/10 hover:bg-muted-foreground/20">
        <HugeiconsIcon
          icon={icon}
          className="size-5 text-foreground"
          aria-hidden="true"
        />
      </span>
      <span className="text-sm text-foreground">{label}</span>
    </button>
  );
}

function Tabs({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3  z-10 mx-auto justify-center">
      {children}
    </div>
  );
}

function BottomCards({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
      {children}
    </div>
  );
}

function BottomCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-background/80 backdrop-blur-md rounded-xl border border-border/50 p-4 w-40 transition-colors duration-150 ease-out cursor-pointer shadow-sm hover:bg-muted/50">
      <p className="text-foreground text-sm font-medium">{title}</p>
      <p className="text-muted-foreground text-xs mt-1">{description}</p>
    </div>
  );
}

function SearchResultsWrapper() {
  const { searchQuery } = BraveSearch.useSearchContext();

  const filteredResults = React.useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase().trim();
    if (!normalizedQuery) return [];

    return SEARCH_RESULTS.filter(
      (result) =>
        result.title.toLowerCase().includes(normalizedQuery) ||
        result.description.toLowerCase().includes(normalizedQuery) ||
        (result.category &&
          result.category.toLowerCase().includes(normalizedQuery)),
    ).slice(0, 4);
  }, [searchQuery]);

  return <BraveSearch.Results results={filteredResults} />;
}

export default function BraveSearchDemo() {
  return (
    <div className="flex h-full min-h-[600px] w-full items-center justify-center">
      <BraveSearch.Root>
        <BraveSearch.Background className="m-2">
          <Tabs>
            {TABS.map((tab) => (
              <TabButton key={tab.label} icon={tab.icon} label={tab.label} />
            ))}
          </Tabs>
          <BottomCards>
            {BOTTOM_CARDS.map((card) => (
              <BottomCard
                key={card.id}
                title={card.title}
                description={card.description}
              />
            ))}
          </BottomCards>
        </BraveSearch.Background>

        <BraveSearch.Main className="mt-24 ">
          <BraveSearch.SearchBar />
          <SearchResultsWrapper />
        </BraveSearch.Main>
      </BraveSearch.Root>
    </div>
  );
}

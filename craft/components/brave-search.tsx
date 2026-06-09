"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";
import { Search01Icon, PokemonIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";

interface SearchContextType {
  isSearchFocused: boolean;
  setIsSearchFocused: (focused: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function useSearchContext(): SearchContextType {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      "Search compound components must be used within BraveSearch.Root",
    );
  }
  return context;
}

export interface SearchResult {
  id: number | string;
  title: string;
  description: string;
  category?: string;
}

interface RootProps {
  children: ReactNode;
}

function Root({ children }: RootProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const value: SearchContextType = {
    isSearchFocused,
    setIsSearchFocused,
    searchQuery,
    setSearchQuery,
    inputRef,
  };

  return (
    <SearchContext.Provider value={value}>
      <div
        className="pointer-events-none fixed inset-0 z-40 bg-black/5 transition-opacity duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-[visible=false]:opacity-0 data-[visible=true]:opacity-100 dark:bg-black/40"
        data-visible={isSearchFocused}
        aria-hidden="true"
      />
      <div
        className="relative z-50 flex h-full min-h-[600px] w-full flex-col items-center overflow-hidden p-6 [&[data-focused=true]_.search-wrapper]:max-w-lg [&[data-focused=true]_.search-wrapper]:[inset-block-start:12vh] [&[data-focused=false]_.search-wrapper]:top-0 [&[data-focused=false]_.search-wrapper]:max-w-sm"
        data-focused={isSearchFocused}
      >
        {children}
      </div>
    </SearchContext.Provider>
  );
}

interface BackgroundProps {
  children: ReactNode;
  className?: string;
}

function Background({ children, className }: BackgroundProps) {
  const { isSearchFocused } = useSearchContext();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        prefersReducedMotion
          ? "absolute inset-0 data-[hidden=true]:pointer-events-none data-[hidden=true]:opacity-0 data-[hidden=false]:opacity-100 data-[hidden=false]:pointer-events-auto"
          : "absolute inset-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-[hidden=true]:opacity-0 data-[hidden=true]:scale-95 data-[hidden=true]:pointer-events-none data-[hidden=false]:opacity-100 data-[hidden=false]:scale-100 data-[hidden=false]:pointer-events-auto",
        className,
      )}
      data-hidden={isSearchFocused}
      aria-hidden={isSearchFocused}
    >
      {children}
    </div>
  );
}

interface MainProps {
  children: ReactNode;
  className?: string;
}

function Main({ children, className }: MainProps) {
  return (
    <div
      className={cn(
        "search-wrapper relative z-10 mx-auto mb-auto w-full overflow-hidden rounded-xl border border-border/50 bg-background backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.05)] transition-[opacity,transform,box-shadow] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_0_25px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_0_40px_rgba(0,0,0,0.6)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface SearchBarProps {
  placeholder?: string;
}

function SearchBar({ placeholder = "Ask Brave Search" }: SearchBarProps) {
  const {
    isSearchFocused,
    setIsSearchFocused,
    searchQuery,
    setSearchQuery,
    inputRef,
  } = useSearchContext();

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleContainerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      inputRef.current?.focus();
    }
  };

  return (
    <div
      className="flex w-full items-center gap-3 px-5 py-2.5 [&[data-focused=false]_.search-icon]:opacity-0 [&[data-focused=true]_.search-icon]:opacity-100"
      data-focused={isSearchFocused}
      onClick={handleContainerClick}
      onKeyDown={handleContainerKeyDown}
      role="search"
      tabIndex={0}
    >
      <HugeiconsIcon icon={PokemonIcon} className="size-5 text-yellow-600" />
      <input
        ref={inputRef}
        type="search"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 bg-transparent text-foreground placeholder-muted-foreground outline-none text-base"
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
        aria-label={placeholder}
      />
      <HugeiconsIcon
        icon={Search01Icon}
        className="search-icon size-5 text-muted-foreground transition-opacity duration-200 ease-out"
        aria-hidden="true"
      />
    </div>
  );
}

const infinitePromise = new Promise<never>(() => {});

function Suspend() {
  React.use(infinitePromise);
  return null;
}

interface FreezeProps {
  frozen: boolean;
  children: ReactNode;
}

function Freeze({ frozen, children }: FreezeProps) {
  return (
    <React.Suspense fallback={null}>
      {frozen && <Suspend />}
      {children}
    </React.Suspense>
  );
}

interface ResultsProps {
  results: SearchResult[];
}

function Results({ results }: ResultsProps) {
  const { isSearchFocused, searchQuery } = useSearchContext();
  const prefersReducedMotion = useReducedMotion();

  const hasQuery = searchQuery.trim().length > 0;
  const isVisible = isSearchFocused && hasQuery;

  return (
    <div
      className={cn(
        "w-full overflow-hidden data-[visible=true]:border-t data-[visible=true]:border-border/50",
        prefersReducedMotion
          ? "data-[visible=true]:opacity-100 data-[visible=true]:pointer-events-auto data-[visible=false]:opacity-0 data-[visible=false]:pointer-events-none"
          : "transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-[visible=true]:opacity-100 data-[visible=true]:blur-none data-[visible=true]:pointer-events-auto data-[visible=false]:opacity-0 data-[visible=false]:blur-sm data-[visible=false]:pointer-events-none data-[visible=false]:scale-95",
      )}
      data-visible={isVisible}
      role="listbox"
      aria-label="Search results"
      aria-hidden={!isVisible}
    >
      <Freeze frozen={!isVisible}>
        <div className="overflow-hidden">
          {results.length > 0 ? (
            <ul className="divide-y divide-border/50" role="group">
              {results.map((result) => (
                <li key={result.id} role="option" aria-selected={false}>
                  <button
                    type="button"
                    className="w-full px-5 py-3 text-left hover:bg-muted/50 transition-colors duration-150 ease-out active:scale-[0.99]"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground text-sm font-medium truncate">
                          {result.title}
                        </p>
                        <p className="text-muted-foreground text-xs truncate mt-0.5">
                          {result.description}
                        </p>
                      </div>
                      {result.category && (
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md shrink-0">
                          {result.category}
                        </span>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-5 py-8 text-center">
              <p className="text-muted-foreground text-sm">
                No results found for "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </Freeze>
    </div>
  );
}

export const BraveSearch = {
  Root,
  Background,
  Main,
  SearchBar,
  Results,
  useSearchContext,
};

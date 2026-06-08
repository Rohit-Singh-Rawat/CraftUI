"use client";

import React, { useState, useRef } from "react";

const ITEMS = [
  "Getting Started",
  "Advanced Techniques",
  "Keyboard Shortcuts",
  "Integration Guide",
  "Privacy & Security",
  "API Reference",
  "Release Notes",
  "Community Forum",
];

// Minimal search + animated results — NO Freeze applied.
// Reproduce the glitch: type a query, then delete all the characters.
// Watch how the "No results found" text snaps in BEFORE the box finishes
// fading out. Two conflicting visual updates on the same frame.
export default function SearchGlitchDemo() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = React.useMemo(() => {
    if (!query.trim()) return [];
    return ITEMS.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase()),
    ).slice(0, 4);
  }, [query]);

  const isVisible = focused && query.trim().length > 0;

  return (
    <div className="w-full max-w-sm mx-auto py-16 flex flex-col items-center gap-2 relative">
      {/* Search input */}
      <div
        onClick={() => inputRef.current?.focus()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.focus()}
        className="w-full flex items-center gap-2 px-4 py-2.5 bg-background border border-border/60 rounded-xl shadow-sm cursor-text"
      >
        <svg className="size-4 text-muted-foreground shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search…"
          className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="text-muted-foreground hover:text-foreground text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm active:scale-[0.96] transition-[colors,transform]"
          >
            ✕
          </button>
        )}
      </div>

      {/* Animated results — NO Freeze */}
      <div
        className="absolute top-[calc(100%-3.5rem)] z-10 w-full transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-[visible=true]:opacity-100 data-[visible=true]:scale-100 data-[visible=true]:pointer-events-auto data-[visible=false]:opacity-0 data-[visible=false]:scale-95 data-[visible=false]:pointer-events-none"
        data-visible={isVisible}
      >
        <div className="bg-background border border-border/50 rounded-xl shadow-lg overflow-hidden mt-1">
          {results.length > 0 ? (
            <ul className="divide-y divide-border/30">
              {results.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
              No results found for &quot;{query}&quot;
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

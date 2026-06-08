"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { ActionBarProvider } from "@/craft/components/action-bar";

function ThemeSwitchGuard({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [isSwitching, setIsSwitching] = React.useState(false);

  React.useEffect(() => {
    setIsSwitching(true);
    const timer = window.setTimeout(() => setIsSwitching(false), 0);
    return () => window.clearTimeout(timer);
  }, [resolvedTheme]);

  return (
    <div data-theme-switching={isSwitching ? "" : undefined}>{children}</div>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme
    >
      <ThemeSwitchGuard>
        <ActionBarProvider mode="dock">{children}</ActionBarProvider>
      </ThemeSwitchGuard>
    </NextThemesProvider>
  );
}

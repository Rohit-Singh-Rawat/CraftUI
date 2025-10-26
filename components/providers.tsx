'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ActionBarProvider } from '@/components/craft/action-bar';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NextThemesProvider
			attribute='class'
			defaultTheme='system'
			enableSystem
			enableColorScheme
		>
			<ActionBarProvider mode='dock'>{children}</ActionBarProvider>
		</NextThemesProvider>
	);
}

'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ActionBarProvider } from '@/craft/components/action-bar';
import { TooltipProvider } from './ui/tooltip';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<TooltipProvider skipDelayDuration={600}>
			<NextThemesProvider
				attribute='class'
				defaultTheme='system'
				enableSystem
				enableColorScheme
			>
				<ActionBarProvider mode='dock'>{children}</ActionBarProvider>
			</NextThemesProvider>{' '}
		</TooltipProvider>
	);
}

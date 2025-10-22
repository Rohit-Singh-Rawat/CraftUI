'use client';

import * as React from 'react';
import { cn } from '@craft/ui/lib/utils';

interface PreviewPanelProps {
	children: React.ReactNode;
	className?: string;
	isMaximized?: boolean;
}

export function PreviewPanel({ children, className, isMaximized = false }: PreviewPanelProps) {
	return (
		<section
			data-maximized={isMaximized}
			className={cn(
				'relative z-[12]  grid min-h-[100dvh] grid-cols-1 flex-col items-center justify-center p-3',
				'transition-all duration-300 ease-in-out',
				'w-full lg:flex',
				'data-[maximized=true]:lg:w-1/2',
				className
			)}
		>
			<div className='bg-muted h-full w-full rounded-3xl'>
				<div className='relative flex h-full w-full flex-col p-6'>{children}</div>
			</div>
		</section>
	);
}

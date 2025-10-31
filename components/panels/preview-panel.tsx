'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface PreviewPanelProps {
	children: React.ReactNode;
	className?: string;
	isMaximized?: boolean;
	side?: 'left' | 'right';
}

export function PreviewPanel({
	children,
	className,
	isMaximized = false,
	side = 'left',
}: PreviewPanelProps): React.ReactElement {
	return (
		<section
			data-maximized={isMaximized}
			className={cn(
				'relative z-12 grid h-full min-h-dvh grid-cols-1 flex-col items-center justify-center p-3',
				'transition-all duration-300 ease-in-out',
				'w-full lg:flex',
				side === 'left' ? 'lg:ml-0' : 'lg:mr-0',
				'data-[maximized=true]:lg:w-1/2',
				className
			)}
		>
			<div className='bg-muted h-full w-full rounded-3xl overflow-hidden'>
				<div className='relative flex h-full w-full flex-col p-6'>{children}</div>
			</div>
		</section>
	);
}

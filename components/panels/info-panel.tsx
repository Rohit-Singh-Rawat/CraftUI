'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface InfoPanelProps {
	children: React.ReactNode;
	className?: string;
	isMaximized?: boolean;
	side?: 'left' | 'right';
}

export function InfoPanel({
	children,
	className,
	isMaximized = false,
	side = 'right',
}: InfoPanelProps): React.ReactElement {
	return (
		<div
			data-maximized={isMaximized}
			className={cn(
				'bg-background top-0 flex h-full flex-col justify-end  rounded-2xl px-4',
				'transition-all duration-300 ease-in-out',
				'lg:fixed lg:h-screen lg:w-[calc(50%-3rem)]',
				side === 'left' ? 'left-0 lg:left-20' : 'right-0 lg:right-0',
				'z-1',
				className
			)}
		>
			<div
				className={cn(
					'relative h-full w-full',
					'data-[maximized=false]:lg:overflow-x-hidden data-[maximized=false]:lg:overflow-y-scroll',
					'data-[maximized=true]:overflow-hidden'
				)}
				data-maximized={isMaximized}
			>
				{children}
			</div>
		</div>
	);
}

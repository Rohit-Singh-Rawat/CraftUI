'use client';

import * as React from 'react';
import { cn } from '@craft/ui/lib/utils';

interface InfoPanelProps {
	children: React.ReactNode;
	className?: string;
	isMaximized?: boolean;
}

export function InfoPanel({ children, className, isMaximized = false }: InfoPanelProps) {
	return (
		<div
			data-maximized={isMaximized}
			className={cn(
				'bg-background left-0 top-0 flex h-full flex-col justify-end rounded-2xl px-4',
				'transition-all duration-300 ease-in-out',
				'lg:fixed lg:h-screen lg:w-1/2 lg:left-20',
				'z-[1]',
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

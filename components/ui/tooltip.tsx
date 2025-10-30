'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps {
	children: React.ReactNode;
	content: string;
	side?: 'top' | 'right' | 'bottom' | 'left';
}

export function Tooltip({ children, content, side = 'right' }: TooltipProps) {
	const [isVisible, setIsVisible] = React.useState(false);

	const sideClasses = {
		top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
		right: 'left-full top-1/2 -translate-y-1/2 ml-2',
		bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
		left: 'right-full top-1/2 -translate-y-1/2 mr-2',
	};

	const arrowClasses = {
		top: 'top-full left-1/2 -translate-x-1/2 border-t-border border-l-transparent border-r-transparent border-b-transparent',
		right:
			'left-0 top-1/2 -translate-y-1/2 border-r-border border-t-transparent border-b-transparent border-l-transparent',
		bottom:
			'bottom-full left-1/2 -translate-x-1/2 border-b-border border-l-transparent border-r-transparent border-t-transparent',
		left: 'right-0 top-1/2 -translate-y-1/2 border-l-border border-t-transparent border-b-transparent border-r-transparent',
	};

	return (
		<div
			className='relative inline-block'
			onMouseEnter={() => setIsVisible(true)}
			onMouseLeave={() => setIsVisible(false)}
		>
			{children}
			{isVisible && (
				<div
					className={cn(
						'absolute z-50 px-2 py-1 text-xs font-medium text-popover-foreground bg-popover border rounded-md shadow-md whitespace-nowrap pointer-events-none',
						sideClasses[side]
					)}
				>
					{content}
					<div className={cn('absolute w-0 h-0 border-4', arrowClasses[side])} />
				</div>
			)}
		</div>
	);
}

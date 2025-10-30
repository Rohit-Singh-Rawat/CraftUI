'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export interface PanelButtonConfig {
	id: string;
	icon: React.ReactNode;
	tooltip: string;
	onClick: () => void;
	active?: boolean;
}

interface PanelButtonsProps {
	buttons: PanelButtonConfig[];
	className?: string;
	side?: 'left' | 'right';
}

export function PanelButtons({
	buttons,
	className,
	side = 'left',
}: PanelButtonsProps): React.ReactElement {
	return (
		<div
			className={cn(
				'absolute top-16 z-30 flex flex-col',
				side === 'left' ? 'right-0' : 'left-4',
				className
			)}
		>
			{buttons.map((button, index) => (
				<Tooltip key={button.id}>
					<TooltipTrigger asChild>
						<motion.button
							onClick={button.onClick}
							data-first={index === 0}
							data-last={index === buttons.length - 1}
							className={cn(
								'panel-button bg-background p-2.5 cursor-pointer shadow-none backdrop-blur-sm transition-colors ',
								button.active && 'bg-background/90',
								index === 0 && 'rounded-tl-xl',
								index === buttons.length - 1 && 'rounded-bl-xl',
								index !== 0 && index !== buttons.length - 1 && 'rounded-none'
							)}
							aria-label={button.tooltip}
						>
							{button.icon}
						</motion.button>
					</TooltipTrigger>
					<TooltipContent side={side === 'left' ? 'right' : 'left'}>
						<p>{button.tooltip}</p>
					</TooltipContent>
				</Tooltip>
			))}
		</div>
	);
}

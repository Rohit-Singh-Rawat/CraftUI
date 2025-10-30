'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowShrink01Icon, ArrowExpand01Icon } from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';

interface PanelToggleButtonProps {
	isMaximized: boolean;
	onToggle: () => void;
	className?: string;
	side?: 'left' | 'right';
}

export function PanelToggleButton({
	isMaximized,
	onToggle,
	className,
	side = 'left',
}: PanelToggleButtonProps): React.ReactElement {
	return (
		<motion.button
			onClick={onToggle}
			className={cn(
				'absolute top-16 z-30 panel-toggle-button panel-button rounded-l-xl bg-background p-2.5 shadow-none backdrop-blur-sm transition-colors hover:bg-background/90',
				side === 'left' ? 'right-0' : 'left-4',
				className
			)}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			aria-label={isMaximized ? 'Show side panel' : 'Hide side panel'}
		>
			<motion.div
				initial={false}
				animate={{ rotate: isMaximized ? 180 : 0 }}
				transition={{ duration: 0.3, ease: 'easeInOut' }}
			>
				<HugeiconsIcon
					icon={isMaximized ? ArrowShrink01Icon : ArrowExpand01Icon}
					size={20}
					color='currentColor'
					strokeWidth={1.5}
				/>
			</motion.div>
		</motion.button>
	);
}

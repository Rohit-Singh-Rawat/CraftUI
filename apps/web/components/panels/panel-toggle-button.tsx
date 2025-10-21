'use client';

import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowShrink01Icon, ArrowExpand01Icon } from '@hugeicons/core-free-icons';
import { cn } from '@craft/ui/lib/utils';

interface PanelToggleButtonProps {
	isMaximized: boolean;
	onToggle: () => void;
	className?: string;
}

export function PanelToggleButton({ isMaximized, onToggle, className }: PanelToggleButtonProps) {
	return (
		<motion.button
			onClick={onToggle}
			className={cn(
				'absolute right-4 top-4 z-30 rounded-xl bg-background/80 p-2.5 shadow-lg backdrop-blur-sm transition-colors hover:bg-background/90',
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

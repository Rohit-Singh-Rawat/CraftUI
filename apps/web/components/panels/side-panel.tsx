'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@craft/ui/lib/utils';
import { useMobile } from '@craft/ui/hooks/useMobile';

interface SidePanelProps {
	children: React.ReactNode;
	className?: string;
	isVisible?: boolean;
}

export function SidePanel({ children, className, isVisible = false }: SidePanelProps) {
	const isMobile = useMobile();

	return (
		<AnimatePresence mode='wait'>
			{isVisible && (
				<motion.aside
					initial={{
						opacity: 0,
						y: isMobile ? 100 : 0,
						x: isMobile ? 0 : 100,
						height: isMobile ? 0 : 'auto',
					}}
					animate={{
						opacity: 1,
						y: 0,
						x: 0,
						height: 'auto',
					}}
					exit={{
						opacity: 0,
						y: isMobile ? 100 : 0,
						x: isMobile ? 0 : 100,
						height: isMobile ? 0 : 'auto',
					}}
					transition={{
						duration: 0.4,
						ease: [0.4, 0, 0.2, 1],
					}}
					className={cn(
						'relative z-[12] flex min-h-[40dvh] flex-col rounded-3xl bg-secondary p-6',
						'w-full md:min-h-[100dvh] md:w-1/2',
						className
					)}
				>
					{children}
				</motion.aside>
			)}
		</AnimatePresence>
	);
}

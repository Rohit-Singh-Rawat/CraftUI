'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@craft/ui/lib/utils';
import { useMobile } from '@craft/ui/hooks/useMobile';

interface ContentPanelProps {
	children: React.ReactNode;
	className?: string;
	isCollapsed?: boolean;
}

export function ContentPanel({ children, className, isCollapsed = false }: ContentPanelProps) {
	const isMobile = useMobile();

	return (
		<motion.section
			layout
			className={cn(
				'relative z-10 flex min-h-[50dvh] flex-col rounded-3xl bg-secondary p-6',
				'w-full transition-all duration-300 ease-in-out',
				'md:min-h-[100dvh]',
				className
			)}
			initial={false}
			animate={{
				width: isMobile ? '100%' : isCollapsed ? '50%' : '100%',
			}}
			transition={{
				duration: 0.4,
				ease: [0.4, 0, 0.2, 1],
			}}
		>
			{children}
		</motion.section>
	);
}

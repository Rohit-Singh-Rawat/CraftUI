'use client';

import * as React from 'react';
import { Ghost } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function AnimatedGhostIcon() {
	return (
		<div
			data-slot='empty-media'
			data-variant='icon'
			className={cn('relative mb-6')}
		>
			<motion.div
				className={cn(
					'relative flex size-9 shrink-0 items-center justify-center rounded-md border bg-card text-foreground shadow-sm shadow-black/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-md)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/8%)]',
					'pointer-events-none absolute bottom-px origin-bottom-left -translate-x-0.5 scale-84'
				)}
				initial={{ rotate: 0 }}
				animate={{ rotate: -10 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				aria-hidden='true'
			/>
			<motion.div
				className={cn(
					'relative flex size-9 shrink-0 items-center justify-center rounded-md border bg-card text-foreground shadow-sm shadow-black/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-md)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/8%)]',
					'pointer-events-none absolute bottom-px origin-bottom-right translate-x-0.5 scale-84'
				)}
				initial={{ rotate: 0 }}
				animate={{ rotate: 10 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				aria-hidden='true'
			/>
			<div
				className={cn(
					'relative flex size-9 shrink-0 items-center justify-center p-1.5 rounded-md border bg-card text-foreground shadow-sm shadow-black/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-md)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/8%)]'
				)}
			>
				<Ghost className='h-16 w-16 text-muted-foreground stroke-1' />
			</div>
		</div>
	);
}


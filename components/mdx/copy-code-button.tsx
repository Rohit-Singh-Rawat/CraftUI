'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { Tick02Icon } from '@hugeicons/core-free-icons';
import CopyIcon from '@/components/icons/copy';
import { cn } from '@/lib/utils';

interface CopyCodeButtonProps {
	code: string;
	className?: string;
}

export function CopyCodeButton({ code, className }: CopyCodeButtonProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<button
			onClick={handleCopy}
			className={cn(
				'flex items-center justify-center rounded-md p-2 group transition-colors bg-muted hover:bg-muted/80 border border-border relative',
				copied ? 'text-green-600' : '',
				className
			)}
			aria-label={copied ? 'Copied!' : 'Copy code'}
		>
			<AnimatePresence mode='popLayout'>
				{copied ? (
					<motion.div
						key='tick'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, filter: 'blur(6px)' }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
					>
						<HugeiconsIcon
							icon={Tick02Icon}
							size={16}
							strokeWidth={1.5}
							className='text-primary'
						/>
					</motion.div>
				) : (
					<motion.div
						key='copy'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, filter: 'blur(4px)' }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
					>
						<CopyIcon className='group-hover:text-primary transition-all duration-300 text-muted-foreground size-4 stroke-[1.5] relative' />
					</motion.div>
				)}
			</AnimatePresence>
		</button>
	);
}


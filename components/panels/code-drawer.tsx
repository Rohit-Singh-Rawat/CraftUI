'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { Copy01Icon, Download01Icon, Cancel01Icon } from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';

interface CodeDrawerProps {
	children: React.ReactNode;
	code: string;
	fileName?: string;
	language?: string;
	side?: 'left' | 'right';
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export function CodeDrawer({
	children,
	code,
	fileName = 'component.tsx',
	language = 'tsx',
	side = 'left',
	open: controlledOpen,
	onOpenChange,
}: CodeDrawerProps): React.ReactElement {
	const [internalOpen, setInternalOpen] = React.useState<boolean>(false);
	const isOpen: boolean = controlledOpen !== undefined ? controlledOpen : internalOpen;
	const setIsOpen: (open: boolean) => void = onOpenChange || setInternalOpen;
	const [copied, setCopied] = React.useState<boolean>(false);

	const handleCopy = async (): Promise<void> => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout((): void => setCopied(false), 2000);
	};

	const handleDownload = (): void => {
		const blob = new Blob([code], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = fileName;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	return (
		<>
			<div onClick={() => setIsOpen(true)}>{children}</div>

			<AnimatePresence>
				{isOpen && (
					<>
						{/* Mobile backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className='fixed inset-0 bg-black/50 z-50 lg:hidden'
							onClick={(): void => setIsOpen(false)}
						/>

						{/* Drawer */}
						<motion.div
							initial={{ y: '100%' }}
							animate={{ y: 0 }}
							exit={{ y: '100%' }}
							transition={{ ease: 'easeInOut', duration: 0.3 }}
							className={cn(
								'fixed z-10 flex flex-col h-dvh',
								// Mobile: drawer from bottom with padding
								'bottom-0 left-0 right-0 max-h-[85vh] rounded-t-3xl',
								// Desktop: fixed split panel
								'lg:top-0 lg:bottom-auto lg:max-h-none lg:h-dvh lg:rounded-3xl lg:p-3 lg:w-[calc(50%-3rem)]',
								side === 'left' ? 'lg:left-20 lg:right-auto' : 'lg:left-auto lg:right-0'
							)}
						>
							<div className='flex flex-col h-full bg-muted rounded-t-3xl lg:rounded-3xl shadow-2xl overflow-hidden'>
								{/* Header */}
								<div className='flex items-center justify-between border-b px-4 py-3 lg:px-6 lg:py-4 flex-shrink-0'>
								<div className='flex items-center gap-2'>
									<h2 className='text-base lg:text-lg font-semibold'>{fileName}</h2>
								</div>
								<div className='flex items-center gap-1 lg:gap-2'>
									<button
										onClick={handleCopy}
										className={cn(
											'flex items-center gap-1 lg:gap-2 rounded-md px-2 py-1.5 lg:px-3 lg:py-2 text-xs lg:text-sm font-medium transition-colors',
											'hover:bg-background/80',
											copied && 'text-green-600'
										)}
										title='Copy code'
									>
										<HugeiconsIcon
											icon={Copy01Icon}
											size={16}
											strokeWidth={1.5}
										/>
										<span className='hidden sm:inline'>{copied ? 'Copied!' : 'Copy'}</span>
									</button>
									<button
										onClick={handleDownload}
										className='flex items-center gap-1 lg:gap-2 rounded-md px-2 py-1.5 lg:px-3 lg:py-2 text-xs lg:text-sm font-medium transition-colors hover:bg-background/80'
										title='Download code'
									>
										<HugeiconsIcon
											icon={Download01Icon}
											size={16}
											strokeWidth={1.5}
										/>
										<span className='hidden sm:inline'>Download</span>
									</button>
									<button
										onClick={(): void => setIsOpen(false)}
										className='flex items-center gap-1 lg:gap-2 rounded-md px-2 py-1.5 lg:px-3 lg:py-2 text-xs lg:text-sm font-medium transition-colors hover:bg-background/80'
										title='Close'
									>
										<HugeiconsIcon
											icon={Cancel01Icon}
											size={16}
											strokeWidth={1.5}
										/>
										<span className='hidden sm:inline'>Close</span>
									</button>
								</div>
							</div>

							{/* Code Content */}
							<div className='flex-1 overflow-auto p-4 lg:p-6'>
								<pre className='bg-background rounded-lg p-3 lg:p-4 overflow-x-auto'>
									<code className='text-xs lg:text-sm font-mono'>{code}</code>
								</pre>
							</div>
						</div>
					</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
}

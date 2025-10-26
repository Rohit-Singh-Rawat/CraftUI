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
}

export function CodeDrawer({
	children,
	code,
	fileName = 'component.tsx',
	language = 'tsx',
}: CodeDrawerProps) {
	const [isOpen, setIsOpen] = React.useState(false);
	const [copied, setCopied] = React.useState(false);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleDownload = () => {
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
					<motion.div
						initial={{ y: '100%' }}
						animate={{ y: 0 }}
						exit={{ y: '100%' }}
						transition={{ type: 'easeInOut', duration: 0.3 }}
						className='fixed top-0 left-0 p-3 pr-10 right-0 z-50 flex flex-col  lg:left-20 lg:right-auto lg:w-1/2 h-[100dvh]
						'
					>
						<div className='flex flex-col h-full bg-muted rounded-3xl shadow-2xl	'>
							{/* Header */}
							<div className='flex items-center justify-between border-b px-6 py-4'>
								<h2 className='text-lg font-semibold'>Source Code</h2>
								<div className='flex items-center gap-2'>
									<button
										onClick={handleCopy}
										className={cn(
											'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
											'hover:bg-muted',
											copied && 'text-green-600'
										)}
										title='Copy code'
									>
										<HugeiconsIcon
											icon={Copy01Icon}
											size={16}
											strokeWidth={1.5}
										/>
										{copied ? 'Copied!' : 'Copy'}
									</button>
									<button
										onClick={handleDownload}
										className='flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted'
										title='Download code'
									>
										<HugeiconsIcon
											icon={Download01Icon}
											size={16}
											strokeWidth={1.5}
										/>
										Download
									</button>
									<button
										onClick={() => setIsOpen(false)}
										className='flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted'
										title='Close'
									>
										<HugeiconsIcon
											icon={Cancel01Icon}
											size={16}
											strokeWidth={1.5}
										/>
										Close
									</button>
								</div>
							</div>

							{/* Code Content */}
							<div className='flex-1 overflow-auto p-6'>
								<pre className='bg-background rounded-lg p-4 overflow-x-auto'>
									<code className='text-sm font-mono'>{code}</code>
								</pre>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

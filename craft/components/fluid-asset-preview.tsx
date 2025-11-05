'use client';

import {
	ArrowUpRight01Icon,
	Download01Icon,
	Edit02Icon,
	Link01Icon,
	Delete02Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useId } from 'react';

interface FluidAssetPreviewProps {
	fileName: string;
	fileDate: string;
	thumbnailUrl?: string;
	fileType?: string;
	onLinkClick?: () => void;
}

export function FluidAssetPreview({
	fileName,
	fileDate,
	thumbnailUrl,
	fileType,
	onLinkClick,
}: FluidAssetPreviewProps) {
	const [isOpen, setIsOpen] = useState(false);
	const linkButtonRef = useRef<HTMLDivElement>(null);
	const uniqueId = useId();
	const layoutId = `dropdown-menu-${uniqueId}`;

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen) {
				setIsOpen(false);
			}
		};

		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [isOpen]);

	return (
		<motion.article
			className='flex items-stretch h-fit min-w-[300px]'
			role='article'
			aria-label={`File preview: ${fileName}`}
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
			transition={{ duration: 0.3, ease: 'easeInOut' }}
		>
			{/* Left side: Logo/Image */}
			<div className='flex items-center gap-3 flex-1 w-full pr-20 bg-background p-2 rounded-xl rounded-tr-none'>
				<motion.div
					className='w-12 h-12 shrink-0 bg-gray-200 rounded-md overflow-hidden'
					role='img'
					aria-label={`${fileType?.toUpperCase() || 'File'} thumbnail`}
					initial={{ opacity: 0.5, filter: 'blur(4px)' }}
					whileInView={{ opacity: 1, filter: 'blur(0px)' }}
					viewport={{ once: true }}
					transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.1 }}
				>
					{thumbnailUrl ? (
						<img
							src={thumbnailUrl}
							alt={`Thumbnail for ${fileName}`}
							className='w-full h-full object-cover'
							loading='lazy'
						/>
					) : (
						<div
							className='w-full h-full flex items-center justify-center bg-linear-to-br from-gray-400 to-gray-500'
							aria-hidden='true'
						>
							<span className='text-white text-xs font-medium'>
								{fileType?.toUpperCase() || 'FILE'}
							</span>
						</div>
					)}
				</motion.div>

				{/* File info */}
				<motion.div
					className='flex-1 min-w-0 space-y-1'
					initial={{ opacity: 0, filter: 'blur(4px)' }}
					whileInView={{ opacity: 1, filter: 'blur(0px)' }}
					viewport={{ once: true }}
					transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.15 }}
				>
					<h3
						className='text-sm font-medium text-foreground truncate'
						title={fileName}
					>
						{fileName}
					</h3>
					<time
						className='text-xs text-muted-foreground'
						dateTime={fileDate}
					>
						{fileDate}
					</time>
				</motion.div>
			</div>

			{/* Right side: Actions */}
			<div className='flex flex-col justify-between'>
				<div className='h-full w-full bg-background rounded-none  rounded-r-lg relative flex-1 after:content-[""] after:block after:w-5 after:h-5 after:absolute after:bg-transparent after:-left-[10px] after:border-l-10 after:border-l-background after:border-t-10 after:border-t-background after:rounded-tl-[20px] after:-bottom-[10px] after:[clip-path:inset(10px_0px_0px_10px)] flex-center'>
					<button
						className='h-fit cursor-pointer outline-none focus:outline-none focus-visible:outline-none text-muted-foreground relative z-40'
						aria-label={`More actions for ${fileName}`}
						aria-haspopup='menu'
						onClick={() => setIsOpen(true)}
					>
						<svg
							width='24'
							height='20'
							viewBox='0 0 24 20'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden='true'
						>
							<motion.circle
								cx='4'
								cy='10'
								r='2.5'
								fill='currentColor'
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.2 }}
							/>
							<motion.circle
								cx='12'
								cy='10'
								r='2.5'
								fill='currentColor'
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.25 }}
							/>
							<motion.circle
								cx='20'
								cy='10'
								r='2.5'
								fill='currentColor'
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.3 }}
							/>
						</svg>
					</button>
				</div>

				{/* Link button / Dropdown container */}
				<div
					ref={linkButtonRef}
					className='pt-2 pl-2 relative'
				>
					<motion.button
						className='h-8 w-8 bg-background rounded-lg cursor-pointer outline-none focus:outline-none focus-visible:outline-none flex items-center justify-center group/link-button'
						onClick={onLinkClick}
						aria-label={`Open ${fileName} in new window`}
						type='button'
						layoutId={layoutId}
						layout
						transition={{ type: 'spring', stiffness: 300, damping: 30 }}
						initial={{ opacity: 0, scale: 0.5 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						style={{ opacity: isOpen ? 0 : 1, pointerEvents: isOpen ? 'none' : 'auto' }}
					>
						<HugeiconsIcon
							icon={ArrowUpRight01Icon}
							className='h-4 w-4 stroke-2 group-hover/link-button:text-primary transition-all duration-300 transform group-hover/link-button:translate-x-0.5 group-hover/link-button:-translate-y-0.5'
							aria-hidden='true'
						/>
					</motion.button>

					<AnimatePresence mode='sync'>
						{isOpen && (
							<>
								{/* Backdrop */}
								<motion.div
									className='fixed inset-0 bg-black/20 z-40'
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.2 }}
									onClick={() => setIsOpen(false)}
									aria-hidden='true'
								/>

								{/* Dropdown menu */}
								<motion.div
									layoutId={layoutId}
									layout
									className='absolute top-2 left-2 z-50 bg-background text-foreground min-w-48 overflow-hidden rounded-xl border border-border/50 p-1 shadow-sm'
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{
										opacity: 0,
										scale: 0.3,
										backdropFilter: 'blur(10px)',
										translateY: '100px',
										animationDuration: '0.2s',
										animationTimingFunction: 'ease-in-out',
										animationFillMode: 'forwards',
									}}
									transition={{ type: 'spring', stiffness: 300, damping: 30 }}
									role='menu'
									aria-label='File actions menu'
								>
									<button
										className='w-full relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4'
										role='menuitem'
										onClick={() => setIsOpen(false)}
									>
										<HugeiconsIcon
											icon={Download01Icon}
											className='h-4 w-4'
											aria-hidden='true'
										/>
										Download
									</button>
									<button
										className='w-full relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4'
										role='menuitem'
										onClick={() => setIsOpen(false)}
									>
										<HugeiconsIcon
											icon={Edit02Icon}
											className='h-4 w-4'
											aria-hidden='true'
										/>
										Rename
									</button>
									<button
										className='w-full relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4'
										role='menuitem'
										onClick={() => setIsOpen(false)}
									>
										<HugeiconsIcon
											icon={Link01Icon}
											className='h-4 w-4'
											aria-hidden='true'
										/>
										Copy link
									</button>
									<button
										className='w-full relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none hover:bg-destructive/10 focus:bg-destructive/10 text-red-600 hover:text-red-600 focus:text-red-600 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4'
										role='menuitem'
										onClick={() => setIsOpen(false)}
									>
										<HugeiconsIcon
											icon={Delete02Icon}
											className='h-4 w-4'
											aria-hidden='true'
										/>
										Delete
									</button>
								</motion.div>
							</>
						)}
					</AnimatePresence>
				</div>
			</div>
		</motion.article>
	);
}

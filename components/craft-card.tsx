'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import type { CraftImage } from '@/diary';
import { CircleIcon, SquareIcon, TriangleIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

interface CraftCardProps {
	slug: string;
	title: string;
	image?: CraftImage;
}

export function CraftCard({ slug, title, image }: CraftCardProps) {
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<Link
			href={`/crafts/${slug}`}
			className='group relative flex min-w-0 flex-1 flex-col bg-muted/50 bg-clip-padding before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:shadow-[0_1px_2px_1px_theme(--color-black/4%)] after:pointer-events-none after:absolute after:-inset-[5px] after:-z-1 after:rounded-[calc(var(--radius-2xl)+4px)] after:border after:border-border/50 after:bg-clip-padding max-lg:before:hidden lg:rounded-2xl lg:border dark:after:bg-background/72'
		>
			<div className='-m-px border bg-background  before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)]  lg:rounded-t-2xl lg:rounded-b-xl  dark:before:shadow-[0_-1px_theme(--color-white/8%)] overflow-hidden'>
				<div className='aspect-video bg-background rounded-xl overflow-hidden relative '>
					{image && mounted ? (
						<Image
							src={resolvedTheme === 'dark' ? image.dark : image.light}
							alt={title}
							fill
							loading='lazy'
							className='object-cover'
						/>
					) : (
						<div className='flex h-full w-full items-center justify-center bg-background flex-col gap-2'>
							<div className='flex items-center justify-center gap-2 text-muted-foreground/50'>
								<HugeiconsIcon
									icon={TriangleIcon}
									size={24}
									fill='currentColor'
								/>
								<HugeiconsIcon
									icon={CircleIcon}
									size={24}
									fill='currentColor'
								/>
								<HugeiconsIcon
									icon={SquareIcon}
									size={24}
									fill='currentColor'
								/>
							</div>
						</div>
					)}
					{image && !mounted && (
						<div className='absolute inset-0 flex items-center justify-center bg-background'>
							<div className='h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground/20 border-t-muted-foreground' />
						</div>
					)}
				</div>
			</div>
			<div className='px-4 py-4 lg:rounded-b-2xl lg:px-6 '>
				<h3 className='font-serif text-xl'>{title}</h3>
			</div>
		</Link>
	);
}

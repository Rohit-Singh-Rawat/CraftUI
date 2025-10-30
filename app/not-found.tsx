import * as React from 'react';
import { cn } from '@/lib/utils';
import { AnimatedGhostIcon } from '@/components/not-found/animated-ghost-icon';
import { NotFoundActions } from '@/components/not-found/not-found-actions';

interface NotFound404Props {
	title?: string;
	description?: string;
	className?: string;
}

export default function NotFound404({
	title = 'Page Not Found',
	description = "The page you're looking for doesn't exist. It may have been moved or deleted.",
	className,
}: NotFound404Props) {
	return (
		<div
			className={cn(
				'relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center px-6',
				className
			)}
		>
			<div
				data-slot='empty'
				className={cn(
					'flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-xl border-dashed p-6 text-center text-balance md:p-12'
				)}
			>
				<div
					data-slot='empty-header'
					className={cn('flex max-w-sm flex-col items-center text-center')}
				>
					<AnimatedGhostIcon />
					<div
						data-slot='empty-title'
						className={cn(
							'font-heading text-xl leading-none',
							'text-4xl font-normal  bg-linear-to-r from-primary via-primary/80 to-blue-500 bg-clip-text text-transparent'
						)}
					>
						404
					</div>
					<div
						data-slot='empty-description'
						className={cn(
							'text-sm/relaxed font-light  text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary [[data-slot=empty-title]+&]:mt-1',
							'text-lg'
						)}
					>
						{description}
					</div>
				</div>
				<div
					data-slot='empty-content'
					className={cn(
						'flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance'
					)}
				>
					<NotFoundActions />
				</div>
			</div>
		</div>
	);
}

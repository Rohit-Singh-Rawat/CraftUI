'use client';

import * as React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Loading03Icon } from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';
import { ComponentLoader } from '@/components/preview/component-loader';
import { usePanel } from '@/components/panels/panel-context';
import type { RegistryItem } from '@/lib/registry';

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
	name: string;
	component?: RegistryItem;
	align?: 'center' | 'start' | 'end';
	description?: string;
}

export function ComponentPreview({
	name,
	component: providedComponent,
	className,
	align = 'center',
	description,
	...props
}: ComponentPreviewProps): React.ReactElement {
	const [previewKey, setPreviewKey] = React.useState<number>(0);
	const { setRestartFn } = usePanel();

	const [component] = React.useState<RegistryItem | undefined>(providedComponent);

	const handleRestart = React.useCallback((): void => {
		setPreviewKey((prev: number) => prev + 1);
	}, []);

	React.useEffect((): void => {
		setRestartFn(handleRestart);
	}, [handleRestart, setRestartFn]);

	React.useEffect((): (() => void) => {
		const handleKeyDown = (event: KeyboardEvent): void => {
			if (event.key === 'r' || event.key === 'R') {
				handleRestart();
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return (): void => window.removeEventListener('keydown', handleKeyDown);
	}, [handleRestart]);

	if (!component) {
		return (
			<div
				className={cn(
					'group relative flex flex-col h-full w-full items-center justify-center',
					className
				)}
				{...props}
			>
				<p className='text-muted-foreground'>
					Component{' '}
					<code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm'>
						{name}
					</code>{' '}
					not found in registry.
				</p>
			</div>
		);
	}

	return (
		<div
			className={cn('group relative flex flex-col h-full w-full', className)}
			{...props}
		>
			<div
				className={cn(
					'w-full flex items-center justify-center h-full overflow-scroll relative ',
					align === 'center' && 'justify-center',
					align === 'start' && 'justify-start',
					align === 'end' && 'justify-end'
				)}
			>
				<React.Suspense
					fallback={
						<div className='flex items-center justify-center w-full h-full text-sm text-muted-foreground'>
							<HugeiconsIcon
								icon={Loading03Icon}
								size={16}
								strokeWidth={1.5}
								className='animate-spin mr-2'
							/>
							Loading...
						</div>
					}
				>
					<React.Fragment key={previewKey}>
						<ComponentLoader component={component} />
					</React.Fragment>
				</React.Suspense>
			</div>
		</div>
	);
}

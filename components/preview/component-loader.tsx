'use client';

import { ComponentType } from 'react';
import dynamic from 'next/dynamic';
import { HugeiconsIcon } from '@hugeicons/react';
import { Loading03Icon } from '@hugeicons/core-free-icons';
import type { RegistryItem } from '@/lib/registry';

interface ComponentLoaderProps<TProps extends object = object> {
	component: RegistryItem;
	props?: TProps;
}

export function ComponentLoader<TProps extends object = object>({
	component,
	props,
}: ComponentLoaderProps<TProps>) {
	if (!component.files?.length) {
		return null;
	}

	const mainFile =
		component.files.find((file) => file.type === 'registry:component') || component.files[0];

	if (!mainFile) {
		return null;
	}

	const path = mainFile.path;
	const demoPath = path
		.replace('components/', 'example/')
		.replace('.tsx', '-demo.tsx')
		.split('/')
		.pop();

	const Component = dynamic(
		() =>
			import(`@/craft/example/${demoPath}`).catch(() => () => (
				<div className='flex h-full w-full items-center justify-center'>
					<p className='text-sm text-muted-foreground'>Coming soon...</p>
				</div>
			)),
		{
			loading: () => (
				<div
					data-comp-loading='true'
					className='peer flex min-h-20 items-center justify-center'
				>
					<span className='sr-only'>Loading component...</span>
					<HugeiconsIcon
						icon={Loading03Icon}
						className='-ms-1 animate-spin text-input'
						size={24}
						aria-hidden='true'
					/>
				</div>
			),
			ssr: false,
		}
	);

	return <Component {...(props as TProps)} />;
}

'use client';

import { ComponentPreview } from '@/components/preview/component-preview';
import type { RegistryItem } from '@/lib/registry';

interface CraftPreviewWrapperProps {
	name: string;
	component?: RegistryItem;
}

export function CraftPreviewWrapper({ name, component }: CraftPreviewWrapperProps) {
	return (
		<div className='flex h-full w-full p-4'>
			{component ? (
				<ComponentPreview
					name={name}
					component={component}
				/>
			) : (
				<div className='flex h-full w-full items-center justify-center'>
					<div className='text-center space-y-4'>
						<p className='text-muted-foreground'>Component preview not available</p>
						<p className='text-sm text-muted-foreground'>Component not found in registry.json</p>
					</div>
				</div>
			)}
		</div>
	);
}

import { getAllCraftSlugs, getCraftBySlug } from '@/diary';
import { craftRegistry } from '@/registry';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Heading } from '@/components/heading';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft02Icon } from '@hugeicons/core-free-icons';
import { CraftLayoutClient } from '@/components/layouts/craft-layout-client';
import { getRegistryItem } from '@/lib/registry';
import type { Metadata } from 'next';
import ProgressiveBlur from '@/components/animate/progessive-blur';

export function generateStaticParams() {
	const slugs = getAllCraftSlugs();
	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const resolvedParams = await params;
	const craft = await getCraftBySlug(resolvedParams.slug, craftRegistry[resolvedParams.slug]);

	if (!craft) {
		return {
			title: 'Craft Not Found - Craft Diary',
			description: 'The requested craft could not be found.',
		};
	}

	return {
		title: `${craft.title} - Craft Diary`,
		description: craft.category
			? `${craft.title} - ${craft.category} component from Craft Diary collection.`
			: `${craft.title} - A crafted component from Craft Diary collection.`,
	};
}

export default async function CraftPage({ params }: { params: Promise<{ slug: string }> }) {
	const resolvedParams = await params;
	const craft = await getCraftBySlug(resolvedParams.slug, craftRegistry[resolvedParams.slug]);

	if (!craft) {
		notFound();
	}

	// Get registry item for component preview
	const registryItem = getRegistryItem(resolvedParams.slug);

	return (
		<main className='flex h-full w-full flex-1 flex-col lg:flex-row lg:justify-start relative'>
			<CraftLayoutClient
				previewName={resolvedParams.slug}
				previewComponent={registryItem}
				componentCode={craft.component?.code}
				componentFileName={craft.component?.path.split('/').pop() || 'component.tsx'}
				exampleCode={craft.example?.code}
				exampleFileName={craft.example?.path.split('/').pop() || 'example.tsx'}
				infoContent={
					<div className='flex h-full flex-col py-6'>
						<div className='flex items-start justify-between mb-6 gap-4'>
							<div className='flex-1 px-6	'>
								<Heading
									heading={craft.title}
									subheading={craft.category || 'Component'}
								/>
							</div>
						</div>

						<div className=' relative h-full'>
							<ProgressiveBlur
								position='top'
								height='100px'
								blurAmount='2px'
								backgroundColor='var(--background)'
							/>
							<ProgressiveBlur
								position='bottom'
								height='100px'
								blurAmount='2px'
								backgroundColor='var(--background)'
							/>
							<div className='flex-1 overflow-y-auto h-full px-6 pb-20'>
								{/* Documentation */}
								{craft.content && (
									<div className='prose prose-sm dark:prose-invert max-w-none'>
										{craft.content.body}
									</div>
								)}
							</div>
						</div>
					</div>
				}
			/>
		</main>
	);
}

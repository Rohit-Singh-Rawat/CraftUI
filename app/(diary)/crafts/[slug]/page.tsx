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
	const craft = getCraftBySlug(resolvedParams.slug, craftRegistry[resolvedParams.slug]);

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
	const craft = getCraftBySlug(resolvedParams.slug, craftRegistry[resolvedParams.slug]);

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
					<div className='flex h-full flex-col p-6'>
						<div className='flex items-start justify-between mb-6 gap-4'>
							<div className='flex-1'>
								<Link
									href='/diary'
									className='text-sm text-muted-foreground hover:text-foreground mb-3 inline-flex items-center gap-1'
								>
									<HugeiconsIcon
										icon={ArrowLeft02Icon}
										size={14}
										strokeWidth={2}
									/>
									Back to Diary
								</Link>
								<Heading
									heading={craft.title}
									subheading={craft.category || 'Component'}
								/>
							</div>
						</div>

						<div className='flex-1 overflow-y-auto'>
							<div className='space-y-8'>
								{/* Documentation */}
								{craft.content && (
									<section>
										<div className='prose prose-sm dark:prose-invert max-w-none'>
											<pre className='whitespace-pre-wrap text-sm bg-muted/50 p-4 rounded-lg border'>
												{craft.content.markdown}
											</pre>
										</div>
									</section>
								)}

								{/* Component Info */}
								<section>
									<h3 className='text-lg font-semibold mb-3'>Component Details</h3>
									<div className='space-y-3'>
										<div className='border rounded-lg p-4'>
											<p className='text-sm font-medium mb-1'>File Location</p>
											<code className='text-xs font-mono text-muted-foreground'>
												{craft.component.path.replace(process.cwd(), '')}
											</code>
										</div>
										{craft.example && (
											<div className='border rounded-lg p-4'>
												<p className='text-sm font-medium mb-1'>Example Location</p>
												<code className='text-xs font-mono text-muted-foreground'>
													{craft.example.path.replace(process.cwd(), '')}
												</code>
											</div>
										)}
										{craft.content && (
											<div className='border rounded-lg p-4'>
												<p className='text-sm font-medium mb-1'>Documentation</p>
												<code className='text-xs font-mono text-muted-foreground'>
													{craft.content.path.replace(process.cwd(), '')}
												</code>
											</div>
										)}
									</div>
								</section>

								{/* Installation */}
								<section>
									<h3 className='text-lg font-semibold mb-3'>Installation</h3>
									<div className='bg-muted/50 rounded-lg p-4'>
										<pre className='text-xs font-mono overflow-x-auto'>
											{`# Copy the component file\ncp craft/components/${
												craft.slug
											}.tsx your-project/components/\n\n# Or import directly\nimport { ${extractComponentName(
												craft.component.code
											)} } from '@/craft/components/${craft.slug}';`}
										</pre>
									</div>
								</section>

								{/* Related Links */}
								<section className='pb-8'>
									<h3 className='text-lg font-semibold mb-3'>Quick Actions</h3>
									<div className='space-y-2'>
										<Link
											href='/diary'
											className='block text-primary hover:underline text-sm'
										>
											→ Browse all components
										</Link>
										<Link
											href='/playground'
											className='block text-primary hover:underline text-sm'
										>
											→ Try in playground
										</Link>
									</div>
								</section>
							</div>
						</div>
					</div>
				}
			/>
		</main>
	);
}

function extractComponentName(code: string): string {
	const match = code.match(/export\s+(?:const|function)\s+(\w+)/);
	return match ? match[1] : 'Component';
}

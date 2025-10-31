import { getCraftsByCategory } from '@/diary';
import { craftRegistry } from '@/registry';
import { CraftCard } from '@/components/craft-card';
import ProgrssiveBlur from '@/components/animate/progessive-blur';
import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/utils';

export const metadata: Metadata = generateMetadata({
	title: 'Craft Diary',
	description: 'A curated collection of meticulously crafted elements organized by category.',
});

export default async function DiaryPage() {
	const craftsByCategory = await getCraftsByCategory(craftRegistry);

	return (
		<main className='flex h-full w-full flex-1 flex-col items-center overflow-y-auto '>
			<ProgrssiveBlur
				position='top'
				height='100px'
				backgroundColor='var(--background)'
			/>
			<ProgrssiveBlur
				position='bottom'
				height='100px'
				backgroundColor='var(--background)'
			/>
			<div className='w-full max-w-7xl px-6 py-16'>
				<div className='mb-16 text-center'>
					<h1 className='text-6xl font-serif mb-4'>Craft Diary</h1>
					<p className='text-muted-foreground/60 font-light text-lg'>
						A curated collection of meticulously crafted elements
					</p>
				</div>

				<div className='space-y-16'>
					{Object.entries(craftsByCategory).map(([category, crafts]) => (
						<section key={category}>
							<h2 className='text-3xl font-serif mb-8'>{category}</h2>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
								{crafts.map((craft) => (
									<CraftCard
										key={craft.slug}
										slug={craft.slug}
										title={craft.title}
										image={craft.image}
									/>
								))}
							</div>
						</section>
					))}
				</div>
			</div>
		</main>
	);
}

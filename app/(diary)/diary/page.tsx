import { getCraftsByCategory } from '@/diary';
import { craftRegistry } from '@/registry';
import Link from 'next/link';

export default function DiaryPage() {
	const craftsByCategory = getCraftsByCategory(craftRegistry);

	return (
		<main className='flex h-full w-full flex-1 flex-col items-center overflow-y-auto'>
			<div className='w-full max-w-7xl px-6 py-16'>
				<div className='mb-16 text-center'>
					<h1 className='text-6xl font-serif mb-4'>Craft Diary</h1>
					<p className='text-muted-foreground text-lg'>A collection of handcrafted UI components</p>
				</div>

				<div className='space-y-16'>
					{Object.entries(craftsByCategory).map(([category, crafts]) => (
						<section key={category}>
							<h2 className='text-3xl font-serif mb-8'>{category}</h2>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
								{crafts.map((craft) => (
									<Link
										key={craft.slug}
										href={`/crafts/${craft.slug}`}
										className='group block'
									>
										<div className='aspect-video bg-muted rounded-lg mb-3 overflow-hidden border border-border group-hover:border-primary transition-colors'>
											<div className='flex h-full w-full items-center justify-center'>
												<span className='text-sm text-muted-foreground'>Preview</span>
											</div>
										</div>
										<h3 className='font-serif text-xl group-hover:text-primary transition-colors'>
											{craft.title}
										</h3>
									</Link>
								))}
							</div>
						</section>
					))}
				</div>
			</div>
		</main>
	);
}

import { redirect } from 'next/navigation';
import { craftRegistry } from '@/registry';
import { generateMetadata as generateSEOMetadata } from '@/lib/utils';

export const metadata = generateSEOMetadata({
	title: 'Crafts',
	description: 'Explore our collection of crafted UI components and design elements.',
});

export default function CraftsPage() {
	const crafts = Object.values(craftRegistry);

	if (crafts.length === 0) {
		redirect('/diary');
	}

	const randomCraft = crafts[Math.floor(Math.random() * crafts.length)];
	redirect(`/crafts/${randomCraft.slug}`);
}

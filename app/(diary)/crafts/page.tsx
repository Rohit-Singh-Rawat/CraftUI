import { redirect } from 'next/navigation';
import { craftRegistry } from '@/registry';

export default function CraftsPage() {
	const crafts = Object.values(craftRegistry);

	if (crafts.length === 0) {
		redirect('/diary');
	}

	const randomCraft = crafts[Math.floor(Math.random() * crafts.length)];
	redirect(`/crafts/${randomCraft.slug}`);
}

import { Sidebar } from '@/components/navigation/sidebar';
import { getCraftsByCategory } from '@/diary';
import { craftRegistry } from '@/registry';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: {
		template: '%s - Craft Diary',
		default: 'Craft Diary',
	},
	description:
		'Explore our curated collection of meticulously crafted UI components and design elements.',
};

export default function DiaryLayout({ children }: { children: React.ReactNode }) {
	const craftsByCategory = getCraftsByCategory(craftRegistry);

	// Transform crafts into navigation data structure
	const navigationData = Object.entries(craftsByCategory).map(([category, crafts]) => ({
		title: category,
		links: crafts.map((craft) => ({
			label: craft.title,
			href: `/crafts/${craft.slug}`,
		})),
	}));

	return (
		<div className='flex h-screen'>
			<Sidebar navigationData={navigationData} />
			<main className='flex-1 overflow-auto md:pl-20'>{children}</main>
		</div>
	);
}

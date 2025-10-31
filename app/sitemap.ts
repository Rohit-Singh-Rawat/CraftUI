import type { MetadataRoute } from 'next';
import { getAllCraftSlugs } from '@/diary';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://craft.rohitsinghrawat.com';

	// Static routes
	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${baseUrl}/diary`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/crafts`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8,
		},
	];

	// Dynamic craft routes
	const craftSlugs = getAllCraftSlugs();
	const craftRoutes: MetadataRoute.Sitemap = craftSlugs.map((slug) => ({
		url: `${baseUrl}/crafts/${slug}`,
		lastModified: new Date(),
		changeFrequency: 'monthly',
		priority: 0.7,
	}));

	return [...staticRoutes, ...craftRoutes];
}

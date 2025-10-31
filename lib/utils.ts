import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Metadata } from 'next';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

interface SEOProps {
	title?: string;
	description?: string;
	keywords?: string[];
	image?: string;
	url?: string;
	type?: 'website' | 'article' | 'profile';
	author?: string;
	publishedTime?: string;
	modifiedTime?: string;
	tags?: string[];
}

const defaultSEO = {
	title: 'Craft Diary',
	titleTemplate: '%s | Craft Diary',
	description:
		'A curated collection of production-ready UI components and micro-interactions built with React, TypeScript, and modern design principles.',
	keywords: [
		'Craft Diary',
		'UI Components',
		'React Components',
		'TypeScript',
		'Next.js',
		'Web Development',
		'Frontend Development',
		'UI/UX Design',
		'Component Library',
		'Design System',
		'Tailwind CSS',
		'Radix UI',
	],
	image: '/images/og/opengraph.png',
	url: process.env.NEXT_PUBLIC_BASE_URL || 'https://craft.rohitsinghrawat.com',
	type: 'website' as const,
	author: 'Rohit Singh Rawat',
	twitter: '@Spacing_Whale',
	locale: 'en_US',
	siteName: 'Craft Diary',
};

export function generateMetadata({
	title,
	description,
	keywords,
	image,
	url,
	type = 'website',
	author,
	publishedTime,
	modifiedTime,
	tags,
}: SEOProps = {}): Metadata {
	const pageTitle = title ? `${title} | ${defaultSEO.title}` : defaultSEO.title;

	const seo = {
		title: pageTitle,
		description: description || defaultSEO.description,
		keywords: keywords ? [...defaultSEO.keywords, ...keywords] : defaultSEO.keywords,
		image: image || defaultSEO.image,
		url: url || defaultSEO.url,
		type,
		author: author || defaultSEO.author,
		twitter: defaultSEO.twitter,
	};

	return {
		title: pageTitle,
		description: seo.description,
		keywords: seo.keywords,
		authors: [{ name: seo.author, url: seo.url }],
		creator: seo.author,
		publisher: seo.author,
		applicationName: defaultSEO.siteName,
		generator: 'Next.js',
		referrer: 'origin-when-cross-origin',
		manifest: '/manifest.json',
		icons: {
			icon: [
				{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
				{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			],
			apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
			other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#000000' }],
		},
		openGraph: {
			title: seo.title,
			description: seo.description,
			url: seo.url,
			siteName: defaultSEO.siteName,
			locale: defaultSEO.locale,
			type: seo.type,
			images: [
				{
					url: seo.image,
					width: 1200,
					height: 630,
					alt: seo.title,
					type: 'image/png',
				},
			],
			...(publishedTime && { publishedTime }),
			...(modifiedTime && { modifiedTime }),
			...(tags && { tags }),
		},
		twitter: {
			card: 'summary_large_image',
			title: seo.title,
			description: seo.description,
			images: [seo.image],
			creator: seo.twitter,
			site: seo.twitter,
		},
		robots: {
			index: true,
			follow: true,
			noarchive: false,
			nosnippet: false,
			noimageindex: false,
			nocache: false,
			googleBot: {
				index: true,
				follow: true,
				noimageindex: false,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
		alternates: {
			canonical: seo.url,
			languages: {
				'en-US': seo.url,
			},
		},
		category: 'technology',
		classification: 'Software Development',
		formatDetection: {
			email: false,
			address: false,
			telephone: false,
		},
	};
}

export const jsonLd = {
	person: {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: defaultSEO.author,
		url: defaultSEO.url,
		image: defaultSEO.image,
		jobTitle: 'Software Engineer',
		description: defaultSEO.description,
		knowsAbout: [
			'Software Development',
			'Web Development',
			'React',
			'Next.js',
			'JavaScript',
			'TypeScript',
			'Node.js',
			'UI/UX Design',
		],
		worksFor: {
			'@type': 'Organization',
			name: 'Independent',
		},
		alumniOf: {
			'@type': 'Organization',
			name: 'Educational Institution',
		},
		sameAs: [
			'https://github.com/rohitsinghrawat',
			'https://twitter.com/Spacing_Whale',
			'https://linkedin.com/in/rohitsinghrawat',
		],
		address: {
			'@type': 'PostalAddress',
			addressCountry: 'India',
		},
	},
	website: {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: defaultSEO.title,
		url: defaultSEO.url,
		description: defaultSEO.description,
		inLanguage: 'en-US',
		isAccessibleForFree: true,
		author: {
			'@type': 'Person',
			name: defaultSEO.author,
		},
		mainEntity: {
			'@type': 'Person',
			name: defaultSEO.author,
		},
		potentialAction: {
			'@type': 'SearchAction',
			target: `${defaultSEO.url}/search?q={search_term_string}`,
			'query-input': 'required name=search_term_string',
		},
	},
	breadcrumb: {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Home',
				item: defaultSEO.url,
			},
		],
	},
};

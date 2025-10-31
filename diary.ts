import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { mdxComponents } from '@/mdx-components';
import { compileMDX } from 'next-mdx-remote/rsc';
import { Doc } from './types/types';

// Directory paths
const COMPONENTS_DIR = path.join(process.cwd(), 'craft/components');
const EXAMPLES_DIR = path.join(process.cwd(), 'craft/example');
const CONTENT_DIR = path.join(process.cwd(), 'content/crafts');
const IMAGES_DIR = path.join(process.cwd(), 'public/crafts');
const IMAGES_DIR_ALT = path.join(process.cwd(), 'public/images/crafts');

export interface CraftImage {
	light: string;
	dark: string;
}

export interface CraftEntry {
	slug: string;
	title: string;
	category?: string;
	component: {
		path: string;
		code: string;
	};
	example?: {
		path: string;
		code: string;
	};
	content?: {
		path: string;
		markdown: string;
		body: React.ReactElement;
		frontmatter: {
			title?: string;
			description?: string;
			category?: string;
			published?: boolean;
			featured?: boolean;
			component?: boolean;
			author?: string;
			[key: string]: unknown;
		};
	};
	image?: CraftImage;
}

export interface CraftMetadata {
	slug: string;
	title: string;
	category?: string;
	image?: CraftImage;
}

/**
 * Get all craft slugs from the components directory
 */
export function getAllCraftSlugs(): string[] {
	if (!fs.existsSync(COMPONENTS_DIR)) {
		return [];
	}

	return fs
		.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
		.filter((dirent) => dirent.isFile() && dirent.name.endsWith('.tsx'))
		.map((dirent) => dirent.name.replace('.tsx', ''));
}

/**
 * Read component code from craft/components/{slug}.tsx
 */
function readComponent(slug: string): { path: string; code: string } | null {
	const componentPath = path.join(COMPONENTS_DIR, `${slug}.tsx`);
	if (!fs.existsSync(componentPath)) {
		return null;
	}
	return {
		path: componentPath,
		code: fs.readFileSync(componentPath, 'utf-8'),
	};
}

/**
 * Read example code from craft/example/{slug}.tsx
 */
function readExample(slug: string): { path: string; code: string } | null {
	if (!fs.existsSync(EXAMPLES_DIR)) {
		return null;
	}
	const examplePath = path.join(EXAMPLES_DIR, `${slug}.tsx`);
	if (!fs.existsSync(examplePath)) {
		return null;
	}
	return {
		path: examplePath,
		code: fs.readFileSync(examplePath, 'utf-8'),
	};
}

/**
 * Read and compile markdown content from content/crafts/{slug}.md or {slug}.mdx
 */
async function readContent(slug: string): Promise<{
	path: string;
	markdown: string;
	body: React.ReactElement;
	frontmatter: {
		title?: string;
		description?: string;
		category?: string;
		published?: boolean;
		featured?: boolean;
		component?: boolean;
		author?: string;
		[key: string]: unknown;
	};
} | null> {
	if (!fs.existsSync(CONTENT_DIR)) {
		return null;
	}

	// Try both .md and .mdx
	const mdPath = path.join(CONTENT_DIR, `${slug}.md`);
	const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);

	let filePath: string | null = null;
	if (fs.existsSync(mdxPath)) {
		filePath = mdxPath;
	} else if (fs.existsSync(mdPath)) {
		filePath = mdPath;
	} else {
		return null;
	}

	const source = fs.readFileSync(filePath, 'utf-8');

	// Use the Next.js component mappings
	const components = mdxComponents();

	const { content, frontmatter } = await compileMDX({
		source,
		options: { parseFrontmatter: true },
		components,
	});

	return {
		path: filePath,
		markdown: source,
		body: content,
		frontmatter: {
			title: frontmatter.title ? String(frontmatter.title) : undefined,
			description: frontmatter.description ? String(frontmatter.description) : undefined,
			category: frontmatter.category ? String(frontmatter.category) : undefined,
			published: frontmatter.published ? Boolean(frontmatter.published) : undefined,
			featured: frontmatter.featured ? Boolean(frontmatter.featured) : undefined,
			component: frontmatter.component ? Boolean(frontmatter.component) : undefined,
			author: frontmatter.author ? String(frontmatter.author) : undefined,
			...frontmatter,
		},
	};
}

/**
 * Find images for craft from public/crafts/{slug}-light.{ext} and {slug}-dark.{ext}
 */
function findCraftImage(slug: string): CraftImage | null {
	const extensions = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'];
	let lightImage: string | null = null;
	let darkImage: string | null = null;

	// Check public/images/crafts/{slug}/ directory
	const slugImagesDir = path.join(IMAGES_DIR_ALT, slug);
	if (fs.existsSync(slugImagesDir)) {
		for (const ext of extensions) {
			const lightPath = path.join(slugImagesDir, `${slug}-light.${ext}`);
			const darkPath = path.join(slugImagesDir, `${slug}-dark.${ext}`);

			if (fs.existsSync(lightPath)) {
				lightImage = `/images/crafts/${slug}/${slug}-light.${ext}`;
			}
			if (fs.existsSync(darkPath)) {
				darkImage = `/images/crafts/${slug}/${slug}-dark.${ext}`;
			}

			if (lightImage && darkImage) {
				break;
			}
		}
	}

	// Fallback: Check public/crafts/{slug}/ directory
	if (!lightImage || !darkImage) {
		const slugCraftsDir = path.join(IMAGES_DIR, slug);
		if (fs.existsSync(slugCraftsDir)) {
			for (const ext of extensions) {
				if (!lightImage) {
					const lightPath = path.join(slugCraftsDir, `${slug}-light.${ext}`);
					if (fs.existsSync(lightPath)) {
						lightImage = `/crafts/${slug}/${slug}-light.${ext}`;
					}
				}
				if (!darkImage) {
					const darkPath = path.join(slugCraftsDir, `${slug}-dark.${ext}`);
					if (fs.existsSync(darkPath)) {
						darkImage = `/crafts/${slug}/${slug}-dark.${ext}`;
					}
				}

				if (lightImage && darkImage) {
					break;
				}
			}
		}
	}

	// If we found both light and dark images, return them
	if (lightImage && darkImage) {
		return { light: lightImage, dark: darkImage };
	}

	// If we only found one, use it for both modes
	if (lightImage) {
		return { light: lightImage, dark: lightImage };
	}
	if (darkImage) {
		return { light: darkImage, dark: darkImage };
	}

	return null;
}

/**
 * Extract title from component code (looks for display name or first export)
 */
function extractTitleFromComponent(code: string): string | null {
	// Try to find displayName
	const displayNameMatch = code.match(/displayName\s*=\s*["']([^"']+)["']/);
	if (displayNameMatch) {
		return displayNameMatch[1];
	}

	// Try to find named export
	const namedExportMatch = code.match(/export\s+(?:const|function)\s+(\w+)/);
	if (namedExportMatch) {
		return namedExportMatch[1];
	}

	return null;
}

/**
 * Extract category from markdown frontmatter
 */
function extractCategoryFromMarkdown(
	markdown: string,
	frontmatter?: { category?: string }
): string | null {
	// Try frontmatter first
	if (frontmatter?.category) {
		return String(frontmatter.category);
	}

	const frontmatterMatch = markdown.match(/^---\s*\n([\s\S]*?)\n---/);
	if (!frontmatterMatch) {
		return null;
	}

	const categoryMatch = frontmatterMatch[1].match(/category:\s*["']?([^"'\n]+)["']?/);
	return categoryMatch ? categoryMatch[1].trim() : null;
}

/**
 * Extract title from markdown frontmatter or first H1
 */
function extractTitleFromMarkdown(
	markdown: string,
	frontmatter?: { title?: string }
): string | null {
	// Try frontmatter first
	if (frontmatter?.title) {
		return String(frontmatter.title);
	}

	const frontmatterMatch = markdown.match(/^---\s*\n([\s\S]*?)\n---/);
	if (frontmatterMatch) {
		const titleMatch = frontmatterMatch[1].match(/title:\s*["']?([^"'\n]+)["']?/);
		if (titleMatch) {
			return titleMatch[1].trim();
		}
	}

	// Try first H1
	const h1Match = markdown.match(/^#\s+(.+)$/m);
	return h1Match ? h1Match[1].trim() : null;
}

/**
 * Get a single craft entry by slug
 */
export async function getCraftBySlug(
	slug: string,
	metadata?: CraftMetadata
): Promise<CraftEntry | null> {
	const component = readComponent(slug);
	if (!component) {
		return null;
	}

	const example = readExample(slug);
	const content = await readContent(slug);

	// Determine title - prioritize frontmatter from compiled MDX
	let title = metadata?.title;
	if (!title && content?.frontmatter?.title) {
		title = String(content.frontmatter.title);
	}
	if (!title && content) {
		title = extractTitleFromMarkdown(content.markdown, content.frontmatter) || undefined;
	}
	if (!title && component) {
		title = extractTitleFromComponent(component.code) || undefined;
	}
	if (!title) {
		// Fallback: convert slug to title case
		title = slug
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	// Determine category - prioritize frontmatter from compiled MDX
	let category = metadata?.category;
	if (!category && content?.frontmatter?.category) {
		category = String(content.frontmatter.category);
	}
	if (!category && content) {
		category = extractCategoryFromMarkdown(content.markdown, content.frontmatter) || undefined;
	}

	// Determine image
	const image = metadata?.image || findCraftImage(slug) || undefined;

	return {
		slug,
		title,
		category,
		component,
		example: example || undefined,
		content: content || undefined,
		image,
	};
}

/**
 * Get all craft entries
 */
export async function getAllCrafts(
	metadataMap?: Record<string, CraftMetadata>
): Promise<CraftEntry[]> {
	const slugs = getAllCraftSlugs();
	const crafts: CraftEntry[] = [];

	for (const slug of slugs) {
		const metadata = metadataMap?.[slug];
		const craft = await getCraftBySlug(slug, metadata);
		if (craft) {
			crafts.push(craft);
		}
	}

	return crafts;
}

/**
 * Get crafts grouped by category
 */
export async function getCraftsByCategory(
	metadataMap?: Record<string, CraftMetadata>
): Promise<Record<string, CraftEntry[]>> {
	const crafts = await getAllCrafts(metadataMap);
	const byCategory: Record<string, CraftEntry[]> = {};

	for (const craft of crafts) {
		const category = craft.category || 'Uncategorized';
		if (!byCategory[category]) {
			byCategory[category] = [];
		}
		byCategory[category].push(craft);
	}

	return byCategory;
}

/**
 * Search crafts by query (searches in title, slug, category)
 */
export async function searchCrafts(
	query: string,
	metadataMap?: Record<string, CraftMetadata>
): Promise<CraftEntry[]> {
	const crafts = await getAllCrafts(metadataMap);
	const lowercaseQuery = query.toLowerCase();

	return crafts.filter(
		(craft) =>
			craft.slug.toLowerCase().includes(lowercaseQuery) ||
			craft.title.toLowerCase().includes(lowercaseQuery) ||
			craft.category?.toLowerCase().includes(lowercaseQuery)
	);
}

/**
 * Get all unique categories
 */
export async function getAllCategories(
	metadataMap?: Record<string, CraftMetadata>
): Promise<string[]> {
	const crafts = await getAllCrafts(metadataMap);
	const categories = new Set<string>();

	for (const craft of crafts) {
		if (craft.category) {
			categories.add(craft.category);
		}
	}

	return Array.from(categories).sort();
}

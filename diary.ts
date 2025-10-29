import fs from 'node:fs';
import path from 'node:path';

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
 * Read markdown content from content/crafts/{slug}.md or {slug}.mdx
 */
function readContent(slug: string): { path: string; markdown: string } | null {
	if (!fs.existsSync(CONTENT_DIR)) {
		return null;
	}

	// Try both .md and .mdx
	const mdPath = path.join(CONTENT_DIR, `${slug}.md`);
	const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);

	if (fs.existsSync(mdPath)) {
		return {
			path: mdPath,
			markdown: fs.readFileSync(mdPath, 'utf-8'),
		};
	}

	if (fs.existsSync(mdxPath)) {
		return {
			path: mdxPath,
			markdown: fs.readFileSync(mdxPath, 'utf-8'),
		};
	}

	return null;
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
function extractCategoryFromMarkdown(markdown: string): string | null {
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
function extractTitleFromMarkdown(markdown: string): string | null {
	// Try frontmatter first
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
export function getCraftBySlug(slug: string, metadata?: CraftMetadata): CraftEntry | null {
	const component = readComponent(slug);
	if (!component) {
		return null;
	}

	const example = readExample(slug);
	const content = readContent(slug);

	// Determine title
	let title = metadata?.title;
	if (!title && content) {
		title = extractTitleFromMarkdown(content.markdown) || undefined;
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

	// Determine category
	let category = metadata?.category;
	if (!category && content) {
		category = extractCategoryFromMarkdown(content.markdown) || undefined;
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
export function getAllCrafts(metadataMap?: Record<string, CraftMetadata>): CraftEntry[] {
	const slugs = getAllCraftSlugs();
	const crafts: CraftEntry[] = [];

	for (const slug of slugs) {
		const metadata = metadataMap?.[slug];
		const craft = getCraftBySlug(slug, metadata);
		if (craft) {
			crafts.push(craft);
		}
	}

	return crafts;
}

/**
 * Get crafts grouped by category
 */
export function getCraftsByCategory(
	metadataMap?: Record<string, CraftMetadata>
): Record<string, CraftEntry[]> {
	const crafts = getAllCrafts(metadataMap);
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
export function searchCrafts(
	query: string,
	metadataMap?: Record<string, CraftMetadata>
): CraftEntry[] {
	const crafts = getAllCrafts(metadataMap);
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
export function getAllCategories(metadataMap?: Record<string, CraftMetadata>): string[] {
	const crafts = getAllCrafts(metadataMap);
	const categories = new Set<string>();

	for (const craft of crafts) {
		if (craft.category) {
			categories.add(craft.category);
		}
	}

	return Array.from(categories).sort();
}

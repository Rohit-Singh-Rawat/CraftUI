import { readFileSync } from 'fs';
import { join } from 'path';

export interface RegistryItem {
	name: string;
	type: string;
	title: string;
	description?: string;
	registryDependencies?: string[];
	dependencies?: string[];
	files: Array<{
		path: string;
		type: string;
		content?: string;
	}>;
}

export interface Registry {
	$schema: string;
	name: string;
	homepage: string;
	items: RegistryItem[];
}

let registryCache: Registry | null = null;

export function getRegistry(): Registry {
	if (registryCache) {
		return registryCache;
	}

	try {
		const registryPath = join(process.cwd(), 'registry.json');
		const registryContent = readFileSync(registryPath, 'utf-8');
		const registry = JSON.parse(registryContent) as Registry;

		// Populate file content for each item
		registry.items = registry.items.map((item) => ({
			...item,
			files: item.files.map((file) => {
				try {
					const filePath = join(process.cwd(), file.path);
					const content = readFileSync(filePath, 'utf-8');
					return { ...file, content };
				} catch (error) {
					console.error(`Failed to load file ${file.path}:`, error);
					return file;
				}
			}),
		}));

		registryCache = registry;
		return registryCache;
	} catch (error) {
		console.error('Failed to load registry.json:', error);
		return {
			$schema: 'https://ui.shadcn.com/schema/registry.json',
			name: '@craft',
			homepage: '',
			items: [],
		};
	}
}

export function getRegistryItem(name: string): RegistryItem | undefined {
	const registry = getRegistry();
	return registry.items.find((item) => item.name === name);
}

export function getRegistryItemCode(name: string): string | null {
	const item = getRegistryItem(name);
	if (!item || !item.files?.length) {
		return null;
	}

	const mainFile = item.files.find((file) => file.type === 'registry:component') || item.files[0];
	if (!mainFile) {
		return null;
	}

	return mainFile.content || null;
}

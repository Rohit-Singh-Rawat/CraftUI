'use client';

import { SplitPanelLayout } from '@/components/layouts/split-panel-layout';
import { CraftPreviewWrapper } from '@/components/preview/craft-preview-wrapper';
import { CodeDrawer } from '@/components/panels/code-drawer';
import { PanelProvider, usePanel, type CodeFile } from '@/components/panels/panel-context';
import type { ReactNode } from 'react';
import type { RegistryItem } from '@/lib/registry';

interface CraftLayoutClientProps {
	readonly previewName: string;
	readonly previewComponent?: RegistryItem;
	readonly infoContent: ReactNode;
	readonly componentCode?: string;
	readonly componentFileName?: string;
	readonly exampleCode?: string;
	readonly exampleFileName?: string;
}

interface CraftLayoutContentProps {
	readonly previewName: string;
	readonly previewComponent?: RegistryItem;
	readonly infoContent: ReactNode;
}

function CraftLayoutContent({
	previewName,
	previewComponent,
	infoContent,
}: CraftLayoutContentProps): React.ReactElement {
	const { codeDrawerOpen, codeFiles, selectedFileIndex, setSelectedFileIndex, setCodeDrawerOpen } =
		usePanel();

	return (
		<>
			<SplitPanelLayout
				infoSide='right'
				previewContent={
					<CraftPreviewWrapper
						name={previewName}
						component={previewComponent}
					/>
				}
				infoContent={infoContent}
			/>
			<CodeDrawer
				side='right'
				files={codeFiles}
				selectedFileIndex={selectedFileIndex}
				onFileSelect={setSelectedFileIndex}
				open={codeDrawerOpen}
				onOpenChange={setCodeDrawerOpen}
			>
				<div />
			</CodeDrawer>
		</>
	);
}

export function CraftLayoutClient({
	previewName,
	previewComponent,
	infoContent,
	componentCode,
	componentFileName,
	exampleCode,
	exampleFileName,
}: CraftLayoutClientProps): React.ReactElement {
	// Extract additional files from registry (like CSS files)
	const additionalFiles: CodeFile[] = [];
	if (previewComponent?.files) {
		const componentPath = componentFileName ? `craft/components/${componentFileName}` : '';
		const examplePath = exampleFileName ? `craft/example/${exampleFileName}` : '';

		for (const file of previewComponent.files) {
			// Skip component and example files (already handled separately)
			if (
				file.type === 'registry:component' ||
				file.path.includes(componentPath) ||
				file.path.includes(examplePath)
			) {
				continue;
			}

			// Add other files (like CSS, styles, etc.)
			if (file.content) {
				// Extract just the filename, handle both / and \ separators
				const fileName = file.path.split('/').pop() || file.path.split('\\').pop() || 'file';
				const ext = fileName.split('.').pop()?.toLowerCase();
				const languageMap: Record<string, string> = {
					css: 'css',
					scss: 'scss',
					sass: 'sass',
					less: 'less',
					json: 'json',
					md: 'markdown',
					mdx: 'markdown',
				};

				additionalFiles.push({
					code: file.content,
					fileName,
					language: languageMap[ext || ''] || ext || 'text',
				});
			}
		}
	}

	return (
		<PanelProvider
			componentCode={componentCode}
			componentFileName={componentFileName}
			exampleCode={exampleCode}
			exampleFileName={exampleFileName}
			additionalFiles={additionalFiles}
		>
			<CraftLayoutContent
				previewName={previewName}
				previewComponent={previewComponent}
				infoContent={infoContent}
			/>
		</PanelProvider>
	);
}

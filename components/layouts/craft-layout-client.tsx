'use client';

import { SplitPanelLayout } from '@/components/layouts/split-panel-layout';
import { CraftPreviewWrapper } from '@/components/preview/craft-preview-wrapper';
import { CodeDrawer } from '@/components/panels/code-drawer';
import { PanelProvider, usePanel } from '@/components/panels/panel-context';
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
	const { codeDrawerOpen, selectedCode, selectedFileName, setCodeDrawerOpen } = usePanel();

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
				code={selectedCode}
				fileName={selectedFileName}
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
	return (
		<PanelProvider
			componentCode={componentCode}
			componentFileName={componentFileName}
			exampleCode={exampleCode}
			exampleFileName={exampleFileName}
		>
			<CraftLayoutContent
				previewName={previewName}
				previewComponent={previewComponent}
				infoContent={infoContent}
			/>
		</PanelProvider>
	);
}

'use client';

import * as React from 'react';
import { type ReactNode } from 'react';
import { PreviewPanel } from '@/components/panels/preview-panel';
import { InfoPanel } from '@/components/panels/info-panel';
import { PanelButtons, type PanelButtonConfig } from '@/components/panels/panel-buttons';
import { usePanel } from '@/components/panels/panel-context';
import { RefreshIcon } from '../icons/refresh';
import { CodeIcon } from '../icons/code';
import { MaximizeIcon, MinimizeIcon } from 'lucide-react';

interface SplitPanelLayoutProps {
	previewContent: ReactNode;
	infoContent: ReactNode;
	infoSide?: 'left' | 'right';
}

export function SplitPanelLayout({
	previewContent,
	infoContent,
	infoSide = 'right',
}: SplitPanelLayoutProps): React.ReactElement {
	const { isMaximized, togglePanel, restart, codeDrawerOpen, toggleCodeDrawer, hasCode } =
		usePanel();

	const previewSide: 'left' | 'right' = infoSide === 'right' ? 'left' : 'right';

	const buttons: PanelButtonConfig[] = [
		{
			id: 'toggle',
			icon: isMaximized ? (
				<MinimizeIcon className='w-5 h-5 text-muted-foreground hover:text-primary transition-colors duration-300' />
			) : (
				<MaximizeIcon className='w-4.5 h-4.5 text-muted-foreground hover:text-primary transition-colors duration-300' />
			),
			tooltip: isMaximized ? 'Collapse panel' : 'Expand panel',
			onClick: togglePanel,
			active: isMaximized,
		},
		{
			id: 'refresh',
			icon: <RefreshIcon />,
			tooltip: 'Refresh',
			onClick: restart,
		},
		...(hasCode
			? [
					{
						id: 'code',
						icon: <CodeIcon />,
						tooltip: 'View code',
						onClick: toggleCodeDrawer,
						active: codeDrawerOpen,
					} satisfies PanelButtonConfig,
			  ]
			: []),
	];

	return (
		<>
			<PreviewPanel
				isMaximized={isMaximized}
				side={previewSide}
			>
				{previewContent}
				<PanelButtons
					buttons={buttons}
					side={previewSide}
				/>
			</PreviewPanel>

			<InfoPanel
				isMaximized={isMaximized}
				side={infoSide}
			>
				{infoContent}
			</InfoPanel>
		</>
	);
}

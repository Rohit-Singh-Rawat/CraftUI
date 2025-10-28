'use client';

import { useState, type ReactNode } from 'react';
import { PreviewPanel } from '@/components/panels/preview-panel';
import { InfoPanel } from '@/components/panels/info-panel';
import { PanelToggleButton } from '@/components/panels/panel-toggle-button';

interface SplitPanelLayoutProps {
	previewContent: ReactNode;
	infoContent: ReactNode;
}

export function SplitPanelLayout({ previewContent, infoContent }: SplitPanelLayoutProps) {
	const [isPanelMaximized, setIsPanelMaximized] = useState(true);

	const togglePanel = () => {
		setIsPanelMaximized((prev) => !prev);
	};

	return (
		<>
			<PreviewPanel isMaximized={isPanelMaximized}>
				{previewContent}
				<PanelToggleButton
					isMaximized={isPanelMaximized}
					onToggle={togglePanel}
				/>
			</PreviewPanel>

			<InfoPanel isMaximized={isPanelMaximized}>{infoContent}</InfoPanel>
		</>
	);
}

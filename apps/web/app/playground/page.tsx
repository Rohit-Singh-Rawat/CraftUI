'use client';

import { useState } from 'react';
import { Heading } from '@/components/ui/heading';
import PlayGround from '@/components/playground/playground';
import { ContentPanel } from '@/components/panels/content-panel';
import { SidePanel } from '@/components/panels/side-panel';
import { PanelToggleButton } from '@/components/panels/panel-toggle-button';

const PlaygroundPage = () => {
	const [isPanelMaximized, setIsPanelMaximized] = useState(false);

	const togglePanel = () => {
		setIsPanelMaximized((prev) => !prev);
	};

	return (
		<main className='relative flex min-h-screen flex-col gap-4 p-4 md:flex-row'>
			<ContentPanel isCollapsed={!isPanelMaximized}>
				<Heading
					heading='Playground'
					subheading='action bar'
				/>
				<PlayGround />
				<PanelToggleButton
					isMaximized={isPanelMaximized}
					onToggle={togglePanel}
				/>
			</ContentPanel>

			<SidePanel isVisible={!isPanelMaximized}>
				<div className='flex h-full flex-col items-center justify-center'>
					<h1 className='text-2xl font-bold'>Side Panel</h1>
					<p className='mt-2 text-muted-foreground'>Additional content goes here</p>
				</div>
			</SidePanel>
		</main>
	);
};

export default PlaygroundPage;

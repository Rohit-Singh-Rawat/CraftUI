'use client';

import {
	DockModeDemo,
	ShoppingCartDemo,
	BulkSelectionDemo,
	SuccessNotificationDemo,
	EdgePositionsDemo,
	EmailToolbarDemo,
} from './action-bar-demo';
import { DottedBorder } from '@/components/layout/dotted-border';

const PlayGround = () => {
	const demos = [
		{
			title: 'Dock',
			component: DockModeDemo,
		},
		{
			title: 'Cart',
			component: ShoppingCartDemo,
		},
		{
			title: 'Selection',
			component: BulkSelectionDemo,
		},
		{
			title: 'Notification',
			component: SuccessNotificationDemo,
		},
		{
			title: 'Edge Positions',
			component: EdgePositionsDemo,
		},
		{
			title: 'Email Toolbar',
			component: EmailToolbarDemo,
		},
	];

	return (
		<div className='py-5'>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4'>
				{demos.map((demo, index) => (
					<div
						key={index}
						className='relative h-80 rounded-lg flex flex-col'
					>
						<div className='relative p-4'>
							<h3 className='text-sm font-medium text-foreground'>{demo.title}</h3>
						</div>
						<div className='flex-1 flex items-center justify-center p-4'>
							<demo.component />
						</div>
						{index <= 2 && <DottedBorder position='bottom' />}

						{![2, 5].includes(index) ? (
							<DottedBorder
								orientation='vertical'
								position='right'
							/>
						) : null}
					</div>
				))}
			</div>
		</div>
	);
};

export default PlayGround;

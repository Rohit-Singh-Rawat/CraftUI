'use client';

import * as React from 'react';
import { Button } from '@craft/ui/components/button';
import {
	ActionBar,
	ActionBarHeader,
	ActionBarTitle,
	ActionBarDescription,
	ActionBarActions,
	ActionBarClose,
	ActionBarSeparator,
	ActionBarContent,
} from '@craft/ui/components/crafted/action-bar';
import {
	ShoppingCart,
	Trash2,
	Check,
	AlertTriangle,
	Download,
	Share2,
	Archive,
} from 'lucide-react';

export function ActionBarShowcase() {
	const [activeDemo, setActiveDemo] = React.useState<string | null>(null);

	const demos = [
		{
			id: 'shopping-cart',
			name: 'Shopping Cart',
			variant: 'default' as const,
			description: 'E-commerce cart actions',
		},
		{
			id: 'bulk-selection',
			name: 'Bulk Selection',
			variant: 'default' as const,
			description: 'Multi-item management',
		},
		{
			id: 'destructive',
			name: 'Destructive Action',
			variant: 'destructive' as const,
			description: 'Delete confirmation',
		},
		{
			id: 'success',
			name: 'Success Notification',
			variant: 'success' as const,
			description: 'Action completed',
		},
		{
			id: 'warning',
			name: 'Warning Alert',
			variant: 'warning' as const,
			description: 'Important notice',
		},
	];

	return (
		<div className='space-y-6'>
			<div>
				<h2 className='text-2xl font-bold mb-2'>ActionBar Showcase</h2>
				<p className='text-muted-foreground'>Click any button to see the action bar in action</p>
			</div>

			<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
				{demos.map((demo) => (
					<button
						key={demo.id}
						onClick={() => setActiveDemo(demo.id)}
						className='flex flex-col items-start gap-2 rounded-lg border border-border p-4 text-left transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
					>
						<div className='font-semibold'>{demo.name}</div>
						<div className='text-sm text-muted-foreground'>{demo.description}</div>
						<div className='mt-1 inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary'>
							{demo.variant}
						</div>
					</button>
				))}
			</div>

			{/* Demo Implementations */}
			<ShoppingCartDemo
				isOpen={activeDemo === 'shopping-cart'}
				onClose={() => setActiveDemo(null)}
			/>
			<BulkSelectionDemo
				isOpen={activeDemo === 'bulk-selection'}
				onClose={() => setActiveDemo(null)}
			/>
			<DestructiveDemo
				isOpen={activeDemo === 'destructive'}
				onClose={() => setActiveDemo(null)}
			/>
			<SuccessDemo
				isOpen={activeDemo === 'success'}
				onClose={() => setActiveDemo(null)}
			/>
			<WarningDemo
				isOpen={activeDemo === 'warning'}
				onClose={() => setActiveDemo(null)}
			/>
		</div>
	);
}

function ShoppingCartDemo({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
	return (
		<ActionBar
			open={isOpen}
			onOpenChange={(open) => !open && onClose()}
		>
			<ActionBarContent>
				<ActionBarHeader>
					<ShoppingCart className='size-5' />
					<ActionBarTitle>3 items in the cart</ActionBarTitle>
				</ActionBarHeader>
			</ActionBarContent>

			<ActionBarActions>
				<Button
					size='sm'
					onClick={onClose}
				>
					Buy Now
				</Button>
				<Button
					size='sm'
					variant='outline'
					onClick={onClose}
				>
					Clear All
				</Button>
			</ActionBarActions>
		</ActionBar>
	);
}

function BulkSelectionDemo({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
	return (
		<ActionBar
			open={isOpen}
			onOpenChange={(open) => !open && onClose()}
		>
			<ActionBarContent>
				<ActionBarClose />
				<ActionBarSeparator />
				<ActionBarHeader>
					<ActionBarTitle>5 items selected</ActionBarTitle>
				</ActionBarHeader>
			</ActionBarContent>

			<ActionBarActions>
				<Button
					size='sm'
					variant='destructive'
					onClick={onClose}
				>
					<Trash2 />
					Delete
				</Button>
				<Button
					size='sm'
					variant='outline'
					onClick={onClose}
				>
					<Archive />
					Archive
				</Button>
				<Button
					size='sm'
					variant='outline'
					onClick={onClose}
				>
					<Share2 />
					Share
				</Button>
			</ActionBarActions>
		</ActionBar>
	);
}

function DestructiveDemo({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
	return (
		<ActionBar
			open={isOpen}
			onOpenChange={(open) => !open && onClose()}
			variant='destructive'
		>
			<ActionBarContent>
				<ActionBarHeader>
					<div>
						<ActionBarTitle>Delete 12 items?</ActionBarTitle>
						<ActionBarDescription>This action cannot be undone</ActionBarDescription>
					</div>
				</ActionBarHeader>
			</ActionBarContent>

			<ActionBarActions>
				<Button
					size='sm'
					variant='destructive'
					onClick={onClose}
				>
					<Trash2 />
					Confirm Delete
				</Button>
				<Button
					size='sm'
					variant='outline'
					onClick={onClose}
				>
					Cancel
				</Button>
			</ActionBarActions>
		</ActionBar>
	);
}

function SuccessDemo({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
	React.useEffect(() => {
		if (isOpen) {
			const timer = setTimeout(onClose, 5000);
			return () => clearTimeout(timer);
		}
	}, [isOpen, onClose]);

	return (
		<ActionBar
			open={isOpen}
			onOpenChange={(open) => !open && onClose()}
			variant='success'
		>
			<ActionBarContent>
				<ActionBarHeader>
					<Check className='size-5' />
					<div>
						<ActionBarTitle>Successfully saved</ActionBarTitle>
						<ActionBarDescription>
							Your changes have been saved (auto-closes in 5s)
						</ActionBarDescription>
					</div>
				</ActionBarHeader>
			</ActionBarContent>

			<ActionBarActions>
				<Button
					size='sm'
					variant='outline'
					onClick={onClose}
				>
					<Download />
					Download
				</Button>
				<ActionBarClose />
			</ActionBarActions>
		</ActionBar>
	);
}

function WarningDemo({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
	return (
		<ActionBar
			open={isOpen}
			onOpenChange={(open) => !open && onClose()}
			variant='warning'
		>
			<ActionBarContent>
				<ActionBarHeader>
					<AlertTriangle className='size-5' />
					<div>
						<ActionBarTitle>Unsaved changes</ActionBarTitle>
						<ActionBarDescription>You have unsaved changes that will be lost</ActionBarDescription>
					</div>
				</ActionBarHeader>
			</ActionBarContent>

			<ActionBarActions>
				<Button
					size='sm'
					onClick={onClose}
				>
					Save Changes
				</Button>
				<Button
					size='sm'
					variant='outline'
					onClick={onClose}
				>
					Discard
				</Button>
			</ActionBarActions>
		</ActionBar>
	);
}

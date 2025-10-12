'use client';

import * as React from 'react';
import { ShoppingCart, Trash2, Merge } from 'lucide-react';
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

/**
 * Example 1: Shopping Cart Action Bar (from first image)
 */
export function ShoppingCartActionBar() {
	const [isOpen, setIsOpen] = React.useState(false);
	const [itemCount, setItemCount] = React.useState(1);

	React.useEffect(() => {
		// Simulate cart update
		const timer = setTimeout(() => setIsOpen(true), 500);
		return () => clearTimeout(timer);
	}, []);

	const handleBuy = () => {
		console.log('Proceeding to checkout...');
		setIsOpen(false);
	};

	const handleClearAll = () => {
		setItemCount(0);
		setIsOpen(false);
	};

	return (
		<ActionBar
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<ActionBarContent>
				<ActionBarHeader>
					<ShoppingCart className='size-5' />
					<ActionBarTitle>{itemCount} items in the cart</ActionBarTitle>
				</ActionBarHeader>
			</ActionBarContent>

			<ActionBarActions>
				<Button
					onClick={handleBuy}
					size='sm'
					variant='default'
				>
					Buy
				</Button>
				<Button
					onClick={handleClearAll}
					size='sm'
					variant='outline'
				>
					Clear All
				</Button>
			</ActionBarActions>
		</ActionBar>
	);
}

/**
 * Example 2: Bulk Selection Action Bar (from second image)
 */
export function BulkSelectionActionBar() {
	const [selectedCount, setSelectedCount] = React.useState(2);
	const [isOpen, setIsOpen] = React.useState(true);

	const handleDelete = () => {
		console.log(`Deleting ${selectedCount} items...`);
		setIsOpen(false);
	};

	const handleMerge = () => {
		console.log(`Merging ${selectedCount} items...`);
		setIsOpen(false);
	};

	return (
		<ActionBar
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<ActionBarContent>
				<ActionBarClose />
				<ActionBarSeparator />
				<ActionBarHeader>
					<ActionBarTitle>{selectedCount} selected</ActionBarTitle>
				</ActionBarHeader>
			</ActionBarContent>

			<ActionBarActions>
				<Button
					onClick={handleDelete}
					size='sm'
					variant='destructive'
				>
					<Trash2 />
					Delete
				</Button>
				<Button
					onClick={handleMerge}
					size='sm'
					variant='outline'
				>
					<Merge />
					Merge
				</Button>
			</ActionBarActions>
		</ActionBar>
	);
}

/**
 * Example 3: Destructive Action Bar
 */
export function DestructiveActionBar() {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<>
			<Button onClick={() => setIsOpen(true)}>Show Destructive Action</Button>
			<ActionBar
				open={isOpen}
				onOpenChange={setIsOpen}
				variant='destructive'
			>
				<ActionBarContent>
					<ActionBarHeader>
						<div>
							<ActionBarTitle>Destructive action pending</ActionBarTitle>
							<ActionBarDescription>This action cannot be undone</ActionBarDescription>
						</div>
					</ActionBarHeader>
				</ActionBarContent>

				<ActionBarActions>
					<Button
						size='sm'
						variant='destructive'
					>
						Confirm Delete
					</Button>
					<Button
						size='sm'
						variant='outline'
						onClick={() => setIsOpen(false)}
					>
						Cancel
					</Button>
					<ActionBarClose />
				</ActionBarActions>
			</ActionBar>
		</>
	);
}

/**
 * Example 4: Success Action Bar
 */
export function SuccessActionBar() {
	const [isOpen, setIsOpen] = React.useState(false);

	React.useEffect(() => {
		// Auto-show success message
		const timer = setTimeout(() => {
			setIsOpen(true);
			// Auto-hide after 5 seconds
			setTimeout(() => setIsOpen(false), 5000);
		}, 1000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<ActionBar
			open={isOpen}
			onOpenChange={setIsOpen}
			variant='success'
		>
			<ActionBarContent>
				<ActionBarHeader>
					<ActionBarTitle>✓ Successfully saved</ActionBarTitle>
					<ActionBarDescription>Your changes have been saved</ActionBarDescription>
				</ActionBarHeader>
			</ActionBarContent>

			<ActionBarActions>
				<ActionBarClose />
			</ActionBarActions>
		</ActionBar>
	);
}

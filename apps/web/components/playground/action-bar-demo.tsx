'use client';

import * as React from 'react';
import { Home, Search, Bell, User, ShoppingCart, Trash2, Check, X } from 'lucide-react';
import { Button } from '@craft/ui/components/button';
import {
	ActionBarProvider,
	ActionBar,
	ActionBarLogo,
	ActionBarNav,
	ActionBarHeader,
	ActionBarTitle,
	ActionBarActions,
	ActionBarClose,
	ActionBarContent,
	ActionBarTrigger,
} from '@craft/ui/components/crafted/action-bar';
import Logo from '../layout/logo';

/**
 * DOCK MODE - Persistent bottom navigation
 * Always visible, acts like mobile tab bar or macOS dock
 */
export function DockModeDemo() {
	return (
		<ActionBarProvider mode='dock'>
			<ActionBar>
				<ActionBarLogo>
					<Logo />
				</ActionBarLogo>

				<ActionBarNav>
					<Button
						variant='ghost'
						size='sm'
						className='gap-2'
					>
						<Home className='size-4' />
						<span className='hidden sm:inline'>Home</span>
					</Button>
					<Button
						variant='ghost'
						size='sm'
						className='gap-2'
					>
						<Search className='size-4' />
						<span className='hidden sm:inline'>Search</span>
					</Button>
					<Button
						variant='ghost'
						size='sm'
						className='gap-2'
					>
						<Bell className='size-4' />
						<span className='hidden sm:inline'>Notifications</span>
					</Button>
				</ActionBarNav>

				<ActionBarActions>
					<Button
						variant='ghost'
						size='icon'
						className='size-8'
					>
						<User className='size-4' />
					</Button>
				</ActionBarActions>
			</ActionBar>
		</ActionBarProvider>
	);
}

/**
 * CONTEXTUAL MODE - Shopping Cart
 * Appears when items are in cart
 */
export function ShoppingCartDemo() {
	const [cartItems, setCartItems] = React.useState(0);
	const [isOpen, setIsOpen] = React.useState(false);

	React.useEffect(() => {
		// Simulate adding items to cart
		const timer = setTimeout(() => {
			setCartItems(3);
			setIsOpen(true);
		}, 1000);
		return () => clearTimeout(timer);
	}, []);

	const handleCheckout = () => {
		console.log('Proceeding to checkout...');
		setIsOpen(false);
		setCartItems(0);
	};

	const handleClear = () => {
		setCartItems(0);
		setIsOpen(false);
	};

	return (
		<>
			{/* Trigger button to simulate adding to cart */}
			<div className='flex justify-center mb-4'>
				<Button
					onClick={() => {
						setCartItems((prev) => prev + 1);
						setIsOpen(true);
					}}
					disabled={isOpen}
				>
					Add to Cart
				</Button>
			</div>

			<ActionBarProvider
				mode='contextual'
				open={isOpen}
				onOpenChange={setIsOpen}
			>
				<ActionBar variant='default'>
					<ActionBarContent>
						<ActionBarHeader>
							<ShoppingCart className='size-5' />
							<ActionBarTitle>{cartItems} items in cart</ActionBarTitle>
						</ActionBarHeader>
					</ActionBarContent>

					<ActionBarActions>
						<Button
							size='sm'
							onClick={handleCheckout}
						>
							Checkout
						</Button>
						<Button
							size='sm'
							variant='outline'
							onClick={handleClear}
						>
							Clear
						</Button>
					</ActionBarActions>
				</ActionBar>
			</ActionBarProvider>
		</>
	);
}

/**
 * CONTEXTUAL MODE - Bulk Selection
 * Appears when items are selected
 */
export function BulkSelectionDemo() {
	const [selectedCount, setSelectedCount] = React.useState(0);
	const [isOpen, setIsOpen] = React.useState(false);

	const handleSelect = () => {
		const newCount = selectedCount + 1;
		setSelectedCount(newCount);
		setIsOpen(true);
	};

	const handleDelete = () => {
		console.log(`Deleting ${selectedCount} items...`);
		setSelectedCount(0);
		setIsOpen(false);
	};

	const handleClear = () => {
		setSelectedCount(0);
		setIsOpen(false);
	};

	return (
		<>
			<div className='flex justify-center gap-2 mb-4'>
				<Button
					onClick={handleSelect}
					variant='outline'
				>
					Select Item ({selectedCount})
				</Button>
			</div>

			<ActionBarProvider
				mode='contextual'
				open={isOpen}
				onOpenChange={setIsOpen}
			>
				<ActionBar>
					<ActionBarContent>
						<ActionBarClose />
						<ActionBarHeader>
							<ActionBarTitle>{selectedCount} selected</ActionBarTitle>
						</ActionBarHeader>
					</ActionBarContent>

					<ActionBarActions>
						<Button
							size='sm'
							variant='destructive'
							onClick={handleDelete}
						>
							<Trash2 className='size-4' />
							Delete
						</Button>
						<Button
							size='sm'
							variant='outline'
							onClick={handleClear}
						>
							Cancel
						</Button>
					</ActionBarActions>
				</ActionBar>
			</ActionBarProvider>
		</>
	);
}

/**
 * CONTEXTUAL MODE - Success Notification
 * Auto-dismiss after 5 seconds
 */
export function SuccessNotificationDemo() {
	const [isOpen, setIsOpen] = React.useState(false);

	const triggerNotification = () => {
		setIsOpen(true);
		setTimeout(() => setIsOpen(false), 5000);
	};

	return (
		<>
			<div className='flex justify-center mb-4'>
				<Button onClick={triggerNotification}>Save Changes</Button>
			</div>

			<ActionBarProvider
				mode='contextual'
				open={isOpen}
				onOpenChange={setIsOpen}
			>
				<ActionBar variant='success'>
					<ActionBarContent>
						<ActionBarHeader>
							<Check className='size-5 text-green-600' />
							<ActionBarTitle>Changes saved successfully</ActionBarTitle>
						</ActionBarHeader>
					</ActionBarContent>

					<ActionBarActions>
						<ActionBarClose />
					</ActionBarActions>
				</ActionBar>
			</ActionBarProvider>
		</>
	);
}

/**
 * CONTEXTUAL MODE with Trigger
 * Toggle open/close programmatically
 */
export function TriggerDemo() {
	return (
		<ActionBarProvider
			mode='contextual'
			defaultOpen={false}
		>
			<div className='flex justify-center mb-4'>
				<ActionBarTrigger>Toggle Action Bar</ActionBarTrigger>
			</div>

			<ActionBar variant='default'>
				<ActionBarContent>
					<ActionBarHeader>
						<ActionBarTitle>Triggered Action Bar</ActionBarTitle>
					</ActionBarHeader>
				</ActionBarContent>

				<ActionBarActions>
					<Button size='sm'>Primary Action</Button>
					<ActionBarClose />
				</ActionBarActions>
			</ActionBar>
		</ActionBarProvider>
	);
}

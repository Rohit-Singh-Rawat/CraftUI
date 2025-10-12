'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '@craft/ui/lib/utils';

const actionBarVariants = cva(
	'fixed left-1/2 -translate-x-1/2 z-50 border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-lg transition-all duration-300 ease-out rounded-lg',
	{
		variants: {
			variant: {
				default: 'border-border',
				destructive: 'border-destructive/50 bg-destructive/5',
				success: 'border-green-500/50 bg-green-500/5',
				warning: 'border-yellow-500/50 bg-yellow-500/5',
			},
			size: {
				default: 'h-14',
				sm: 'h-12',
				lg: 'h-16',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

interface ActionBarContextValue {
	mode: 'dock' | 'contextual';
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
}

const ActionBarContext = React.createContext<ActionBarContextValue | undefined>(undefined);

const useActionBar = () => {
	const context = React.useContext(ActionBarContext);
	if (!context) {
		throw new Error('ActionBar components must be used within ActionBarProvider');
	}
	return context;
};

interface ActionBarProviderProps {
	children: React.ReactNode;
	/**
	 * Mode of the action bar
	 * - "dock": Always visible, persistent floating nav (like mobile tab bar or macOS dock)
	 * - "contextual": Show/hide based on context (selections, cart, notifications, etc.)
	 * @default "contextual"
	 */
	mode?: 'dock' | 'contextual';
	/**
	 * Controlled open state (only for contextual mode)
	 */
	open?: boolean;
	/**
	 * Callback when open state changes (only for contextual mode)
	 */
	onOpenChange?: (open: boolean) => void;
	/**
	 * Default open state for uncontrolled (only for contextual mode)
	 * @default false
	 */
	defaultOpen?: boolean;
}

const ActionBarProvider = React.forwardRef<HTMLDivElement, ActionBarProviderProps>(
	(
		{ children, mode = 'contextual', open: controlledOpen, onOpenChange, defaultOpen = false },
		ref
	) => {
		const [internalOpen, setInternalOpen] = React.useState(defaultOpen);

		const isControlled = controlledOpen !== undefined;
		const isOpen = mode === 'dock' ? true : isControlled ? controlledOpen : internalOpen;

		const setIsOpen = React.useCallback(
			(newOpen: boolean) => {
				if (mode === 'dock') return; // Dock mode is always visible
				if (!isControlled) {
					setInternalOpen(newOpen);
				}
				onOpenChange?.(newOpen);
			},
			[mode, isControlled, onOpenChange]
		);

		return (
			<ActionBarContext.Provider value={{ mode, isOpen, setIsOpen }}>
				<div
					ref={ref}
					data-mode={mode}
					data-state={isOpen ? 'open' : 'closed'}
					className='fixed left-1/2 -translate-x-1/2 z-50 border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-lg transition-all duration-300 ease-out rounded-lg'
				>
					{children}
				</div>
			</ActionBarContext.Provider>
		);
	}
);
ActionBarProvider.displayName = 'ActionBarProvider';

interface ActionBarProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof actionBarVariants> {
	/**
	 * Animation delay in ms (only for contextual mode)
	 * @default 100
	 */
	animationDelay?: number;
	/**
	 * Distance from bottom in pixels
	 * @default 24
	 */
	bottomOffset?: number;
	/**
	 * Max width of the action bar
	 * @default "640px"
	 */
	maxWidth?: string;
}

const ActionBar = React.forwardRef<HTMLDivElement, ActionBarProps>(
	(
		{
			className,
			variant,
			size,
			animationDelay = 100,
			bottomOffset = 24,
			maxWidth = '640px',
			children,
			...props
		},
		ref
	) => {
		const { mode, isOpen } = useActionBar();
		const [mounted, setMounted] = React.useState(false);

		// Animate on mount for contextual mode
		React.useEffect(() => {
			if (mode === 'contextual' && isOpen) {
				const timer = setTimeout(() => {
					setMounted(true);
				}, animationDelay);
				return () => clearTimeout(timer);
			} else if (mode === 'dock') {
				setMounted(true);
			}
		}, [mode, isOpen, animationDelay]);

		// Reset mounted state when closed
		React.useEffect(() => {
			if (!isOpen) {
				setMounted(false);
			}
		}, [isOpen]);

		if (!isOpen) return null;

		return (
			<div
				ref={ref}
				role='toolbar'
				aria-label='Action bar'
				style={{
					bottom: `${bottomOffset}px`,
					maxWidth,
				}}
				className={cn(
					actionBarVariants({ variant, size }),
					'w-[calc(100%-2rem)] sm:w-auto sm:min-w-96',
					// Contextual mode animations
					mode === 'contextual' && [
						!mounted && 'translate-y-[calc(100%+2rem)] opacity-0',
						mounted && 'translate-y-0 opacity-100',
					],
					className
				)}
				{...props}
			>
				<div className='flex h-full w-full items-center justify-between gap-4 px-4'>{children}</div>
			</div>
		);
	}
);
ActionBar.displayName = 'ActionBar';

const ActionBarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn('flex items-center gap-3', className)}
				{...props}
			>
				{children}
			</div>
		);
	}
);
ActionBarHeader.displayName = 'ActionBarHeader';

const ActionBarTitle = React.forwardRef<
	HTMLHeadingElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
	return (
		<h2
			ref={ref}
			className={cn('text-sm font-semibold leading-none', className)}
			{...props}
		/>
	);
});
ActionBarTitle.displayName = 'ActionBarTitle';

const ActionBarDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
	return (
		<p
			ref={ref}
			className={cn('text-sm text-muted-foreground', className)}
			{...props}
		/>
	);
});
ActionBarDescription.displayName = 'ActionBarDescription';

const ActionBarActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn('flex items-center gap-2', className)}
				{...props}
			>
				{children}
			</div>
		);
	}
);
ActionBarActions.displayName = 'ActionBarActions';

interface ActionBarCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	/**
	 * Screen reader text for the close button
	 * @default "Close"
	 */
	srText?: string;
}

const ActionBarClose = React.forwardRef<HTMLButtonElement, ActionBarCloseProps>(
	({ className, srText = 'Close', onClick, ...props }, ref) => {
		const { setIsOpen } = useActionBar();

		const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
			setIsOpen(false);
			onClick?.(event);
		};

		return (
			<button
				ref={ref}
				type='button'
				onClick={handleClick}
				className={cn(
					'inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
					className
				)}
				aria-label={srText}
				{...props}
			>
				<X className='size-4' />
				<span className='sr-only'>{srText}</span>
			</button>
		);
	}
);
ActionBarClose.displayName = 'ActionBarClose';

const ActionBarSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				role='separator'
				aria-orientation='vertical'
				className={cn('h-8 w-px bg-border', className)}
				{...props}
			/>
		);
	}
);
ActionBarSeparator.displayName = 'ActionBarSeparator';

const ActionBarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn('flex flex-1 items-center gap-4', className)}
				{...props}
			/>
		);
	}
);
ActionBarContent.displayName = 'ActionBarContent';

const ActionBarLogo = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn('flex shrink-0 items-center gap-2', className)}
				{...props}
			/>
		);
	}
);
ActionBarLogo.displayName = 'ActionBarLogo';

const ActionBarNav = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
	({ className, ...props }, ref) => {
		return (
			<nav
				ref={ref}
				className={cn('flex flex-1 items-center justify-center gap-1', className)}
				{...props}
			/>
		);
	}
);
ActionBarNav.displayName = 'ActionBarNav';

const ActionBarTrigger = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, onClick, children, ...props }, ref) => {
	const { setIsOpen, isOpen } = useActionBar();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setIsOpen(!isOpen);
		onClick?.(event);
	};

	return (
		<button
			ref={ref}
			type='button'
			onClick={handleClick}
			className={cn(
				'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
});
ActionBarTrigger.displayName = 'ActionBarTrigger';

export {
	ActionBarProvider,
	ActionBar,
	ActionBarHeader,
	ActionBarTitle,
	ActionBarDescription,
	ActionBarActions,
	ActionBarClose,
	ActionBarSeparator,
	ActionBarContent,
	ActionBarLogo,
	ActionBarNav,
	ActionBarTrigger,
	useActionBar,
	actionBarVariants,
	type ActionBarProps,
	type ActionBarProviderProps,
};

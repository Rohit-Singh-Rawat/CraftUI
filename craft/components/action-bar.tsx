'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const actionBarVariants = cva(
	'fixed z-50 p-3 border overflow-hidden border-border/50 bg-popover/95 backdrop-blur-md text-popover-foreground shadow-lg',
	{
		variants: {
			size: {
				sm: 'p-3',
				md: 'p-4',
				lg: 'p-5',
			},
			position: {
				top: 'left-1/2 -translate-x-1/2 rounded-2xl',
				bottom: 'left-1/2 -translate-x-1/2 rounded-2xl',
				left: 'top-1/2 -translate-y-1/2 rounded-2xl',
				right: 'top-1/2 -translate-y-1/2 rounded-2xl',
				'top-left': 'rounded-2xl',
				'top-right': 'rounded-2xl',
				'bottom-left': 'rounded-2xl',
				'bottom-right': 'rounded-2xl',
			},
		},
		defaultVariants: {
			size: 'md',
			position: 'bottom',
		},
	}
);

interface ActionBarContextValue {
	mode: 'dock' | 'contextual';
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	position:
		| 'top'
		| 'bottom'
		| 'left'
		| 'right'
		| 'top-left'
		| 'top-right'
		| 'bottom-left'
		| 'bottom-right';
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
	 * Position of the action bar
	 * @default "bottom"
	 */
	position?:
		| 'top'
		| 'bottom'
		| 'left'
		| 'right'
		| 'top-left'
		| 'top-right'
		| 'bottom-left'
		| 'bottom-right';
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
		{
			children,
			mode = 'contextual',
			position = 'bottom',
			open: controlledOpen,
			onOpenChange,
			defaultOpen = false,
		},
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
			<ActionBarContext.Provider value={{ mode, isOpen, setIsOpen, position }}>
				<div
					ref={ref}
					data-mode={mode}
					data-state={isOpen ? 'open' : 'closed'}
					data-position={position}
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
	 * Offset from the edge in pixels
	 * For top/bottom positions: affects top/bottom spacing
	 * For left/right positions: affects left/right spacing
	 * For corner positions: affects both axes
	 * @default 16
	 */
	offset?: number;
	/**
	 * Maximum width for horizontal positions (top, bottom, corners)
	 * @default "640px"
	 */
	maxWidth?: string;
	/**
	 * Maximum height for vertical positions (left, right)
	 * @default "calc(100vh - 2rem)"
	 */
	maxHeight?: string;
}

const ActionBar = React.forwardRef<HTMLDivElement, ActionBarProps>(
	(
		{
			className,
			animationDelay = 100,
			offset = 16,
			maxWidth = '640px',
			maxHeight = 'calc(100vh - 2rem)',
			size,
			position,
			children,
			...props
		},
		ref
	) => {
		const { mode, isOpen, position: contextPosition } = useActionBar();
		const [shouldRender, setShouldRender] = React.useState(mode === 'dock' || isOpen);

		const finalPosition = position || contextPosition;
		const isVertical = finalPosition === 'left' || finalPosition === 'right';

		// Handle mounting/unmounting with delay for exit animation
		React.useEffect(() => {
			if (isOpen) {
				setShouldRender(true);
			} else if (mode === 'contextual') {
				// Delay unmounting to allow exit animation (300ms matches duration-300)
				const timer = setTimeout(() => {
					setShouldRender(false);
				}, 300);
				return () => clearTimeout(timer);
			}
		}, [mode, isOpen]);

		if (!shouldRender) return null;

		// Calculate positioning styles based on position and offset
		const getPositionStyles = () => {
			const styles: React.CSSProperties = {};

			switch (finalPosition) {
				case 'top':
					styles.top = `${offset}px`;
					styles.maxWidth = maxWidth;
					break;
				case 'bottom':
					styles.bottom = `${offset}px`;
					styles.maxWidth = maxWidth;
					break;
				case 'left':
					styles.left = `${offset}px`;
					styles.maxHeight = maxHeight;
					break;
				case 'right':
					styles.right = `${offset}px`;
					styles.maxHeight = maxHeight;
					break;
				case 'top-left':
					styles.top = `${offset}px`;
					styles.left = `${offset}px`;
					styles.maxWidth = maxWidth;
					break;
				case 'top-right':
					styles.top = `${offset}px`;
					styles.right = `${offset}px`;
					styles.maxWidth = maxWidth;
					break;
				case 'bottom-left':
					styles.bottom = `${offset}px`;
					styles.left = `${offset}px`;
					styles.maxWidth = maxWidth;
					break;
				case 'bottom-right':
					styles.bottom = `${offset}px`;
					styles.right = `${offset}px`;
					styles.maxWidth = maxWidth;
					break;
			}

			return styles;
		};

		// Animation classes based on position
		const getAnimationClasses = () => {
			if (mode !== 'contextual') return '';

			switch (finalPosition) {
				case 'bottom':
				case 'bottom-left':
				case 'bottom-right':
					return 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom-10 data-[state=open]:slide-in-from-bottom-10 data-[state=closed]:zoom-out-98 data-[state=open]:zoom-in-98 duration-300';
				case 'top':
				case 'top-left':
				case 'top-right':
					return 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-10 data-[state=open]:slide-in-from-top-10 data-[state=closed]:zoom-out-98 data-[state=open]:zoom-in-98 duration-300';
				case 'left':
					return 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-left-10 data-[state=open]:slide-in-from-left-10 data-[state=closed]:zoom-out-98 data-[state=open]:zoom-in-98 duration-300';
				case 'right':
					return 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-right-10 data-[state=open]:slide-in-from-right-10 data-[state=closed]:zoom-out-98 data-[state=open]:zoom-in-98 duration-300';
				default:
					return '';
			}
		};

		return (
			<div
				ref={ref}
				role='toolbar'
				aria-label='Action bar'
				data-state={isOpen ? 'open' : 'closed'}
				style={getPositionStyles()}
				className={cn(
					actionBarVariants({ size, position: finalPosition }),
					// Sizing based on orientation
					isVertical ? 'w-auto min-h-[200px]' : 'w-[calc(100%-2rem)] sm:w-auto sm:min-w-[400px]',
					// Contextual mode animations
					mode === 'contextual' && getAnimationClasses(),
					className
				)}
				{...props}
			>
				<div
					className={cn(
						'flex h-full w-full gap-6',
						isVertical
							? 'flex-col items-center justify-start'
							: 'flex-row items-center justify-between'
					)}
				>
					{children}
				</div>
			</div>
		);
	}
);
ActionBar.displayName = 'ActionBar';

const ActionBarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, children, ...props }, ref) => {
		const { position } = useActionBar();
		const isVertical = position === 'left' || position === 'right';

		return (
			<div
				ref={ref}
				className={cn(
					'flex gap-4',
					isVertical ? 'flex-col items-center text-center' : 'items-center',
					className
				)}
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
			className={cn('text-base font-medium leading-tight', className)}
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
			className={cn('text-sm text-muted-foreground leading-relaxed', className)}
			{...props}
		/>
	);
});
ActionBarDescription.displayName = 'ActionBarDescription';

const ActionBarActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, children, ...props }, ref) => {
		const { position } = useActionBar();
		const isVertical = position === 'left' || position === 'right';

		return (
			<div
				ref={ref}
				className={cn(
					'flex gap-3',
					isVertical ? 'flex-col items-center' : 'items-center',
					className
				)}
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
					'inline-flex size-9 items-center justify-center rounded-xl text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-105',
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
		const { position } = useActionBar();
		const isVertical = position === 'left' || position === 'right';

		return (
			<div
				ref={ref}
				role='separator'
				aria-orientation={isVertical ? 'horizontal' : 'vertical'}
				className={cn('bg-border/60', isVertical ? 'h-px w-10' : 'h-10 w-px', className)}
				{...props}
			/>
		);
	}
);
ActionBarSeparator.displayName = 'ActionBarSeparator';

const ActionBarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		const { position } = useActionBar();
		const isVertical = position === 'left' || position === 'right';

		return (
			<div
				ref={ref}
				className={cn(
					'flex flex-1 gap-6',
					isVertical ? 'flex-col items-center' : 'items-center',
					className
				)}
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
				className={cn('flex shrink-0 items-center gap-3', className)}
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
				className={cn('flex flex-1 items-center justify-center gap-2', className)}
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
				'inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-105 active:scale-95',
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
	type ActionBarProps,
	type ActionBarProviderProps,
};

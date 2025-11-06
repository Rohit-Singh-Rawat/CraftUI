import { useEffect, useRef, useState } from 'react';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type ContainerSize = {
	width: number;
	height: number;
	breakpoint: Breakpoint;
	isFullWidth: boolean;
};

const breakpoints = {
	xs: 0,
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	'2xl': 1536,
} as const;

function getBreakpoint(width: number): Breakpoint {
	if (width >= breakpoints['2xl']) return '2xl';
	if (width >= breakpoints.xl) return 'xl';
	if (width >= breakpoints.lg) return 'lg';
	if (width >= breakpoints.md) return 'md';
	if (width >= breakpoints.sm) return 'sm';
	return 'xs';
}

export type UseContainerSizeOptions = {
	/** Minimum width to consider as "full width" (default: 1024px / lg breakpoint) */
	fullWidthThreshold?: number;
	/** Initial width if container ref is not available (default: 0) */
	initialWidth?: number;
};

/**
 * useContainerSize - Tracks container size and breakpoint using ResizeObserver
 * Returns current width, height, breakpoint, and whether container is considered "full width"
 */
export function useContainerSize(
	options: UseContainerSizeOptions = {}
): [React.RefObject<HTMLDivElement>, ContainerSize] {
	const { fullWidthThreshold = breakpoints.lg, initialWidth = 0 } = options;
	const containerRef = useRef<HTMLDivElement>(null);
	const [size, setSize] = useState<ContainerSize>({
		width: initialWidth,
		height: 0,
		breakpoint: getBreakpoint(initialWidth),
		isFullWidth: initialWidth >= fullWidthThreshold,
	});

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const { width, height } = entry.contentRect;
				const breakpoint = getBreakpoint(width);
				const isFullWidth = width >= fullWidthThreshold;

				setSize({
					width,
					height,
					breakpoint,
					isFullWidth,
				});
			}
		});

		resizeObserver.observe(container);

		return () => {
			resizeObserver.disconnect();
		};
	}, [fullWidthThreshold]);

	return [containerRef, size];
}

export default useContainerSize;


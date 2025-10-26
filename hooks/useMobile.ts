import { useEffect, useState } from 'react';

/**
 * Hook to detect if the viewport is mobile size (< 768px)
 * @param breakpoint - Optional custom breakpoint in pixels (default: 768)
 * @returns boolean indicating if viewport is mobile size
 */
export function useMobile(breakpoint: number = 768): boolean {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < breakpoint);
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => window.removeEventListener('resize', checkMobile);
	}, [breakpoint]);

	return isMobile;
}

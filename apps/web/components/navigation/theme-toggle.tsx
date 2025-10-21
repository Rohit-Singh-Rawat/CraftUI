'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Moon01Icon, Sun01Icon } from '@hugeicons/core-free-icons';

export default function ThemeSwitch() {
	const { setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <div className='size-11'></div>;
	}

	function switchTheme() {
		setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
	}

	function onThemeChange() {
		if (!document.startViewTransition) {
			switchTheme();
		} else {
			document.startViewTransition(switchTheme);
		}
	}

	return (
		<div className='flex items-center justify-center'>
			<button
				aria-label='Switch theme'
				type='button'
				onClick={onThemeChange}
				className='ml-1 flex size-10 flex-col items-center justify-center overflow-hidden rounded-md font-medium duration-200 ease-in-out'
			>
				{resolvedTheme === 'light' && (
					<HugeiconsIcon
						icon={Moon01Icon}
						size={15}
					/>
				)}
				{resolvedTheme === 'dark' && (
					<HugeiconsIcon
						icon={Sun01Icon}
						size={15}
					/>
				)}
			</button>
		</div>
	);
}

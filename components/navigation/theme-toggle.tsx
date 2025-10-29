'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Moon01Icon, Sun01Icon } from '@hugeicons/core-free-icons';
import { Button } from '../ui/button';

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
			<Button
				aria-label='Switch theme'
				type='button'
				onClick={onThemeChange}
				className='flex mr-1 size-7 flex-col items-center justify-center overflow-hidden  font-medium duration-200 ease-in-out rounded-full'
				size='icon'
				variant='ghost'
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
			</Button>
		</div>
	);
}

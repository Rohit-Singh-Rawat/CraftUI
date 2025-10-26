import * as React from 'react';
import { cn } from '@/lib/utils';

interface DottedBorderProps extends React.HTMLAttributes<HTMLDivElement> {
	offset?: number;
	height?: number;
	width?: number;
	fadeStop?: string;
	orientation?: 'horizontal' | 'vertical';
	position?: 'top' | 'bottom' | 'left' | 'right';
}

export function DottedBorder({
	className,
	offset = 40,
	height = 1,
	width = 5,
	fadeStop = '90%',
	orientation = 'horizontal',
	position = 'bottom',
	...props
}: DottedBorderProps) {
	const isHorizontal = orientation === 'horizontal';
	const positionClasses = {
		top: '-top-2.5',
		bottom: '-bottom-2.5',
		left: '-left-2.5',
		right: '-right-2.5',
	};

	return (
		<div
			className={cn(
				'absolute z-10',
				isHorizontal
					? `left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))] bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)] [mask-composite:exclude] dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]`
					: `top-[calc(var(--offset)/2*-1)] w-[var(--height)] h-[calc(100%+var(--offset))] bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--height)_var(--width)] [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)] [mask-composite:exclude] dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]`,
				positionClasses[position],
				className
			)}
			style={
				{
					'--background': '#ffffff',
					'--color': 'rgba(0, 0, 0, 0.2)',
					'--height': `${height}px`,
					'--width': `${width}px`,
					'--fade-stop': fadeStop,
					'--offset': `${offset}px`,
					'--color-dark': 'rgba(255, 255, 255, 0.2)',
					maskComposite: 'exclude',
				} as React.CSSProperties
			}
			{...props}
		/>
	);
}

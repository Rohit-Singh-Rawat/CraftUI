'use client';
import { useState, useMemo } from 'react';
import { cn } from '@craft/ui/lib/utils';
import { isUnsupportedBrowser } from '@craft/ui/utils/is-unsupported-browser';

interface LogoProps {
	size?: number;
	className?: string;
}

const Logo = ({ size = 80, className }: LogoProps) => {
	const isUnsupported = useMemo(() => isUnsupportedBrowser(), []);

	// Generate random elements but ensure they're consistent across renders
	const [logoElements] = useState(() => {
		return Array.from({ length: 15 }, (_, i) => {
			const colors = [
				'#ef4444',
				'#3b82f6',
				'#eab308',
				'#22c55e',
				'#a855f7',
				'#f97316',
				'#06b6d4',
				'#ec4899',
				'#84cc16',
				'#f59e0b',
				'#8b5cf6',
			];
			return {
				cx: Math.random() * 100,
				cy: Math.random() * 100,
				color: colors[Math.floor(Math.random() * colors.length)],
				duration: 5 + Math.random() * 4,
				key: i,
			};
		});
	});

	// Simple gradient logo for unsupported browsers
	if (isUnsupported) {
		return (
			<div className={cn('logo', className)}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					version='1.1'
					width={size}
					height={size}
					viewBox='0 0 100 100'
					className={cn(`size-${size} rounded-full`, className)}
				>
					<defs>
						<linearGradient
							id='gradient'
							x1='0%'
							y1='0%'
							x2='100%'
							y2='100%'
						>
							<stop
								offset='0%'
								stopColor='#3b82f6'
							/>
							<stop
								offset='100%'
								stopColor='#f97316'
							/>
						</linearGradient>
					</defs>
					<circle
						cx='50'
						cy='50'
						r='40'
						fill='url(#gradient)'
					/>
				</svg>
			</div>
		);
	}

	return (
		<div
			className={cn('logo', className)}
			style={{
				WebkitFilter: 'url("#goo")',

				filter: 'url("#goo")',
			}}
		>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				version='1.1'
				width={size}
				height={size}
				viewBox='0 0 100 100'
				className={cn(`size-${size} rounded-full bg-black`, className)}
			>
				<defs>
					<filter
						className='goo'
						id='goo'
					>
						<feGaussianBlur
							in='SourceGraphic'
							stdDeviation='10'
							result='blur'
						/>
						<feColorMatrix
							in='blur'
							mode='matrix'
							values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9'
							result='goo'
						/>
					</filter>
				</defs>
				{logoElements.map((element) => (
					<circle
						key={element.key}
						cx={element.cx}
						filter='url(#goo)'
						cy={element.cy}
						r='24%'
						fill={element.color}
					>
						<animate
							attributeName='cx'
							values={`${element.cx};${Math.random() * 100};${element.cx}`}
							dur={`${element.duration}s`}
							repeatCount='indefinite'
						/>
						<animate
							attributeName='cy'
							values={`${element.cy};${Math.random() * 100};${element.cy}`}
							dur={`${element.duration}s`}
							repeatCount='indefinite'
						/>
					</circle>
				))}
			</svg>
		</div>
	);
};

export default Logo;

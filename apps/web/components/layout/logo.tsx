'use client';
import { useState } from 'react';

interface LogoProps {
	size?: number;
	className?: string;
}

const Logo = ({ size = 80, className = 'size-10 rounded-full bg-black' }: LogoProps) => {
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

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			version='1.1'
			width={size}
			height={size}
			viewBox='0 0 100 100'
			className={className}
		>
			<defs>
				<filter id='logo-goo'>
					<feGaussianBlur
						in='SourceGraphic'
						stdDeviation='3'
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
					cy={element.cy}
					r='24%'
					filter='url(#logo-goo)'
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
	);
};

export default Logo;

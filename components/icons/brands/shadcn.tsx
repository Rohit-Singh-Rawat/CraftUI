import React from 'react';

interface ShadcnLogoProps extends React.SVGProps<SVGSVGElement> {
	className?: string;
}

export function ShadcnLogo({ className = 'size-5', ...props }: ShadcnLogoProps) {
	return (
		<svg
			className={className}
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 256 256'
			{...props}
		>
			<rect
				width='256'
				height='256'
				fill='none'
			></rect>
			<line
				x1='208'
				y1='128'
				x2='128'
				y2='208'
				fill='none'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='32'
			></line>
			<line
				x1='192'
				y1='40'
				x2='40'
				y2='192'
				fill='none'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='32'
			></line>
		</svg>
	);
}

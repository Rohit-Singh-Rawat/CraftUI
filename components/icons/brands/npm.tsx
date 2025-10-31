import React from 'react';

interface NpmLogoProps extends React.SVGProps<SVGSVGElement> {
	className?: string;
}

export function NpmLogo({ className = 'size-3', ...props }: NpmLogoProps) {
	return (
		<svg
			className={className}
			xmlns='http://www.w3.org/2000/svg'
			width='32'
			height='32'
			viewBox='0 0 256 256'
			{...props}
		>
			<path
				fill='#C12127'
				d='M0 256V0h256v256z'
			></path>
			<path
				fill='#FFF'
				d='M48 48h160v160h-32V80h-48v128H48z'
			></path>
		</svg>
	);
}

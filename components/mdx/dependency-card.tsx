import React from 'react';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { NpmLogo } from '@/components/icons/brands/npm';

interface DependencyCardProps {
	name: string;
	href: string;
	logo?: React.ReactNode;
	label?: string;
	className?: string;
}

export function DependencyCard({
	name,
	href,
	logo = <NpmLogo className='size-4 shrink-0' />,
	label,
	className,
}: DependencyCardProps) {
	return (
		<Link
			href={href}
			target='_blank'
			rel='noopener noreferrer'
			className={cn(
				'inline-flex items-center gap-3 px-4 py-2 rounded-lg  bg-secondary hover:bg-secondary/80 transition-colors text-sm',
				className
			)}
		>
			{logo}
			<span className='font-medium'>{name}</span>
			{label && <Label className='text-xs px-2 py-0.5 bg-muted rounded font-normal'>{label}</Label>}
		</Link>
	);
}

interface DependenciesContainerProps {
	children: React.ReactNode;
	className?: string;
}

export function DependenciesContainer({ children, className }: DependenciesContainerProps) {
	return <div className={cn('flex flex-wrap gap-3 my-6', className)}>{children}</div>;
}

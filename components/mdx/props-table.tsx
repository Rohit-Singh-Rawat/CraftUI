import React from 'react';
import { cn } from '@/lib/utils';

interface PropsTableProps {
	children: React.ReactNode;
	className?: string;
}

export function PropsTable({ children, className }: PropsTableProps) {
	return (
		<div className={cn('my-6 overflow-x-auto', className)}>
			<table className='w-full border-collapse'>
				<thead>
					<tr>
						<th className='text-left py-3 px-4 font-medium text-muted-foreground text-sm border-b border-border uppercase'>
							Props
						</th>
						<th className='text-left py-3 px-4 font-medium text-muted-foreground text-sm border-b border-border uppercase'>
							Description
						</th>
						<th className='text-left py-3 px-4 font-medium text-muted-foreground text-sm border-b border-border uppercase'>
							Default
						</th>
					</tr>
				</thead>
				<tbody>{children}</tbody>
			</table>
		</div>
	);
}

interface PropsTableRowProps {
	prop: string;
	description: string;
	defaultValue?: string;
}

export function PropsTableRow({ prop, description, defaultValue = '-' }: PropsTableRowProps) {
	return (
		<tr>
			<td className='py-3 px-4 border-b border-border/50'>
				<code className='text-sm font-mono bg-muted/50 px-2 py-1 rounded-md'>{prop}</code>
			</td>
			<td className='py-3 px-4 border-b border-border/50 text-sm'>{description}</td>
			<td className='py-3 px-4 border-b border-border/50 text-sm text-muted-foreground'>
				{defaultValue}
			</td>
		</tr>
	);
}

import { cn } from '@/lib/utils';
import Link from 'next/link';

interface HeadingProps {
	heading: string;
	subheading: string;
	className?: string;
}

export function Heading({ heading, subheading, className }: HeadingProps) {
	return (
		<div className={cn('flex items-center gap-1 font-light  text-muted-foreground', className)}>
			<Link
				href='/diary'
				className='hover:text-foreground transition-colors'
			>
				Diary
			</Link>
			<span className='text-muted-foreground font-extralight'>•</span>
			<p>{subheading}</p>
			<span className='text-muted-foreground font-extralight'>•</span>
			<h1>{heading}</h1>
		</div>
	);
}

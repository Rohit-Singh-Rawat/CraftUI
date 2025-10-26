import { cn } from '@/lib/utils';

interface HeadingProps {
	heading: string;
	subheading: string;
	className?: string;
}

export function Heading({ heading, subheading, className }: HeadingProps) {
	return (
		<div className={cn('flex items-center gap-2 font-medium text-muted-foreground', className)}>
			<h1>{heading}</h1>
			<span className='text-muted-foreground font-normal'>•</span>
			<p>{subheading}</p>
		</div>
	);
}

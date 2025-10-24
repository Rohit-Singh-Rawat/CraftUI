import { cn } from '@craft/ui/lib/utils';

interface ContainerProps {
	children: React.ReactNode;
	className?: string;
}

export function Container({ children, className }: ContainerProps) {
	return <div className={cn('rounded-3xl bg-secondary p-6 z-20', className)}>{children}</div>;
}

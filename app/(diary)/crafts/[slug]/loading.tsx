import { HugeiconsIcon } from '@hugeicons/react';
import { Loading03Icon } from '@hugeicons/core-free-icons';

export default function Loading() {
	return (
		<div className='flex h-full w-full flex-1 items-center justify-center'>
			<div className='flex flex-col items-center gap-4'>
				<HugeiconsIcon
					icon={Loading03Icon}
					className='size-6 animate-spin text-primary/50'
				/>
				<p className='text-sm text-muted-foreground sr-only'>Loading craft...</p>
			</div>
		</div>
	);
}

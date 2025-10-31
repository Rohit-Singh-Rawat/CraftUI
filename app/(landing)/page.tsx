import { Button } from '@/components/ui/button';
import { Cancel01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/utils';

export const metadata: Metadata = generateMetadata();

export default function Page() {
	return (
		<main className='relative min-h-screen flex flex-col items-center justify-center py-10 lg:py-20 overflow-hidden'>
			<Background />
			<div className='relative z-10 w-full h-full flex flex-col items-center justify-center gap-4 px-4 lg:px-0 lg:grid lg:grid-cols-8 lg:gap-0 lg:grid-rows-4'>
				<div className='max-w-4xl mx-auto text-center space-y-4 lg:space-y-8 relative z-10 border border-dashed border-muted-foreground/20 lg:col-start-2 lg:col-span-5 h-fit bg-background p-6 lg:p-10 font-serif group lg:row-span-2'>
					{[
						{ top: '-top-3', left: '-left-3', rotate: 'rotate-45' },
						{ top: '-top-3', right: '-right-3', rotate: 'rotate-45' },
						{ bottom: '-bottom-11', left: '-left-3', rotate: 'rotate-45' },
						{ bottom: '-bottom-11', right: '-right-3', rotate: 'rotate-45' },
					].map((position, i) => (
						<HugeiconsIcon
							key={i}
							icon={Cancel01Icon}
							size={24}
							strokeWidth={3}
							className={`text-muted-foreground/50 group-hover:text-muted-foreground/70 transition-all duration-300 ease-in-out group-hover:rotate-180 ${
								position.rotate
							} absolute ${position.top || ''} ${position.bottom || ''} ${position.left || ''} ${
								position.right || ''
							}`}
						/>
					))}
					<h1 className='text-3xl sm:text-4xl lg:text-6xl xl:text-8xl font-light tracking-tight'>
						A <span className='text-primary italic'>Collection</span> of Digital Crafts
					</h1>

					<p className='text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto'>
						A diary of crafts including CSS, SVG, motion, and more
					</p>
				</div>
				<div className='flex flex-row gap-4 justify-center items-center lg:col-span-3 lg:row-span-2 lg:row-start-3 lg:col-start-6 lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-0'>
					<Link href='/diary'>
						{' '}
						<Button
							variant='outline'
							className='rounded-none h-fit w-fit lg:py-5'
							style={{ writingMode: 'horizontal-tb', textOrientation: 'mixed' }}
						>
							<span className='lg:hidden'>View Diary</span>
							<span
								className='hidden lg:inline'
								style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
							>
								View Diary
							</span>
						</Button>{' '}
					</Link>
					<Link
						href='/crafts'
						className='lg:row-start-2 lg:col-start-2'
					>
						<Button
							variant='default'
							className='rounded-none h-fit w-fit  lg:py-5'
							style={{ writingMode: 'horizontal-tb', textOrientation: 'mixed' }}
						>
							<span className='lg:hidden'>Explore Crafts</span>
							<span
								className='hidden lg:inline'
								style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
							>
								Explore Crafts
							</span>
						</Button>
					</Link>
				</div>
			</div>
		</main>
	);
}
const Background = () => {
	return (
		<div className='absolute inset-0 -z-10 h-full max-w-full w-full flex justify-between'>
			{Array.from({ length: 9 }).map((_, i) => (
				<div
					key={i}
					className='flex-none h-full overflow-hidden relative w-px z-1 bg-linear-to-b from-foreground/0 via-foreground/10 via-80% to-foreground/0 dark:from-foreground/0 '
				/>
			))}
		</div>
	);
};

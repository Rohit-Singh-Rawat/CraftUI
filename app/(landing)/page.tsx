import { Button } from '@/components/ui/button';
import { Cancel01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';

export default function Page() {
	return (
		<main className='relative min-h-screen flex flex-col items-center justify-center py-10 md:py-20 overflow-hidden'>
			<Background />
			<div className='relative z-10 w-full h-full  grid grid-cols-1 md:grid-cols-8 gap-4 md:gap-0 px-4 md:px-0 grid-rows-auto md:grid-rows-4'>
				<div className='max-w-4xl mx-auto text-center col-start-2 space-y-4 md:space-y-8 relative z-10 border border-dashed border-muted-foreground/20 md:col-span-5 h-fit bg-background p-6 md:p-10 font-serif group md:row-span-2'>
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
					<h1 className='text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-light tracking-tight'>
						A <span className='text-primary italic'>Collection</span> of Digital Crafts
					</h1>

					<p className='text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto'>
						A diary of crafts including CSS, SVG, motion, and more
					</p>
				</div>
				<div className='md:col-span-3 md:row-span-2 md:row-start-3 md:col-start-6 flex flex-row md:grid md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-0  justify-center items-center'>
					<Link href='/diary'>
						{' '}
						<Button
							variant='outline'
							className='rounded-none h-fit w-fit md:py-5'
							style={{ writingMode: 'horizontal-tb', textOrientation: 'mixed' }}
						>
							<span className='md:hidden'>View Diary</span>
							<span
								className='hidden md:inline'
								style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
							>
								View Diary
							</span>
						</Button>{' '}
					</Link>
					<Link
						href='/crafts'
						className='md:row-start-2 md:col-start-2'
					>
						<Button
							variant='default'
							className='rounded-none h-fit w-fit  md:py-5'
							style={{ writingMode: 'horizontal-tb', textOrientation: 'mixed' }}
						>
							<span className='md:hidden'>Explore Crafts</span>
							<span
								className='hidden md:inline'
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

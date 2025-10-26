import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Component as EthernalShadow } from '@/components/background/ethernal-shadow';

export default function Page() {
	return (
		<main className='relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden'>
			<div className='absolute inset-0 -z-10'>
				<EthernalShadow
					color='oklch(0.96 0.03 275 / 0.24)' 
					animation={{ scale: 110, speed: 70 }}
					noise={{ opacity: 0.8, scale: 2.0 }}
					sizing='stretch'
				/>
			</div>

			<div className='max-w-4xl mx-auto text-center space-y-8 relative z-10'>
				<h1 className='text-6xl md:text-7xl lg:text-8xl font-light tracking-tight bg-clip-text text-transparent bg-linear-to-r text-shadow-xs text-shadow-neutral-200/40 from-orange-800 via-neutral-400 to-neutral-500'>
					Beautiful UI Components
				</h1>

				<p className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto'>
					Crafted with precision and care for your next project
				</p>

				<div className='flex flex-wrap gap-4 justify-center pt-4'>
					<Button
						asChild
						size='lg'
						className='rounded-full text-black'
					>
						<Link href='/playground'>Get Started</Link>
					</Button>
					<Button
						asChild
						size='lg'
						variant='outline'
						className='rounded-full'
					>
						<Link href='/components'>Browse Components</Link>
					</Button>
				</div>
			</div>
		</main>
	);
}

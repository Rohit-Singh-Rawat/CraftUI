import HexagonBackground from '@/craft/components/hexagonal-background';

export default function HexagonalBackgroundDemo() {
	return (
		<div className='  w-full overflow-hidden h-full flex flex-col items-center justify-center'>
			<HexagonBackground
				color='#7c3aed'
				secondaryColor='#8b5cf6'
				cellSize='80px'
				strokeWidth='2'
				className='absolute inset-0 dark:hidden'
				fade={true}
				fadePercentage={30}
				opacity={0.4}
			/>
			<HexagonBackground
				color='#93c5fd'
				secondaryColor='#bfdbfe'
				cellSize='80px'
				strokeWidth='2'
				className='absolute inset-0 hidden dark:block'
				fade={true}
				fadePercentage={30}
				opacity={0.3}
			/>
			<div className='relative flex h-full flex-col items-center justify-center gap-4'>
				<h1 className='font-serif text-8xl font-light tracking-tight'>Craft Diary</h1>
				<p className='font-doto text-lg text-primary tracking-wider'>
					A CURATED COLLECTION OF METICULOUSLY CRAFTED ELEMENTS
				</p>
			</div>
		</div>
	);
}

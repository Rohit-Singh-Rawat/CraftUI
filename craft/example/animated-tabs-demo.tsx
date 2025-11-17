import AnimatedTabs from '@/craft/components/animated-tabs';
import Image from 'next/image';

const TAB_IMAGES = {
	overview:
		'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
	design:
		'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
	performance:
		'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
	accessibility:
		'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
	integration:
		'https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&w=1200&q=80',
} as const;

type TabContentProps = {
	title: string;
	description: string;
	imageSrc: string;
	imageAlt: string;
	overlayText: string;
	imagePosition?: 'left' | 'right';
};

const TabContent = ({
	title,
	description,
	imageSrc,
	imageAlt,
	overlayText,
	imagePosition = 'right',
}: TabContentProps) => {
	const imageSection = (
		<div className='w-full md:w-[300px] relative h-[200px] md:h-full rounded-[11px] overflow-hidden shrink-0'>
			<Image
				src={imageSrc}
				alt={imageAlt}
				fill
				loading='lazy'
				className='object-cover'
				sizes='(max-width: 768px) 100vw, 300px'
			/>
			<div className='absolute inset-0 bg-linear-to-br from-secondary/20 via-transparent to-primary/40 backdrop-blur-[1px]' />
			<div className='absolute bottom-4 left-4 text-2xl md:text-3xl font-serif font-light text-white/80 drop-shadow-md'>
				{overlayText}
			</div>
		</div>
	);

	const textSection = (
		<div className='flex-1 space-y-2 md:space-y-3'>
			<h2 className='text-xl md:text-2xl font-serif font-light'>{title}</h2>
			<p className='text-muted-foreground font-light leading-relaxed line-clamp-3 text-ellipsis text-sm md:text-base'>
				{description}
			</p>
		</div>
	);

	return (
		<div className='flex flex-col md:flex-row items-center gap-4 md:gap-6 h-auto md:h-[300px]'>
			{imagePosition === 'left' ? (
				<>
					{imageSection}
					{textSection}
				</>
			) : (
				<>
					{textSection}
					{imageSection}
				</>
			)}
		</div>
	);
};

const AnimateTabsDemo = () => {
	return (
		<div className='w-full h-full flex items-center justify-center gap-8 flex-col bg-secondary p-3 md:p-5'>
			<AnimatedTabs
				tabClassName='font-light font-serif text-sm md:text-base'
				containerClassName='w-full max-w-5xl'
				tabs={[
					{
						label: 'Collection',
						title: 'Curated Collection',
						content: (
							<TabContent
								title='Crafted Components'
								description='A curated collection of animated UI components designed for modern web applications. Built with React, Tailwind CSS, and Framer Motion to deliver smooth, performant animations that enhance user experience.'
								imageSrc={TAB_IMAGES.overview}
								imageAlt='Artisanal sketchbook moodboard'
								overlayText='Crafts'
								imagePosition='right'
							/>
						),
					},
					{
						label: 'Palette',
						title: 'Design Palette',
						content: (
							<TabContent
								title='Design Philosophy'
								description='Our design approach emphasizes simplicity and elegance. Every component follows consistent design patterns that prioritize usability without sacrificing aesthetic appeal.'
								imageSrc={TAB_IMAGES.design}
								imageAlt='Flowing paint pigments macro'
								overlayText='Design'
								imagePosition='left'
							/>
						),
					},
					{
						label: 'Momentum',
						title: 'Fluid Momentum',
						content: (
							<TabContent
								title='Optimized Performance'
								description='Performance is at the core of every component. We utilize hardware-accelerated animations and efficient rendering techniques to ensure smooth 60fps experiences across all devices.'
								imageSrc={TAB_IMAGES.performance}
								imageAlt='Sunlit forest clearing'
								overlayText='60fps'
								imagePosition='right'
							/>
						),
					},
					{
						label: 'Inclusivity',
						title: 'Inclusive Journey',
						content: (
							<TabContent
								title='Built for Everyone'
								description='Accessibility is not an afterthought. Every component is built following WCAG guidelines, ensuring that all users can interact with your application regardless of their abilities.'
								imageSrc={TAB_IMAGES.accessibility}
								imageAlt='Misty hillside path'
								overlayText='A11y'
								imagePosition='left'
							/>
						),
					},
					{
						label: 'Harmony',
						title: 'Seamless Harmony',
						content: (
							<TabContent
								title='Seamless Integration'
								description='Components are designed to integrate effortlessly into existing projects. With full TypeScript support and comprehensive documentation, you can start building immediately.'
								imageSrc={TAB_IMAGES.integration}
								imageAlt='Sunset over terraced fields'
								overlayText='Code'
								imagePosition='right'
							/>
						),
					},
				]}
			/>
		</div>
	);
};

export default AnimateTabsDemo;

'use client';

import AnimatedTabs from '@/craft/components/animated-tabs';
import ClockDemo from '@/craft/example/clock-demo';
import AnimateTabsDemo from '@/craft/example/animated-tabs-demo';

const PlayGround = () => {
	return (
		<div className='w-full h-full flex items-center justify-center gap-8 flex-col bg-secondary p-5'>
			<AnimateTabsDemo />
		</div>
	);
};

export default PlayGround;

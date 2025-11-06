'use client';

import React from 'react';
import { Clock, ClockProps } from '@/craft/components/clock';
import { useContainerSize } from '@/craft/hooks/use-container-size';

export default function ClockDemo() {
	const [containerRef, containerSize] = useContainerSize({ fullWidthThreshold: 1024 });

	const showcaseClocks: Array<ClockProps & { label?: string; bgClassName?: string }> = [
		{
			label: 'New York',
			variant: 'default',
			size: 200,
			showNumbers: 'cardinal',
			rounded: 10,
			borderWidth: 1,
			borderColor: 'rgba(255,255,255,0.2)',
			tickHourLengthPx: 15,
			tickMinuteLengthPx: 8,
			tickHourWidthPx: 2,
			tickMinuteWidthPx: 1,
			tickHourColor: 'var(--primary)',
			tickMinuteColor: 'color-mix(in srgb, var(--primary) 50%, transparent)',
			handHourColor: 'var(--primary)',
			handMinuteColor: 'var(--primary)',
			handSecondColor: 'var(--primary)',
			numberColor: 'var(--primary)',
			timezone: 'America/New_York',
		},
		{
			label: 'Local Time',
			variant: 'mesh',
			size: 200,
			showNumbers: 'all',
			rounded: 1,
			borderWidth: 2,
			borderColor: 'rgba(255,255,255)',
			tickHourLengthPx: 12,
			tickMinuteLengthPx: 6,
			tickHourWidthPx: 2.5,
			tickMinuteWidthPx: 1.2,
			tickHourColor: 'rgba(255,255,255,0.8)',
			tickMinuteColor: 'rgba(255,255,255,0.4)',
			showDigital: {
				position: 'center',
				uppercase: true,
				color: 'rgba(255,255,255,0.9)',
				fontSizePx: 14,
			},
		},
		{
			label: 'Tokyo',
			variant: 'default',
			size: 200,
			showNumbers: 'cardinal',
			rounded: 0.2, // Square clock
			borderWidth: 1,
			borderColor: 'rgba(255,255,255,0.2)',
			tickHourLengthPx: 0.5,
			tickMinuteLengthPx: 0,
			tickHourWidthPx: 5, // Increased tick width
			tickMinuteWidthPx: 3, // Increased tick width
			tickHourColor: 'var(--primary)',
			tickMinuteColor: 'color-mix(in srgb, var(--primary) 50%, transparent)',
			handHourColor: 'var(--primary)', // White hour hand
			handMinuteColor: 'var(--primary)', // White minute hand
			handSecondColor: '#ff0000', // Red second hand
			numberColor: 'var(--primary)',
			numberFontSizePx: 16,
			timezone: 'Asia/Tokyo',
		},
	];

	return (
		<div
			ref={containerRef}
			className='w-full max-w-7xl mx-auto px-4 py-8'
		>
			<div className='mb-8 text-center'>
				<h2 className='text-6xl font-light font-serif mb-2'>Clocks</h2>
				<p className='text-lg text-muted-foreground mt-2 font-light'>
					Support for timezones, custom time, and beautiful customization
				</p>
			</div>
			<div
				className={
					containerSize.isFullWidth
						? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
						: 'flex flex-col gap-8 pt-10'
				}
			>
				{showcaseClocks.map(({ label, bgClassName, ...clockProps }, index) => (
					<div
						key={index}
						className={`flex flex-col items-center gap-4 p-6 ${bgClassName || ''}`}
					>
						{label && <h3 className='text-xl font-light mb-2 font-doto'>{label}</h3>}
						<Clock {...clockProps} />
					</div>
				))}
			</div>
		</div>
	);
}

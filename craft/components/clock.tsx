import React, { useMemo } from 'react';
import { useClock } from '@/craft/hooks/use-clock';
import { cn } from '@/lib/utils';

type ClockVariant = 'mesh' | 'default'; // future: add more variants

export type ClockProps = {
	variant?: ClockVariant;
	size?: number; // px, diameter. default 320
	className?: string;
	rounded?: number; // 0..1 -> 0 = square, 1 = circle. default 1
	borderWidth?: number; // px
	borderColor?: string;
	// numbers: 'all' for 1..12, 'cardinal' for 12/3/6/9, array for custom hours, false to hide
	showNumbers?: 'all' | 'cardinal' | number[] | false;
	// tick customization (px values at 320 design; scaled automatically)
	tickHourLengthPx?: number;
	tickMinuteLengthPx?: number;
	tickHourWidthPx?: number;
	tickMinuteWidthPx?: number;
	tickHourColor?: string;
	tickMinuteColor?: string;
	// hand colors
	handHourColor?: string;
	handMinuteColor?: string;
	handSecondColor?: string;
	// number label color
	numberColor?: string;
	numberFontSizePx?: number;
	// timezone/custom time
	/** IANA timezone (e.g., 'America/New_York', 'Europe/London', 'Asia/Tokyo'). If not provided, uses local time. */
	timezone?: string;
	/** Custom Date object. If provided, clock shows this time (static). Overrides timezone. */
	customTime?: Date;
	// digital time/day overlay
	showDigital?:
		| boolean
		| {
				position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
				uppercase?: boolean;
				color?: string;
				fontSizePx?: number; // design at 320, scaled
				/** Show timezone abbreviation (e.g., 'EST', 'PST') when timezone is set */
				showTimezone?: boolean;
		  };
	digitalClassName?: string;
};

function getNumbersToRender(spec: 'all' | 'cardinal' | number[] | false): number[] {
	switch (spec) {
		case false:
			return [];
		case 'all':
			return Array.from({ length: 12 }, (_, i) => i + 1);
		case 'cardinal':
			return [12, 3, 6, 9];
		default: {
			// sanitize custom list: keep 1..12 unique
			const set = new Set<number>();
			for (const n of spec) {
				const v = ((n % 12) + 12) % 12; // normalize
				set.add(v === 0 ? 12 : v);
			}
			return Array.from(set);
		}
	}
}

export function Clock({
	variant = 'mesh',
	size = 320,
	className,
	rounded = 1,
	borderWidth = 1,
	borderColor = 'rgba(255,255,255,0.12)',
	showNumbers = 'cardinal',
	tickHourLengthPx,
	tickMinuteLengthPx,
	tickHourWidthPx,
	tickMinuteWidthPx,
	tickHourColor = 'rgba(255,255,255,0.7)',
	tickMinuteColor = 'rgba(255,255,255,0.35)',
	handHourColor = '#fff',
	handMinuteColor = '#fff',
	handSecondColor = '#fff',
	numberColor = 'rgba(255,255,255,0.75)',
	numberFontSizePx = 12,
	timezone,
	customTime,
	showDigital = false,
	digitalClassName,
}: ClockProps) {
	const {
		now,
		angles,
		timezone: resolvedTimezone,
	} = useClock({
		updateMs: 250,
		includeMilliseconds: true,
		timezone,
		customTime,
	});
	const { secondAngle, minuteAngle, hourAngle } = angles;

	const diameter = size;
	const radius = diameter / 2;

	// Scaler: specify sizes at 320px design, scale proportionally
	const sx = (pxAt320: number) => (pxAt320 * diameter) / 320;

	const scale = useMemo(
		() => ({
			centerDot: sx(3),
			tickInset: sx(14),
			hourTickLength: sx(tickHourLengthPx ?? 10),
			minuteTickLength: sx(tickMinuteLengthPx ?? 5),
			hourTickWidth: sx(tickHourWidthPx ?? 2),
			minuteTickWidth: sx(tickMinuteWidthPx ?? 1),
			labelDistance: sx(38),
			labelFontSize: sx(numberFontSizePx ?? 12),
			hourHandLength: 0.45 * radius,
			hourHandThickness: sx(4),
			minuteHandLength: 0.65 * radius,
			minuteHandThickness: sx(3),
			secondHandLength: 0.7 * radius,
			secondHandThickness: sx(2),
			secondHandTail: 0.15 * radius,
		}),
		[
			diameter,
			radius,
			tickHourLengthPx,
			tickMinuteLengthPx,
			tickHourWidthPx,
			tickMinuteWidthPx,
			numberFontSizePx,
		]
	);

	const borderRadius = `${Math.max(0, Math.min(1, rounded)) * 50}%`;

	const faceStyle: React.CSSProperties = useMemo(() => {
		const baseFaceStyle: React.CSSProperties = {
			position: 'relative',
			width: diameter,
			height: diameter,
			borderRadius,
			overflow: 'hidden',
			border: `${borderWidth}px solid ${borderColor}`,
			boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06), 0 10px 30px rgba(0,0,0,0.35)',
		};

		switch (variant) {
			case 'mesh': {
				return {
					...baseFaceStyle,
					backgroundImage: `url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221592%22%20height%3D%22892%22%20viewBox%3D%220%200%201920%201080%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cfilter%20id%3D%22blur%22%20x%3D%22-667%22%20y%3D%22-983%22%20width%3D%223083%22%20height%3D%222668%22%20filterUnits%3D%22userSpaceOnUse%22%3E%3CfeGaussianBlur%20stdDeviation%3D%22100%22%2F%3E%3C%2Ffilter%3E%3Cfilter%20id%3D%22grain%22%20x%3D%22-667%22%20y%3D%22-983%22%20width%3D%223083%22%20height%3D%222668%22%20filterUnits%3D%22userSpaceOnUse%22%20primitiveUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22linearRGB%22%3E%0A%09%09%09%09%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%22.2%22%20numOctaves%3D%224%22%20seed%3D%2215%22%20stitchTiles%3D%22no-stitch%22%20x%3D%220%22%20y%3D%220%22%20width%3D%221920%22%20height%3D%221080%22%20result%3D%22turbulence%22%2F%3E%0A%09%09%09%09%3CfeSpecularLighting%20surfaceScale%3D%2210%22%20specularConstant%3D%221.21%22%20specularExponent%3D%2220%22%20lighting-color%3D%22%23fff%22%20x%3D%220%22%20y%3D%220%22%20width%3D%221920%22%20height%3D%221080%22%20in%3D%22turbulence%22%20result%3D%22specularLighting%22%3E%0A%09%09%09%09%09%3CfeDistantLight%20azimuth%3D%223%22%20elevation%3D%22100%22%2F%3E%0A%09%09%09%09%3C%2FfeSpecularLighting%3E%0A%09%09%09%3C%2Ffilter%3E%3C%2Fdefs%3E%3Crect%20width%3D%221920%22%20height%3D%221080%22%20fill%3D%22%23869EC4%22%2F%3E%3Cpath%20d%3D%22M%201567.62%20133.79%20L%20962.99%20550.05%20L%201220.97%20604.23%20L%20920.48%20510.58%20L%20861.43%20966.17%20L%20688.40%20-29.86%20L%20903.47%20-272.46%20L%201200.45%20-220.31%20L%201423.96%20-106.14%20Z%22%20fill%3D%22%23492E63%22%20fill-opacity%3D%22NaN%22%20filter%3D%22url(%23blur)%22%2F%3E%3Cpath%20d%3D%22M%20988.82%20-473.07%20L%20887.03%20-142.15%20L%20533.33%20-79.66%20L%20368.12%20-350.26%20L%20266.06%20-645.02%20L%20552.46%20-782.67%20L%20816.39%20-715.42%20Z%22%20fill%3D%22%23869EC4%22%20fill-opacity%3D%22NaN%22%20filter%3D%22url(%23blur)%22%2F%3E%3Cpath%20d%3D%22M%201307.16%2044.82%20L%20676.64%20510.88%20L%20322.31%20698.38%20L%20-284.29%201152.75%20L%20-258.69%20304.33%20L%20-180.70%20-17.19%20L%2027.97%20-206.65%20L%20295.75%20-289.00%20L%20729.00%20-139.65%20Z%22%20fill%3D%22%23492E63%22%20fill-opacity%3D%22NaN%22%20filter%3D%22url(%23blur)%22%2F%3E%3Cpath%20d%3D%22M%202166.96%20505.28%20L%202079.20%20679.33%20L%202215.35%201282.46%20L%201735.75%20825.01%20L%201587.70%20688.33%20L%201276.97%20547.56%20L%201357.74%20-233.27%20L%201737.60%2021.85%20L%201978.88%2076.75%20L%202137.12%20289.15%20Z%22%20fill%3D%22%23B06C68%22%20fill-opacity%3D%22NaN%22%20filter%3D%22url(%23blur)%22%2F%3E%3Cpath%20d%3D%22M%201356.64%20550.15%20L%201800.18%20884.63%20L%202200.25%201416.90%20L%20-466.21%201484.18%20L%20-54.70%20947.72%20L%20592.83%20799.07%20L%201031.48%20385.47%20Z%22%20fill%3D%22%23041CCF%22%20fill-opacity%3D%22NaN%22%20filter%3D%22url(%23blur)%22%2F%3E%3Cpath%20d%3D%22M%20278.76%20935.99%20L%20117.96%201153.94%20L%20-99.99%201302.16%20L%20-391.10%201227.09%20L%20-460.30%20935.99%20L%20-419.22%20616.76%20L%20-99.99%20586.38%20L%20111.63%20724.37%20Z%22%20fill%3D%22%23B06C68%22%20fill-opacity%3D%22NaN%22%20filter%3D%22url(%23blur)%22%2F%3E%3Crect%20width%3D%221920%22%20height%3D%221080%22%20fill%3D%22%23FFFFFF%22%20filter%3D%22url(%23grain)%22%20opacity%3D%220.11%22%2F%3E%3C%2Fsvg%3E")`,
					backgroundSize: '100% 100%',
					backgroundRepeat: 'no-repeat',
				};
			}
			case 'default': {
				return {
					...baseFaceStyle,
					background: 'var(--background)',
				};
			}
			default:
				return baseFaceStyle;
		}
	}, [variant, diameter, borderRadius, borderWidth, borderColor]);

	return (
		<div
			className={className}
			style={{
				display: 'inline-block',
				width: diameter,
				height: diameter,
				borderRadius,
			}}
		>
			<div
				className='overflow-hidden'
				style={faceStyle}
			>
				<svg
					className='w-full h-full rounded-full'
					viewBox={`0 0 ${diameter} ${diameter}`}
				>
					<g>
						{Array.from({ length: 60 }).map((_, i) => {
							const isHour = i % 5 === 0;
							const angle = (i * Math.PI) / 30 - Math.PI / 2;
							const r1 = radius - scale.tickInset;
							const r2 = r1 - (isHour ? scale.hourTickLength : scale.minuteTickLength);

							return (
								<line
									key={i}
									x1={radius + r1 * Math.cos(angle)}
									y1={radius + r1 * Math.sin(angle)}
									x2={radius + r2 * Math.cos(angle)}
									y2={radius + r2 * Math.sin(angle)}
									stroke={isHour ? tickHourColor : tickMinuteColor}
									strokeWidth={isHour ? scale.hourTickWidth : scale.minuteTickWidth}
									strokeLinecap='round'
								/>
							);
						})}
						{getNumbersToRender(showNumbers).map((n) => {
							const angle = ((n - 3) * Math.PI) / 6;
							const r = radius - scale.labelDistance;

							return (
								<text
									key={`label-${n}`}
									x={radius + r * Math.cos(angle)}
									y={radius + r * Math.sin(angle) + scale.labelFontSize * 0.33}
									fill={numberColor}
									fontSize={scale.labelFontSize}
									fontFamily='Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif'
									textAnchor='middle'
								>
									{n}
								</text>
							);
						})}
					</g>
				</svg>

				<div
					style={{
						position: 'absolute',
						inset: 0,
						transform: 'translateZ(0)',
					}}
				>
					<Hand
						length={scale.hourHandLength}
						thickness={scale.hourHandThickness}
						angle={hourAngle}
						color={handHourColor}
						opacity={0.95}
						borderRadius={scale.hourHandThickness * 0.5}
					/>
					<Hand
						length={scale.minuteHandLength}
						thickness={scale.minuteHandThickness}
						angle={minuteAngle}
						color={handMinuteColor}
						opacity={0.95}
						borderRadius={scale.minuteHandThickness * 0.5}
					/>
					<Hand
						length={scale.secondHandLength}
						thickness={scale.secondHandThickness}
						angle={secondAngle}
						color={handSecondColor}
						opacity={0.9}
						tail={scale.secondHandTail}
						borderRadius={scale.secondHandThickness * 0.5}
					/>
					<div
						style={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							width: scale.centerDot * 2,
							height: scale.centerDot * 2,
							marginLeft: -scale.centerDot,
							marginTop: -scale.centerDot,
							borderRadius: '50%',
							background: '#fff',
							boxShadow: '0 0 0 2px rgba(0,0,0,0.15)',
						}}
					/>
				</div>
				{/* digital overlay */}
				{renderDigitalOverlay(
					now,
					showDigital,
					scale.labelFontSize,
					diameter,
					resolvedTimezone,
					digitalClassName
				)}
			</div>
		</div>
	);
}

type HandProps = {
	length: number;
	thickness: number;
	angle: number; // degrees
	color: string;
	opacity?: number;
	tail?: number; // optional tail behind center for second hand style
	borderRadius?: number;
};

function Hand({ length, thickness, angle, color, opacity = 1, tail = 0, borderRadius }: HandProps) {
	const total = length + tail;
	const effectiveBorderRadius = borderRadius ?? thickness;
	return (
		<div
			style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				width: thickness,
				height: total,
				marginLeft: -thickness / 2,
				marginTop: -(total - tail),
				transform: `rotate(${angle}deg)`,
				transformOrigin: `${thickness / 2}px ${total - tail}px`,
				background: color,
				borderRadius: effectiveBorderRadius,
				opacity,
				boxShadow: '0 1px 2px rgba(0,0,0,0.25)',
				willChange: 'transform',
			}}
		/>
	);
}

export default Clock;

// helpers
function renderDigitalOverlay(
	now: Date,
	showDigital: NonNullable<ClockProps['showDigital']>,
	baseFontSize: number,
	diameter: number,
	timezone?: string,
	digitalClassName?: string
) {
	if (!showDigital) return null;
	const cfg = typeof showDigital === 'boolean' ? {} : showDigital;
	const position = cfg.position ?? 'center';
	const color = cfg.color ?? 'rgba(255,255,255,0.9)';
	const fontSize = cfg.fontSizePx ? (cfg.fontSizePx * diameter) / 320 : baseFontSize * 1.05;
	const uppercase = cfg.uppercase ?? true;
	const showTimezone = cfg.showTimezone ?? false;

	const timeOptions: Intl.DateTimeFormatOptions = {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
		...(timezone && { timeZone: timezone }),
	};

	const time = new Intl.DateTimeFormat(undefined, timeOptions).format(now);
	const weekday = new Intl.DateTimeFormat(undefined, {
		weekday: 'short',
		...(timezone && { timeZone: timezone }),
	}).format(now);

	let timezoneAbbr = '';
	if (showTimezone && timezone) {
		try {
			// Get timezone abbreviation
			const formatter = new Intl.DateTimeFormat('en-US', {
				timeZone: timezone,
				timeZoneName: 'short',
			});
			const parts = formatter.formatToParts(now);
			timezoneAbbr = parts.find((p) => p.type === 'timeZoneName')?.value || '';
		} catch {
			// Fallback: extract city name from timezone string
			const parts = timezone.split('/');
			timezoneAbbr = parts[parts.length - 1]?.replace(/_/g, ' ') || '';
		}
	}

	const common: React.CSSProperties = {
		position: 'absolute',
		color,
		fontSize,
		letterSpacing: 0.5,
		fontWeight: 600,
		textTransform: uppercase ? 'uppercase' : 'none',
		pointerEvents: 'none',
	};

	const getPositionStyle = (pos: string): React.CSSProperties => {
		switch (pos) {
			case 'center':
				return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
			case 'top':
				return { top: (diameter * 0.18) | 0, left: '50%', transform: 'translateX(-50%)' };
			case 'bottom':
				return { bottom: (diameter * 0.12) | 0, left: '50%', transform: 'translateX(-50%)' };
			case 'left':
				return { left: (diameter * 0.12) | 0, top: '50%', transform: 'translateY(-50%)' };
			case 'right':
				return { right: (diameter * 0.12) | 0, top: '50%', transform: 'translateY(-50%)' };
			default:
				return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
		}
	};

	return (
		<div
			className={cn(
				'grid grid-cols-2 w-full items-center justify-items-center gap-0',
				digitalClassName
			)}
			style={{ ...common, ...getPositionStyle(position) }}
		>
			<div className='place-self-end pr-8'>{weekday}</div>
			<div className='pl-8 place-self-start'>{time}</div>
		</div>
	);
}

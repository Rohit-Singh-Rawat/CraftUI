import {useEffect, useMemo, useRef, useState} from 'react';

export type UseClockOptions = {
	/** Target update cadence in milliseconds. Default 250ms. */
	updateMs?: number;
	/** When true, includes milliseconds in second hand angle. Default true. */
	includeMilliseconds?: boolean;
	/** IANA timezone (e.g., 'America/New_York', 'Europe/London', 'Asia/Tokyo'). If not provided, uses local time. */
	timezone?: string;
	/** Custom Date object. If provided, clock shows this time (static). Overrides timezone. */
	customTime?: Date;
};

export type ClockAngles = {
	secondAngle: number;
	minuteAngle: number;
	hourAngle: number;
};

function computeAngles(hour: number, minute: number, second: number, millisecond: number, includeMilliseconds: boolean): ClockAngles {
	const sec = second + (includeMilliseconds ? millisecond / 1000 : 0);
	const min = minute + sec / 60;
	const hr = (hour % 12) + min / 60;
	return {
		secondAngle: sec * 6,
		minuteAngle: min * 6,
		hourAngle: hr * 30,
	};
}

function getTimeInTimezone(timezone?: string): { date: Date; hour: number; minute: number; second: number; millisecond: number } {
	if (!timezone) {
		const now = new Date();
		return {
			date: now,
			hour: now.getHours(),
			minute: now.getMinutes(),
			second: now.getSeconds(),
			millisecond: now.getMilliseconds(),
		};
	}
	
	try {
		const now = new Date();
		const formatter = new Intl.DateTimeFormat('en-US', {
			timeZone: timezone,
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false,
		});
		
		const parts = formatter.formatToParts(now);
		const year = parseInt(parts.find(p => p.type === 'year')?.value || '0');
		const month = parseInt(parts.find(p => p.type === 'month')?.value || '0') - 1;
		const day = parseInt(parts.find(p => p.type === 'day')?.value || '0');
		const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0');
		const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0');
		const second = parseInt(parts.find(p => p.type === 'second')?.value || '0');
		const millisecond = now.getMilliseconds();
		
		// Create a Date object for display purposes (in local time, but with timezone values)
		const date = new Date(year, month, day, hour, minute, second, millisecond);
		
		return { date, hour, minute, second, millisecond };
	} catch {
		// Fallback to local time if timezone is invalid
		const now = new Date();
		return {
			date: now,
			hour: now.getHours(),
			minute: now.getMinutes(),
			second: now.getSeconds(),
			millisecond: now.getMilliseconds(),
		};
	}
}

/**
 * useClock — lightweight time source + precomputed analog angles.
 * - Immediate: initializes with current time, no initial delay.
 * - Efficient: rAF loop that commits state at a throttled cadence.
 * - Supports timezones and custom time.
 */
export function useClock(options: UseClockOptions = {}): { now: Date; angles: ClockAngles; timezone?: string } {
	const { updateMs = 250, includeMilliseconds = true, timezone, customTime } = options;
	
	const getInitialTime = () => {
		if (customTime) {
			const d = new Date(customTime);
			return {
				date: d,
				hour: d.getHours(),
				minute: d.getMinutes(),
				second: d.getSeconds(),
				millisecond: d.getMilliseconds(),
			};
		}
		return getTimeInTimezone(timezone);
	};
	
	const [timeData, setTimeData] = useState(getInitialTime);
	const rafRef = useRef<number | null>(null);
	const lastCommitRef = useRef<number>(0);

	useEffect(() => {
		// If customTime is provided, don't update (static clock)
		if (customTime) {
			const d = new Date(customTime);
			setTimeData({
				date: d,
				hour: d.getHours(),
				minute: d.getMinutes(),
				second: d.getSeconds(),
				millisecond: d.getMilliseconds(),
			});
			return;
		}
		
		const loop = (t: number) => {
			if (!lastCommitRef.current || t - lastCommitRef.current > updateMs - 1) {
				lastCommitRef.current = t;
				setTimeData(getTimeInTimezone(timezone));
			}
			rafRef.current = requestAnimationFrame(loop);
		};
		rafRef.current = requestAnimationFrame(loop);
		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, [updateMs, timezone, customTime]);

	const angles = useMemo(
		() => computeAngles(timeData.hour, timeData.minute, timeData.second, timeData.millisecond, includeMilliseconds),
		[timeData.hour, timeData.minute, timeData.second, timeData.millisecond, includeMilliseconds]
	);

	return { now: timeData.date, angles, timezone };
}

export default useClock;



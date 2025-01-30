import type React from 'react';
import type { SVGProps } from 'react';

import { cn } from '@/lib/utils';

type MarqueeProps = {
  icons: ((props: SVGProps<SVGSVGElement>) => React.JSX.Element)[];
  gap?: string;
  direction?: 'left' | 'up';
  pauseOnHover?: boolean;
  reverse?: boolean;
  fade?: boolean;
  className?: string;
};

export const Marquee = (props: MarqueeProps) => {
  const {
    icons,
    gap = '1rem',
    direction = 'left',
    pauseOnHover = false,
    reverse = false,
    fade = false,
    className,
  } = props;

  const mask = fade
    ? `linear-gradient(${
        direction === 'left' ? 'to right' : 'to bottom'
      }, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)`
    : undefined;

  return (
    <div
      className={cn(
        'group flex overflow-hidden',
        direction === 'left' ? 'flex-row' : 'flex-col',
        className,
      )}
      style={{
        maskImage: mask,
        WebkitMaskImage: mask,
        gap,
      }}
    >
      {[0, 1].map((n) => (
        <div
          key={n}
          style={
            {
              '--gap': gap,
            } as React.CSSProperties
          }
          className={cn(
            'flex shrink-0 justify-around gap-[var(--gap)]',
            direction === 'left'
              ? 'animate-marquee-left flex-row'
              : 'animate-marquee-up flex-col',
            pauseOnHover && 'group-hover:[animation-play-state:paused]',
            reverse && 'direction-reverse',
          )}
        >
          {icons.map((Icon, index) => (
            <div key={`marquee-icon-${Icon.name || index}`}>
              <Icon className="size-10 grayscale transition-all duration-500 ease-in-out hover:grayscale-0 dark:invert dark:hover:invert-0" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

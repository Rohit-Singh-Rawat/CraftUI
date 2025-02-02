import type { HTMLProps } from 'react';

interface HexagonBackgroundProps {
  color?: string;
  secondaryColor?: string;
  cellSize?: string | number;
  strokeWidth?: number | string;
  className?: string;
  fade?: boolean;
  fadePercentage?: number;
  opacity?: number;
}

const HexagonBackground = ({
  color = '#5271ff',
  secondaryColor,
  cellSize = '50px',
  strokeWidth = '3',
  className,
  fade = true,
  fadePercentage = 20,
  opacity = 1,
  ...props
}: HexagonBackgroundProps & HTMLProps<HTMLDivElement>) => {
  const actualSecondaryColor = secondaryColor || color;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 345">
      <defs>
        <linearGradient id="colorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:${opacity}" />
          <stop offset="50%" style="stop-color:${actualSecondaryColor};stop-opacity:${opacity * 0.7}" />
          <stop offset="100%" style="stop-color:${color};stop-opacity:${opacity}" />
        </linearGradient>
      </defs>
      <path d="
        M 100 115
        L 100 230
        M 201 57.1
        L 100 115
        M 0 57.5
        L 100 115
        M 0 287.5
        L 100 230
        M 200 287.5
        L 100 230
        M 1 287.5
        L 1 345
        M 1 0
        L 1 57.5
      "
        stroke="url(#colorGradient)" stroke-width="${strokeWidth}" fill="none"/>
    </svg>
  `;
  const svgDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{
        backgroundImage: `url("${svgDataUrl}")`,
        backgroundRepeat: 'repeat',
        backgroundSize: cellSize,
        maskImage: fade
          ? `radial-gradient(ellipse at top, white, transparent ${100 - fadePercentage}%)`
          : undefined,
        WebkitMaskImage: fade
          ? `radial-gradient(ellipse at top, white, transparent ${100 - fadePercentage}%)`
          : undefined,
      }}
      {...props}
    />
  );
};

export default HexagonBackground;

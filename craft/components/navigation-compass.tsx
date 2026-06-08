"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
  useMotionValue,
} from "motion/react";


export interface CompassNavLink {
  /** Degrees (0 = top, clockwise) where the link sits on the dial */
  angle: number;
  label: string;
  href: string;
}

export interface CompassColors {
  active: string;
  idle: string;
  idleHover: string;
}

export interface NavigationCompassProps {
  links: CompassNavLink[];
  /**
   * Angle (degrees, 0=top, CW) of the "active zone" pointer.
   * Drives which link glows and which ticks pulse.
   */
  activeZoneAngle: number;
  /**
   * Half-width of the active zone cone in degrees.
   * Links within this distance from the pointer get the highlight treatment.
   */
  activeZoneThreshold?: number;
  /** Rotation of the compass rose needle decoration in degrees. */
  roseRotation?: number;
  /** Number of tick marks around the dial. */
  tickCount?: number;
  /** SVG viewBox size in px (square). Component is always responsive. */
  size?: number;
  colors?: CompassColors;
  /** Renders a draggable debug overlay with live rotation + active link info. */
  showDetails?: boolean;
  className?: string;
}



/** Converts compass angle (0=top, CW) to SVG radians. */
function toAngleRad(angleDeg: number): number {
  return ((angleDeg - 90) * Math.PI) / 180;
}

interface Point {
  x: number;
  y: number;
}

function polarToCartesian(center: number, radius: number, angleDeg: number): Point {
  const rad = toAngleRad(angleDeg);
  return { x: center + Math.cos(rad) * radius, y: center + Math.sin(rad) * radius };
}

/** Returns the shortest arc distance between two angles on a 360° circle. */
function angularDistance(a: number, b: number): number {
  const diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
}

/** Hermite smoothstep: maps t ∈ [0,1] to a smooth S-curve. */
function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

/**
 * Returns a 0–1 proximity value for a dial angle relative to the active zone.
 * Returns 0 when outside the threshold.
 */
function calcProximityProgress(
  dialAngle: number,
  totalRotation: number,
  activeZoneAngle: number,
  threshold: number
): number {
  const absolute = (dialAngle + totalRotation) % 360;
  const normalized = absolute >= 0 ? absolute : absolute + 360;
  const dist = angularDistance(normalized, activeZoneAngle);
  if (dist >= threshold) return 0;
  return smoothstep(1 - dist / threshold);
}

// Scroll: low stiffness + high damping so the dial lags behind scroll like a physical wheel
const SCROLL_SPRING = { stiffness: 60, damping: 25, restDelta: 0.001 } as const;
// Pan: higher mass gives the dial rotational inertia; damping prevents overshoot on release
const PAN_SPRING = { stiffness: 180, damping: 28, mass: 1.4 } as const;
// Link highlight: snappy in, no bounce: makes the glow feel immediate not laggy
const LINK_SPRING = { stiffness: 400, damping: 30, mass: 0.6 } as const;

interface CompassRotation {
  totalRotation: MotionValue<number>;
  onPan: (containerRef: React.RefObject<HTMLDivElement | null>, info: { point: Point; delta: Point }) => void;
  onPanEnd: () => void;
}

/**
 * Combines scroll-driven rotation with pan/drag interaction into a single
 * `totalRotation` motion value. Momentum is applied on pan release.
 */
function useCompassRotation(): CompassRotation {
  const manualOffset = useMotionValue(0);
  const springOffset = useSpring(manualOffset, PAN_SPRING);

  const { scrollY } = useScroll();
  const scrollRotation = useTransform(scrollY, (v) => -15 + v * 0.05);
  const smoothScrollRotation = useSpring(scrollRotation, SCROLL_SPRING);

  const totalRotation = useTransform(
    () => smoothScrollRotation.get() + springOffset.get()
  );

  function onPan(
    containerRef: React.RefObject<HTMLDivElement | null>,
    info: { point: Point; delta: Point }
  ) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Page coordinates keep the math correct regardless of scroll position
    const cx = rect.left + window.scrollX + rect.width / 2;
    const cy = rect.top + window.scrollY + rect.height / 2;

    const prevX = info.point.x - info.delta.x;
    const prevY = info.point.y - info.delta.y;

    const angle1 = Math.atan2(prevY - cy, prevX - cx);
    const angle2 = Math.atan2(info.point.y - cy, info.point.x - cx);

    // Wrap delta to avoid jumps at the ±π boundary
    let deltaAngle = angle2 - angle1;
    if (deltaAngle > Math.PI) deltaAngle -= 2 * Math.PI;
    if (deltaAngle < -Math.PI) deltaAngle += 2 * Math.PI;

    manualOffset.set(manualOffset.get() + deltaAngle * (180 / Math.PI));
  }

  function onPanEnd() {
    const velocity = springOffset.getVelocity();
    if (Math.abs(velocity) > 10) {
      manualOffset.set(manualOffset.get() + velocity * 0.4);
    }
  }

  return { totalRotation, onPan, onPanEnd };
}

interface CompassRoseProps {
  center: number;
  roseRotation: number;
}

function CompassRose({ center, roseRotation }: CompassRoseProps) {
  // filter ID must be unique per instance to avoid collisions when multiple compasses render
  const filterId = `compass-inner-shadow-${center}`;

  return (
    <g>
      <defs>
        <filter
          id={filterId}
          filterUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={center * 2}
          height={center * 2}
        >
          <feOffset dx="0" dy="6" />
          <feGaussianBlur stdDeviation="12" result="offset-blur" />
          <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
          <feFlood floodColor="black" floodOpacity="0.25" result="color" />
          <feComposite operator="in" in="color" in2="inverse" result="shadow" />
          <feComposite operator="over" in="shadow" in2="SourceGraphic" />
        </filter>
      </defs>

      <circle cx={center} cy={center} r="254" className="fill-white dark:fill-[#0a0a0a]" filter={`url(#${filterId})`} />
      <circle cx={center} cy={center} r="250" className="fill-none stroke-foreground/20" strokeWidth="1" />
      <circle cx={center} cy={center} r="242" className="fill-none stroke-foreground/20" strokeWidth="2" />
      <circle cx={center} cy={center} r="230" className="fill-none stroke-foreground/10" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx={center} cy={center} r="80" className="fill-none stroke-foreground/10" strokeWidth="1" />

      <g transform={`translate(${center}, ${center}) scale(0.9) rotate(${roseRotation})`}>
        <circle cx="0" cy="0" r="12" className="fill-none stroke-foreground/40" strokeWidth="2" />
        <circle cx="0" cy="0" r="4" className="fill-foreground/60" />

        {([45, 135, 225, 315] as const).map((rot) => (
          <g key={`minor-${rot}`} transform={`rotate(${rot})`}>
            <polygon points="0,0 0,-130 -15,0" className="fill-none stroke-foreground/40" strokeWidth="1" />
            <polygon points="0,0 0,-130 15,0" className="fill-none stroke-foreground/40" strokeWidth="1" />
          </g>
        ))}

        {([0, 90, 180, 270] as const).map((rot) => (
          <g key={`major-${rot}`} transform={`rotate(${rot})`}>
            <polygon points="0,0 0,-215 -25,0" className="fill-none stroke-foreground/60" strokeWidth="1.5" />
            <polygon points="0,0 0,-215 25,0" className="fill-none stroke-foreground/60" strokeWidth="1.5" />
          </g>
        ))}
      </g>
    </g>
  );
}

interface CompassTickProps {
  index: number;
  center: number;
  outerRadius: number;
  tickMajorRadius: number;
  tickMediumRadius: number;
  tickMinorRadius: number;
  tickCount: number;
  totalRotation: MotionValue<number>;
  activeZoneAngle: number;
  activeZoneThreshold: number;
  prefersReducedMotion: boolean;
}

function CompassTick({
  index,
  center,
  outerRadius,
  tickMajorRadius,
  tickMediumRadius,
  tickMinorRadius,
  tickCount,
  totalRotation,
  activeZoneAngle,
  activeZoneThreshold,
  prefersReducedMotion,
}: CompassTickProps) {
  const angleDeg = (index * 360) / tickCount;
  const angleRad = toAngleRad(angleDeg);

  const isMajor = angleDeg % 15 === 0;
  const isMedium = !isMajor && angleDeg % 5 === 0;
  const baseRadius = isMajor ? tickMajorRadius : isMedium ? tickMediumRadius : tickMinorRadius;

  const innerRadius = useTransform(totalRotation, (rotation) => {
    if (prefersReducedMotion) return baseRadius;
    const progress = calcProximityProgress(angleDeg, rotation, activeZoneAngle, activeZoneThreshold);
    return baseRadius - progress * 25;
  });

  const x1 = useTransform(innerRadius, (r) => center + Math.cos(angleRad) * r);
  const y1 = useTransform(innerRadius, (r) => center + Math.sin(angleRad) * r);
  const { x: x2, y: y2 } = polarToCartesian(center, outerRadius, angleDeg);

  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      className={cn(isMajor ? "stroke-foreground/40" : "stroke-foreground/20")}
      strokeWidth={isMajor ? 1.5 : 1}
    />
  );
}

interface CompassLinkItemProps {
  link: CompassNavLink;
  center: number;
  textRadius: number;
  totalRotation: MotionValue<number>;
  activeZoneAngle: number;
  activeZoneThreshold: number;
  colors: CompassColors;
  prefersReducedMotion: boolean;
}

function CompassLinkItem({
  link,
  center,
  textRadius,
  totalRotation,
  activeZoneAngle,
  activeZoneThreshold,
  colors,
  prefersReducedMotion,
}: CompassLinkItemProps) {
  const { x: textX, y: textY } = polarToCartesian(center, textRadius, link.angle);
  const { x: hitX1, y: hitY1 } = polarToCartesian(center, 200, link.angle);
  const { x: hitX2, y: hitY2 } = polarToCartesian(center, 450, link.angle);

  const [isNear, setIsNear] = useState(false);

  useMotionValueEvent(totalRotation, "change", (latest) => {
    const nextIsNear = calcProximityProgress(link.angle, latest, activeZoneAngle, activeZoneThreshold) > 0;
    if (nextIsNear !== isNear) setIsNear(nextIsNear);
  });

  const rawProgress = useTransform(totalRotation, (latest) =>
    calcProximityProgress(link.angle, latest, activeZoneAngle, activeZoneThreshold)
  );
  const springProgress = useSpring(rawProgress, LINK_SPRING);
  const scale = useTransform(
    springProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1, 1.2],
  );
  // Counter-rotate so labels stay upright as the dial spins
  const counterRotation = useTransform(totalRotation, (r) => -r);

  return (
    <Link
      href={link.href}
      aria-label={`Navigate to ${link.label}`}
      className="active:scale-[0.96] transition-transform"
    >
      {/* Wide invisible hit target for easier tap/click along the link's arm */}
      <line
        x1={hitX1}
        y1={hitY1}
        x2={hitX2}
        y2={hitY2}
        stroke="transparent"
        strokeWidth="40"
        style={{ cursor: "pointer" }}
      />
      <g transform={`translate(${textX}, ${textY})`}>
        <motion.g style={{ scale, rotate: counterRotation }}>
          <text
            textAnchor="middle"
            dominantBaseline="middle"
            className={cn(
              "cursor-pointer pointer-events-auto transition-colors duration-200",
              isNear ? colors.active : cn(colors.idle, colors.idleHover)
            )}
            style={{ fontFamily: "var(--font-inter)", fontSize: "16px" }}
          >
            {link.label}
          </text>
        </motion.g>
      </g>
    </Link>
  );
}

interface CompassDegreeLabelsProps {
  center: number;
  numberRadius: number;
  links: CompassNavLink[];
}

function CompassDegreeLabels({ center, numberRadius, links }: CompassDegreeLabelsProps) {
  return (
    <>
      {Array.from({ length: 24 }, (_, i) => {
        const angle = i * 15;
        const isCoveredByLink = links.some((l) => Math.abs(l.angle - angle) < 10);
        if (isCoveredByLink) return null;

        const { x, y } = polarToCartesian(center, numberRadius, angle);
        return (
          <g key={`num-${angle}`} transform={`translate(${x}, ${y})`}>
            <g style={{ transform: `rotate(${angle}deg)` }}>
              <text
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-foreground/40 text-xs tabular-nums"
                style={{ fontFamily: "var(--font-doto)" }}
              >
                {angle}
              </text>
            </g>
          </g>
        );
      })}
    </>
  );
}

interface ActiveZoneOverlayProps {
  center: number;
  outerRadius: number;
  activeZoneAngle: number;
  activeZoneThreshold: number;
}

function ActiveZoneOverlay({ center, outerRadius, activeZoneAngle, activeZoneThreshold }: ActiveZoneOverlayProps) {
  const startPt = polarToCartesian(center, outerRadius, activeZoneAngle - activeZoneThreshold);
  const endPt = polarToCartesian(center, outerRadius, activeZoneAngle + activeZoneThreshold);
  const pointerPt = polarToCartesian(center, outerRadius, activeZoneAngle);

  return (
    <g className="pointer-events-none">
      <path
        d={`M ${center} ${center} L ${startPt.x} ${startPt.y} A ${outerRadius} ${outerRadius} 0 0 1 ${endPt.x} ${endPt.y} Z`}
        fill="currentColor"
        className="text-green-500/10 dark:text-green-500/20"
      />
      <line
        x1={center}
        y1={center}
        x2={pointerPt.x}
        y2={pointerPt.y}
        className="stroke-green-500/50"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <circle
        cx={center}
        cy={center}
        r={outerRadius}
        className="fill-none stroke-green-500/30"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
    </g>
  );
}

interface CompassDebugHudProps {
  totalRotation: MotionValue<number>;
  activeZoneAngle: number;
  activeZoneThreshold: number;
  links: CompassNavLink[];
}

function CompassDebugHud({ totalRotation, activeZoneAngle, activeZoneThreshold, links }: CompassDebugHudProps) {
  const [debugInfo, setDebugInfo] = useState({ rot: 0, link: "None" });

  useMotionValueEvent(totalRotation, "change", (latest) => {
    const abs = latest % 360;
    const normalized = abs >= 0 ? abs : abs + 360;
    const activeLink = links.find(
      (l) => calcProximityProgress(l.angle, normalized, activeZoneAngle, activeZoneThreshold) > 0
    );
    setDebugInfo({ rot: Math.round(normalized), link: activeLink?.label ?? "None" });
  });

  return (
    <motion.div
      drag
      dragMomentum={false}
      className="absolute top-0 left-4 z-50 p-4 rounded-xl border border-foreground/10 bg-background/80 backdrop-blur-md shadow-sm text-sm font-mono flex flex-col gap-2 cursor-grab active:cursor-grabbing"
    >
      <div className="font-semibold text-foreground border-b border-foreground/10 pb-2 mb-1 pointer-events-none">
        Compass HUD
      </div>
      <div className="flex justify-between gap-6 pointer-events-none">
        <span className="text-foreground/60">Wheel Rotation</span>
        <span className="text-orange-500 font-medium tabular-nums">{debugInfo.rot}°</span>
      </div>
      <div className="flex justify-between gap-6 pointer-events-none">
        <span className="text-foreground/60">Active Zone</span>
        <span className="text-green-500 font-medium tabular-nums">{activeZoneAngle}° ±{activeZoneThreshold}°</span>
      </div>
      <div className="flex justify-between gap-6 pointer-events-none">
        <span className="text-foreground/60">Active Link</span>
        <span className={cn("font-medium", debugInfo.link !== "None" ? "text-orange-500" : "text-foreground/40")}>
          {debugInfo.link}
        </span>
      </div>
    </motion.div>
  );
}

const DEFAULT_COLORS: CompassColors = {
  active: "fill-orange-300 dark:fill-orange-300",
  idle: "fill-foreground/50 font-medium",
  idleHover: "hover:fill-foreground/80",
};


export function NavigationCompass({
  links,
  activeZoneAngle,
  activeZoneThreshold = 15,
  roseRotation = 45,
  tickCount = 180,
  size = 756,
  colors = DEFAULT_COLORS,
  showDetails = false,
  className,
}: NavigationCompassProps) {
  const center = size / 2;

  // All radii are proportional to `size` so the compass scales correctly at any dimension
  const outerRadius = Math.round(size * 0.4233);
  const tickMajorRadius = Math.round(size * 0.3836);
  const tickMediumRadius = Math.round(size * 0.3968);
  const tickMinorRadius = Math.round(size * 0.4101);
  const textRadius = Math.round(size * 0.4762);
  const numberRadius = Math.round(size * 0.4497);

  const containerRef = useRef<HTMLDivElement>(null);
  const { totalRotation, onPan, onPanEnd } = useCompassRotation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      ref={containerRef}
      className={cn("relative pointer-events-auto touch-none select-none", className)}
    >
      {showDetails && (
        <CompassDebugHud
          totalRotation={totalRotation}
          activeZoneAngle={activeZoneAngle}
          activeZoneThreshold={activeZoneThreshold}
          links={links}
        />
      )}

      <motion.svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ overflow: "visible", touchAction: "none" }}
        aria-label="Navigation compass"
        role="navigation"
        onPan={(_e, info) => onPan(containerRef, info)}
        onPanEnd={onPanEnd}
      >
        <CompassRose center={center} roseRotation={roseRotation} />

        {showDetails && (
          <ActiveZoneOverlay
            center={center}
            outerRadius={outerRadius}
            activeZoneAngle={activeZoneAngle}
            activeZoneThreshold={activeZoneThreshold}
          />
        )}

        <motion.g
          style={{
            transformOrigin: "50% 50%",
            transformBox: "view-box",
            rotate: prefersReducedMotion ? 0 : totalRotation,
          }}
        >
          <circle
            cx={center}
            cy={center}
            r={outerRadius}
            fill="none"
            className="stroke-foreground/20"
            strokeWidth="1"
            strokeDasharray="6 3"
          />

          {Array.from({ length: tickCount }, (_, i) => (
            <CompassTick
              key={i}
              index={i}
              center={center}
              outerRadius={outerRadius}
              tickMajorRadius={tickMajorRadius}
              tickMediumRadius={tickMediumRadius}
              tickMinorRadius={tickMinorRadius}
              tickCount={tickCount}
              totalRotation={totalRotation}
              activeZoneAngle={activeZoneAngle}
              activeZoneThreshold={activeZoneThreshold}
              prefersReducedMotion={!!prefersReducedMotion}
            />
          ))}

          {links.map((link, index) => (
            <CompassLinkItem
              key={`${link.href}-${index}`}
              link={link}
              center={center}
              textRadius={textRadius}
              totalRotation={totalRotation}
              activeZoneAngle={activeZoneAngle}
              activeZoneThreshold={activeZoneThreshold}
              colors={colors}
              prefersReducedMotion={!!prefersReducedMotion}
            />
          ))}

          <CompassDegreeLabels
            center={center}
            numberRadius={numberRadius}
            links={links}
          />
        </motion.g>
      </motion.svg>
    </div>
  );
}

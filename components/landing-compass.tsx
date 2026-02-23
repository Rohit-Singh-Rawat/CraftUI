"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMobile } from "@/hooks/useMobile";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  MotionValue,
  useMotionValue,
} from "motion/react";

const CENTER = 378;
const RADIUS = {
  OUTER: 320,
  TICK_MAJOR: 290,
  TICK_MEDIUM: 300,
  TICK_MINOR: 310,
  TEXT: 360,
  NUMBER: 340,
};
const TICK_COUNT = 180;
const ACTIVE_ZONE_THRESHOLD = 15; // Degrees of proximity to trigger effects

const LINKS = [
  { angle: 270, label: "Home", href: "/" },
  { angle: 330, label: "Crafts", href: "/crafts" },
  { angle: 30, label: "Diary", href: "/diary" },
  { angle: 90, label: "Home", href: "/" },
  { angle: 150, label: "Crafts", href: "/crafts" },
  { angle: 210, label: "Diary", href: "/diary" },
];

function CompassRose({ isMobile }: { isMobile: boolean }) {
  return (
    <g>
      <defs>
        <filter id="inner-shadow" filterUnits="userSpaceOnUse" x="0" y="0" width="756" height="756">
          <feOffset dx="0" dy="6" />
          <feGaussianBlur stdDeviation="12" result="offset-blur" />
          <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
          <feFlood floodColor="black" floodOpacity="0.25" result="color" />
          <feComposite operator="in" in="color" in2="inverse" result="shadow" />
          <feComposite operator="over" in="shadow" in2="SourceGraphic" />
        </filter>
      </defs>

      <circle cx={CENTER} cy={CENTER} r="254" className="fill-white dark:fill-[#0a0a0a]" filter="url(#inner-shadow)" />

      <circle cx={CENTER} cy={CENTER} r="250" className="fill-none stroke-foreground/20" strokeWidth="1" />
      <circle cx={CENTER} cy={CENTER} r="242" className="fill-none stroke-foreground/20" strokeWidth="2" />
      <circle cx={CENTER} cy={CENTER} r="230" className="fill-none stroke-foreground/10" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx={CENTER} cy={CENTER} r="80" className="fill-none stroke-foreground/10" strokeWidth="1" />
      
      <g transform={`translate(${CENTER}, ${CENTER}) scale(0.9) rotate(${isMobile ? 0 : 45})`}>
         <circle cx="0" cy="0" r="12" className="fill-none stroke-foreground/40" strokeWidth="2" />
         <circle cx="0" cy="0" r="4" className="fill-foreground/60" />

         {[45, 135, 225, 315].map((rot) => (
            <g key={`minor-${rot}`} transform={`rotate(${rot})`}>
               <polygon points={`0,0 0,-130 -15,0`} className="fill-none stroke-foreground/40" strokeWidth="1" />
               <polygon points={`0,0 0,-130 15,0`} className="fill-none stroke-foreground/40" strokeWidth="1" />
            </g>
         ))}

         {[0, 90, 180, 270].map((rot) => (
            <g key={`major-${rot}`} transform={`rotate(${rot})`}>
               <polygon points={`0,0 0,-215 -25,0`} className="fill-none stroke-foreground/60" strokeWidth="1.5" />
               <polygon points={`0,0 0,-215 25,0`} className="fill-none stroke-foreground/60" strokeWidth="1.5" />
            </g>
         ))}
      </g>
    </g>
  );
}

function CompassLink({
  item,
  activeZoneAngle,
  totalRotation,
}: {
  item: { angle: number; label: string; href: string };
  activeZoneAngle: number;
  totalRotation: MotionValue<number>;
}) {
  const angleRad = ((item.angle - 90) * Math.PI) / 180;
  const textX = CENTER + Math.cos(angleRad) * RADIUS.TEXT;
  const textY = CENTER + Math.sin(angleRad) * RADIUS.TEXT;

  const [isNear, setIsNear] = useState(false);

  useMotionValueEvent(totalRotation, "change", (latestAngle) => {
    const absoluteAngle = (item.angle + latestAngle) % 360;
    const normalizedAngle = absoluteAngle >= 0 ? absoluteAngle : absoluteAngle + 360;
    const dist = Math.min(
      Math.abs(normalizedAngle - activeZoneAngle),
      360 - Math.abs(normalizedAngle - activeZoneAngle)
    );
    // Only update state when threshold is crossed to prevent unnecessary re-renders
    const nextIsNear = dist < ACTIVE_ZONE_THRESHOLD;
    if (nextIsNear !== isNear) setIsNear(nextIsNear);
  });

  const progress = useTransform(totalRotation, (latestAngle) => {
    const absoluteAngle = (item.angle + latestAngle) % 360;
    const normalizedAngle = absoluteAngle >= 0 ? absoluteAngle : absoluteAngle + 360;
    const dist = Math.min(
      Math.abs(normalizedAngle - activeZoneAngle),
      360 - Math.abs(normalizedAngle - activeZoneAngle)
    );
    if (dist < ACTIVE_ZONE_THRESHOLD) {
      const p = 1 - dist / ACTIVE_ZONE_THRESHOLD;
      return p * p * (3 - 2 * p); // smoothstep
    }
    return 0;
  });

  const motionProgress = useSpring(progress, { stiffness: 300, damping: 20, mass: 0.8 });

  const scale = useTransform(motionProgress, [0, 1], [1, 1.2]);
  const counterRotation = useTransform(totalRotation, (r) => -r);

  return (
    <Link href={item.href} passHref>
      <line
        x1={CENTER + Math.cos(angleRad) * 200}
        y1={CENTER + Math.sin(angleRad) * 200}
        x2={CENTER + Math.cos(angleRad) * 450}
        y2={CENTER + Math.sin(angleRad) * 450}
        stroke="transparent"
        strokeWidth="40"
        style={{ cursor: "pointer", zIndex: 10 }}
      />
      <g transform={`translate(${textX}, ${textY})`}>
        <motion.g style={{ scale, rotate: counterRotation }}>
          <text
            textAnchor="middle"
            dominantBaseline="middle"
            className={cn(
              "cursor-pointer pointer-events-auto transition-colors duration-200",
              isNear
                ? "fill-orange-500 dark:fill-orange-500 "
                : "fill-foreground/50 hover:fill-foreground/80 font-medium"
            )}
            style={{ fontFamily: "var(--font-inter)", fontSize: "16px" }}
          >
            {item.label}
          </text>
        </motion.g>
      </g>
    </Link>
  );
}

function CompassTick({
  i,
  totalRotation,
  activeZoneAngle,
}: {
  i: number;
  totalRotation: MotionValue<number>;
  activeZoneAngle: number;
}) {
  const angleDeg = (i * 360) / TICK_COUNT;
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  const isMajor = angleDeg % 15 === 0;
  const isMedium = angleDeg % 5 === 0;

  let innerRadiusBase = RADIUS.TICK_MINOR;
  if (isMajor) innerRadiusBase = RADIUS.TICK_MAJOR;
  else if (isMedium) innerRadiusBase = RADIUS.TICK_MEDIUM;

  const innerRadius = useTransform(totalRotation, (rotation) => {
    const absoluteAngle = (angleDeg + rotation) % 360;
    const normalizedAngle = absoluteAngle >= 0 ? absoluteAngle : absoluteAngle + 360;
    const dist = Math.min(
      Math.abs(normalizedAngle - activeZoneAngle),
      360 - Math.abs(normalizedAngle - activeZoneAngle)
    );

    if (dist < ACTIVE_ZONE_THRESHOLD) {
      const progress = 1 - dist / ACTIVE_ZONE_THRESHOLD;
      const easeProgress = progress * progress * (3 - 2 * progress);
      return innerRadiusBase - easeProgress * 25; // Wave extension
    }
    return innerRadiusBase;
  });

  const x1 = useTransform(innerRadius, (r) => CENTER + Math.cos(angleRad) * r);
  const y1 = useTransform(innerRadius, (r) => CENTER + Math.sin(angleRad) * r);

  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={CENTER + Math.cos(angleRad) * RADIUS.OUTER}
      y2={CENTER + Math.sin(angleRad) * RADIUS.OUTER}
      className={cn(isMajor ? "stroke-foreground/40" : "stroke-foreground/20")}
      strokeWidth={isMajor ? 1.5 : 1}
    />
  );
}

export function LandingCompass({ className }: { className?: string }) {
  const manualOffset = useMotionValue(0);
  const springOffset = useSpring(manualOffset, { stiffness: 200, damping: 20, mass: 1 });
  
  const containerRef = useRef<HTMLDivElement>(null);

  const isMobile = useMobile();
  const activeZoneAngle = isMobile ? 0 : 45;

  const { scrollY } = useScroll();
  
  const scrollRotation = useTransform(scrollY, (v) => -15 + v * 0.05);
  
  const smoothRotation = useSpring(scrollRotation, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Combine scroll and offset springs into one motion value
  const totalRotation = useTransform(
    () => smoothRotation.get() + springOffset.get()
  );

  return (
    <div 
        ref={containerRef}
        className={cn("relative pointer-events-auto touch-none select-none", className)}
    >
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 756 756"
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ overflow: "visible", touchAction: "none" }}
        onPan={(e, info) => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const cx = rect.left + window.scrollX + rect.width / 2;
          const cy = rect.top + window.scrollY + rect.height / 2;

          const x1 = info.point.x - info.delta.x;
          const y1 = info.point.y - info.delta.y;
          const x2 = info.point.x;
          const y2 = info.point.y;

          const angle1 = Math.atan2(y1 - cy, x1 - cx);
          const angle2 = Math.atan2(y2 - cy, x2 - cx);

          let deltaAngle = angle2 - angle1;
          if (deltaAngle > Math.PI) deltaAngle -= 2 * Math.PI;
          if (deltaAngle < -Math.PI) deltaAngle += 2 * Math.PI;

          const deltaDeg = deltaAngle * (180 / Math.PI);
          manualOffset.set(manualOffset.get() + deltaDeg);
        }}
        onPanEnd={() => {
          const angularVelocity = springOffset.getVelocity();
          
          if (Math.abs(angularVelocity) > 10) {
            const momentum = angularVelocity * 0.4;
            manualOffset.set(manualOffset.get() + momentum);
          }
        }}
      >
        <CompassRose isMobile={isMobile} />

        <motion.g
          style={{
            transformOrigin: "50% 50%",
            transformBox: "view-box",
            rotate: totalRotation
          }}
        >
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS.OUTER}
            fill="none"
            className="stroke-foreground/20"
            strokeWidth="1"
            strokeDasharray="6 3"
          />

          {Array.from({ length: TICK_COUNT }).map((_, i) => (
            <CompassTick
              key={`tick-${i}`}
              i={i}
              totalRotation={totalRotation}
              activeZoneAngle={activeZoneAngle}
            />
          ))}

          {LINKS.map((item, index) => (
            <CompassLink 
              key={`${item.href}-${index}`} 
              item={item} 
              activeZoneAngle={activeZoneAngle} 
              totalRotation={totalRotation}
            />
          ))}

          {Array.from({ length: 24 }).map((_, i) => {
            const angle = i * 15;
            const angleRad = ((angle - 90) * Math.PI) / 180;
            const isNearLink = LINKS.some(link => Math.abs(link.angle - angle) < 10);
            
            if (isNearLink) return null;

            return (
              <g key={`num-${i}`} transform={`translate(${CENTER + Math.cos(angleRad) * RADIUS.NUMBER}, ${CENTER + Math.sin(angleRad) * RADIUS.NUMBER})`}>
                <g style={{ transform: `rotate(${angle}deg)` }}>
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-foreground/40 text-xs"
                    style={{ fontFamily: "var(--font-doto)" }}
                  >
                    {angle}
                  </text>
                </g>
              </g>
            );
          })}
        </motion.g>
      </motion.svg>
    </div>
  );
}

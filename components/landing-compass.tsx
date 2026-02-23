"use client";

import { useMobile } from "@/hooks/useMobile";
import { NavigationCompass } from "@/craft/components/navigation-compass";

const LINKS = [
  { angle: 270, label: "Home", href: "/" },
  { angle: 330, label: "Crafts", href: "/crafts" },
  { angle: 30, label: "Diary", href: "/diary" },
  { angle: 90, label: "Home", href: "/" },
  { angle: 150, label: "Crafts", href: "/crafts" },
  { angle: 210, label: "Diary", href: "/diary" },
];

interface LandingCompassProps {
  className?: string;
  showDetails?: boolean;
}

export function LandingCompass({ className, showDetails = false }: LandingCompassProps) {
  const isMobile = useMobile();

  return (
    <NavigationCompass
      links={LINKS}
      activeZoneAngle={isMobile ? 0 : 45}
      roseRotation={isMobile ? 0 : 45}
      showDetails={showDetails}
      className={className}
    />
  );
}

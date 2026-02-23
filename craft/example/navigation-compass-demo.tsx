"use client";

import { useState } from "react";
import { NavigationCompass } from "@/craft/components/navigation-compass";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMobile } from "@/hooks/useMobile";

const DEMO_LINKS = [
  { angle: 270, label: "Home", href: "/" },
  { angle: 330, label: "Crafts", href: "/crafts" },
  { angle: 30, label: "Diary", href: "/diary" },
  { angle: 90, label: "Home", href: "/" },
  { angle: 150, label: "Crafts", href: "/crafts" },
  { angle: 210, label: "Diary", href: "/diary" },
];

export default function NavigationCompassDemo() {
  const [showDetails, setShowDetails] = useState(false);
  const isMobile = useMobile();

  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-8 relative overflow-hidden px-4">
      <div className="flex items-center space-x-3 absolute top-6 right-6 z-[100] bg-background/80 backdrop-blur-xl p-3 rounded-2xl border border-border shadow-2xl hover:bg-background transition-colors scale-90 sm:scale-100">
        <Switch 
          checked={showDetails} 
          onCheckedChange={setShowDetails} 
          id="debug-mode"
        />
        <Label 
          htmlFor="debug-mode"
          className="text-[10px] font-bold uppercase tracking-widest cursor-pointer select-none text-muted-foreground/80 hover:text-foreground transition-colors"
        >
          Debug Mode
        </Label>
      </div>

      <div className="w-full max-w-[320px] sm:max-w-md lg:max-w-2xl aspect-square">
        <NavigationCompass
          links={DEMO_LINKS}
          activeZoneAngle={isMobile ? 0 : 45}
          roseRotation={isMobile ? 0 : 45}
          showDetails={showDetails}
          className="w-full h-full"
        />
      </div>

      <div className="text-center max-w-md px-4 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <p className="text-sm text-muted-foreground font-serif italic tracking-wide">
          "Not all those who wander are lost."
        </p>
        <p className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.2em] font-sans mt-2">
          J.R.R. Tolkien
        </p>
      </div>
    </div>
  );
}

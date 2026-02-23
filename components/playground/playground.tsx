"use client";

import { AnimatedCompass } from "../animated-compass";
import { LandingCompass } from "../landing-compass";

const PlayGround = () => {
  return (
    <div className="w-full h-full flex items-center justify-center gap-8 flex-col  bg-background p-5">
      <LandingCompass/>
    </div>
  );
};

export default PlayGround;

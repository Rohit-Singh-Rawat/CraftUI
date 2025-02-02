import type React from 'react';
import HexagonBackground from '../crafts/HexagonBackground';

const HexagonBackgroundDemo: React.FC = () => {
  return (
    <div className="relative h-[400px] w-full">
      <HexagonBackground
        className="absolute inset-0"
        color="#1F2942"
        secondaryColor="#288898"
        fade
        cellSize="80px"
        opacity={0.7}
      />
      <div className="relative z-10 flex h-full items-center justify-center p-4 text-center sm:p-6">
        <h2 className="bg-gradient-to-b from-black to-green-200/50 bg-clip-text font-semibold text-2xl text-transparent sm:text-3xl md:text-6xl dark:from-white/70 dark:to-green-900/20">
          Hexagon Background
        </h2>
      </div>
    </div>
  );
};

export default HexagonBackgroundDemo;

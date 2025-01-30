import React from 'react';

const InlineStyleMarquee = () => {
  const text = 'Site under development 🚧';

  const marqueeStyle = {
    display: 'inline-block',
    whiteSpace: 'nowrap',

    animation: 'marquee 30s linear infinite',
  };

  const keyframes = `
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `;

  const containerStyle = {
    width: '200%',
    display: 'flex',
  };

  return (
    <div className="relative w-full overflow-hidden">
      <style>{keyframes}</style>
      <div style={containerStyle} className="border p-2">
        <div style={marqueeStyle} className="space-x-20">
          {Array(20).fill(
            <span className="mx-4 font-mono text-xl">{text}</span>,
          )}
        </div>
        <div style={marqueeStyle} className="space-x-20">
          {Array(20).fill(
            <span className="mx-4 font-mono text-xl">{text}</span>,
          )}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-radial from-white/0 to-white dark:to-black" />
    </div>
  );
};

export default InlineStyleMarquee;

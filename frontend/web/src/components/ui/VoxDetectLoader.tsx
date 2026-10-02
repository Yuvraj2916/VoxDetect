/**
 * src/components/ui/VoxDetectLoader.tsx
 * Branded loading animation: the VoxDetect oscilloscope "V" equalizer bars
 * pulse up and down (staggered, symmetric) with the authenticity node.
 * Pure CSS. Respects reduced motion (static via CSS).
 */
import React from 'react';

interface VoxDetectLoaderProps {
  size?: number;
  className?: string;
}

const BAR_SPECS = [
  { x: 12, y: 12, h: 18 },
  { x: 19, y: 18, h: 20 },
  { x: 26, y: 26, h: 18 },
  { x: 33.5, y: 26, h: 18 },
  { x: 40.5, y: 18, h: 20 },
  { x: 47.5, y: 12, h: 18 },
];

export function VoxDetectLoader({ size = 28, className = '' }: VoxDetectLoaderProps) {
  const id = React.useId().replace(/:/g, '_');
  const delays = ['0s', '0.18s', '0.36s', '0.36s', '0.18s', '0s'];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none overflow-visible ${className}`}
      role="progressbar"
      aria-label="Loading"
    >
      <defs>
        <linearGradient id={`${id}-grad`} x1="12" y1="12" x2="52" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00e5ff" />
          <stop offset="50%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>

      {BAR_SPECS.map((bar, i) => (
        <rect
          key={bar.x}
          x={bar.x}
          y={bar.y}
          width="4.5"
          height={bar.h}
          rx="2.25"
          fill={`url(#${id}-grad)`}
          className="vox-load-bar"
          style={{ animationDelay: delays[i], animationDuration: '1.1s' }}
        />
      ))}

      <circle className="vox-load-node" cx="32" cy="50" r="2.5" fill="#00e5ff" />
    </svg>
  );
}

export default VoxDetectLoader;
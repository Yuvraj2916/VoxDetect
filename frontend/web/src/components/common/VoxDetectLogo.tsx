/**
 * src/components/common/VoxDetectLogo.tsx
 *
 * Official VoxDetect Brand Mark: The Oscilloscope "V".
 * Sound frequency equalizer bars stepping into an aerodynamic modern "V"
 * with an authenticity focus node. Pure vector, transparent background.
 */
import React from 'react';

interface VoxDetectLogoProps {
  size?: number;
  className?: string;
}

export function VoxDetectLogo({
  size = 28,
  className = '',
}: VoxDetectLogoProps) {
  const id = React.useId().replace(/:/g, '_');

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none overflow-visible ${className}`}
    >
      <defs>
        <linearGradient id={`${id}-grad`} x1="12" y1="12" x2="52" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00e5ff" />
          <stop offset="50%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>

      {/* Left Wing (Descending audio frequency bars) */}
      <rect x="12" y="12" width="4.5" height="18" rx="2.25" fill={`url(#${id}-grad)`} />
      <rect x="19" y="18" width="4.5" height="20" rx="2.25" fill={`url(#${id}-grad)`} />
      <rect x="26" y="26" width="4.5" height="18" rx="2.25" fill={`url(#${id}-grad)`} />

      {/* Right Wing (Ascending audio frequency bars) */}
      <rect x="33.5" y="26" width="4.5" height="18" rx="2.25" fill={`url(#${id}-grad)`} />
      <rect x="40.5" y="18" width="4.5" height="20" rx="2.25" fill={`url(#${id}-grad)`} />
      <rect x="47.5" y="12" width="4.5" height="18" rx="2.25" fill={`url(#${id}-grad)`} />

      {/* Vertex Authenticity Detection Point */}
      <circle cx="32" cy="50" r="2.5" fill="#00e5ff" />
    </svg>
  );
}

export default VoxDetectLogo;

/**
 * src/components/ui/LoadingState.tsx
 */
import React from 'react';
import { VoxDetectLoader } from './VoxDetectLoader';

interface Props {
  message?: string;
}

export function LoadingState({ message = 'Loading...' }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <VoxDetectLoader size={48} />
      <p className="text-xs text-[rgb(var(--text-muted))] font-mono">{message}</p>
    </div>
  );
}
/**
 * src/pages/NotFound.tsx
 *
 * Fullscreen standalone 404 page inspired by Supabase's clean minimalist aesthetic:
 * - Completely hides sidebar, top navbar, and chrome
 * - Watermark "404" spanning the background
 * - Top-left VoxDetect brand mark
 * - Centered prompt "Looking for something? 🔍" and "Head back" CTA
 * - Quick navigational links below
 */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { VoxDetectLogo } from '@/components/common/VoxDetectLogo';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[rgb(var(--bg))] text-[rgb(var(--text-primary))] flex flex-col justify-between overflow-hidden select-none">
      {/* Top Bar: Brand logo & Theme toggle */}
      <header className="relative z-20 w-full px-6 py-6 md:px-10 md:py-8 flex items-center justify-between">
        <Link
          to="/dashboard"
          className="flex items-center gap-2.5 group transition-opacity hover:opacity-90"
          aria-label="VoxDetect Dashboard"
        >
          <VoxDetectLogo size={28} />
          <span className="text-[16px] font-semibold tracking-tight text-[rgb(var(--text-primary))] flex items-center">
            Vox<span className="text-[rgb(var(--accent-soft))] ml-0.5">Detect</span>
          </span>
        </Link>

        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-lg text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] hover:bg-white/[0.04] dark:hover:bg-white/[0.06] transition-colors"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </header>

      {/* Giant 404 Watermark Background */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <span className="text-[36vw] md:text-[26rem] lg:text-[32rem] font-black tracking-tighter leading-none text-black/[0.07] dark:text-white/[0.09] transform -translate-y-2" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontVariantNumeric: 'normal' }}>
          404
        </span>
      </div>

      {/* Glassy frosted overlay — sits above the watermark (later in DOM, same z-0) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none select-none bg-[rgb(var(--bg))]/30 backdrop-blur-[6px]"
        aria-hidden="true"
      />

      {/* Centered Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[rgb(var(--text-primary))]">
          Looking for something?
        </h1>

        <p className="mt-2.5 text-sm sm:text-base text-[rgb(var(--text-secondary))] max-w-md">
          We couldn't find the page that you're looking for!
        </p>

        <button
          type="button"
          onClick={handleBack}
          className="btn btn-primary mt-6"
        >
          Head back
        </button>

        {/* Quick Links */}
        <nav
          aria-label="Helpful links"
          className="mt-8 flex items-center justify-center flex-wrap gap-x-3 gap-y-2 text-xs sm:text-sm text-[rgb(var(--text-muted))]"
        >
          <Link
            to="/dashboard"
            className="hover:text-[rgb(var(--text-primary))] underline-offset-4 hover:underline transition-colors"
          >
            Dashboard
          </Link>
          <span className="opacity-30 select-none">·</span>
          <Link
            to="/live-call"
            className="hover:text-[rgb(var(--text-primary))] underline-offset-4 hover:underline transition-colors"
          >
            Live Call
          </Link>
          <span className="opacity-30 select-none">·</span>
          <Link
            to="/analyze"
            className="hover:text-[rgb(var(--text-primary))] underline-offset-4 hover:underline transition-colors"
          >
            Analyze
          </Link>
          <span className="opacity-30 select-none">·</span>
          <Link
            to="/voiceprints"
            className="hover:text-[rgb(var(--text-primary))] underline-offset-4 hover:underline transition-colors"
          >
            Voiceprints
          </Link>
          <span className="opacity-30 select-none">·</span>
          <Link
            to="/privacy"
            className="hover:text-[rgb(var(--text-primary))] underline-offset-4 hover:underline transition-colors"
          >
            Privacy
          </Link>
        </nav>
      </main>

      {/* Subtle bottom footer spacer for balance */}
      <footer className="relative z-10 w-full px-6 py-4 text-center text-xs text-[rgb(var(--text-muted))] opacity-0 pointer-events-none">
        VoxDetect
      </footer>
    </div>
  );
}

export default NotFound;
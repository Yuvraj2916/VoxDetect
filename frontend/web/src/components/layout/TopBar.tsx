/**
 * src/components/layout/TopBar.tsx — Two-row security operations top bar
 *
 * Row 1: Logo + wordmark | Org selector | Status + Theme + Bell + Avatar
 * Row 2: Action buttons (centered, prominent size) | Model status pill
 */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useOrganization } from '@/context/OrganizationContext';
import { useTheme } from '@/context/ThemeContext';
import { useAlertContext } from '@/context/AlertContext';
import { useHealthCheck } from '@/hooks/useHealthCheck';
import { Select } from '@/components/ui/Select';
import type { SelectOption } from '@/components/ui/Select';
import { ExportReportModal } from './ExportReportModal';
import { Plus, UserPlus } from 'lucide-react';
import { VoxDetectLogo } from '@/components/common/VoxDetectLogo';
import { Classic as ThemeToggle } from '@/components/ui/ThemeToggle';
import { Tooltip } from '@/components/ui/Tooltip';
import { NotificationIcon, DownloadDoneIcon } from '@/components/ui/AnimatedIcons';
import type { OrgType } from '@/types';

const orgOptions: SelectOption[] = [
  { value: 'bank', label: 'Bank', sublabel: 'Strict Financial' },
  { value: 'enterprise', label: 'Enterprise', sublabel: 'Standard' },
  { value: 'government', label: 'Government', sublabel: 'Maximum Security' },
];

export function TopBar() {
  const { org, setOrg } = useOrganization();
  const { theme, toggleTheme } = useTheme();
  const { toasts } = useAlertContext();
  // Persistent "unread" marker: lights when a toast arrives and stays until
  // the user opens the Alerts page (bell click acknowledges the notification).
  const [unread, setUnread] = useState(false);
  useEffect(() => {
    if (toasts.length > 0) setUnread(true);
  }, [toasts.length]);

  const { health, loading } = useHealthCheck(30000);
  const isOnline = health?.status === 'ok';
  const isOffline = !loading && !isOnline;
  const navigate = useNavigate();

  const [exportOpen, setExportOpen] = useState(false);

  const handleExportReport = () => setExportOpen(true);
  return (
    <header className="shrink-0 overflow-x-hidden select-none">
      {/* Row 1: Logo, Org selector, Status */}
      <div className="h-12 px-4 flex items-center justify-between">
        {/* Left: Logo (icon only, no wordmark) */}
        <Link to="/dashboard" className="hidden md:flex items-center -ml-2 group transition-opacity hover:opacity-90">
          <VoxDetectLogo size={44} className="translate-y-[6px] sm:translate-y-[8px] md:translate-y-[10px] lg:translate-y-[14px]" />
        </Link>

        {/* Center: Org selector */}
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] font-medium uppercase tracking-wider text-[rgb(var(--text-muted))]">
            Profile
          </span>
          <Select
            value={org}
            onChange={(v) => setOrg(v as OrgType)}
            options={orgOptions}
            ariaLabel="Active organization policy"
            pill
          />
        </div>

        {/* Right: Status, Theme toggle, bell, avatar */}
        <div className="flex items-center gap-2.5">
          {/* Status indicator */}
          <span className="flex items-center gap-1.5 mr-1">
            <span
              className={`w-2 h-2 rounded-full ${
                isOnline ? 'bg-[rgb(var(--status-online))]' : isOffline ? 'bg-[rgb(var(--status-offline))]' : 'bg-[rgb(var(--text-muted))]'
              }`}
            />
            <span className="text-[11px] font-mono text-[rgb(var(--text-muted))]">
              {isOnline ? 'ONLINE' : isOffline ? 'OFFLINE' : 'CHECKING'}
            </span>
          </span>

          {/* Theme toggle */}
          <Tooltip label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} side="bottom">
            <ThemeToggle
              onClick={toggleTheme}
              title=""
              className="p-1.5 rounded-lg text-[18px] text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] hover:bg-[var(--hover-bg)] transition-colors"
            />
          </Tooltip>

          {/* Notifications */}
          <Tooltip label="Notifications" side="bottom">
            <button
              className="relative p-2 rounded-lg text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] hover:bg-[var(--hover-bg)] transition-colors"
              onClick={() => {
                setUnread(false);
                navigate('/alerts');
              }}
            >
              <NotificationIcon size={16} className="text-[rgb(var(--text-muted))]" active={unread} pulse={toasts.length} />
            </button>
          </Tooltip>

          {/* Avatar */}
          <div className="w-7 h-7 rounded-full bg-[rgb(var(--bg-elevated))] flex items-center justify-center border border-[rgb(var(--border-subtle))]">
            <span className="text-[11px] font-semibold text-[rgb(var(--text-secondary))]">AD</span>
          </div>
        </div>
      </div>

      {/* Row 2: Centered action buttons with Model pill on the right */}
      <div className="h-11 px-4 flex items-center relative pb-1">
        {/* Left spacer for symmetry */}
        <div className="flex-1 hidden md:block" />

        {/* Center: Action buttons with standard, comfortable dimensions */}
        <div className="flex items-center justify-center gap-2.5 mx-auto">
          <Link
            to="/analyze"
            className="btn btn-primary btn-sm font-medium shadow-md"
          >
            <Plus className="w-4 h-4" /> New Analysis
          </Link>

          {/* Divider — clearly separates primary analysis from the other actions */}
          <div className="w-px h-5 bg-[rgb(var(--border))] mx-0.5" />

          <Link
            to="/voiceprints"
            className="btn btn-ghost btn-sm font-medium"
          >
            <UserPlus className="w-4 h-4" /> Enroll Speaker
          </Link>

          <div className="w-px h-5 bg-[rgb(var(--border))] mx-0.5" />

          <button
            onClick={handleExportReport}
            className="btn btn-ghost btn-sm font-medium"
          >
            <DownloadDoneIcon size={16} /> Export Report
          </button>
        </div>

        {/* Right: Detection mode pill — live from /v1/health */}
        <div className="flex-1 flex justify-end">
          {(() => {
            const mlOk = health?.ml_service === 'ok';
            const device = health?.device || '';
            const gpu = isOnline && mlOk && device.toLowerCase().includes('cuda');
            const cpu = isOnline && mlOk && !gpu;
            const dot = gpu
              ? 'bg-[rgb(var(--status-online))]'
              : cpu
              ? 'bg-[rgb(var(--risk-medium))]'
              : 'bg-[rgb(var(--status-offline))]';
            const label = gpu
              ? 'GPU · CUDA'
              : cpu
              ? 'CPU'
              : 'OFFLINE';
            const latency = gpu ? '0.7s' : cpu ? '~5-10s' : '—';
            return (
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[var(--hover-bg)] text-xs">
                <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                <span className="hidden md:inline text-[9px] font-sans uppercase tracking-wider text-[rgb(var(--text-muted))]">
                  Detection
                </span>
                <span className="hidden md:inline w-px h-3 bg-[rgb(var(--border-subtle))]" />
                <span className={`font-mono font-semibold ${
                  gpu ? 'text-[rgb(var(--status-online))]' : cpu ? 'text-[rgb(var(--risk-medium))]' : 'text-[rgb(var(--status-offline))]'
                }`}>
                  {label}
                </span>
                <span className="whitespace-nowrap font-mono text-[rgb(var(--text-muted))]">
                  {latency}
                </span>
              </div>
            );
          })()}
        </div>
      </div>

      <ExportReportModal
        open={exportOpen}
        org={org}
        systemInfo={{
          system_status: isOnline ? 'online' : 'offline',
          ml_service: health?.ml_service || 'wav2vec2',
          version: health?.version || 'unknown',
        }}
        onClose={() => setExportOpen(false)}
      />
    </header>
  );
}

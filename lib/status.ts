import { getLatestPost } from './posts';

export type StatusState = 'online' | 'away' | 'dnd' | 'offline';

/**
 * Manual override. Set to a specific state to lock the status,
 * or leave as null to use auto-status (based on recent activity).
 */
const MANUAL_OVERRIDE: StatusState | null = null;

/**
 * The away message shown next to the status badge.
 * Update this whenever you want — it's the AIM-classic move.
 */
export const AWAY_MESSAGE = 'suitcase + cobblestone = major L';

/**
 * Get the current status — uses the override if set, otherwise auto-computes
 * based on how recently the last post went up.
 */
export function getStatus(): { state: StatusState; label: string; color: string } {
  const state = MANUAL_OVERRIDE ?? computeAutoStatus();
  return STATUS_INFO[state];
}

function computeAutoStatus(): StatusState {
  const latest = getLatestPost();
  if (!latest) return 'away';

  const lastPostMs = new Date(latest.date).getTime();
  const nowMs = Date.now();
  const daysSinceLastPost = (nowMs - lastPostMs) / (1000 * 60 * 60 * 24);

  if (daysSinceLastPost < 2) return 'online';
  if (daysSinceLastPost < 7) return 'away';
  return 'offline';
}

const STATUS_INFO: Record<StatusState, { state: StatusState; label: string; color: string }> = {
  online: { state: 'online', label: 'ONLINE', color: '#22c55e' },
  away: { state: 'away', label: 'AWAY', color: '#eab308' },
  dnd: { state: 'dnd', label: 'DO NOT DISTURB', color: '#ef4444' },
  offline: { state: 'offline', label: 'OFFLINE', color: '#6b7280' },
};
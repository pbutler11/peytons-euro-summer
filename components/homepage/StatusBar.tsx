import { getCurrentCity } from '@/lib/cities';
import { getStatus, AWAY_MESSAGE } from '@/lib/status';

export function StatusBar() {
  const current = getCurrentCity();
  const status = getStatus();
  if (!current) return null;

  return (
    <div className="status-bar">
      <div
        className="status-badge"
        style={{
          background: status.color,
          color: status.state === 'online' || status.state === 'dnd' ? '#fff' : '#1a1a1a',
        }}
      >
        ● {status.label}
      </div>
      <div className="status-text">
        <span className="status-label">currently in:</span> {current.name},{' '}
        {current.country} {current.flag}
        &nbsp;|&nbsp;
        <span className="status-label">away msg:</span>{' '}
        <span className="status-msg">&ldquo;{AWAY_MESSAGE}&rdquo;</span>
      </div>
    </div>
  );
}
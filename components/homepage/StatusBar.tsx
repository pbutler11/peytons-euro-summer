import { getCurrentCity } from '@/lib/cities';

export function StatusBar() {
  const current = getCurrentCity();
  if (!current) return null;

  return (
    <div className="status-bar">
      <div className="status-badge">● ONLINE</div>
      <div className="status-text">
        <span className="status-label">currently in:</span> {current.name},{' '}
        {current.country} {current.flag}
        &nbsp;|&nbsp;
        <span className="status-label">away msg:</span>{' '}
        <span className="status-msg">&quot;eating pasta brb&quot;</span>
      </div>
    </div>
  );
}
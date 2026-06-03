import { getLatestPost } from '@/lib/posts';

export function Banner() {
  const latest = getLatestPost();
  const lastUpdated = latest
    ? new Date(latest.date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }).toLowerCase()
    : null;

  return (
    <div className="banner">
      <div className="banner-title">★彡 PEYTON&apos;S EURO SUMMER 2026 彡★</div>
      <div className="banner-subtitle">
        ~ travel diary for friends and family across the pond ~
      </div>
      {lastUpdated && (
        <div className="banner-meta">last updated: {lastUpdated}</div>
      )}
    </div>
  );
}
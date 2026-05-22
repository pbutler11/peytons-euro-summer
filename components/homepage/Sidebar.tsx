import Link from 'next/link';
import { getTripStats } from '@/lib/stats';

export function Sidebar() {
    const stats = getTripStats();
  return (
    <aside className="sidebar">
      {/* Navigation */}
      <div className="bevel">
        <div className="widget-title blue">★ navigation</div>
        <nav className="nav-list">
          <div>
            ▸ <Link href="/">home</Link>
          </div>
          <div>
            ▸ <Link href="/trip">the trip</Link>
          </div>
          <div>
            ▸ <Link href="/photos">photo dump</Link>
          </div>
          <div>
            ▸ <Link href="/food">food log</Link>
          </div>
          <div>
            ▸ <Link href="/guestbook">guestbook</Link>
          </div>
          <div>
            ▸ <Link href="/about">about me</Link>
          </div>
        </nav>
      </div>

      {/* Now playing */}
      <div className="bevel">
        <div className="widget-title pink">♪ now playing</div>
        <div className="now-playing">
          <div className="np-artist">caetano veloso</div>
          <div className="np-track">"você é linda"</div>
          <div className="np-controls">▶ ▮▮ ◼ ⏭</div>
          <div className="np-progress">
            <div className="np-progress-fill" />
          </div>
        </div>
      </div>
{/* Trip stats */}
<div className="bevel">
  <div className="widget-title teal">✈ trip stats</div>
  <div className="trip-stats">
    <div>
      cities: <strong>{stats.citiesVisited} / {stats.citiesTotal}</strong>
    </div>
    <div>
      days: <strong>{stats.daysOnTrip}</strong>
    </div>
    <div>
      caffecitos: <strong>{stats.caffecitos}</strong>
    </div>
    <div>
      trains: <strong>{stats.trains}</strong>
    </div>
    <div>
      missed: <strong>{stats.trainsMissed}</strong>
    </div>
  </div>
</div>
      {/* Visitor counter */}
      <div className="bevel visitor-counter">
        <div className="counter-display">00000247</div>
        <div className="counter-label">you are visitor #</div>
      </div>
    </aside>
  );
}
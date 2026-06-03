import Link from 'next/link';
import { getTripStats } from '@/lib/stats';
import { incrementVisitorCount } from '@/lib/db/actions';
import { NowPlayingWidget } from './NowPlaying';

export async function Sidebar() {
    const stats = getTripStats();
  const visitorCount = await incrementVisitorCount();

  return (
    <aside className="sidebar">
      {/* Navigation */}
      <div className="bevel">
        <div className="widget-title blue">★ navigation</div>
        <nav className="nav-list">
          <div>▸ <Link href="/">home</Link></div>
          <div>▸ <Link href="/trip">the trip</Link></div>
          <div>▸ <Link href="/photos">photo album</Link></div>
          <div>▸ <Link href="/food">food log</Link></div>
          <div>▸ <Link href="/guestbook">guestbook</Link></div>
          <div>▸ <Link href="/about">about me</Link></div>
        </nav>
      </div>

      {/* Now playing */}
      <NowPlayingWidget />


      {/* Trip stats */}
      <div className="bevel">
        <div className="widget-title teal">✈ trip stats</div>
        <div className="trip-stats">
          <div>cities: <strong>{stats.citiesVisited} / {stats.citiesTotal}</strong></div>
          <div>days: <strong>{stats.daysOnTrip}</strong></div>
          <div>gelatos: <strong>{stats.caffecitos}</strong></div>
          <div>trains: <strong>{stats.trains}</strong></div>
          <div>missed: <strong>{stats.trainsMissed}</strong></div>
        </div>
      </div>

      {/* Visitor counter */}
      <div className="bevel visitor-counter">
        <div className="counter-display">{formatVisitorCount(visitorCount)}</div>
        <div className="counter-label">you are visitor #</div>
      </div>
    </aside>
  );
}

function formatVisitorCount(n: number): string {
  return String(n).padStart(8, '0');
}
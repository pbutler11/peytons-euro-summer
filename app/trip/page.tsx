import Link from 'next/link';
import { CITIES } from '@/lib/cities';
import { getPostsByCity } from '@/lib/posts';

export const metadata = {
  title: "the whole trip — peyton's euro summer ✿",
  description: "the full itinerary",
};

export default function TripPage() {
  return (
    <div className="trip-page">
      <div className="breadcrumb">
        <Link href="/">← back to home</Link>
      </div>

      <header className="trip-header">
        <h1 className="trip-page-title">✦ the whole trip ✦</h1>
        <p className="trip-page-subtitle">
         city by city!
        </p>
      </header>

      <ol className="trip-timeline">
        {CITIES.map((city, idx) => {
          const postCount = getPostsByCity(city.slug).length;
          return (
            <li
              key={city.slug}
              className={`timeline-item timeline-${city.status}`}
            >
              <div className="timeline-number">
                {String(idx + 1).padStart(2, '0')}
              </div>
              <div className={`timeline-card city-${city.theme}`}>
                <div className="timeline-card-header">
                  <Link href={`/${city.slug}`} className="timeline-city-name">
                    {city.flag} {city.name}
                    {city.status === 'current' ? ' ★' : ''}
                  </Link>
                  <span className="timeline-status">
                    {city.status === 'current' && 'CURRENTLY HERE'}
                    {city.status === 'upcoming' && 'upcoming'}
                    {city.status === 'past' && 'visited ✓'}
                  </span>
                </div>
                <div className="timeline-card-meta">
                  {city.country} ·{' '}
                  {postCount === 0
                    ? 'no posts yet'
                    : `${postCount} post${postCount === 1 ? '' : 's'}`}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <footer className="trip-footer">
        <p>♥ thanks for following along ✦</p>
      </footer>
    </div>
  );
}
import Link from 'next/link';
import { getHomepageCities } from '@/lib/cities';
import { getLatestPost } from '@/lib/posts';


export function MainContent() {
  return (
    <div className="main-content">
      <LatestEntry />
      <CityGrid />
      <AimBubbles />
      <Footer />
    </div>
  );
}

function LatestEntry() {
    const latest = getLatestPost();
    if (!latest) {
      return (
        <article className="latest-entry">
          <h2 className="entry-title">✿ no entries yet</h2>
          <p className="entry-body">
            posts coming soon... check back after the first city!
          </p>
        </article>
      );
    }
  
    return (
      <article className="latest-entry">
        <h2 className="entry-title">✿ latest entry: {latest.title}</h2>
        <div className="entry-meta">
          posted {formatPostDate(latest.date)} · 🏷 {latest.tags.join(', ')}
        </div>
        <p className="entry-body">{latest.excerpt}</p>
        <div className="entry-footer">
          <Link href={`/${latest.city}/${latest.slug}`}>[ read more → ]</Link>
        </div>
      </article>
    );
  }
  
  function formatPostDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
function CityGrid() {
  const cities = getHomepageCities();

  return (
    <>
      <div className="city-grid">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/${city.slug}`}
            className={`city-card city-${city.theme} ${city.status === 'current' ? 'current' : ''} ${city.status === 'past' ? 'past' : ''}`}
          >
            <div className="city-name">
              {city.flag} {city.name}
              {city.status === 'current' ? ' ★' : ''}
            </div>
            <div className="city-meta">
              {city.status === 'current' && 'CURRENTLY HERE'}
              {city.status === 'upcoming' && 'coming soon...'}
              {city.status === 'past' && 'visited ✓'}
            </div>
            <span className="city-enter">→ enter</span>
          </Link>
        ))}
      </div>
      <div
        style={{ textAlign: 'right', fontSize: '11px', marginTop: '-4px' }}
      >
        <Link href="/trip">→ see the whole trip</Link>
      </div>
    </>
  );
}

function AimBubbles() {
  return (
    <div className="aim-conversation">
      <div className="aim-bubble aim-jesse">
        <div className="aim-username">jesse_says ▸</div>
        <div className="aim-message">should we get gelato AGAIN</div>
      </div>
      <div className="aim-bubble aim-peyton">
        <div className="aim-username">◂ pbutler_says</div>
        <div className="aim-message">is that even a question</div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="page-footer">
      ✦ best viewed in netscape 4.0 @ 1024×768 ✦ made with ♥ in europe ✦
    </div>
  );
}
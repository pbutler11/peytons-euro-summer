import Link from 'next/link';

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
  return (
    <article className="latest-entry">
      <h2 className="entry-title">✿ latest entry: bologna day 3</h2>
      <div className="entry-meta">
        posted may 17 @ 11:42pm · 🏷 italy, pasta, jesse, trains
      </div>
      <p className="entry-body">
        jesse and i woke up at 6am to get to the mercato delle erbe before the
        tour groups. ordered tagliatelle al ragù at a tiny place where the nonna
        literally rolled the pasta in front of us. i think i blacked out. wrote
        a whole paragraph in my notes app about it...
      </p>
      <div className="entry-footer">
        <Link href="/bologna/day-3">[ read more → ]</Link>
        <span className="entry-stats"> | 12 comments | ♥ 38</span>
      </div>
    </article>
  );
}

function CityGrid() {
  const cities = [
    {
      slug: 'valencia',
      name: 'valencia',
      meta: 'may 14–19 · 5 posts',
      theme: 'teal',
      current: false,
    },
    {
      slug: 'porto',
      name: 'porto',
      meta: 'coming soon...',
      theme: 'coral',
      current: false,
    },
    {
      slug: 'bologna',
      name: 'bologna ★',
      meta: 'CURRENTLY HERE',
      theme: 'pink',
      current: true,
    },
    {
      slug: 'lyon',
      name: 'lyon',
      meta: 'coming soon...',
      theme: 'purple',
      current: false,
    },
  ];

  return (
    <div className="city-grid">
      {cities.map((city) => (
        <Link
          key={city.slug}
          href={`/${city.slug}`}
          className={`city-card city-${city.theme} ${city.current ? 'current' : ''}`}
        >
          <div className="city-name">📍 {city.name}</div>
          <div className="city-meta">{city.meta}</div>
          <span className="city-enter">→ enter</span>
        </Link>
      ))}
    </div>
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
        <div className="aim-username">◂ peyt_xoxo</div>
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
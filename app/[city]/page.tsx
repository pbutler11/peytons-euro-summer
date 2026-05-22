import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getCityBySlug, CITIES } from '@/lib/cities';
import { getPostsByCity, getCityPostStats } from '@/lib/posts';

type PageProps = {
  params: Promise<{ city: string }>;
};

export async function generateStaticParams() {
  return CITIES.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return { title: 'not found' };
  return {
    title: `${city.name} — peyton's euro summer ✿`,
    description: `posts from ${city.name}, ${city.country}`,
  };
}

export default async function CityPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const posts = getPostsByCity(citySlug);
  const stats = getCityPostStats(citySlug);

  return (
    <div className="city-page">
      <div className="breadcrumb">
        <Link href="/">← back to home</Link>
      </div>

      {stats.heroImage && (
        <div className="city-hero">
          <Image
            src={stats.heroImage}
            alt={city.name}
            width={1600}
            height={600}
            priority
            sizes="(max-width: 600px) 100vw, 800px"
            className="city-hero-img"
          />
          <div className="city-hero-overlay">
            <h1 className="city-hero-title">
              {city.flag} {city.name}
            </h1>
          </div>
        </div>
      )}

      {!stats.heroImage && (
        <header className={`city-header city-${city.theme}`}>
          <h1 className="city-page-title">
            {city.flag} {city.name}
          </h1>
        </header>
      )}

      <div className="city-meta-bar">
        <div>
          <strong>{city.country}</strong> · {city.status}
          {city.status === 'current' ? ' ★' : ''}
        </div>
        <div>
          {stats.count === 0
            ? 'no posts yet'
            : `${stats.count} post${stats.count === 1 ? '' : 's'}`}
          {stats.firstDate && stats.lastDate && stats.count > 1 && (
            <> · {formatShortDate(stats.firstDate)}{' '}
              – {formatShortDate(stats.lastDate)}</>
          )}
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="empty-state bevel-inset">
          <p>no posts here yet... check back soon ✿</p>
        </div>
      ) : (
        <div className="post-grid">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${city.slug}/${post.slug}`}
              className="post-tile"
            >
              {post.hero && (
                <div className="post-tile-image">
                  <Image
                    src={post.hero}
                    alt={post.title}
                    width={400}
                    height={300}
                    sizes="(max-width: 600px) 100vw, 400px"
                    className="post-tile-img"
                  />
                </div>
              )}
              <div className="post-tile-body">
                <h2 className="post-tile-title">{post.title}</h2>
                <div className="post-tile-meta">
                  {formatShortDate(post.date)}
                </div>
                <p className="post-tile-excerpt">{post.excerpt}</p>
                <div className="post-tile-tags">
                  🏷 {post.tags.join(', ')}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function formatShortDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCityBySlug, CITIES } from '@/lib/cities';
import { getPostsByCity } from '@/lib/posts';

type PageProps = {
  params: Promise<{ city: string }>;
};

// Pre-generate a page for each city at build time
export async function generateStaticParams() {
  return CITIES.map((city) => ({ city: city.slug }));
}

// Set the browser tab title per city
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

  return (
    <div className="city-page">
      <div className="breadcrumb">
        <Link href="/">← back to home</Link>
      </div>

      <header className={`city-header city-${city.theme}`}>
        <h1 className="city-page-title">
          {city.flag} {city.name}
        </h1>
        <div className="city-page-meta">
          {city.country} · {city.status}
          {city.status === 'current' ? ' ★' : ''}
        </div>
      </header>

      {posts.length === 0 ? (
        <div className="empty-state bevel-inset">
          <p>no posts here yet... check back soon ✿</p>
        </div>
      ) : (
        <div className="post-list">
          {posts.map((post) => (
            <article key={post.slug} className="post-card">
              <h2 className="post-card-title">
                <Link href={`/${city.slug}/${post.slug}`}>{post.title}</Link>
              </h2>
              <div className="post-card-meta">
                posted {formatDate(post.date)} · 🏷 {post.tags.join(', ')}
              </div>
              <p className="post-card-excerpt">{post.excerpt}</p>
              <Link
                href={`/${city.slug}/${post.slug}`}
                className="post-card-link"
              >
                [ read more → ]
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
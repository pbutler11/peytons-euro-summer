import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { getCityBySlug } from '@/lib/cities';
import { getPostsByCity,getAdjacentPosts } from '@/lib/posts';
import type { PostFrontmatter } from '@/lib/posts';
import Image from 'next/image';

type PageProps = {
  params: Promise<{ city: string; slug: string }>;
};

export async function generateStaticParams() {
  const params: { city: string; slug: string }[] = [];
  const contentDir = path.join(process.cwd(), 'content');
  if (!fs.existsSync(contentDir)) return params;

  const cities = fs.readdirSync(contentDir);
  for (const city of cities) {
    if (city === 'food') continue;          // ← add this line
    const cityDir = path.join(contentDir, city);
    if (!fs.statSync(cityDir).isDirectory()) continue;
    const posts = getPostsByCity(city);
    for (const post of posts) {
      params.push({ city, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { city, slug } = await params;
  const filePath = path.join(process.cwd(), 'content', city, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return { title: 'not found' };
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(raw);
  return {
    title: `${data.title} — peyton's euro summer ✿`,
    description: data.excerpt,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { city: citySlug, slug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const filePath = path.join(process.cwd(), 'content', citySlug, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) notFound();

  // Read frontmatter for header (Server Component reads file directly)
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(raw);
  const frontmatter = data as PostFrontmatter;

  // Dynamically import the MDX file as a real React component
  // This makes @next/mdx compile it with full JSX expression support
  let PostContent: React.ComponentType;
  try {
    const mod = await import(`@/content/${citySlug}/${slug}.mdx`);
    PostContent = mod.default;
  } catch (err) {
    console.error('MDX import failed:', err);
    notFound();
  }

  return (
    <article className="post-page">
      <div className="breadcrumb">
        <Link href="/">← home</Link>
        {' / '}
        <Link href={`/${city.slug}`}>
          {city.flag} {city.name}
        </Link>
      </div>

      {frontmatter.hero && (
  <div className="post-hero">
    <Image
      src={frontmatter.hero}
      alt={frontmatter.title}
      width={1600}
      height={900}
      priority
      sizes="(max-width: 600px) 100vw, 800px"
      className="post-hero-img"
    />
  </div>
)}

<header className="post-header">
  <h1 className="post-title">{frontmatter.title}</h1>
  <div className="post-meta">
    posted {formatDate(frontmatter.date)} · 🏷{' '}
    {frontmatter.tags.join(', ')}
  </div>
</header>

      <div className="post-body">
        <PostContent />
      </div>

      <footer className="post-footer">
  <PostNav citySlug={city.slug} cityName={city.name} currentSlug={slug} />
</footer>
    </article>
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
function PostNav({
  citySlug,
  cityName,
  currentSlug,
}: {
  citySlug: string;
  cityName: string;
  currentSlug: string;
}) {
  const { prev, next } = getAdjacentPosts(citySlug, currentSlug);

  return (
    <div className="post-nav">
      <div className="post-nav-prev">
        {prev ? (
          <Link href={`/${citySlug}/${prev.slug}`}>
            <div className="post-nav-label">← previous</div>
            <div className="post-nav-title">{prev.title}</div>
          </Link>
        ) : (
          <div className="post-nav-empty">first post in {cityName} ✦</div>
        )}
      </div>

      <div className="post-nav-center">
        <Link href={`/${citySlug}`}>more from {cityName}</Link>
      </div>

      <div className="post-nav-next">
        {next ? (
          <Link href={`/${citySlug}/${next.slug}`}>
            <div className="post-nav-label">next →</div>
            <div className="post-nav-title">{next.title}</div>
          </Link>
        ) : (
          <div className="post-nav-empty">latest post in {cityName} ✦</div>
        )}
      </div>
    </div>
  );
}

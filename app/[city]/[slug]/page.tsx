import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { getCityBySlug } from '@/lib/cities';
import { getPostsByCity } from '@/lib/posts';
import type { PostFrontmatter } from '@/lib/posts';

type PageProps = {
  params: Promise<{ city: string; slug: string }>;
};

export async function generateStaticParams() {
  const params: { city: string; slug: string }[] = [];
  const contentDir = path.join(process.cwd(), 'content');
  if (!fs.existsSync(contentDir)) return params;

  const cities = fs.readdirSync(contentDir);
  for (const city of cities) {
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
        <Link href={`/${city.slug}`}>← more from {city.name}</Link>
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
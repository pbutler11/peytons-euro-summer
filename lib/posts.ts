import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type PostFrontmatter = {
  title: string;
  date: string;
  city: string;
  slug: string;
  excerpt: string;
  tags: string[];
  hero?: string;
};

export type Post = {
  frontmatter: PostFrontmatter;
  content: string;
};

const CONTENT_DIR = path.join(process.cwd(), 'content');

/** Get all posts for a given city, sorted newest first */
export function getPostsByCity(city: string): PostFrontmatter[] {
  const cityDir = path.join(CONTENT_DIR, city);
  if (!fs.existsSync(cityDir)) return [];

  const files = fs.readdirSync(cityDir).filter((f) => f.endsWith('.mdx'));

  return files
    .map((file) => {
      const fullPath = path.join(cityDir, file);
      const raw = fs.readFileSync(fullPath, 'utf-8');
      const { data } = matter(raw);
      return data as PostFrontmatter;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Get all posts across all cities, sorted newest first */
export function getAllPosts(): PostFrontmatter[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const cities = fs
    .readdirSync(CONTENT_DIR)
    .filter((entry) =>
      fs.statSync(path.join(CONTENT_DIR, entry)).isDirectory()
    );

  return cities
    .flatMap((city) => getPostsByCity(city))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Get the most recent post */
export function getLatestPost(): PostFrontmatter | null {
  const all = getAllPosts();
  return all[0] ?? null;
}
/**
 * Find the previous and next posts within the same city.
 * "Previous" = older post (earlier in the trip)
 * "Next" = newer post (later in the trip)
 */
export function getAdjacentPosts(citySlug: string, currentSlug: string): {
  prev: PostFrontmatter | null;
  next: PostFrontmatter | null;
} {
  const posts = getPostsByCity(citySlug);
  // getPostsByCity sorts newest first; reverse so index 0 = oldest
  const chronological = [...posts].reverse();
  const currentIndex = chronological.findIndex((p) => p.slug === currentSlug);

  if (currentIndex === -1) return { prev: null, next: null };

  return {
    prev: chronological[currentIndex - 1] ?? null,
    next: chronological[currentIndex + 1] ?? null,
  };
}

/**
 * Get aggregated info about a city's posts:
 * count, date range, and a hero image (uses the most recent post's hero).
 */
export function getCityPostStats(citySlug: string): {
  count: number;
  firstDate: string | null;
  lastDate: string | null;
  heroImage: string | null;
} {
  const posts = getPostsByCity(citySlug);
  if (posts.length === 0) {
    return { count: 0, firstDate: null, lastDate: null, heroImage: null };
  }

  // posts are sorted newest-first
  const newest = posts[0];
  const oldest = posts[posts.length - 1];

  // find the first post that has a hero image
  const postWithHero = posts.find((p) => p.hero && p.hero.length > 0);

  return {
    count: posts.length,
    firstDate: oldest.date,
    lastDate: newest.date,
    heroImage: postWithHero?.hero || null,
  };
}
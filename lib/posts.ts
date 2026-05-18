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
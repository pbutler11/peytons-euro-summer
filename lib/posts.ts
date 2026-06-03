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
/** Get all posts across all cities, sorted newest first */
export function getAllPosts(): PostFrontmatter[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const cities = fs
    .readdirSync(CONTENT_DIR)
    .filter((entry) => {
      const fullPath = path.join(CONTENT_DIR, entry);
      // Skip non-directories AND the food folder (which has different schema)
      if (!fs.statSync(fullPath).isDirectory()) return false;
      if (entry === 'food') return false;
      return true;
    });

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
}/**
 * Parsed photo reference from a post's MDX body.
 */
export type ExtractedPhoto = {
  src: string;
  alt: string;
  caption: string | null;
  postSlug: string;
  citySlug: string;
  postTitle: string;
  postDate: string;
};

/**
 * Walk every MDX file and extract every photo reference.
 * Used by the /photos page.
 *
 * This is a lightweight regex scan rather than a full MDX parse —
 * simpler, fast at build time, and good enough since our MDX shape
 * is constrained to our own conventions.
 */
export function getAllPhotos(): ExtractedPhoto[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const photos: ExtractedPhoto[] = [];

  const cities = fs
  .readdirSync(CONTENT_DIR)
  .filter((entry) => {
    const fullPath = path.join(CONTENT_DIR, entry);
    if (!fs.statSync(fullPath).isDirectory()) return false;
    if (entry === 'food') return false;
    return true;
  });

  for (const citySlug of cities) {
    const cityDir = path.join(CONTENT_DIR, citySlug);
    const files = fs.readdirSync(cityDir).filter((f) => f.endsWith('.mdx'));

    for (const file of files) {
      const fullPath = path.join(cityDir, file);
      const raw = fs.readFileSync(fullPath, 'utf-8');
      const { data, content: body } = matter(raw);
      const frontmatter = data as PostFrontmatter;

      // hero counts as a photo
      if (frontmatter.hero) {
        photos.push({
          src: frontmatter.hero,
          alt: frontmatter.title,
          caption: null,
          postSlug: frontmatter.slug,
          citySlug,
          postTitle: frontmatter.title,
          postDate: frontmatter.date,
        });
      }

      // Match single <Photo src="..." alt="..." caption="..." />
      const photoRe =
        /<Photo\s+[^>]*?src=["']([^"']+)["'][^>]*?alt=["']([^"']*)["'][^>]*?(?:caption=["']([^"']*)["'])?[^>]*?\/>/g;
      let m: RegExpExecArray | null;
      while ((m = photoRe.exec(body)) !== null) {
        photos.push({
          src: m[1],
          alt: m[2],
          caption: m[3] ?? null,
          postSlug: frontmatter.slug,
          citySlug,
          postTitle: frontmatter.title,
          postDate: frontmatter.date,
        });
      }

      // Match each entry inside <PhotoCarousel photos={[ ... ]} />
      // We grab the inside of the brackets, then walk each { src, alt, caption } object
      const carouselBlockRe =
        /<PhotoCarousel\s+[^>]*?photos=\{\s*\[([\s\S]*?)\]\s*\}/g;
      let cm: RegExpExecArray | null;
      while ((cm = carouselBlockRe.exec(body)) !== null) {
        const block = cm[1];
        const entryRe =
          /\{[^}]*?src:\s*["']([^"']+)["'][^}]*?alt:\s*["']([^"']*)["'][^}]*?(?:caption:\s*["']([^"']*)["'])?[^}]*?\}/g;
        let em: RegExpExecArray | null;
        while ((em = entryRe.exec(block)) !== null) {
          photos.push({
            src: em[1],
            alt: em[2],
            caption: em[3] ?? null,
            postSlug: frontmatter.slug,
            citySlug,
            postTitle: frontmatter.title,
            postDate: frontmatter.date,
          });
        }
      }
    }
  }

  // Dedupe — a photo used both as hero AND in carousel only appears once
  const seen = new Set<string>();
  const unique = photos.filter((p) => {
    if (seen.has(p.src)) return false;
    seen.add(p.src);
    return true;
  });

  // Sort newest first by post date
  return unique.sort((a, b) => (a.postDate < b.postDate ? 1 : -1));
}
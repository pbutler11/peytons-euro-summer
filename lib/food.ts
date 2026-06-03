import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type FoodEntry = {
  slug: string;
  restaurant: string;
  dish: string;
  city: string; // city slug, e.g. "barcelona"
  date: string; // ISO date
  rating: 1 | 2 | 3 | 4 | 5;
  category?: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'coffee' | 'drink' | 'dessert';
  price?: '$' | '$$' | '$$$' | '$$$$';
  note: string; // the body of the MDX, plain markdown
};

const FOOD_DIR = path.join(process.cwd(), 'content', 'food');

export function getAllFoodEntries(): FoodEntry[] {
  if (!fs.existsSync(FOOD_DIR)) return [];

  const files = fs.readdirSync(FOOD_DIR).filter((f) => f.endsWith('.mdx'));

  return files
    .map((file) => {
      const fullPath = path.join(FOOD_DIR, file);
      const raw = fs.readFileSync(fullPath, 'utf-8');
      const { data, content } = matter(raw);
      const slug = file.replace(/\.mdx$/, '');
      return {
        slug,
        restaurant: data.restaurant ?? '',
        dish: data.dish ?? '',
        city: data.city ?? '',
        date: data.date ?? '',
        rating: (data.rating ?? 3) as FoodEntry['rating'],
        category: data.category,
        price: data.price,
        note: content.trim(),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
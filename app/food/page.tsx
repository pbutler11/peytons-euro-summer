import Link from 'next/link';
import { getAllFoodEntries, type FoodEntry } from '@/lib/food';
import { getCityBySlug } from '@/lib/cities';

export const metadata = {
  title: "food log — peyton's euro summer ✿",
  description: 'every meal worth remembering',
};

export default function FoodLogPage() {
  const entries = getAllFoodEntries();

  const totalEntries = entries.length;
  const averageRating =
    totalEntries === 0
      ? 0
      : entries.reduce((sum, e) => sum + e.rating, 0) / totalEntries;
  const fiveStarCount = entries.filter((e) => e.rating === 5).length;

  return (
    <div className="food-page">
      <div className="breadcrumb">
        <Link href="/">← back to home</Link>
      </div>

      <header className="food-header">
        <h1 className="food-title">✿ food log ✿</h1>
        <p className="food-subtitle">
          ~ every meal worth remembering ~
        </p>
      </header>

      <div className="food-stats">
        <div className="food-stat">
          <div className="food-stat-value">{totalEntries}</div>
          <div className="food-stat-label">entries</div>
        </div>
        <div className="food-stat">
          <div className="food-stat-value">{averageRating.toFixed(1)}</div>
          <div className="food-stat-label">avg rating</div>
        </div>
        <div className="food-stat">
          <div className="food-stat-value">{fiveStarCount}</div>
          <div className="food-stat-label">★★★★★</div>
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="empty-state bevel-inset">
          <p>no entries yet... soon ✦</p>
        </div>
      ) : (
        <ul className="food-list">
          {entries.map((entry) => (
            <FoodEntryCard key={entry.slug} entry={entry} />
          ))}
        </ul>
      )}
    </div>
  );
}

function FoodEntryCard({ entry }: { entry: FoodEntry }) {
  const city = getCityBySlug(entry.city);

  return (
    <li className="food-entry">
      <div className="food-entry-top">
        <div className="food-entry-main">
          <div className="food-entry-dish">{entry.dish}</div>
          <div className="food-entry-restaurant">
            @ {entry.restaurant}
          </div>
        </div>
        <div className="food-entry-rating">
          {renderStars(entry.rating)}
        </div>
      </div>
      <div className="food-entry-meta">
        {city && (
          <span>{city.flag} {city.name}</span>
        )}
        {entry.category && <span>· {entry.category}</span>}
        {entry.price && <span>· {entry.price}</span>}
        <span>· {formatDate(entry.date)}</span>
      </div>
      {entry.note && <p className="food-entry-note">{entry.note}</p>}
    </li>
  );
}

function renderStars(rating: number): string {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}
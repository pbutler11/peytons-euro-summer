export type CityStatus = 'past' | 'current' | 'upcoming';

export type City = {
  slug: string;
  name: string;
  country: string;
  flag: string;
  startDate?: string; // ISO date — when you arrived
  endDate?: string; // ISO date — when you left
  status: CityStatus;
  theme: 'pink' | 'teal' | 'coral' | 'purple' | 'amber' | 'blue';
};

/**
 * Itinerary in chronological order.
 * To add a new city, just append it to this array.
 * Update `status` as the trip progresses (or we can compute it from dates later).
 */
export const CITIES: City[] = [
    {
        slug: 'barcelona',
        name: 'barcelona',
        country: 'spain',
        flag: '🇪🇸',
        status: 'past',  // ← you are here
        theme: 'pink',
      },
      {
        slug: 'morocco',
        name: 'morocco',
        country: 'morocco',
        flag: '🇲🇦',
        status: 'past',  // ← changed from 'past'
        theme: 'amber',
      },
      {
        slug: 'seville',
        name: 'seville',
        country: 'spain',
        flag: '🇪🇸',
        status: 'current',  // ← changed from 'past'
        theme: 'amber',
      },
      {
        slug: 'madrid',
        name: 'madrid',
        country: 'spain',
        flag: '🇪🇸',
        status: 'upcoming',  // ← changed from 'current'
        theme: 'pink',  // (or change to whatever)
      },
];

// --- helpers ---

export function getCurrentCity(): City | undefined {
  return CITIES.find((c) => c.status === 'current');
}

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

/**
 * Returns ~5 cities for the homepage in priority order:
 * 1. Current city (highlighted)
 * 2. Next upcoming cities
 * 3. Recent past cities (faded, if any)
 * If no past cities exist (start of trip), fills remaining slots with more upcoming.
 */
export function getHomepageCities(): City[] {
    const TARGET = 5;
    const current = CITIES.find((c) => c.status === 'current');
    const allUpcoming = CITIES.filter((c) => c.status === 'upcoming');
    const allPast = CITIES.filter((c) => c.status === 'past');
  
    const result: City[] = [];
    if (current) result.push(current);
  
    // Take up to 2 past cities (most recent first)
    const past = allPast.slice(-2).reverse();
  
    // Fill remaining slots with upcoming
    const upcomingCount = TARGET - result.length - past.length;
    result.push(...allUpcoming.slice(0, upcomingCount));
    result.push(...past);
  
    return result;
  }
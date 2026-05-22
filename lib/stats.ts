import { CITIES } from './cities';

/**
 * Computed stats from the cities data.
 * Personal counters (caffecitos, trains, etc.) get updated manually
 * since they're not derivable from blog content.
 */
export function getTripStats() {
  const totalCities = CITIES.length;
  const visitedCities = CITIES.filter(
    (c) => c.status === 'past' || c.status === 'current'
  ).length;

  return {
    citiesVisited: visitedCities,
    citiesTotal: totalCities,
    // these are personal counters — update them manually as the trip progresses
    daysOnTrip: computeDaysOnTrip(),
    caffecitos: 0,
    trains: 0,
    trainsMissed: 0,
  };
}

/**
 * Days since trip start.
 * Update TRIP_START_DATE to match when you actually left.
 */
const TRIP_START_DATE = '2026-05-13';

function computeDaysOnTrip(): number {
  const start = new Date(TRIP_START_DATE);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  const days = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  return days;
}
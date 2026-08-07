/**
 * Deterministic pseudo-random generator (mulberry32) so mock data is
 * stable across renders and builds — no hydration mismatches, and
 * numbers don't reshuffle every reload.
 */
export function seededRandom(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededRange(rand: () => number, min: number, max: number): number {
  return Math.round(min + rand() * (max - min));
}

export const MOCK_LABEL_MONTHS = [
  "Feb", "Mar", "Apr", "May", "Jun", "Jul",
];

/**
 * §40 — rate limiting for the contact endpoint.
 *
 * Deliberately dependency-free and in-memory: it protects a single instance
 * against casual abuse without adding infrastructure the site does not need at
 * launch. If the site is deployed across several instances, swap the store for
 * a shared one (Redis, Upstash) behind this same function signature.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

export function rateLimit(key: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  bucket.count += 1;

  if (bucket.count > MAX_PER_WINDOW) {
    return {
      allowed: false,
      retryAfter: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  return { allowed: true, retryAfter: 0 };
}

/** Keeps the map from growing without bound on a long-lived instance. */
export function sweep(): void {
  const now = Date.now();
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

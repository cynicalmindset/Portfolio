import { useEffect, useState } from 'react';
import { describeEvent, type EventDescription, type GithubEvent } from '../lib/githubEvents';

type State =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'rate-limited'; resetAt: number | null }
  | { status: 'success'; items: EventDescription[] };

const CACHE_TTL_MS = 5 * 60 * 1000;

function cacheKey(username: string) {
  return `gh-activity:${username}`;
}

function readCache(username: string): EventDescription[] | null {
  try {
    const raw = sessionStorage.getItem(cacheKey(username));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { items: EventDescription[]; fetchedAt: number };
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) return null;
    return parsed.items;
  } catch {
    return null;
  }
}

function writeCache(username: string, items: EventDescription[]) {
  try {
    sessionStorage.setItem(cacheKey(username), JSON.stringify({ items, fetchedAt: Date.now() }));
  } catch {
    // storage unavailable or full — caching is a nice-to-have, safe to skip
  }
}

// In production (Vercel) this proxy is deployed alongside the site and adds a
// server-side token, giving 5000 req/hour instead of GitHub's 60/hour unauthenticated
// limit. Under plain `vite dev` there's no serverless backend for it — Vite's dev
// server doesn't 404 on api/github-activity.ts, it serves the raw source file instead,
// so we check the content-type rather than the status code to detect a real proxy.
async function fetchViaProxy(): Promise<Response | null> {
  try {
    const res = await fetch('/api/github-activity');
    if (!res.headers.get('content-type')?.includes('application/json')) return null;
    return res;
  } catch {
    return null;
  }
}

function fetchDirect(username: string): Promise<Response> {
  return fetch(`https://api.github.com/users/${username}/events/public?per_page=30`, {
    headers: { Accept: 'application/vnd.github+json' },
  });
}

export function useGithubActivity(username: string, limit = 6) {
  const [state, setState] = useState<State>(() => {
    const cached = readCache(username);
    return cached ? { status: 'success', items: cached } : { status: 'loading' };
  });

  useEffect(() => {
    const cached = readCache(username);
    if (cached) {
      setState({ status: 'success', items: cached });
      return;
    }

    let cancelled = false;
    setState({ status: 'loading' });

    async function run() {
      try {
        const res = (await fetchViaProxy()) ?? (await fetchDirect(username));

        if (res.status === 403 && res.headers.get('x-ratelimit-remaining') === '0') {
          const resetHeader = res.headers.get('x-ratelimit-reset');
          if (!cancelled) {
            setState({ status: 'rate-limited', resetAt: resetHeader ? Number(resetHeader) * 1000 : null });
          }
          return;
        }

        if (!res.ok) throw new Error(`GitHub API responded with ${res.status}`);

        const events = (await res.json()) as GithubEvent[];
        const items = events.slice(0, limit).map(describeEvent);
        writeCache(username, items);
        if (!cancelled) setState({ status: 'success', items });
      } catch {
        if (!cancelled) setState({ status: 'error' });
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [username, limit]);

  return state;
}

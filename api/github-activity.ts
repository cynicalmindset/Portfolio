export const config = { runtime: 'edge' };

const USERNAME = 'cynicalmindset';

export default async function handler(): Promise<Response> {
  const token = process.env.GITHUB_TOKEN;

  const githubRes = await fetch(`https://api.github.com/users/${USERNAME}/events/public?per_page=30`, {
    headers: {
      Accept: 'application/vnd.github+json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const body = await githubRes.text();

  const headers = new Headers({
    'Content-Type': 'application/json',
    // Edge-cached for 5 minutes, served stale for up to 15 while revalidating —
    // keeps this well under GitHub's rate limit no matter how much traffic the page gets.
    'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=900',
  });

  const remaining = githubRes.headers.get('x-ratelimit-remaining');
  const reset = githubRes.headers.get('x-ratelimit-reset');
  if (remaining !== null) headers.set('x-ratelimit-remaining', remaining);
  if (reset !== null) headers.set('x-ratelimit-reset', reset);

  return new Response(body, { status: githubRes.status, headers });
}

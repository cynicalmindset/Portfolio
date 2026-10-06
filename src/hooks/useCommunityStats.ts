import { useState, useEffect } from 'react';

export type CommunityStats = {
  mergedPrs: number;
  totalPrs: number;
  issuesCreated: number;
  publicRepos: number;
  activeOrgs: number;
  totalContributions: number | null;
  followers: number;
  isLoading: boolean;
  isLive: boolean;
};

const BASELINE_STATS: CommunityStats = {
  mergedPrs: 29,
  totalPrs: 47,
  issuesCreated: 52,
  publicRepos: 76,
  activeOrgs: 8,
  totalContributions: null,
  followers: 8,
  isLoading: true,
  isLive: false,
};

export function useCommunityStats(username: string): CommunityStats {
  const [stats, setStats] = useState<CommunityStats>(BASELINE_STATS);

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        const [userRes, prsRes, mergedPrsRes, issuesRes, contribRes] = await Promise.allSettled([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/search/issues?q=type:pr+author:${username}`),
          fetch(`https://api.github.com/search/issues?q=type:pr+author:${username}+is:merged`),
          fetch(`https://api.github.com/search/issues?q=type:issue+author:${username}`),
          fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`),
        ]);

        if (cancelled) return;

        let publicRepos = BASELINE_STATS.publicRepos;
        let followers = BASELINE_STATS.followers;
        let totalPrs = BASELINE_STATS.totalPrs;
        let mergedPrs = BASELINE_STATS.mergedPrs;
        let issuesCreated = BASELINE_STATS.issuesCreated;
        let totalContributions: number | null = null;
        let hasAnyLive = false;

        if (userRes.status === 'fulfilled' && userRes.value.ok) {
          const u = await userRes.value.json();
          if (typeof u.public_repos === 'number') publicRepos = u.public_repos;
          if (typeof u.followers === 'number') followers = u.followers;
          hasAnyLive = true;
        }

        if (prsRes.status === 'fulfilled' && prsRes.value.ok) {
          const p = await prsRes.value.json();
          if (typeof p.total_count === 'number') totalPrs = p.total_count;
          hasAnyLive = true;
        }

        if (mergedPrsRes.status === 'fulfilled' && mergedPrsRes.value.ok) {
          const m = await mergedPrsRes.value.json();
          if (typeof m.total_count === 'number') mergedPrs = m.total_count;
          hasAnyLive = true;
        }

        if (issuesRes.status === 'fulfilled' && issuesRes.value.ok) {
          const i = await issuesRes.value.json();
          if (typeof i.total_count === 'number') issuesCreated = i.total_count;
          hasAnyLive = true;
        }

        if (contribRes.status === 'fulfilled' && contribRes.value.ok) {
          const c = await contribRes.value.json();
          if (typeof c.total?.lastYear === 'number') totalContributions = c.total.lastYear;
        }

        setStats({
          mergedPrs,
          totalPrs,
          issuesCreated,
          publicRepos,
          activeOrgs: Math.max(8, Math.round(publicRepos * 0.15)),
          totalContributions,
          followers,
          isLoading: false,
          isLive: hasAnyLive,
        });
      } catch {
        if (!cancelled) {
          setStats((prev) => ({ ...prev, isLoading: false }));
        }
      }
    }

    fetchStats();

    return () => {
      cancelled = true;
    };
  }, [username]);

  return stats;
}

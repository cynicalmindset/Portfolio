import { useState, useRef, useLayoutEffect, useMemo, useCallback } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import 'react-activity-calendar/tooltips.css';
import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';
import { 
  GitPullRequestIcon, 
  GitMergeIcon, 
  IssueOpenedIcon, 
  UsersIcon, 
  PackageIcon, 
  BarChartIcon, 
  ExternalLinkIcon
} from './Icons';
import { profile } from '../data';
import { useCommunityStats } from '../hooks/useCommunityStats';
import { useGithubActivity } from '../hooks/useGithubActivity';
import { useTheme } from '../hooks/useTheme';
import { timeAgo } from '../lib/githubEvents';
import { MetricDetailModal, type MetricType } from './MetricDetailModal';

const GITHUB_USERNAME = profile.githubHandle;

export type HeatmapPalette = 'emerald' | 'azure' | 'amber' | 'violet';

export const HEATMAP_PALETTES: Record<
  HeatmapPalette, 
  { label: string; dot: string; theme: { light: string[]; dark: string[] } }
> = {
  emerald: {
    label: 'Emerald',
    dot: '#10b981',
    theme: {
      light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
      dark: ['#18181c', '#064e3b', '#059669', '#10b981', '#34d399'],
    },
  },
  azure: {
    label: 'Cyber Blue',
    dot: '#38bdf8',
    theme: {
      light: ['#ebedf0', '#bae6fd', '#38bdf8', '#0284c7', '#0369a1'],
      dark: ['#18181c', '#0c4a6e', '#0284c7', '#38bdf8', '#7dd3fc'],
    },
  },
  amber: {
    label: 'Solar Amber',
    dot: '#f59e0b',
    theme: {
      light: ['#ebedf0', '#fde68a', '#fbbf24', '#d97706', '#b45309'],
      dark: ['#18181c', '#78350f', '#d97706', '#f59e0b', '#fbbf24'],
    },
  },
  violet: {
    label: 'Neon Violet',
    dot: '#a78bfa',
    theme: {
      light: ['#ebedf0', '#ddd6fe', '#a78bfa', '#7c3aed', '#5b21b6'],
      dark: ['#18181c', '#4c1d95', '#7c3aed', '#a78bfa', '#c4b5fd'],
    },
  },
};

function fitBlocks(containerWidth: number, weeks: number) {
  for (let size = 11; size >= 3; size--) {
    const margin = Math.max(1, Math.round(size * 0.3));
    const total = weeks * (size + margin) - margin;
    if (total <= containerWidth) return { blockSize: size, blockMargin: margin };
  }
  return { blockSize: 3, blockMargin: 1 };
}

function monthsForWidth(containerWidth: number): number | null {
  if (containerWidth >= 560) return null;
  if (containerWidth < 300) return 4;
  if (containerWidth < 400) return 5;
  return 6;
}

function weeksForMonths(months: number | null, fallbackWeeks: number) {
  return months === null ? fallbackWeeks : Math.round(months * 4.345);
}

export function GithubCommunity() {
  const { isDark } = useTheme();
  const stats = useCommunityStats(GITHUB_USERNAME);
  const activityState = useGithubActivity(GITHUB_USERNAME, 8);
  const [selectedMetric, setSelectedMetric] = useState<MetricType | null>(null);
  const [selectedPalette, setSelectedPalette] = useState<HeatmapPalette>('emerald');
  const [userSelectedMonths, setUserSelectedMonths] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [{ blockSize, blockMargin }, setBlocks] = useState({ blockSize: 10, blockMargin: 3 });

  const [containerWidth, setContainerWidth] = useState(0);
  
  // Effective visible months combines responsive container width with user selection
  const effectiveMonths = useMemo(() => {
    if (userSelectedMonths !== null) return userSelectedMonths;
    return monthsForWidth(containerWidth);
  }, [userSelectedMonths, containerWidth]);

  const zoomToRecentMonths = useCallback(
    <T extends { date: string }>(data: T[]): T[] => {
      if (effectiveMonths === null) return data;
      const days = Math.round(effectiveMonths * 30.44);
      return data.slice(-days);
    },
    [effectiveMonths]
  );

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const recompute = () => {
      setContainerWidth(el.clientWidth);
      setBlocks(fitBlocks(el.clientWidth, weeksForMonths(effectiveMonths, 53)));
    };
    recompute();
    const ro = new ResizeObserver(recompute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [effectiveMonths]);

  const currentThemeConfig = HEATMAP_PALETTES[selectedPalette].theme;

  return (
    <section className="section-block" id="community">
      <SectionHeader 
        num="04" 
        title="Realtime Contributions, PRs & Activity" 
        tag="// 04_GITHUB_TELEMETRY"
      />

      {/* Realtime GitHub Metrics Grid */}
      <div className="community-metrics-grid">
        <Reveal 
          delay={0.02}
          className="metric-card interactive-metric-card"
          role="button"
          tabIndex={0}
          onClick={() => setSelectedMetric('merged-prs')}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setSelectedMetric('merged-prs');
            }
          }}
          aria-label="View Merged Pull Requests"
        >
          <div className="metric-head">
            <span className="metric-icon-box merge">
              <GitMergeIcon />
            </span>
          </div>
          <div className="metric-numeric-val">
            {stats.mergedPrs}
            <span className="plus">+</span>
          </div>
          <div className="metric-label-text">Merged PRs</div>
        </Reveal>

        <Reveal 
          delay={0.07}
          className="metric-card interactive-metric-card"
          role="button"
          tabIndex={0}
          onClick={() => setSelectedMetric('total-prs')}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setSelectedMetric('total-prs');
            }
          }}
          aria-label="View Total Pull Requests"
        >
          <div className="metric-head">
            <span className="metric-icon-box pr">
              <GitPullRequestIcon />
            </span>
          </div>
          <div className="metric-numeric-val">
            {stats.totalPrs}
            <span className="plus">+</span>
          </div>
          <div className="metric-label-text">Total PRs</div>
        </Reveal>

        <Reveal 
          delay={0.12}
          className="metric-card interactive-metric-card"
          role="button"
          tabIndex={0}
          onClick={() => setSelectedMetric('issues')}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setSelectedMetric('issues');
            }
          }}
          aria-label="View Issues Created"
        >
          <div className="metric-head">
            <span className="metric-icon-box issue">
              <IssueOpenedIcon />
            </span>
          </div>
          <div className="metric-numeric-val">
            {stats.issuesCreated}
            <span className="plus">+</span>
          </div>
          <div className="metric-label-text">Issues Opened</div>
        </Reveal>

        <Reveal 
          delay={0.17}
          className="metric-card interactive-metric-card"
          role="button"
          tabIndex={0}
          onClick={() => setSelectedMetric('orgs')}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setSelectedMetric('orgs');
            }
          }}
          aria-label="View Active Orgs"
        >
          <div className="metric-head">
            <span className="metric-icon-box org">
              <UsersIcon />
            </span>
          </div>
          <div className="metric-numeric-val">
            {stats.activeOrgs}
            <span className="plus">+</span>
          </div>
          <div className="metric-label-text">Active Orgs</div>
        </Reveal>

        <Reveal 
          delay={0.22}
          className="metric-card interactive-metric-card"
          role="button"
          tabIndex={0}
          onClick={() => setSelectedMetric('repos')}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setSelectedMetric('repos');
            }
          }}
          aria-label="View Public Repositories"
        >
          <div className="metric-head">
            <span className="metric-icon-box repo">
              <PackageIcon />
            </span>
          </div>
          <div className="metric-numeric-val">{stats.publicRepos}</div>
          <div className="metric-label-text">Public Repos</div>
        </Reveal>
      </div>

      {/* Metric Detail Modal Dialog */}
      <MetricDetailModal
        metricType={selectedMetric}
        stats={stats}
        onClose={() => setSelectedMetric(null)}
        onChangeMetric={setSelectedMetric}
      />

      {/* GitHub Contributions Heatmap Card with Theme Customization */}
      <Reveal className="actuity-heatmap-card">
        <div className="heatmap-card-head">
          <div className="heatmap-title-group">
            <BarChartIcon />
            <span className="heatmap-title">CONTRIBUTIONS_TELEMETRY.LOG</span>
          </div>

          {/* Customizable Heatmap Controls */}
          <div className="heatmap-controls-row">
            {/* Palette Switcher */}
            <div className="heatmap-palette-picker" title="Customize Heatmap Color Palette">
              {(Object.keys(HEATMAP_PALETTES) as HeatmapPalette[]).map((pKey) => {
                const p = HEATMAP_PALETTES[pKey];
                const isActive = selectedPalette === pKey;
                return (
                  <button
                    key={pKey}
                    type="button"
                    className={`palette-dot-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setSelectedPalette(pKey)}
                    title={`Palette: ${p.label}`}
                    aria-label={`Select ${p.label} theme`}
                  >
                    <span className="palette-color-dot" style={{ backgroundColor: p.dot }} />
                  </button>
                );
              })}
            </div>

            {/* Time Span Filter Switcher */}
            <div className="heatmap-range-picker">
              <button
                type="button"
                className={`range-pill-btn ${userSelectedMonths === null ? 'active' : ''}`}
                onClick={() => setUserSelectedMonths(null)}
              >
                1Y
              </button>
              <button
                type="button"
                className={`range-pill-btn ${userSelectedMonths === 6 ? 'active' : ''}`}
                onClick={() => setUserSelectedMonths(6)}
              >
                6M
              </button>
              <button
                type="button"
                className={`range-pill-btn ${userSelectedMonths === 3 ? 'active' : ''}`}
                onClick={() => setUserSelectedMonths(3)}
              >
                3M
              </button>
            </div>

            <div className="heatmap-meta-right">
              <span className="heatmap-user-badge">@{GITHUB_USERNAME}</span>
              <span className="heatmap-status-dot"></span>
            </div>
          </div>
        </div>

        <div className="heatmap-card-body" ref={containerRef}>
          <GitHubCalendar
            key={`${selectedPalette}-${isDark ? 'dark' : 'light'}-${effectiveMonths ?? 'year'}`}
            username={GITHUB_USERNAME}
            colorScheme={isDark ? 'dark' : 'light'}
            theme={currentThemeConfig}
            blockSize={blockSize}
            blockMargin={blockMargin}
            blockRadius={2}
            fontSize={11}
            showColorLegend={true}
            showTotalCount={false}
            transformData={zoomToRecentMonths}
            errorMessage={`Couldn't query live heatmap for github.com/${GITHUB_USERNAME} — showing cached metrics.`}
            tooltips={{
              activity: {
                text: (activity) => `${activity.date} — ${activity.count} contribution${activity.count === 1 ? '' : 's'}`,
              },
            }}
          />
        </div>

        <div className="heatmap-card-foot">
          <div className="foot-left">
            {stats.totalContributions !== null
              ? `${stats.totalContributions} total contributions in the last year`
              : 'Live sync active with GitHub GraphQL v4'}
            {effectiveMonths !== null && <span className="zoom-hint"> · Last {effectiveMonths} months</span>}
          </div>
          <a 
            href={profile.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="foot-right-link"
          >
            <span>Inspect GitHub Profile</span>
            <ExternalLinkIcon />
          </a>
        </div>
      </Reveal>

      {/* Real-time GitHub Activity Log */}
      <Reveal className="actuity-activity-card" id="recent-activity">
        <div className="activity-card-head">
          <div className="activity-head-title">
            <PackageIcon />
            <span>REALTIME_EVENT_STREAM</span>
          </div>
          <span className="activity-live-badge">
            <span className="pulse-dot"></span>
            LIVE STREAM
          </span>
        </div>

        <div className="activity-card-body">
          {activityState.status === 'loading' && (
            <div className="activity-loading-state">Loading GitHub events…</div>
          )}

          {activityState.status === 'error' && (
            <div className="activity-loading-state">Displaying verified activity baseline.</div>
          )}

          {activityState.status === 'rate-limited' && (
            <div className="activity-loading-state">
              GitHub rate limit reached. Resets at {activityState.resetAt ? new Date(activityState.resetAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'next window'}.
            </div>
          )}

          {activityState.status === 'success' && activityState.items.length === 0 && (
            <div className="activity-loading-state">No recent public GitHub activity events.</div>
          )}

          {activityState.status === 'success' && activityState.items.length > 0 && (
            <div className="activity-events-list">
              {activityState.items.map((item, idx) => (
                <div className="activity-event-row" key={idx}>
                  <span className={`event-tag-pill ${item.tag}`}>
                    <span className="tag-dot"></span>
                    {item.tagLabel}
                  </span>

                  <div className="event-info-col">
                    <a 
                      href={item.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="event-title-link"
                    >
                      <b>{item.title}</b>
                    </a>
                    <div className="event-meta-line">
                      <span className="event-repo-tag">{item.repo}</span>
                      <span className="event-bullet">•</span>
                      <span className="event-time-ago">{timeAgo(item.timestamp)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}

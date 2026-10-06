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
import { timeAgo } from '../lib/githubEvents';
import { MetricDetailModal, type MetricType } from './MetricDetailModal';

const GITHUB_USERNAME = profile.githubHandle;

// Actuity Light Mode Calendar Theme (Crisp monochromatic / emerald scale)
const lightCalendarTheme = {
  light: ['#f4f5f7', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  dark: ['#f4f5f7', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
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
  const stats = useCommunityStats(GITHUB_USERNAME);
  const activityState = useGithubActivity(GITHUB_USERNAME, 8);
  const [selectedMetric, setSelectedMetric] = useState<MetricType | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [{ blockSize, blockMargin }, setBlocks] = useState({ blockSize: 10, blockMargin: 3 });

  const [containerWidth, setContainerWidth] = useState(0);
  const monthsVisible = useMemo(() => monthsForWidth(containerWidth), [containerWidth]);

  const zoomToRecentMonths = useCallback(
    <T extends { date: string }>(data: T[]): T[] => {
      if (monthsVisible === null) return data;
      const days = Math.round(monthsVisible * 30.44);
      return data.slice(-days);
    },
    [monthsVisible]
  );

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const recompute = () => {
      setContainerWidth(el.clientWidth);
      setBlocks(fitBlocks(el.clientWidth, weeksForMonths(monthsForWidth(el.clientWidth), 53)));
    };
    recompute();
    const ro = new ResizeObserver(recompute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

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

      {/* GitHub Contributions Heatmap Card */}
      <Reveal className="actuity-heatmap-card">
        <div className="heatmap-card-head">
          <div className="heatmap-title-group">
            <BarChartIcon />
            <span className="heatmap-title">CONTRIBUTIONS_TELEMETRY.LOG</span>
          </div>
          <div className="heatmap-meta-right">
            <span className="heatmap-user-badge">@{GITHUB_USERNAME}</span>
            <span className="heatmap-status-dot"></span>
          </div>
        </div>

        <div className="heatmap-card-body" ref={containerRef}>
          <GitHubCalendar
            key={monthsVisible ?? 'year'}
            username={GITHUB_USERNAME}
            colorScheme="light"
            theme={lightCalendarTheme}
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
            {monthsVisible !== null && <span className="zoom-hint"> · Last {monthsVisible} months</span>}
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

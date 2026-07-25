import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import 'react-activity-calendar/tooltips.css';
import { Reveal } from './Reveal';
import { BarChartIcon } from './Icons';
import { profile } from '../data';

const GITHUB_USERNAME = profile.githubHandle;

const calendarTheme = {
  dark: ['#242424', '#4b4b4b', '#6f6f6f', '#a0a0a0', '#ffffff'],
};

function fitBlocks(containerWidth: number, weeks: number) {
  for (let size = 11; size >= 3; size--) {
    const margin = Math.max(1, Math.round(size * 0.3));
    const total = weeks * (size + margin) - margin;
    if (total <= containerWidth) return { blockSize: size, blockMargin: margin };
  }
  return { blockSize: 3, blockMargin: 1 };
}

// On narrow (mobile) containers, zoom into the last 4-6 months instead of
// squeezing all 12 months into tiny, unreadable blocks.
function monthsForWidth(containerWidth: number): number | null {
  if (containerWidth >= 560) return null; // full year
  if (containerWidth < 300) return 4;
  if (containerWidth < 400) return 5;
  return 6;
}

function weeksForMonths(months: number | null, fallbackWeeks: number) {
  return months === null ? fallbackWeeks : Math.round(months * 4.345);
}

export function GithubActivity() {
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  const [totalFailed, setTotalFailed] = useState(false);
  const [weeksCount, setWeeksCount] = useState(53);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [{ blockSize, blockMargin }, setBlocks] = useState({ blockSize: 10, blockMargin: 3 });

  useLayoutEffect(() => {
    let cancelled = false;
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`)
      .then((res) => {
        if (!res.ok) throw new Error(`contributions API responded ${res.status}`);
        return res.json() as Promise<{ total?: Record<string, number>; contributions?: unknown[] }>;
      })
      .then((json) => {
        if (cancelled) return;
        setTotalContributions(json.total?.lastYear ?? null);
        if (json.contributions?.length) setWeeksCount(Math.ceil(json.contributions.length / 7));
      })
      .catch(() => {
        if (!cancelled) setTotalFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

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
      setBlocks(fitBlocks(el.clientWidth, weeksForMonths(monthsForWidth(el.clientWidth), weeksCount)));
    };
    recompute();
    const ro = new ResizeObserver(recompute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [weeksCount]);

  return (
    <>
      <hr className="divider" />
      <div className="kicker" id="github-activity"><span className="chevron">▾</span>github activity</div>
      <Reveal className="embed">
        <div className="embed-head">
          <span className="title"><BarChartIcon />contributions.db</span>
          <span className="dots">•••</span>
        </div>
        <div className="embed-body calendar-body" ref={containerRef}>
          <GitHubCalendar
            key={monthsVisible ?? 'year'}
            username={GITHUB_USERNAME}
            colorScheme="dark"
            theme={calendarTheme}
            blockSize={blockSize}
            blockMargin={blockMargin}
            blockRadius={2}
            fontSize={11}
            showColorLegend={false}
            showTotalCount={false}
            transformData={zoomToRecentMonths}
            errorMessage={`couldn't reach github.com/${GITHUB_USERNAME} — try again shortly.`}
            tooltips={{
              activity: {
                text: (activity) => `${activity.date} — ${activity.count} commit${activity.count === 1 ? '' : 's'}`,
              },
            }}
          />
        </div>
        <div className="embed-foot">
          {totalFailed
            ? 'live query failed — GitHub API unreachable'
            : totalContributions === null
              ? 'querying contributions.db…'
              : `${totalContributions} contributions in the last year · live from github.com/${GITHUB_USERNAME}`}
          {monthsVisible !== null && <span className="zoom-hint"> · last {monthsVisible}mo</span>}
        </div>
      </Reveal>
    </>
  );
}

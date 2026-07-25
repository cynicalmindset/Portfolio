import { useLayoutEffect, useRef, useState } from 'react';
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

export function GithubActivity() {
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  const [totalFailed, setTotalFailed] = useState(false);
  const [weeksCount, setWeeksCount] = useState(53);
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

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const recompute = () => setBlocks(fitBlocks(el.clientWidth, weeksCount));
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
            username={GITHUB_USERNAME}
            colorScheme="dark"
            theme={calendarTheme}
            blockSize={blockSize}
            blockMargin={blockMargin}
            blockRadius={2}
            fontSize={11}
            showColorLegend={false}
            showTotalCount={false}
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
        </div>
      </Reveal>
    </>
  );
}

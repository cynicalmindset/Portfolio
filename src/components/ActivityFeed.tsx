import { Reveal } from './Reveal';
import { PackageIcon } from './Icons';
import { useGithubActivity } from '../hooks/useGithubActivity';
import { timeAgo } from '../lib/githubEvents';
import { profile } from '../data';

const GITHUB_USERNAME = profile.githubHandle;

export function ActivityFeed() {
  const state = useGithubActivity(GITHUB_USERNAME, 6);

  return (
    <>
      <hr className="divider" />
      <div className="kicker" id="recent-activity"><span className="chevron">▾</span>recent activity</div>
      <Reveal className="embed">
        <div className="embed-head">
          <span className="title"><PackageIcon />activity.log</span>
          <span className="dots">•••</span>
        </div>
        <div className="embed-body">
          {state.status === 'loading' && <div className="log-empty">fetching recent activity…</div>}
          {state.status === 'error' && (
            <div className="log-empty">couldn't reach the GitHub API — try again shortly.</div>
          )}
          {state.status === 'rate-limited' && (
            <div className="log-empty">
              GitHub's public API rate limit was hit on this network (60 requests/hour, shared by anyone
              browsing from here).
              {state.resetAt && ` Resets at ${new Date(state.resetAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`}
            </div>
          )}
          {state.status === 'success' && state.items.length === 0 && (
            <div className="log-empty">no recent public activity.</div>
          )}
          {state.status === 'success' && state.items.length > 0 && (
            <div className="log-list">
              {state.items.map((item) => (
                <div className="log-row" key={item.timestamp + item.repo + item.title}>
                  <span className={`tag ${item.tag}`}><span className="dot"></span>{item.tagLabel}</span>
                  <div className="log-text">
                    <a href={item.href} target="_blank" rel="noopener noreferrer"><b>{item.title}</b></a>
                    <span className="repo">{item.repo} · {timeAgo(item.timestamp)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="embed-foot">live from github.com/{GITHUB_USERNAME} · public events only</div>
      </Reveal>
    </>
  );
}

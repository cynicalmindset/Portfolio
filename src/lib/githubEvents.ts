export type GithubEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: Record<string, any>;
};

export type EventTag = 'red' | 'amber' | 'clay';

export type EventDescription = {
  tag: EventTag;
  tagLabel: string;
  title: string;
  repo: string;
  href: string;
  timestamp: string;
};

function repoUrl(repoName: string) {
  return `https://github.com/${repoName}`;
}

function humanizeEventType(type: string) {
  return type
    .replace(/Event$/, '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase();
}

export function describeEvent(event: GithubEvent): EventDescription {
  const repo = event.repo.name;
  const href = repoUrl(repo);
  const payload = event.payload;
  const timestamp = event.created_at;

  switch (event.type) {
    case 'PushEvent': {
      const commits = payload.commits as Array<{ message: string }> | undefined;
      const count = commits?.length ?? payload.size ?? 1;
      const branch = String(payload.ref ?? '').replace('refs/heads/', '') || 'main';
      const message = commits?.[commits.length - 1]?.message?.split('\n')[0];
      return {
        tag: 'amber',
        tagLabel: 'pushed',
        title: message || `${count} commit${count === 1 ? '' : 's'} to ${branch}`,
        repo,
        href,
        timestamp,
      };
    }
    case 'PullRequestEvent': {
      const action = payload.action as string;
      const merged = action === 'closed' && payload.pull_request?.merged;
      return {
        tag: merged ? 'red' : action === 'opened' ? 'clay' : 'amber',
        tagLabel: merged ? 'merged' : action,
        title: payload.pull_request?.title ?? 'pull request',
        repo,
        href: payload.pull_request?.html_url ?? href,
        timestamp,
      };
    }
    case 'IssuesEvent':
      return {
        tag: payload.action === 'closed' ? 'red' : 'amber',
        tagLabel: `issue ${payload.action}`,
        title: payload.issue?.title ?? 'issue',
        repo,
        href: payload.issue?.html_url ?? href,
        timestamp,
      };
    case 'WatchEvent':
      return {
        tag: 'clay',
        tagLabel: 'starred',
        title: 'starred the repository',
        repo,
        href,
        timestamp,
      };
    case 'ForkEvent':
      return {
        tag: 'clay',
        tagLabel: 'forked',
        title: `forked to ${payload.forkee?.full_name ?? 'a new repo'}`,
        repo,
        href: payload.forkee?.html_url ?? href,
        timestamp,
      };
    case 'CreateEvent':
      if (payload.ref_type === 'repository') {
        return { tag: 'amber', tagLabel: 'created', title: 'created new repository', repo, href, timestamp };
      }
      return {
        tag: 'amber',
        tagLabel: 'created',
        title: `created ${payload.ref_type} ${payload.ref ?? ''}`.trim(),
        repo,
        href,
        timestamp,
      };
    case 'ReleaseEvent':
      return {
        tag: 'red',
        tagLabel: 'released',
        title: `released ${payload.release?.tag_name ?? ''}`.trim(),
        repo,
        href: payload.release?.html_url ?? href,
        timestamp,
      };
    case 'PublicEvent':
      return { tag: 'clay', tagLabel: 'open-sourced', title: 'made repository public', repo, href, timestamp };
    default:
      return {
        tag: 'clay',
        tagLabel: humanizeEventType(event.type),
        title: `activity in ${repo}`,
        repo,
        href,
        timestamp,
      };
  }
}

export function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const sec = Math.floor(diffMs / 1000);
  if (sec < 60) return 'just now';
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day}d ago`;
  const mo = Math.floor(day / 30);
  if (mo < 12) return `${mo}mo ago`;
  const yr = Math.floor(mo / 12);
  return `${yr}y ago`;
}

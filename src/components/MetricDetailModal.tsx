import { useEffect, useState } from 'react';
import { 
  GitPullRequestIcon, 
  GitMergeIcon, 
  IssueOpenedIcon, 
  UsersIcon, 
  PackageIcon, 
  ExternalLinkIcon 
} from './Icons';
import { profile } from '../data';
import type { CommunityStats } from '../hooks/useCommunityStats';

export type MetricType = 'merged-prs' | 'total-prs' | 'issues' | 'orgs' | 'repos';

interface DetailItem {
  id: string | number;
  title: string;
  repo: string;
  state?: string;
  url: string;
  date?: string;
  desc?: string;
}

const FALLBACK_DATA: Record<MetricType, { title: string; githubUrl: string; items: DetailItem[] }> = {
  'merged-prs': {
    title: 'Merged Pull Requests',
    githubUrl: `https://github.com/search?q=author%3A${profile.githubHandle}+type%3Apr+is%3Amerged&s=updated&o=desc`,
    items: [
      {
        id: 'm1',
        title: 'feat: add rapier collision physics engine & dynamic 3D building scaling',
        repo: 'cynicalmindset/Grid',
        state: 'MERGED',
        url: 'https://github.com/cynicalmindset/Grid',
        date: 'Recent',
        desc: 'Implemented procedural building heights mapped to GitHub telemetry with Rapier physics.'
      },
      {
        id: 'm2',
        title: 'feat: local RAG embedding pipeline with SSD1306 OLED interface',
        repo: 'cynicalmindset/Miki',
        state: 'MERGED',
        url: 'https://github.com/cynicalmindset/Miki',
        date: 'Recent',
        desc: 'Added offline local RAG pipeline and I2C display buffer routines.'
      },
      {
        id: 'm3',
        title: 'fix: GATT sync protocol 5-hop TTL decay & Ed25519 signature validation',
        repo: 'cynicalmindset/Ripple-main',
        state: 'MERGED',
        url: 'https://github.com/cynicalmindset/Ripple-main',
        date: 'Recent',
        desc: 'Hardened peer discovery and multi-hop cryptographic message routing.'
      },
      {
        id: 'm4',
        title: 'feat: Groq LPU inference pipeline & academic markdown synthesizer',
        repo: 'cynicalmindset/Terminal-Reaserch_agent',
        state: 'MERGED',
        url: 'https://github.com/cynicalmindset/Terminal-Reaserch_agent',
        date: 'Recent',
        desc: 'High-throughput terminal agent pipeline for arXiv & paper synthesis.'
      },
      {
        id: 'm5',
        title: 'feat: GitHub OAuth device flow & Gemini tool calling scaffolds',
        repo: 'cynicalmindset/vibecoder',
        state: 'MERGED',
        url: 'https://github.com/cynicalmindset/vibecoder',
        date: 'Recent',
        desc: 'Unified CLI engine with Better Auth & Express monorepo scaffolding.'
      }
    ]
  },
  'total-prs': {
    title: 'Total Pull Requests',
    githubUrl: `https://github.com/search?q=author%3A${profile.githubHandle}+type%3Apr&s=updated&o=desc`,
    items: [
      {
        id: 'p1',
        title: 'feat: add interactive 3D city renderer & touch virtual joysticks',
        repo: 'cynicalmindset/Grid',
        state: 'MERGED',
        url: 'https://github.com/cynicalmindset/Grid',
        date: 'Recent'
      },
      {
        id: 'p2',
        title: 'feat: offline ESP32 wake hook & persistent memory store',
        repo: 'cynicalmindset/Miki',
        state: 'MERGED',
        url: 'https://github.com/cynicalmindset/Miki',
        date: 'Recent'
      },
      {
        id: 'p3',
        title: 'feat: serverless SQLite mesh cache & GATT sync packet routing',
        repo: 'cynicalmindset/Ripple-main',
        state: 'MERGED',
        url: 'https://github.com/cynicalmindset/Ripple-main',
        date: 'Recent'
      },
      {
        id: 'p4',
        title: 'feat: multi-agent planner, searcher and synthesizer engine',
        repo: 'cynicalmindset/Terminal-Reaserch_agent',
        state: 'MERGED',
        url: 'https://github.com/cynicalmindset/Terminal-Reaserch_agent',
        date: 'Recent'
      },
      {
        id: 'p5',
        title: 'feat: ink terminal UI & automated scaffold generation',
        repo: 'cynicalmindset/vibecoder',
        state: 'MERGED',
        url: 'https://github.com/cynicalmindset/vibecoder',
        date: 'Recent'
      }
    ]
  },
  'issues': {
    title: 'Issues & RFCs',
    githubUrl: `https://github.com/search?q=author%3A${profile.githubHandle}+type%3Aissue&s=updated&o=desc`,
    items: [
      {
        id: 'i1',
        title: 'RFC: Low-latency GATT synchronization with packet fragmentation on Android BLE',
        repo: 'cynicalmindset/Ripple-main',
        state: 'OPEN',
        url: 'https://github.com/cynicalmindset/Ripple-main',
        date: 'Tracked',
        desc: 'Investigating MTU size negotiation and BLE packet loss recovery mechanisms.'
      },
      {
        id: 'i2',
        title: 'Feature: WebGL shader antialiasing & shadow map optimization on mobile GPUs',
        repo: 'cynicalmindset/Grid',
        state: 'CLOSED',
        url: 'https://github.com/cynicalmindset/Grid',
        date: 'Resolved',
        desc: 'Optimized render loop to maintain 60 FPS under heavy geometry loads.'
      },
      {
        id: 'i3',
        title: 'Improvement: Local vector embedding quantisation for ESP32 SRAM constraints',
        repo: 'cynicalmindset/Miki',
        state: 'OPEN',
        url: 'https://github.com/cynicalmindset/Miki',
        date: 'Tracked',
        desc: 'Testing int8 quantization models to reduce memory footprint on microcontrollers.'
      },
      {
        id: 'i4',
        title: 'Proposal: Groq API streaming token parser with live terminal UI markdown rendering',
        repo: 'cynicalmindset/Terminal-Reaserch_agent',
        state: 'CLOSED',
        url: 'https://github.com/cynicalmindset/Terminal-Reaserch_agent',
        date: 'Resolved',
        desc: 'Added chunked response streaming without terminal flickering.'
      }
    ]
  },
  'orgs': {
    title: 'Active Orgs & Ecosystems',
    githubUrl: profile.githubUrl,
    items: [
      {
        id: 'o1',
        title: 'Workik AI Platform',
        repo: 'workik / core-platform',
        url: 'https://github.com/cynicalmindset',
        desc: 'Building intelligent developer tools, production frontend systems, and AI workflows.'
      },
      {
        id: 'o2',
        title: 'KIIT Computing & Student Developers',
        repo: 'kiit-cse / student-initiatives',
        url: 'https://github.com/cynicalmindset',
        desc: 'Collaborating on undergraduate systems research, hackathons, and software engineering.'
      },
      {
        id: 'o3',
        title: 'Open Source Distributed Protocols Ecosystem',
        repo: 'cynicalmindset / p2p-protocols',
        url: 'https://github.com/cynicalmindset',
        desc: 'Building open peer-to-peer libraries, BLE GATT syncing, and local-first software.'
      }
    ]
  },
  'repos': {
    title: 'Public Repositories',
    githubUrl: `${profile.githubUrl}?tab=repositories`,
    items: [
      {
        id: 'r1',
        title: 'Grid',
        repo: 'cynicalmindset/Grid',
        url: 'https://github.com/cynicalmindset/Grid',
        desc: 'GitHub developers, rendered as an interactive 3D city using React Three Fiber & Rapier.'
      },
      {
        id: 'r2',
        title: 'Miki',
        repo: 'cynicalmindset/Miki',
        url: 'https://github.com/cynicalmindset/Miki',
        desc: 'A physical benchtop AI companion running on an ESP32-CAM + I2C OLED display with local RAG.'
      },
      {
        id: 'r3',
        title: 'Ripple-main',
        repo: 'cynicalmindset/Ripple-main',
        url: 'https://github.com/cynicalmindset/Ripple-main',
        desc: 'Decentralized social network operating over Bluetooth Low Energy with custom GATT sync.'
      },
      {
        id: 'r4',
        title: 'Terminal-Reaserch_agent',
        repo: 'cynicalmindset/Terminal-Reaserch_agent',
        url: 'https://github.com/cynicalmindset/Terminal-Reaserch_agent',
        desc: 'CLI-first multi-agent autonomous research engine powered by Groq LPUs & Qwen models.'
      },
      {
        id: 'r5',
        title: 'vibecoder',
        repo: 'cynicalmindset/vibecoder',
        url: 'https://github.com/cynicalmindset/vibecoder',
        desc: 'Express API with Better Auth, Next.js dashboard, and terminal CLI in a unified monorepo.'
      },
      {
        id: 'r6',
        title: 'Portfolio',
        repo: 'cynicalmindset/Portfolio',
        url: 'https://github.com/cynicalmindset/Portfolio',
        desc: 'Actuity-inspired high-performance developer portfolio with Godot arcade integration.'
      }
    ]
  }
};

export function MetricDetailModal({
  metricType,
  stats,
  onClose,
  onChangeMetric
}: {
  metricType: MetricType | null;
  stats: CommunityStats;
  onClose: () => void;
  onChangeMetric: (type: MetricType) => void;
}) {
  const [liveItems, setLiveItems] = useState<DetailItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!metricType) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown, true);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      document.body.style.overflow = '';
    };
  }, [metricType, onClose]);

  // Fetch live items if possible
  useEffect(() => {
    if (!metricType) return;
    let cancelled = false;

    async function fetchDetails() {
      setIsLoading(true);
      try {
        let endpoint = '';
        if (metricType === 'merged-prs') {
          endpoint = `https://api.github.com/search/issues?q=type:pr+author:${profile.githubHandle}+is:merged&sort=updated&per_page=8`;
        } else if (metricType === 'total-prs') {
          endpoint = `https://api.github.com/search/issues?q=type:pr+author:${profile.githubHandle}&sort=updated&per_page=8`;
        } else if (metricType === 'issues') {
          endpoint = `https://api.github.com/search/issues?q=type:issue+author:${profile.githubHandle}&sort=updated&per_page=8`;
        } else if (metricType === 'repos') {
          endpoint = `https://api.github.com/users/${profile.githubHandle}/repos?sort=updated&per_page=8`;
        }

        if (endpoint) {
          const res = await fetch(endpoint);
          if (res.ok && !cancelled) {
            const data = await res.json();
            if (Array.isArray(data)) {
              // Array of repos
              setLiveItems(
                data.map((r) => ({
                  id: r.id,
                  title: r.name,
                  repo: r.full_name,
                  url: r.html_url,
                  desc: r.description || 'Public repository on GitHub.',
                  date: r.updated_at ? new Date(r.updated_at).toLocaleDateString() : undefined
                }))
              );
              setIsLoading(false);
              return;
            } else if (data.items && Array.isArray(data.items)) {
              // Search issues / PRs
              setLiveItems(
                data.items.map((it: any) => ({
                  id: it.id,
                  title: it.title,
                  repo: it.repository_url ? it.repository_url.replace('https://api.github.com/repos/', '') : profile.githubHandle,
                  state: it.pull_request?.merged_at || it.state === 'closed' ? (it.pull_request ? 'MERGED' : 'CLOSED') : 'OPEN',
                  url: it.html_url,
                  date: it.created_at ? new Date(it.created_at).toLocaleDateString() : undefined
                }))
              );
              setIsLoading(false);
              return;
            }
          }
        }
      } catch {
        // Fall back to curated baseline
      }
      if (!cancelled) {
        setLiveItems(null);
        setIsLoading(false);
      }
    }

    fetchDetails();
    return () => {
      cancelled = true;
    };
  }, [metricType]);

  if (!metricType) return null;

  const currentData = FALLBACK_DATA[metricType];
  const itemsToDisplay = (liveItems && liveItems.length > 0) ? liveItems : currentData.items;

  const getMetricIcon = (type: MetricType) => {
    switch (type) {
      case 'merged-prs': return <GitMergeIcon />;
      case 'total-prs': return <GitPullRequestIcon />;
      case 'issues': return <IssueOpenedIcon />;
      case 'orgs': return <UsersIcon />;
      case 'repos': return <PackageIcon />;
    }
  };

  const getMetricCount = (type: MetricType) => {
    switch (type) {
      case 'merged-prs': return `${stats.mergedPrs}+`;
      case 'total-prs': return `${stats.totalPrs}+`;
      case 'issues': return `${stats.issuesCreated}+`;
      case 'orgs': return `${stats.activeOrgs}+`;
      case 'repos': return stats.publicRepos;
    }
  };

  const tabs: { id: MetricType; label: string }[] = [
    { id: 'merged-prs', label: 'Merged PRs' },
    { id: 'total-prs', label: 'All PRs' },
    { id: 'issues', label: 'Issues' },
    { id: 'orgs', label: 'Ecosystem' },
    { id: 'repos', label: 'Repositories' },
  ];

  return (
    <div 
      className="metric-modal-backdrop" 
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="metric-modal-dialog">
        {/* Modal Top Bar */}
        <div className="metric-modal-top-bar">
          <div className="metric-modal-header-left">
            <span className="modal-metric-icon">{getMetricIcon(metricType)}</span>
            <div className="modal-metric-headings">
              <div className="modal-metric-title-row">
                <span className="modal-metric-title">{currentData.title}</span>
                <span className="modal-metric-count-chip">{getMetricCount(metricType)}</span>
              </div>
            </div>
          </div>

          <button 
            type="button" 
            className="metric-modal-close-btn" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Metric Switcher Tabs */}
        <div className="metric-modal-tabs-row">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`metric-tab-pill ${metricType === tab.id ? 'active' : ''}`}
              onClick={() => onChangeMetric(tab.id)}
            >
              <span className="tab-pill-icon">{getMetricIcon(tab.id)}</span>
              <span>{tab.label}</span>
              <span className="tab-pill-count">{getMetricCount(tab.id)}</span>
            </button>
          ))}
        </div>

        {/* Modal Items List */}
        <div className="metric-modal-body">
          {isLoading && (
            <div className="metric-modal-loading">Querying GitHub public telemetry API…</div>
          )}

          <div className="metric-items-list">
            {itemsToDisplay.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="metric-item-card"
              >
                <div className="metric-item-head">
                  <span className="metric-item-repo">{item.repo}</span>
                  {item.state && (
                    <span className={`metric-item-state-badge ${item.state.toLowerCase()}`}>
                      {item.state}
                    </span>
                  )}
                  {item.date && (
                    <span className="metric-item-date">{item.date}</span>
                  )}
                </div>

                <div className="metric-item-title-row">
                  <span className="metric-item-title">{item.title}</span>
                  <ExternalLinkIcon className="metric-item-ext" />
                </div>

                {item.desc && (
                  <p className="metric-item-desc">{item.desc}</p>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Modal Footer Bar with Direct GitHub Action */}
        <div className="metric-modal-footer">
          <div className="modal-foot-info">
            Live public telemetry from <b>github.com/{profile.githubHandle}</b>
          </div>
          <a
            href={currentData.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="modal-github-action-btn"
          >
            <span>View all on GitHub</span>
            <ExternalLinkIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

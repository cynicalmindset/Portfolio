import { useState, useRef, useEffect } from 'react';
import { 
  ArrowRightIcon, 
  GitPullRequestIcon, 
  GitMergeIcon, 
  PackageIcon, 
  PlayIcon
} from './Icons';
import { FollowMe } from './FollowMe';
import { profile, projects, youtubeSpotlight } from '../data';

type NavSection = {
  id: string;
  num: string;
  label: string;
  desc: string;
};

const SECTIONS: NavSection[] = [
  { id: 'about', num: '01', label: 'ABOUT', desc: 'Identity, Philosophy & Video Spotlight' },
  { id: 'projects', num: '02', label: 'PROJECTS', desc: '5 Shipped Systems, 3D Worlds & P2P Protocols' },
  { id: 'tech-stack', num: '03', label: 'STACK', desc: 'Toolchain Topology, ESP32 & Runtimes' },
  { id: 'community', num: '04', label: 'COMMUNITY', desc: 'Live GitHub Telemetry, PRs, Heatmap & Activity' },
  { id: 'contact', num: '05', label: 'CONTACT', desc: 'Social channels, email & connect' },
];

export function TopBar({
  activeSection,
  onOpenPalette,
}: {
  activeSection: string;
  onOpenPalette: () => void;
}) {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const leaveTimeoutRef = useRef<number | null>(null);

  const handleMouseEnter = (secId: string) => {
    if (leaveTimeoutRef.current) {
      window.clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setHoveredSection(secId);
  };

  const handleMouseLeave = () => {
    if (leaveTimeoutRef.current) {
      window.clearTimeout(leaveTimeoutRef.current);
    }
    leaveTimeoutRef.current = window.setTimeout(() => {
      setHoveredSection(null);
    }, 220);
  };

  useEffect(() => {
    return () => {
      if (leaveTimeoutRef.current) {
        window.clearTimeout(leaveTimeoutRef.current);
      }
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        if (leaveTimeoutRef.current) {
          window.clearTimeout(leaveTimeoutRef.current);
        }
        setHoveredSection(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollTo = (id: string) => {
    if (leaveTimeoutRef.current) {
      window.clearTimeout(leaveTimeoutRef.current);
    }
    setHoveredSection(null);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="actuity-nav-header" ref={navRef}>
      <div className="nav-container">
        {/* Brand identity */}
        <div className="nav-brand-group">
          <a href="#about" className="nav-brand" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>
            <span className="brand-symbol">▲</span>
            <span className="brand-name">{profile.handle}</span>
            <span className="brand-slash">/</span>
            <span className="brand-tag">v2.6</span>
          </a>
        </div>

        {/* Section Navigation Tabs with Mega-Menu Dropdowns */}
        <nav className="nav-menu-desktop" onMouseLeave={handleMouseLeave}>
          {SECTIONS.map((sec) => {
            const isActive = activeSection.toLowerCase().includes(sec.id.replace('-', ' '));
            const isHovered = hoveredSection === sec.id;

            return (
              <div 
                key={sec.id} 
                className="nav-item-wrapper"
                onMouseEnter={() => handleMouseEnter(sec.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`nav-tab-btn ${isActive ? 'active' : ''} ${isHovered ? 'hovered' : ''}`}
                  onClick={() => scrollTo(sec.id)}
                  aria-expanded={isHovered}
                >
                  <span className="tab-num">{sec.num}</span>
                  <span className="tab-label">{sec.label}</span>
                  <span className="tab-caret">▾</span>
                </button>

                {/* Section Mega-Menu Dropdown */}
                {isHovered && (
                  <div 
                    className="nav-mega-menu"
                    onMouseEnter={() => handleMouseEnter(sec.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="mega-menu-content">
                      {sec.id === 'about' && (
                        <div className="mega-about-grid">
                          <div className="mega-column">
                            <div className="mega-section-title">SYSTEM PHILOSOPHY</div>
                            <p className="mega-text">
                              CS student &amp; engineer handcrafting local RAG pipelines, BLE gossip protocols, and 3D web worlds.
                            </p>
                            <div className="mega-link-action" onClick={() => scrollTo('about')}>
                              <span>Read Bio &amp; Capability Matrix</span>
                              <ArrowRightIcon />
                            </div>
                          </div>
                          <div className="mega-column mega-spotlight-col">
                            <div className="mega-section-title">KNOW ME BETTER</div>
                            <div className="mega-video-preview" onClick={() => scrollTo('about')}>
                              <span className="mega-play-btn"><PlayIcon /></span>
                              <div>
                                <b>{youtubeSpotlight.sectionTitle}</b>
                                <span className="mega-sub">{youtubeSpotlight.title}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {sec.id === 'projects' && (
                        <div className="mega-projects-grid">
                          <div className="mega-section-title">FEATURED ARTIFACTS</div>
                          <div className="mega-project-cards">
                            {projects.slice(0, 4).map((p) => (
                              <div 
                                key={p.id} 
                                className="mega-project-item"
                                onClick={() => scrollTo(`project-${p.id}`)}
                              >
                                <div className="mega-p-header">
                                  <span className="mega-p-sym">{p.sym}</span>
                                  <span className="mega-p-name">{p.name}</span>
                                  <span className={`mega-p-status ${p.status === 'LIVE' ? 'live' : ''}`}>{p.status}</span>
                                </div>
                                <span className="mega-p-desc">{p.desc}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mega-footer-row" onClick={() => scrollTo('projects')}>
                            <span>Explore all 5 technical architectures</span>
                            <ArrowRightIcon />
                          </div>
                        </div>
                      )}

                      {sec.id === 'tech-stack' && (
                        <div className="mega-stack-grid">
                          <div className="mega-column">
                            <div className="mega-section-title">TOOLCHAIN &amp; PROTOCOLS</div>
                            <div className="mega-tags-cloud">
                              {['React Three Fiber', 'ESP32-CAM', 'Bluetooth LE', 'Node.js', 'Groq / Qwen', 'Better Auth', 'C++', 'Python'].map((t) => (
                                <span key={t} className="mega-tag">{t}</span>
                              ))}
                            </div>
                          </div>
                          <div className="mega-column">
                            <div className="mega-section-title">ENGINEERING TIMELINE</div>
                            <p className="mega-text">Interactive 8-milestone roadmap tracking undergraduate journey, UI/UX design, Android, content curation, SDE at Workik, and systems in C++.</p>
                            <div className="mega-link-action" onClick={() => scrollTo('tech-stack')}>
                              <span>Inspect Timeline &amp; Stack</span>
                              <ArrowRightIcon />
                            </div>
                          </div>
                        </div>
                      )}

                      {sec.id === 'community' && (
                        <div className="mega-community-grid">
                          <div className="mega-metrics-row">
                            <div className="mega-metric-box">
                              <span className="metric-icon"><GitMergeIcon /></span>
                              <span className="metric-val">29+</span>
                              <span className="metric-lbl">Merged PRs</span>
                            </div>
                            <div className="mega-metric-box">
                              <span className="metric-icon"><GitPullRequestIcon /></span>
                              <span className="metric-val">47+</span>
                              <span className="metric-lbl">Total PRs</span>
                            </div>
                            <div className="mega-metric-box">
                              <span className="metric-icon"><PackageIcon /></span>
                              <span className="metric-val">76</span>
                              <span className="metric-lbl">Public Repos</span>
                            </div>
                          </div>
                          <div className="mega-link-action" onClick={() => scrollTo('community')}>
                            <span>View Live Heatmap, Contributed Orgs &amp; Recent Log</span>
                            <ArrowRightIcon />
                          </div>
                        </div>
                      )}

                      {sec.id === 'contact' && (
                        <div className="mega-contact-grid">
                          <div className="mega-section-title">CONNECT &amp; SOCIALS</div>
                          <div className="mega-contact-row">
                            <a href={`mailto:${profile.email}`} className="mega-contact-btn">
                              <span>Mail {profile.email}</span>
                            </a>
                            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="mega-contact-btn">
                              <span>Connect on LinkedIn</span>
                            </a>
                            <a href={profile.leetcodeUrl} target="_blank" rel="noopener noreferrer" className="mega-contact-btn">
                              <span>LeetCode Profile</span>
                            </a>
                            <a href={profile.codeforcesUrl} target="_blank" rel="noopener noreferrer" className="mega-contact-btn">
                              <span>Codeforces Profile</span>
                            </a>
                            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="mega-contact-btn">
                              <span>GitHub Profile</span>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right side actions */}
        <div className="nav-actions-group">
          {/* Follow Me Dropdown Component */}
          <FollowMe />

          {/* Quick Command Palette Button */}
          <button 
            className="nav-cmdk-btn" 
            onClick={onOpenPalette}
            title="Press Cmd+K or Ctrl+K to search"
            aria-label="Open Command Palette"
          >
            <span className="cmdk-key-tag">⌘K</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button 
            className={`mobile-nav-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="hamburger-bar bar-1"></span>
            <span className="hamburger-bar bar-2"></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <div className="mobile-nav-items">
            {SECTIONS.map((sec) => {
              const isActive = activeSection.toLowerCase().includes(sec.id.replace('-', ' '));
              return (
                <button
                  key={sec.id}
                  className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => scrollTo(sec.id)}
                >
                  <div className="mobile-nav-link-left">
                    <span className="tab-num">{sec.num}</span>
                    <div className="mobile-nav-text-block">
                      <span className="tab-label">{sec.label}</span>
                      <span className="tab-desc">{sec.desc}</span>
                    </div>
                  </div>
                  <span className="mobile-nav-arrow-badge" aria-hidden="true">
                    <ArrowRightIcon />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Actions in Mobile Drawer */}
          <div className="mobile-drawer-footer">
            <button 
              type="button" 
              className="drawer-cmdk-trigger"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPalette();
              }}
            >
              <span className="cmdk-key-tag">⌘K</span>
              <span>Command Palette</span>
            </button>
            <div className="drawer-quick-links">
              <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="drawer-quick-btn">
                <span>GitHub ↗</span>
              </a>
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="drawer-quick-btn">
                <span>Resume ↗</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

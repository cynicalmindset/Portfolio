import { useRef, useState, useEffect, type KeyboardEvent } from 'react';
import { useToast } from '../context/ToastContext';
import { Reveal } from './Reveal';
import { 
  GradCapIcon, 
  BriefcaseIcon, 
  PinIcon, 
  ActivityIcon, 
  PlayIcon,
  ExternalLinkIcon,
  ArrowRightIcon
} from './Icons';
import { profile, timelineMilestones } from '../data';
import { GameModal } from './GameModal';
import profileImg from '../assets/profile.png';
import bannerImg from '../assets/banner_main.png';

export function Header() {
  const showToast = useToast();
  const [pulsing, setPulsing] = useState(false);
  const clicksRef = useRef(0);
  const [gameOpen, setGameOpen] = useState(false);
  const [experienceOpen, setExperienceOpen] = useState(false);
  const expBoxRef = useRef<HTMLDivElement>(null);
  const expLeaveTimeoutRef = useRef<number | null>(null);

  const handleExpMouseEnter = () => {
    if (expLeaveTimeoutRef.current) {
      window.clearTimeout(expLeaveTimeoutRef.current);
      expLeaveTimeoutRef.current = null;
    }
    setExperienceOpen(true);
  };

  const handleExpMouseLeave = () => {
    if (expLeaveTimeoutRef.current) {
      window.clearTimeout(expLeaveTimeoutRef.current);
    }
    expLeaveTimeoutRef.current = window.setTimeout(() => {
      setExperienceOpen(false);
    }, 220);
  };

  function handleIconClick() {
    clicksRef.current += 1;
    if (clicksRef.current === 5) {
      showToast('status: caffeinated. also, hi.');
      setPulsing(true);
      setTimeout(() => {
        setPulsing(false);
        clicksRef.current = 0;
      }, 500);
    }
  }

  function handleCoverKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setGameOpen(true);
    }
  }

  useEffect(() => {
    return () => {
      if (expLeaveTimeoutRef.current) {
        window.clearTimeout(expLeaveTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!experienceOpen) return;

    function handleKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape') {
        if (expLeaveTimeoutRef.current) {
          window.clearTimeout(expLeaveTimeoutRef.current);
        }
        setExperienceOpen(false);
      }
    }

    function handleClickOutside(e: MouseEvent) {
      if (expBoxRef.current && !expBoxRef.current.contains(e.target as Node)) {
        if (expLeaveTimeoutRef.current) {
          window.clearTimeout(expLeaveTimeoutRef.current);
        }
        setExperienceOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [experienceOpen]);

  return (
    <section className={`hero-section ${experienceOpen ? 'has-open-popover' : ''}`}>
      {/* Actuity-Inspired Technical Banner / Game Launcher */}
      <div className="simulation-banner-card">
        <div className="banner-telemetry-bar">
          <div className="telemetry-left">
            <span className="telemetry-dot"></span>
            <span className="telemetry-title">SIMULATION_TARGET // portfolio_game.exe</span>
          </div>
          <div className="telemetry-right">
            <span className="telemetry-badge">ENGINE: GODOT HTML5 / WASM</span>
            <span className="telemetry-badge status-ready">
              <span className="status-ping-dot"></span>
              STATUS: READY
            </span>
          </div>
        </div>

        {/* Clean Static Game Banner / Launcher Container */}
        <div
          className="game-launch-frame"
          role="button"
          tabIndex={0}
          aria-label="Launch interactive portfolio_game.exe"
          onClick={() => setGameOpen(true)}
          onKeyDown={handleCoverKeyDown}
        >
          {/* Banner main image background */}
          <img src={bannerImg} alt="Simulation Game Banner" className="frame-banner-bg" />
          
          {/* Fading bottom gradient overlay matching reference design */}
          <div className="frame-bottom-fade-overlay"></div>

          {/* Subtle technical grid background */}
          <div className="frame-grid-overlay"></div>
          
          <div className="frame-center-content">
            <div className="arcade-icon-badge" aria-hidden="true">
              <PlayIcon />
              <span className="arcade-play-text">PLAY</span>
            </div>
          </div>

          <div className="frame-corner-accents">
            <span className="corner-tl">+</span>
            <span className="corner-tr">+</span>
            <span className="corner-bl">+</span>
            <span className="corner-br">+</span>
          </div>
        </div>
      </div>

      {/* Identity & Profile Block */}
      <div className="identity-block">
        <div className="identity-top-row">
          <div className="avatar-wrapper">
            <div className={`avatar-box${pulsing ? ' pulse' : ''}`} onClick={handleIconClick}>
              <img src={profileImg} alt={profile.name} />
            </div>
            <div className="avatar-status-badge">
              <span className="status-live-dot"></span>
            </div>
          </div>

          <div className="identity-headers">
            <div className="name-heading-row">
              <h1 className="hero-name">{profile.name}</h1>
              <span className="name-cursor" aria-hidden="true"></span>
            </div>
            <p className="hero-sub-text" aria-label={profile.title}>
              <span className="sub-word word-sys">Systems</span>
              <span className="sub-punct">, </span>
              <span className="sub-word word-app">Applications</span>
              <span className="sub-punct"> &amp; </span>
              <span className="sub-word word-des">Design</span>
            </p>
          </div>
        </div>

        {/* Technical Properties Grid */}
        <Reveal className={`technical-props-grid ${experienceOpen ? 'has-open-popover' : ''}`}>
          <div className="prop-box">
            <div className="prop-header">
              <GradCapIcon />
              <span className="prop-lbl">ROLE</span>
            </div>
            <div className="prop-val">{profile.education}</div>
          </div>

          <div 
            ref={expBoxRef}
            className={`prop-box interactive-exp-box ${experienceOpen ? 'open' : ''}`}
            role="button"
            tabIndex={0}
            aria-expanded={experienceOpen}
            aria-label="View career and experience timeline"
            onClick={() => setExperienceOpen((prev) => !prev)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setExperienceOpen((prev) => !prev);
              }
            }}
            onMouseEnter={handleExpMouseEnter}
            onMouseLeave={handleExpMouseLeave}
          >
            <div className="prop-header">
              <BriefcaseIcon />
              <span className="prop-lbl">EXPERIENCE</span>
              <span className="prop-interactive-tag">TIMELINE ▾</span>
            </div>
            <div className="prop-val">{profile.role}</div>

            {/* Floating Experience Timeline Popover */}
            {experienceOpen && (
              <div 
                className="experience-popover-dropdown" 
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={handleExpMouseEnter}
                onMouseLeave={handleExpMouseLeave}
              >
                <div className="exp-popover-head">
                  <div className="exp-popover-title-row">
                    <BriefcaseIcon />
                    <span className="exp-popover-title">CAREER_TIMELINE // EXPERIENCE</span>
                  </div>
                  <div className="exp-popover-head-right">
                    <span className="exp-period-chip">2024 → PRESENT</span>
                    <button 
                      type="button" 
                      className="exp-close-btn" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setExperienceOpen(false);
                      }}
                      aria-label="Close experience timeline"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="exp-popover-timeline">
                  {timelineMilestones.map((m) => (
                    <div key={m.id} className={`exp-timeline-item ${m.highlight ? 'featured' : ''}`}>
                      <div className="exp-timeline-node">
                        <span className="exp-node-dot"></span>
                        <span className="exp-node-line"></span>
                      </div>
                      <div className="exp-timeline-content">
                        <div className="exp-timeline-meta">
                          <span className="exp-time-tag">{m.period}</span>
                          {m.org && <span className="exp-org-tag">@ {m.org}</span>}
                        </div>
                        <div className="exp-title-line">
                          <span className="exp-role-title">{m.role}</span>
                        </div>
                        <p className="exp-item-desc">{m.desc}</p>
                        {m.link && (
                          <a 
                            href={m.link.href} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="exp-item-link"
                          >
                            <span>{m.link.label}</span>
                            <ExternalLinkIcon />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="exp-popover-foot">
                  <a 
                    href="#tech-stack" 
                    className="exp-jump-link"
                    onClick={() => setExperienceOpen(false)}
                  >
                    <span>View Full Engineering Roadmap</span>
                    <ArrowRightIcon />
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="prop-box">
            <div className="prop-header">
              <PinIcon />
              <span className="prop-lbl">LOCATION</span>
            </div>
            <div className="prop-val">{profile.location}</div>
          </div>

          <div className="prop-box highlight-status">
            <div className="prop-header">
              <ActivityIcon />
              <span className="prop-lbl">STATUS</span>
            </div>
            <div className="prop-val status-val">
              <span className="live-dot"></span>
              <span>{profile.status}</span>
            </div>
          </div>
        </Reveal>
      </div>

      <GameModal open={gameOpen} onClose={() => setGameOpen(false)} />
    </section>
  );
}


import { useState, useRef, useEffect } from 'react';
import { 
  UserPlusIcon, 
  GithubIcon, 
  LinkedinIcon, 
  TwitterIcon, 
  LeetcodeIcon,
  CodeforcesIcon,
  GlobeIcon,
  MailIcon, 
  ResumeIcon, 
  CopyIcon, 
  CheckIcon, 
  ExternalLinkIcon,
  StarIcon 
} from './Icons';
import { profile, socialLinks } from '../data';
import { useToast } from '../context/ToastContext';
import { useStarCounter } from '../hooks/useStarCounter';
import profileImg from '../assets/profile.png';

export function FollowMe() {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const leaveTimeoutRef = useRef<number | null>(null);
  const showToast = useToast();
  const star = useStarCounter();

  const handleMouseEnter = () => {
    if (leaveTimeoutRef.current) {
      window.clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (leaveTimeoutRef.current) {
      window.clearTimeout(leaveTimeoutRef.current);
    }
    leaveTimeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 220);
  };

  useEffect(() => {
    return () => {
      if (leaveTimeoutRef.current) {
        window.clearTimeout(leaveTimeoutRef.current);
      }
    };
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        if (leaveTimeoutRef.current) {
          window.clearTimeout(leaveTimeoutRef.current);
        }
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleCopy(text: string, key: string, label: string) {
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedKey(key);
      showToast(`Copied ${label} to clipboard`);
      setTimeout(() => setCopiedKey(null), 2000);
    });
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'github': return <GithubIcon />;
      case 'linkedin': return <LinkedinIcon />;
      case 'twitter': return <TwitterIcon />;
      case 'leetcode': return <LeetcodeIcon />;
      case 'codeforces': return <CodeforcesIcon />;
      case 'globe': return <GlobeIcon />;
      case 'email': return <MailIcon />;
      case 'resume': return <ResumeIcon />;
      default: return <UserPlusIcon />;
    }
  };

  return (
    <div 
      className="follow-me-container" 
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        className={`follow-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="follow-icon-wrap">
          <UserPlusIcon />
        </span>
        <span className="follow-text">Follow Me</span>
        <span className="follow-caret">▾</span>
      </button>

      {isOpen && (
        <div 
          className="follow-popover"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="follow-popover-header">
            <div className="follow-avatar">
              <img src={profileImg} alt={profile.name} />
              <span className="status-indicator"></span>
            </div>
            <div className="follow-header-info">
              <div className="follow-name">{profile.name}</div>
              <div className="follow-handle">{profile.twitterHandle} · {profile.handle}</div>
            </div>
          </div>

          <div className="follow-links-list">
            {socialLinks.map((link) => {
              const copyValue = link.icon === 'email' ? profile.email : link.href;
              const isCopied = copiedKey === link.label;

              return (
                <div key={link.label} className="follow-link-item">
                  <a 
                    href={link.href} 
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="follow-link-anchor"
                  >
                    <span className="social-icon">{getIcon(link.icon)}</span>
                    <div className="social-details">
                      <span className="social-title">{link.label}</span>
                      <span className="social-handle">{link.handle}</span>
                    </div>
                    <span className="social-ext"><ExternalLinkIcon /></span>
                  </a>

                  <button 
                    className="follow-copy-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(copyValue, link.label, link.label);
                    }}
                    title={`Copy ${link.label}`}
                    aria-label={`Copy ${link.label}`}
                  >
                    {isCopied ? <CheckIcon className="check-green" /> : <CopyIcon />}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="follow-popover-footer">
            <button 
              className={`star-portfolio-btn ${star.starred ? 'starred' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                star.toggle();
              }}
              disabled={star.pending}
            >
              <StarIcon filled={star.starred} />
              <span>{star.starred ? 'Starred' : 'Star Portfolio'}</span>
              <span className="star-count-chip">{star.count ?? 1}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

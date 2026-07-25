import { useRef, useState, type KeyboardEvent } from 'react';
import { useToast } from '../context/ToastContext';
import { Reveal } from './Reveal';
import { GradCapIcon, BriefcaseIcon, PinIcon, ActivityIcon, PlayIcon, StarIcon } from './Icons';
import { profile } from '../data';
import { GameModal } from './GameModal';
import { useStarCounter } from '../hooks/useStarCounter';
import bannerImg from '../assets/banner.png';
import pfpImg from '../assets/pfp.jpg';

export function Header() {
  const showToast = useToast();
  const [pulsing, setPulsing] = useState(false);
  const clicksRef = useRef(0);
  const [gameOpen, setGameOpen] = useState(false);
  const star = useStarCounter();

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

  return (
    <>
      <div
        className="cover"
        role="button"
        tabIndex={0}
        aria-label="Play portfolio_game"
        onClick={() => setGameOpen(true)}
        onKeyDown={handleCoverKeyDown}
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="play-badge"><PlayIcon />play</div>
        <div className="play-hint"><PlayIcon />play portfolio_game.exe</div>
      </div>

      <div className="icon-row">
        <div className={`page-icon${pulsing ? ' pulse' : ''}`} onClick={handleIconClick}>
          <img src={pfpImg} alt={profile.name} />
        </div>
      </div>

      <div className="title-block">
        <div className="name-row">
          <h1>{profile.name}<span className="cursor"></span></h1>
          <button
            className={`star-btn${star.starred ? ' starred' : ''}`}
            onClick={star.toggle}
            disabled={star.pending}
            aria-pressed={star.starred}
            title={star.starred ? 'unstar' : 'star this portfolio'}
          >
            <StarIcon filled={star.starred} />
            <span className="star-count">{star.count === null ? '·' : star.count}</span>
          </button>
        </div>
        <div className="sub">CS student &amp; full-stack builder — hardware, protocols, and web.</div>
        <div className="meta-line">$ whoami — {profile.name} · github.com/{profile.githubHandle}</div>
      </div>

      <Reveal className="props">
        <div className="prop-row">
          <div className="k"><GradCapIcon />Role</div>
          <div className="v">CSE student, KIIT</div>
        </div>
        <div className="prop-row">
          <div className="k"><BriefcaseIcon />Currently</div>
          <div className="v">Software Engineer @ Workik</div>
        </div>
        <div className="prop-row">
          <div className="k"><PinIcon />Location</div>
          <div className="v">Jharkhand ↔ Odisha, IN</div>
        </div>
        <div className="prop-row">
          <div className="k"><ActivityIcon />Status</div>
          <div className="v"><span className="tag red"><span className="dot"></span>open to collab</span></div>
        </div>
      </Reveal>

      <GameModal open={gameOpen} onClose={() => setGameOpen(false)} />
    </>
  );
}

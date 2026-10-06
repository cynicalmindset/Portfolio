import { useState, useEffect } from 'react';

export function ScrollHudGauge() {
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const p = Math.min(100, Math.max(0, (scrollY / totalHeight) * 100));
        setPercent(Math.round(p));
      }
      // Show gauge after scrolling 150px
      setVisible(scrollY > 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <div className="scroll-hud-gauge" role="complementary" aria-label="Scroll Progress HUD">
      <button 
        type="button" 
        className="hud-warp-trigger" 
        onClick={scrollToTop}
        title="Scroll back to top"
      >
        <div className="hud-dial-ring">
          <svg className="hud-svg-ring" viewBox="0 0 36 36">
            <path
              className="hud-circle-bg"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="hud-circle-progress"
              strokeDasharray={`${percent}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="hud-center-arrow">▲</span>
        </div>

        <div className="hud-text-block">
          <span className="hud-label">DEPTH</span>
          <span className="hud-val">{percent}%</span>
        </div>
      </button>
    </div>
  );
}

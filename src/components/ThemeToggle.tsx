import { useTheme } from '../hooks/useTheme';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={`theme-toggle-btn ${isDark ? 'is-dark' : 'is-light'} ${className}`}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className="theme-toggle-track">
        {/* Glow ambient pulse */}
        <div className="theme-glow-aura" />

        {/* Animated Sun & Moon Icons SVG */}
        <div className="theme-icon-container">
          <svg
            className="theme-celestial-svg"
            viewBox="0 0 24 24"
            width="17"
            height="17"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <mask id="moon-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <circle
                className="moon-mask-circle"
                cx="17"
                cy="7"
                r="7"
                fill="black"
              />
            </mask>

            {/* Main Center Sphere (Sun or Moon) */}
            <circle
              className="celestial-core"
              cx="12"
              cy="12"
              r={isDark ? 8.5 : 5}
              fill="currentColor"
              mask="url(#moon-mask)"
            />

            {/* Sun Rays (Fade and scale out when Dark) */}
            <g className="sun-rays-group">
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </g>

            {/* Little Stars for Night Mode */}
            <g className="night-stars-group">
              <circle className="night-star star-1" cx="19" cy="4" r="1" fill="currentColor" />
              <circle className="night-star star-2" cx="18" cy="18" r="0.75" fill="currentColor" />
            </g>
          </svg>
        </div>
      </div>
    </button>
  );
}

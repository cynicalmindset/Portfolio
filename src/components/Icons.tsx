export function FolderIcon() {
  return (
    <span className="icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
      </svg>
    </span>
  );
}

export function GradCapIcon() {
  return (
    <span className="icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10 12 5 2 10l10 5 10-5Z" />
        <path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5" />
      </svg>
    </span>
  );
}

export function BriefcaseIcon() {
  return (
    <span className="icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    </span>
  );
}

export function PinIcon() {
  return (
    <span className="icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    </span>
  );
}

export function ActivityIcon() {
  return (
    <span className="icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 8-6-16-3 8H2" />
      </svg>
    </span>
  );
}

export function BarChartIcon() {
  return (
    <span className="icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20V10M12 20V4M20 20v-6" />
      </svg>
    </span>
  );
}

export function PackageIcon() {
  return (
    <span className="icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
        <path d="M3 8l9 5 9-5M12 13v8" />
      </svg>
    </span>
  );
}

export function PlayIcon() {
  return (
    <span className="icon play-icon">
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M8 5v14l11-7L8 5Z" />
      </svg>
    </span>
  );
}

export function StarIcon({ filled = false }: { filled?: boolean }) {
  return (
    <span className="icon star-icon">
      <svg
        viewBox="0 0 24 24"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2Z" />
      </svg>
    </span>
  );
}

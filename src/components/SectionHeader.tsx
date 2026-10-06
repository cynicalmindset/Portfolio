import { Reveal } from './Reveal';

interface SectionHeaderProps {
  num: string;
  title: string;
  tag?: string;
  className?: string;
}

export function SectionHeader({ num, title, tag, className = '' }: SectionHeaderProps) {
  return (
    <Reveal className={`section-header-bar technical-grid-header ${className}`}>
      <span className="grid-crosshair corner-tl" aria-hidden="true">+</span>
      <span className="grid-crosshair corner-tr" aria-hidden="true">+</span>
      
      <div className="section-header-left">
        <span className="section-num-badge">{num}</span>
        <h2 className="section-title">{title}</h2>
      </div>

      {tag && (
        <div className="section-header-right">
          <span className="section-telemetry-tag">{tag}</span>
        </div>
      )}
    </Reveal>
  );
}

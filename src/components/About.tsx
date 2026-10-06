import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';
import { 
  PlayIcon, 
  YoutubeIcon, 
  TerminalIcon
} from './Icons';
import { profile, youtubeSpotlight } from '../data';

export function About() {
  return (
    <section className="section-block" id="about">
      <SectionHeader 
        num="01" 
        title="How I Build & What I Care About" 
        tag="// 01_CAPABILITY_MATRIX"
      />

      {/* Technical Bio Statements */}
      <div className="bio-statements-grid">
        {profile.bio.map((statement, idx) => (
          <Reveal key={idx} className="bio-card">
            <div className="bio-prompt-symbol">&gt;</div>
            <div className="bio-text-content">
              {statement}
            </div>
          </Reveal>
        ))}
      </div>

      {/* Actuity-Style Hardware & Systems Specification Table */}
      <Reveal className="actuity-spec-card">
        <div className="spec-card-header">
          <div className="spec-header-title">
            <TerminalIcon />
            <span>SYSTEM_CAPABILITY_MATRIX</span>
          </div>
          <span className="spec-badge">VERIFIED SPEC</span>
        </div>

        <div className="spec-table-body">
          {profile.specs.map((spec) => (
            <div key={spec.label} className="spec-table-row">
              <span className="spec-label-col">{spec.label}</span>
              <span className="spec-val-col">{spec.value}</span>
            </div>
          ))}
        </div>
      </Reveal>

      {/* "Documenting College Life" YouTube Video Spotlight Card */}
      <Reveal className="know-me-video-card">
        <div className="video-card-top-bar">
          <div className="video-meta-left">
            <YoutubeIcon className="youtube-red-icon" />
            <span className="video-section-tag">{youtubeSpotlight.sectionSubtitle}</span>
          </div>
          <div className="video-meta-right">
            <a 
              href={youtubeSpotlight.videoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="video-duration-pill"
            >
              WATCH ON YOUTUBE ↗
            </a>
          </div>
        </div>

        <div className="video-card-content">
          <div className="video-details-side">
            <div className="know-me-kicker">{youtubeSpotlight.sectionTitle}</div>
            <h3 className="video-main-heading">{youtubeSpotlight.title}</h3>
            <p className="video-main-desc">{youtubeSpotlight.description}</p>
            <div className="video-action-wrap">
              <a 
                href={youtubeSpotlight.videoUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="video-watch-button"
              >
                <YoutubeIcon className="youtube-btn-icon" />
                <span>Watch on YouTube</span>
              </a>
            </div>
          </div>

          {/* Video Player Frame with Embed */}
          <div className="video-player-frame">
            {youtubeSpotlight.videoId || youtubeSpotlight.embedUrl ? (
              <iframe
                src={youtubeSpotlight.embedUrl || `https://www.youtube.com/embed/${youtubeSpotlight.videoId}`}
                title={youtubeSpotlight.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="youtube-iframe"
              />
            ) : (
              <div 
                className="video-placeholder-box"
                onClick={() => {
                  if (youtubeSpotlight.videoUrl) {
                    window.open(youtubeSpotlight.videoUrl, '_blank', 'noopener,noreferrer');
                  }
                }}
              >
                <div className="video-placeholder-grid"></div>
                <div className="video-play-overlay">
                  <div className="play-circle-btn">
                    <PlayIcon />
                  </div>
                  <span className="play-prompt-text">DOCUMENTING COLLEGE LIFE</span>
                  <span className="play-sub-note">Click to watch on YouTube</span>
                </div>
                <div className="video-corner-ticks">
                  <span>+</span><span>+</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

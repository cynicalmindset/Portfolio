import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';
import { 
  PlayIcon, 
  YoutubeIcon
} from './Icons';
import { CursorCard } from './ui/cursor-card';
import { youtubeSpotlight } from '../data';
import bannerMain from '../assets/banner_main.png';

export function About() {
  return (
    <section className="section-block" id="about">
      <SectionHeader 
        num="01" 
        title="How I Build & What I Care About" 
        tag="// 01_ABOUT_ME"
      />

      {/* Technical Bio Statement (Unified Single Description with CursorCard) */}
      <Reveal className="single-bio-card">
        <div className="bio-prompt-symbol">&gt;</div>
        <div className="single-bio-text">
          Computer science undergrad and software engineer interested in understanding systems from first principles and turning ideas into working products. Previously a Frontend SDE Intern at{' '}
          <CursorCard 
            image={bannerMain} 
            description="Ex-Frontend SDE Intern @Workik" 
            href="https://workik.com"
          >
            Workik
          </CursorCard>
          {' '}, currently building and exploring <strong>AI agents, LLM systems, distributed protocols and UIUX Designing</strong>.
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

import { useState } from 'react';
import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';
import { 
  projects, 
  profile, 
  type Project 
} from '../data';
import { 
  ExternalLinkIcon, 
  GithubIcon, 
  PinIcon
} from './Icons';
import { TechIcon } from './TechIcon';

interface FilterTabDef {
  id: string;
  label: string;
  match: (p: Project) => boolean;
}

const FILTER_TABS: FilterTabDef[] = [
  { id: 'All', label: 'All', match: () => true },
  { id: 'Web', label: 'Web', match: (p) => p.category.includes('Web') },
  { id: 'Hardware', label: 'Hardware', match: (p) => p.category.includes('Hardware') || p.category.includes('AI') },
  { id: 'Systems', label: 'Systems', match: (p) => p.category.includes('Protocols') || p.category.includes('Systems') },
  { id: 'Tools', label: 'Tools', match: (p) => p.category.includes('Tools') || p.category.includes('Developer') },
];

function ProjectCard({ project }: { project: Project }) {
  const liveLink = project.rows.find((r) => r.key === 'live:')?.link?.href;
  const srcLink = project.rows.find((r) => r.key === 'src:')?.link?.href || `https://github.com/${profile.githubHandle}`;
  const stackRow = project.rows.find((r) => r.key === 'stack:');
  const stackTags = stackRow?.text ? stackRow.text.split(',').map((t) => t.trim()) : [];

  const isLive = project.status === 'LIVE';
  const primaryHref = liveLink || srcLink;

  return (
    <Reveal className="inspired-project-card" id={`project-${project.id}`}>
      {/* Visual Thumbnail / Preview Container */}
      <a 
        href={primaryHref} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="project-thumb-box"
        aria-label={`Open ${project.name}`}
      >
        {project.thumbnail ? (
          <img 
            src={project.thumbnail} 
            alt={project.name} 
            className="project-thumb-img" 
            loading="lazy"
          />
        ) : (
          <div className="project-thumb-fallback">
            <span className="fallback-sym">{project.sym}</span>
            <span className="fallback-name">{project.name}</span>
          </div>
        )}

        {/* Thumbnail Top-Right Pin / Category Accent */}
        <div className="thumb-top-badge">
          <PinIcon className="thumb-pin-icon" />
        </div>
      </a>

      {/* Project Meta & Information */}
      <div className="project-info-wrap">
        {/* Title & Status Pill Row */}
        <div className="project-title-status-row">
          <h3 className="project-main-title">
            <a href={primaryHref} target="_blank" rel="noopener noreferrer">
              {project.name}
            </a>
          </h3>

          <div className={`project-status-pill ${isLive ? 'live' : 'building'}`}>
            <span className="status-indicator-dot"></span>
            <span>{isLive ? 'Live' : 'Building'}</span>
          </div>
        </div>

        {/* 2-Line High-Clarity Description */}
        <p className="project-summary-text">{project.desc}</p>

        {/* Bottom Row: Tech Icons + Action Link */}
        <div className="project-card-footer-row">
          {/* Tech Stack Icons List */}
          <div className="project-tech-icons-strip" title={stackTags.join(', ')}>
            {stackTags.map((tag) => (
              <span key={tag} className="tech-icon-pill-badge" title={tag}>
                <TechIcon name={tag} size={15} />
              </span>
            ))}
          </div>

          {/* Direct Action Link */}
          <a
            href={primaryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="project-view-link"
          >
            <span>{liveLink ? 'View Project' : 'View Source'}</span>
            <span className="arrow-glyph">↗</span>
          </a>
        </div>
      </div>
    </Reveal>
  );
}

export function Projects() {
  const [selectedCat, setSelectedCat] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 'Web';
    }
    return 'All';
  });

  const activeTabDef = FILTER_TABS.find((t) => t.id === selectedCat) || FILTER_TABS[0];
  const filteredProjects = projects.filter(activeTabDef.match);

  return (
    <section className="section-block" id="projects">
      <SectionHeader 
        num="02" 
        title="Projects" 
        tag="// SELECTED_BUILDS"
      />

      {/* Filter Category Tabs (Single Word, Default Web) */}
      <div className="project-filter-tabs">
        {FILTER_TABS.map((tab) => {
          const count = tab.id === 'All' ? projects.length : projects.filter(tab.match).length;
          return (
            <button
              key={tab.id}
              className={`filter-tab-btn ${selectedCat === tab.id ? 'active' : ''}`}
              onClick={() => setSelectedCat(tab.id)}
            >
              <span className="filter-tab-name">{tab.label}</span>
              <span className="filter-count">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Projects 2-Column Grid with Generous Spacing */}
      <div className="inspired-projects-grid">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* GitHub Repositories Footer CTA */}
      <div className="projects-footer-cta">
        <div className="cta-text">Looking for experimental scripts &amp; historical repositories?</div>
        <a 
          href={profile.githubUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="cta-link-btn"
        >
          <GithubIcon />
          <span>View all 76+ repositories on GitHub</span>
          <ExternalLinkIcon />
        </a>
      </div>
    </section>
  );
}

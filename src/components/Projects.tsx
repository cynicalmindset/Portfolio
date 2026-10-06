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
  TerminalIcon 
} from './Icons';

type FilterCategory = 'ALL' | 'Web & 3D' | 'Hardware & AI' | 'Protocols & Systems' | 'Developer Tools';

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);

  const liveLink = project.rows.find((r) => r.key === 'live:')?.link;
  const srcLink = project.rows.find((r) => r.key === 'src:')?.link;
  const stackRow = project.rows.find((r) => r.key === 'stack:');
  const stackTags = stackRow?.text ? stackRow.text.split(',').map((t) => t.trim()) : [];

  return (
    <Reveal className="actuity-project-card" id={`project-${project.id}`}>
      {/* Top Telemetry Bar */}
      <div className="project-card-head">
        <div className="project-head-left">
          <span className="project-num-tag">{project.number}</span>
          <span className="project-category-tag">{project.category}</span>
        </div>
        <div className="project-head-right">
          <span className={`project-status-chip ${project.status === 'LIVE' ? 'live' : 'wip'}`}>
            <span className="status-dot"></span>
            {project.status}
          </span>
        </div>
      </div>

      <div className="project-card-layout">
        {/* Visual Thumbnail Frame */}
        <div className="project-thumbnail-wrapper">
          {project.thumbnail ? (
            <div className="project-custom-thumb-container">
              <img src={project.thumbnail} alt={project.name} className="project-custom-thumb" />
              <div className="project-thumb-overlay"></div>
              <div className="project-thumb-tech-meta">
                <span className="thumb-dim-tag">ARTIFACT #{project.number}</span>
              </div>
              <div className="blank-thumb-corners">
                <span className="c-corner tl">+</span>
                <span className="c-corner tr">+</span>
                <span className="c-corner bl">+</span>
                <span className="c-corner br">+</span>
              </div>
            </div>
          ) : (
            <div className="project-blank-thumbnail">
              <div className="blank-thumb-grid"></div>
              {/* Animated Blueprint Laser Scanline */}
              <div className="blank-thumb-laser-beam"></div>
              <div className="blank-thumb-radar-circle"></div>

              <div className="blank-thumb-overlay">
                <span className="thumb-sym">{project.sym}</span>
                <span className="thumb-proj-name">{project.name}</span>
                <span className="thumb-dim">16 : 9 // ARTIFACT PREVIEW</span>
              </div>
              <div className="blank-thumb-corners">
                <span className="c-corner tl">+</span>
                <span className="c-corner tr">+</span>
                <span className="c-corner bl">+</span>
                <span className="c-corner br">+</span>
              </div>
            </div>
          )}
        </div>

        {/* Project Details Content */}
        <div className="project-card-body">
          <div className="project-title-row">
            <h3 className="project-name">{project.name}</h3>
            <span className="project-sub-desc">{project.desc}</span>
          </div>

          <p className="project-paragraph">{project.paragraph}</p>

          {/* Technical Specs Rows */}
          <div className="project-specs-mini-table">
            {project.specs.map((sp) => (
              <div key={sp.label} className="mini-spec-row">
                <span className="mini-spec-k">{sp.label}</span>
                <span className="mini-spec-v">{sp.value}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack Pills */}
          <div className="project-stack-pills">
            {stackTags.map((tag) => (
              <span key={tag} className="stack-pill">{tag}</span>
            ))}
          </div>

          {/* Action Links */}
          <div className="project-actions-row">
            {liveLink && (
              <a 
                href={liveLink.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="project-action-btn primary"
              >
                <span>Live Deploy</span>
                <ExternalLinkIcon />
              </a>
            )}

            {srcLink && (
              <a 
                href={srcLink.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="project-action-btn secondary"
              >
                <GithubIcon />
                <span>Source Code</span>
              </a>
            )}

            <button 
              className="project-toggle-specs-btn"
              onClick={() => setExpanded(!expanded)}
            >
              <span>{expanded ? 'Hide Specs' : 'Detailed Specs'}</span>
              <span className="caret">{expanded ? '▴' : '▾'}</span>
            </button>
          </div>

          {/* Expanded Drawer */}
          {expanded && (
            <div className="project-expanded-drawer">
              <div className="drawer-header">
                <TerminalIcon />
                <span>TERMINAL_OUTPUT // {project.name.toUpperCase()}</span>
              </div>
              <div className="drawer-rows">
                {project.rows.map((row) => (
                  <div key={row.key} className="drawer-row-item">
                    <span className="drawer-k">{row.key}</span>
                    {row.link ? (
                      <a href={row.link.href} target="_blank" rel="noopener noreferrer" className="drawer-link">
                        {row.link.label}
                      </a>
                    ) : (
                      <span className="drawer-v">{row.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export function Projects() {
  const [selectedCat, setSelectedCat] = useState<FilterCategory>('ALL');

  const filteredProjects = selectedCat === 'ALL'
    ? projects
    : projects.filter((p) => p.category === selectedCat);

  return (
    <section className="section-block" id="projects">
      <SectionHeader 
        num="02" 
        title="Hardware, Protocols & 3D Applications" 
        tag="// 02_SYSTEMS_CATALOG"
      />

      {/* Filter Category Tabs */}
      <div className="project-filter-tabs">
        {(['ALL', 'Web & 3D', 'Hardware & AI', 'Protocols & Systems', 'Developer Tools'] as FilterCategory[]).map((cat) => (
          <button
            key={cat}
            className={`filter-tab-btn ${selectedCat === cat ? 'active' : ''}`}
            onClick={() => setSelectedCat(cat)}
          >
            {cat}
            <span className="filter-count">
              {cat === 'ALL' ? projects.length : projects.filter((p) => p.category === cat).length}
            </span>
          </button>
        ))}
      </div>

      {/* Projects List */}
      <div className="projects-grid-list">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* GitHub Repository Link Bar */}
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

import { useState } from 'react';
import { Reveal } from './Reveal';
import { projects, profile, type Project } from '../data';

const isDesktop = () => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches;

function ProjectItem({ project }: { project: Project }) {
  const [collapsed, setCollapsed] = useState(() => !isDesktop());

  const stackRow = project.rows.find((row) => row.key === 'stack:');
  const detailRows = project.rows.filter((row) => row !== stackRow);
  const stackTags = stackRow?.text ? stackRow.text.split(',').map((tag) => tag.trim()) : [];

  return (
    <Reveal className={`project${collapsed ? ' collapsed' : ''}`}>
      <div className="row" onClick={() => setCollapsed((c) => !c)}>
        <span className="sym">{project.sym}</span>
        <div className="row-main">
          <div className="row-top">
            <span className="name">{project.name}</span>
            <span className="chev">▾</span>
          </div>
          <span className="desc">{project.desc}</span>
          {stackTags.length > 0 && (
            <div className="row-stack">
              {stackTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="body">
        <p>{project.paragraph}</p>
        <div className="term-block">
          {detailRows.map((row) => (
            <div className="l" key={row.key}>
              <span className="k">{row.key}</span>
              {row.link ? (
                <a className="link" href={row.link.href} target="_blank" rel="noopener noreferrer">
                  {row.link.label}
                </a>
              ) : (
                <span>{row.text}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export function Projects() {
  return (
    <>
      <hr className="divider" />

      <div className="proj-head-row">
        <div className="kicker" id="projects" style={{ marginBottom: 0 }}><span className="chevron">▾</span>projects</div>
        <a className="view-all" href={profile.githubUrl} target="_blank" rel="noopener noreferrer">view all →</a>
      </div>
      <div style={{ height: 14 }} />

      {projects.map((project) => (
        <ProjectItem key={project.name} project={project} />
      ))}
    </>
  );
}

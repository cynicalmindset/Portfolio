import { useState, useRef } from 'react';
import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';
import { stackGroups, timelineMilestones, type TimelineMilestone } from '../data';
import { ExternalLinkIcon, CodeIcon, LayersIcon, SparklesIcon, CpuIcon } from './Icons';
import { TechIcon } from './TechIcon';

export function TechStack() {
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);
  const flowScrollRef = useRef<HTMLDivElement>(null);
  const filteredMilestones = timelineMilestones;

  const getCategoryIcon = (cat: TimelineMilestone['category']) => {
    switch (cat) {
      case 'origin': return <LayersIcon />;
      case 'design': return <LayersIcon />;
      case 'mobile': return <CodeIcon />;
      case 'content': return <SparklesIcon />;
      case 'sde': return <CpuIcon />;
      case 'frontier': return <CpuIcon />;
    }
  };

  const getNodeGlyph = (step: string) => {
    switch (step) {
      case '01': return '✦';
      case '02': return '◈';
      case '03': return '⌥';
      case '04': return '▶';
      case '05': return '⚡';
      case '06': return '◎';
      case '07': return '⚙';
      case '08': return '◆';
      default: return '●';
    }
  };

  const scrollFlow = (direction: 'left' | 'right') => {
    if (flowScrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      flowScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="section-block" id="tech-stack">
      <SectionHeader 
        num="03" 
        title="Evolution, Milestones & Tech Stack" 
        tag="// TOOLCHAIN & STACK"
      />

      {/* Interactive Flowchart Workflow Canvas */}
      <Reveal className="flowchart-canvas-card">
        {/* Flowchart Header Bar & Controls */}
        <div className="flowchart-header-bar">
          <div className="flowchart-header-left">
            <span className="flowchart-live-dot"></span>
            <span className="flowchart-header-title">ENGINEERING TIMELINE &amp; JOURNEY</span>
          </div>

          <div className="flowchart-controls-group">
            <div className="flowchart-scroll-btns">
              <button 
                type="button" 
                className="flow-nav-btn" 
                onClick={() => scrollFlow('left')}
                title="Scroll flowchart left"
                aria-label="Scroll left"
              >
                ◀
              </button>
              <button 
                type="button" 
                className="flow-nav-btn" 
                onClick={() => scrollFlow('right')}
                title="Scroll flowchart right"
                aria-label="Scroll right"
              >
                ▶
              </button>
            </div>
          </div>
        </div>

        {/* Flow Canvas Area with Connected Nodes */}
        <div className="flowchart-canvas-viewport" ref={flowScrollRef}>
          <div className="flowchart-dot-grid"></div>

          <div className="flowchart-track">
            {/* Start Trigger Pill */}
            <div className="flow-start-pill">
              <span className="start-icon">★</span>
              <span className="start-label">START · 2024</span>
              <span className="flow-port port-out"></span>
            </div>

            {/* Start Connector Bridge */}
            <div className="flow-connector-bridge">
              <svg className="connector-svg" viewBox="0 0 54 40" preserveAspectRatio="none">
                <path d="M 0 20 L 54 20" className="connector-path" />
              </svg>
            </div>

            {/* Sequential Flow Nodes */}
            {filteredMilestones.map((m, idx) => {
              const isSelected = selectedMilestone === m.id;
              const hasNext = idx < filteredMilestones.length - 1;

              return (
                <div key={m.id} className="flow-step-wrapper">
                  <div
                    className={`flow-node-card ${m.highlight ? 'featured-node' : ''} ${isSelected ? 'active' : ''}`}
                    onMouseEnter={() => setSelectedMilestone(m.id)}
                    onMouseLeave={() => setSelectedMilestone(null)}
                    onClick={() => setSelectedMilestone(isSelected ? null : m.id)}
                    tabIndex={0}
                    role="button"
                    aria-expanded={isSelected}
                  >
                    {/* Input Port (Left) */}
                    <span className="flow-port port-in"></span>

                    {/* Node Header Row */}
                    <div className="flow-node-header">
                      <div className="node-type-group">
                        <span className="node-glyph">{getNodeGlyph(m.step)}</span>
                        <span className="node-cat-icon">{getCategoryIcon(m.category)}</span>
                        <span className="node-type-name">{m.category.toUpperCase()}</span>
                      </div>
                      <span className="node-step-tag">#{m.step}</span>
                    </div>

                    {/* Node Primary Compact Body */}
                    <div className="flow-node-body">
                      <h3 className="node-title">{m.title}</h3>
                      
                      <div className="node-meta-grid">
                        <div className="node-meta-row">
                          <span className="node-meta-k">Role:</span>
                          <span className="node-meta-v">{m.role}</span>
                        </div>
                        <div className="node-meta-row">
                          <span className="node-meta-k">Period:</span>
                          <span className="node-meta-v">{m.period}</span>
                        </div>
                        {m.org && (
                          <div className="node-meta-row">
                            <span className="node-meta-k">Org:</span>
                            <span className="node-meta-v">{m.org}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Smooth Expandable Drawer (Revealed on Hover) */}
                    <div className="flow-node-drawer">
                      <div className="flow-node-drawer-inner">
                        <div className="drawer-divider"></div>
                        <p className="node-desc">{m.desc}</p>

                        {/* Figma Link if exists */}
                        {m.link && (
                          <div className="node-action-wrap">
                            <a
                              href={m.link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="node-figma-btn"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span>{m.link.label}</span>
                              <ExternalLinkIcon />
                            </a>
                          </div>
                        )}

                        {/* Toolchain Tags */}
                        <div className="node-tags-wrap">
                          {m.tags.map((t) => (
                            <span key={t} className="node-tag-chip">
                              <TechIcon name={t} size={12} />
                              <span>{t}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Output Port (Right) */}
                    <span className="flow-port port-out"></span>
                  </div>

                  {/* Bezier / Linear Connector to Next Node */}
                  {hasNext && (
                    <div className="flow-connector-bridge">
                      <svg className="connector-svg" viewBox="0 0 54 40" preserveAspectRatio="none">
                        <path d="M 0 20 L 54 20" className={`connector-path ${isSelected ? 'active-path' : ''}`} />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}

            {/* End Milestone Pill */}
            <div className="flow-connector-bridge">
              <svg className="connector-svg" viewBox="0 0 54 40" preserveAspectRatio="none">
                <path d="M 0 20 L 54 20" className="connector-path" />
              </svg>
            </div>

            <div className="flow-end-pill">
              <span className="flow-port port-in"></span>
              <span className="end-icon">⚡</span>
              <div className="end-text-col">
                <span className="end-title">ACTIVE HORIZON</span>
                <span className="end-sub">Low-Level Systems &amp; C++</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Categorized Tech Stack Matrix with Hover Synchronization */}
      <div className="stack-categories-grid">
        {stackGroups.map((group) => {
          const isGroupHighlighted = selectedMilestone && (
            (selectedMilestone === 'polymath-systems' && (group.code === '01' || group.code === '04' || group.code === '05')) ||
            (selectedMilestone === 'workik-sde' && (group.code === '01' || group.code === '02' || group.code === '03')) ||
            (selectedMilestone === 'android-dev' && (group.code === '01' || group.code === '02')) ||
            (selectedMilestone === 'neostack-ai' && group.code === '04') ||
            (selectedMilestone === 'tech-society-uiux' && group.code === '02')
          );

          return (
            <Reveal 
              key={group.label} 
              className={`stack-category-card ${isGroupHighlighted ? 'highlighted-group' : ''}`}
            >
              <div className="stack-cat-header">
                <div className="stack-cat-title-group">
                  <span className="cat-code">{group.code}</span>
                  <h4 className="cat-name">{group.label}</h4>
                </div>
                <span className="cat-count">{group.tags.length} TOOLS</span>
              </div>

              <div className="cat-tags-wrap">
                {group.tags.map((tag) => (
                  <span key={tag} className="tech-tag-pill">
                    <TechIcon name={tag} size={13} />
                    <span className="tech-tag-name">{tag}</span>
                  </span>
                ))}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}



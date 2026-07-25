import { Reveal } from './Reveal';
import { stackGroups } from '../data';

export function TechStack() {
  return (
    <>
      <hr className="divider" />
      <div className="kicker" id="tech-stack"><span className="chevron">▾</span>tech stack</div>

      {stackGroups.map((group) => (
        <Reveal className="stack-group" key={group.label}>
          <div className="label">{group.label}</div>
          <div className="stack-tags">
            {group.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </Reveal>
      ))}
    </>
  );
}

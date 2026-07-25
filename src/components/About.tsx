import { Reveal } from './Reveal';
import { socialLinks } from '../data';

export function About() {
  return (
    <>
      <hr className="divider" />

      <div className="kicker" id="about"><span className="chevron">▾</span>about</div>

      <Reveal className="callout">
        <span className="prompt">&gt;</span>
        <span>I'm a <b>CS student</b> who spends most of his time bouncing between hardware, protocols, and web — from an ESP32 talking back through an OLED screen to a browser city built out of GitHub data.</span>
      </Reveal>
      <Reveal className="callout">
        <span className="prompt">&gt;</span>
        <span>I build best <b>from scratch</b> — writing gossip protocols, RAG pipelines, and CLIs by hand instead of copying, because that's where the actual learning happens.</span>
      </Reveal>
      <Reveal className="callout">
        <span className="prompt">&gt;</span>
        <span>Currently working as a <b>Software Engineer at Workik</b>, an AI developer platform — building landing pages and feature pages for complex dev tooling.</span>
      </Reveal>

      <Reveal className="contact-row">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            {...(link.external ? { target: '_blank', rel: 'noopener' } : {})}
          >
            {link.label}
          </a>
        ))}
      </Reveal>
    </>
  );
}

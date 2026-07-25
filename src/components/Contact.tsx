import type { MouseEvent } from 'react';
import { useToast } from '../context/ToastContext';
import { Reveal } from './Reveal';
import { socialLinks, profile } from '../data';

function CopyButton({ text }: { text: string }) {
  const showToast = useToast();

  function handleCopy(e: MouseEvent) {
    e.stopPropagation();
    navigator.clipboard
      ?.writeText(text)
      .then(() => showToast(`copied: ${text}`))
      .catch(() => showToast('copy failed — select manually'));
  }

  return (
    <button className="copy-btn" onClick={handleCopy}>copy</button>
  );
}

export function Contact() {
  return (
    <>
      <hr className="divider" />
      <div className="kicker" id="contact"><span className="chevron">▾</span>contact</div>

      <Reveal className="callout">
        <span className="prompt">&gt;</span>
        <span>Open to <b>collaboration, internships, and interesting problems</b> — hardware, protocols, or otherwise. Reach out through whichever channel you actually check.</span>
      </Reveal>

      <Reveal className="term-block" style={{ marginTop: 14 }}>
        <div className="l"><span className="k">$</span><span>ping yash-g --via</span></div>
        <div className="l">
          <span className="k">→</span>
          <a className="link" href={profile.githubUrl} target="_blank" rel="noopener noreferrer">github.com/{profile.githubHandle}</a>
          <CopyButton text={profile.githubUrl} />
        </div>
        <div className="l">
          <span className="k">→</span>
          <a className="link" href={`mailto:${profile.email}`}>{profile.email}</a>
          <CopyButton text={profile.email} />
        </div>
        <div className="l">
          <span className="k">→</span>
          <a className="link" href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">{profile.linkedinLabel}</a>
          <CopyButton text={profile.linkedinUrl} />
        </div>
      </Reveal>

      <Reveal className="contact-row" style={{ marginTop: 16 }}>
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

      <div className="last-edited"><span className="dot"></span>last edited by {profile.name} · just now</div>
    </>
  );
}

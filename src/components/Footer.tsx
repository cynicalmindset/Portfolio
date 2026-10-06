import { profile } from '../data';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="actuity-site-footer technical-grid-footer">
      <div className="footer-inner-grid-wrap">
        <span className="grid-crosshair corner-tl" aria-hidden="true">+</span>
        <span className="grid-crosshair corner-tr" aria-hidden="true">+</span>

        {/* Top Header Row of Footer */}
        <div className="footer-grid-top-bar">
          <div className="footer-brand-cell">
            <span className="brand-symbol">▲</span>
            <span className="brand-title">{profile.handle}</span>
            <span className="footer-status-pill">
              <span className="live-pulse-dot"></span>
              ALL SYSTEMS NORMAL
            </span>
          </div>
          <div className="footer-top-right-cell">
            <span className="footer-meta-stamp">PROTOCOL // v6.4.2_RELEASE</span>
          </div>
        </div>

        {/* 4-Column Technical Grid */}
        <div className="footer-grid-columns">
          {/* Col 1 */}
          <div className="footer-col-cell">
            <span className="footer-col-header">ECOSYSTEM</span>
            <ul className="footer-col-list">
              <li><span>ESP32-CAM Hardware</span></li>
              <li><span>WebGL / Three.js Runtimes</span></li>
              <li><span>Distributed P2P Protocols</span></li>
              <li><span>C++ Low-Level Systems</span></li>
              <li><span>LLM / AI Integrations</span></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="footer-col-cell">
            <span className="footer-col-header">NAVIGATION</span>
            <ul className="footer-col-list">
              <li><button type="button" onClick={() => scrollTo('hero')}>00. Index / Top</button></li>
              <li><button type="button" onClick={() => scrollTo('about')}>01. About &amp; Bio</button></li>
              <li><button type="button" onClick={() => scrollTo('projects')}>02. Projects</button></li>
              <li><button type="button" onClick={() => scrollTo('tech-stack')}>03. Tech Stack</button></li>
              <li><button type="button" onClick={() => scrollTo('community')}>04. Community</button></li>
              <li><button type="button" onClick={() => scrollTo('contact')}>05. Contact</button></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="footer-col-cell">
            <span className="footer-col-header">CONNECT</span>
            <ul className="footer-col-list">
              <li><a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</a></li>
              <li><a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
              <li><a href={profile.leetcodeUrl} target="_blank" rel="noopener noreferrer">LeetCode ↗</a></li>
              <li><a href={profile.codeforcesUrl} target="_blank" rel="noopener noreferrer">Codeforces ↗</a></li>
              <li><a href="https://elbaf.vercel.app" target="_blank" rel="noopener noreferrer">elbaf.vercel.app ↗</a></li>
              <li><a href={`mailto:${profile.email}`}>Direct Mail ↗</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="footer-col-cell">
            <span className="footer-col-header">TELEMETRY</span>
            <ul className="footer-col-list telemetry-list">
              <li>
                <span className="telem-k">ENGINE</span>
                <span className="telem-v">React 19 / TS</span>
              </li>
              <li>
                <span className="telem-k">STYLE</span>
                <span className="telem-v">Vanilla CSS Matrix</span>
              </li>
              <li>
                <span className="telem-k">REGION</span>
                <span className="telem-v">Bhubaneswar (IST)</span>
              </li>
              <li>
                <span className="telem-k">LATENCY</span>
                <span className="telem-v">&lt; 15ms Edge</span>
              </li>
              <li>
                <span className="telem-k">UPTIME</span>
                <span className="telem-v">99.98%</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Timestamp Bar */}
        <div className="footer-grid-bottom-bar">
          <span className="grid-crosshair corner-bl" aria-hidden="true">+</span>
          <span className="grid-crosshair corner-br" aria-hidden="true">+</span>
          <div className="footer-copy-text">
            <span>© {currentYear} {profile.name} ({profile.handle}). All rights reserved.</span>
          </div>
          <div className="footer-security-text">
            <span>SECURE CRYPTOGRAPHIC HASH: 0x9f4a...2c7e</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useState, useEffect } from 'react';
import { Reveal } from './Reveal';

export function ScrollWarpEnding() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [warpActive, setWarpActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollPercent(Math.round(current));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWarpToTop = () => {
    setWarpActive(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setWarpActive(false);
    }, 1200);
  };

  return (
    <section className="scroll-warp-ending-section" id="transmission-end">
      {/* Dual Kinetic Infinite Marquee */}
      <div className="kinetic-marquee-container" aria-hidden="true">
        <div className="marquee-track track-forward">
          <div className="marquee-content">
            <span>▲ CYNICALMINDSET</span>
            <span className="marquee-sep">✦</span>
            <span>SYSTEMS &amp; DISTRIBUTED ARCHITECT</span>
            <span className="marquee-sep">◈</span>
            <span>ESP32-CAM · 3D WEBGL · C++ RUNTIMES</span>
            <span className="marquee-sep">⚡</span>
            <span>OPEN TO RESEARCH &amp; PRODUCT ENGINEERING</span>
            <span className="marquee-sep">◆</span>
            <span>0x88F2...9BC4</span>
            <span className="marquee-sep">✦</span>
            <span>▲ CYNICALMINDSET</span>
            <span className="marquee-sep">✦</span>
            <span>SYSTEMS &amp; DISTRIBUTED ARCHITECT</span>
            <span className="marquee-sep">◈</span>
            <span>ESP32-CAM · 3D WEBGL · C++ RUNTIMES</span>
            <span className="marquee-sep">⚡</span>
            <span>OPEN TO RESEARCH &amp; PRODUCT ENGINEERING</span>
            <span className="marquee-sep">◆</span>
            <span>0x88F2...9BC4</span>
            <span className="marquee-sep">✦</span>
          </div>
        </div>

        <div className="marquee-track track-reverse">
          <div className="marquee-content reverse">
            <span>LATENCY &lt; 15MS</span>
            <span className="marquee-sep">⚙</span>
            <span>76 PUBLIC REPOS</span>
            <span className="marquee-sep">▶</span>
            <span>29+ MERGED PRS</span>
            <span className="marquee-sep">●</span>
            <span>BHUBANESWAR, INDIA (IST)</span>
            <span className="marquee-sep">✦</span>
            <span>PROTOCOL STATUS: OPTIMAL</span>
            <span className="marquee-sep">⚙</span>
            <span>LATENCY &lt; 15MS</span>
            <span className="marquee-sep">⚙</span>
            <span>76 PUBLIC REPOS</span>
            <span className="marquee-sep">▶</span>
            <span>29+ MERGED PRS</span>
            <span className="marquee-sep">●</span>
            <span>BHUBANESWAR, INDIA (IST)</span>
            <span className="marquee-sep">✦</span>
            <span>PROTOCOL STATUS: OPTIMAL</span>
            <span className="marquee-sep">⚙</span>
          </div>
        </div>
      </div>

      {/* Futuristic Warp & Transmission Complete Module */}
      <Reveal className="warp-terminal-card">
        <span className="grid-crosshair corner-tl">+</span>
        <span className="grid-crosshair corner-tr">+</span>
        <span className="grid-crosshair corner-bl">+</span>
        <span className="grid-crosshair corner-br">+</span>

        {/* Ambient Hologram Grid Vector Frame */}
        <div className="warp-hologram-viewport">
          <div className={`warp-tunnel-grid ${warpActive ? 'hyperdrive' : ''}`}>
            <div className="grid-plane top-plane"></div>
            <div className="grid-plane bottom-plane"></div>
            <div className="warp-core-emitter">
              <span className="emitter-ring ring-1"></span>
              <span className="emitter-ring ring-2"></span>
              <span className="emitter-ring ring-3"></span>
              <span className="emitter-spark">▲</span>
            </div>
          </div>
        </div>

        {/* Transmission Card Content */}
        <div className="warp-card-body">
          <div className="warp-telemetry-badge">
            <span className="telemetry-live-dot"></span>
            <span>END_OF_TRANSMISSION // BUFFER_REACHED</span>
          </div>

          <h3 className="warp-main-heading">
            You've explored the full telemetry buffer.
          </h3>
          <p className="warp-sub-description">
            Ready to collaborate on hardware interfaces, high-throughput systems, or immersive 3D runtimes?
          </p>

          {/* Interactive Metrics Bar */}
          <div className="warp-stats-row">
            <div className="warp-stat-pill">
              <span className="stat-label">BUFFER DEPTH</span>
              <span className="stat-value">{scrollPercent}%</span>
            </div>
            <div className="warp-stat-pill">
              <span className="stat-label">KERNEL STATUS</span>
              <span className="stat-value text-emerald">SYNCED</span>
            </div>
            <div className="warp-stat-pill">
              <span className="stat-label">TIME LOCAL</span>
              <span className="stat-value">IST (UTC+5:30)</span>
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="warp-actions-group">
            <button
              type="button"
              className={`quantum-warp-btn ${warpActive ? 'pulsing' : ''}`}
              onClick={handleWarpToTop}
              title="Smooth Hyperdrive Scroll to Top"
            >
              <span className="warp-btn-glow"></span>
              <span className="warp-btn-icon">▲</span>
              <span className="warp-btn-text">
                {warpActive ? 'HYPERDRIVE ACTIVE...' : 'INITIATE QUANTUM WARP // RETURN TO TOP'}
              </span>
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

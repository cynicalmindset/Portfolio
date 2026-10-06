import { useEffect, useState } from 'react';
import { ToastProvider } from './context/ToastContext';
import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { TechStack } from './components/TechStack';
import { GithubCommunity } from './components/GithubCommunity';
import { Contact } from './components/Contact';
import { ScrollHudGauge } from './components/ScrollHudGauge';
import { CommandPalette } from './components/CommandPalette';
import { MatrixEasterEgg } from './components/MatrixEasterEgg';
import { useScrollSpy } from './hooks/useScrollSpy';

const SECTION_IDS = ['about', 'projects', 'tech-stack', 'community', 'contact'] as const;

function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS);

  // Keyboard shortcut listener
  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(true);
      }
      if (e.key === 'Escape') setPaletteOpen(false);
    }
    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, []);

  // Ambient interactive mouse spotlight & Scroll Laser Bar
  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    }
    function handleScroll() {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      document.documentElement.style.setProperty('--scroll-ratio', ratio.toString());
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ToastProvider>
      <div className="actuity-page-wrapper">
        {/* Ambient Dynamic Background Light & Geometric Accents */}
        <div className="ambient-spotlight-glow" aria-hidden="true" />
        <div className="ambient-floating-grid" aria-hidden="true">
          <span className="float-glyph glyph-1">+</span>
          <span className="float-glyph glyph-2">×</span>
          <span className="float-glyph glyph-3">[·]</span>
          <span className="float-glyph glyph-4">+</span>
          <span className="float-glyph glyph-5">▲</span>
        </div>

        {/* Full-height Structural Grid Guidelines */}
        <div className="structural-grid-lines-overlay" aria-hidden="true">
          <div className="structural-grid-inner-container">
            <div className="structural-col-line col-line-left" />
            <div className="structural-col-line col-line-1" />
            <div className="structural-col-line col-line-2" />
            <div className="structural-col-line col-line-3" />
            <div className="structural-col-line col-line-right" />
          </div>
        </div>

        {/* Top Laser Progress Beam */}
        <div className="top-laser-scroll-track" aria-hidden="true">
          <div className="top-laser-scroll-progress" />
        </div>

        <TopBar 
          activeSection={activeSection ?? 'about'} 
          onOpenPalette={() => setPaletteOpen(true)} 
        />

        <main className="main-content-container">
          <Header />
          <About />
          <Projects />
          <TechStack />
          <GithubCommunity />
          <Contact />
        </main>

        
        <ScrollHudGauge />
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <MatrixEasterEgg />
    </ToastProvider>
  );
}

export default App;

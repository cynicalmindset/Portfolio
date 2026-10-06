import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { TechStack } from './components/TechStack';
import { GithubCommunity } from './components/GithubCommunity';
import { BooksLibrary } from './components/BooksLibrary';
import { Contact } from './components/Contact';
import { ScrollHudGauge } from './components/ScrollHudGauge';
import { CommandPalette } from './components/CommandPalette';
import { MatrixEasterEgg } from './components/MatrixEasterEgg';
import { useScrollSpy } from './hooks/useScrollSpy';

const SECTION_IDS = ['about', 'projects', 'tech-stack', 'community', 'books', 'contact'] as const;

function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS);

  // Buttery-smooth inertial scroll engine via Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite: false,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Sync scroll laser & progress ratio
    const unbind = lenis.on('scroll', (e: { scroll: number; limit: number }) => {
      const ratio = e.limit > 0 ? Math.min(1, Math.max(0, e.scroll / e.limit)) : 0;
      document.documentElement.style.setProperty('--scroll-ratio', ratio.toString());
    });

    // Smooth anchor navigation handling
    function handleAnchorClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
          const targetEl = document.querySelector(href);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl as HTMLElement, { offset: -50, duration: 1.3 });
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      unbind();
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, []);

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

  // Ambient interactive mouse spotlight
  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <ThemeProvider>
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
            <BooksLibrary />
            <Contact />
          </main>

          
          <ScrollHudGauge />
        </div>

        <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
        <MatrixEasterEgg />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;

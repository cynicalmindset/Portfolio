import { useEffect, useState } from 'react';
import { ToastProvider } from './context/ToastContext';
import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { TechStack } from './components/TechStack';
import { GithubActivity } from './components/GithubActivity';
import { ActivityFeed } from './components/ActivityFeed';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { MatrixEasterEgg } from './components/MatrixEasterEgg';
import { useScrollSpy } from './hooks/useScrollSpy';

const SECTION_IDS = ['about', 'projects', 'tech-stack', 'github-activity', 'recent-activity', 'contact'] as const;

function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(true);
      }
      if (e.key === 'Escape') setPaletteOpen(false);
    }
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, []);

  return (
    <ToastProvider>
      <TopBar activeSection={(activeSection ?? 'about').replace('-', ' ')} onOpenPalette={() => setPaletteOpen(true)} />

      <div className="wrap">
        <Header />
        <About />
        <Projects />
        <TechStack />
        <GithubActivity />
        <ActivityFeed />
        <Contact />
        <Footer />
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <MatrixEasterEgg />
    </ToastProvider>
  );
}

export default App;

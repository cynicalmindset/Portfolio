import { useEffect, useRef, useState } from 'react';

export function useScrollSpy(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    function update() {
      const topbar = document.querySelector('.topbar');
      const offset = (topbar instanceof HTMLElement ? topbar.offsetHeight : 0) + 8;

      let current = elements[0].id;
      for (const el of elements) {
        if (el.getBoundingClientRect().top - offset <= 0) {
          current = el.id;
        }
      }
      setActive(current);
      ticking.current = false;
    }

    function onScroll() {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids]);

  return active;
}

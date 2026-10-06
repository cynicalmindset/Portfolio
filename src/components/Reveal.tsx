import { useEffect, useRef, useState, type ReactNode, type ElementType, type ComponentPropsWithoutRef } from 'react';

type RevealProps<T extends ElementType = 'div'> = {
  children: ReactNode;
  as?: T;
} & ComponentPropsWithoutRef<T>;

export function Reveal<T extends ElementType = 'div'>({
  children,
  as,
  className = '',
  style,
  id,
  ...rest
}: RevealProps<T>) {
  const Tag = (as || 'div') as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: '120px 0px 120px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} id={id} className={`reveal${inView ? ' in-view' : ''}${className ? ` ${className}` : ''}`} style={style} {...rest}>
      {children}
    </Tag>
  );
}


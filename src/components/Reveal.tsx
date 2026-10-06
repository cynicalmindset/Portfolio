import { useEffect, useRef, useState, type ReactNode, type ElementType, type ComponentPropsWithoutRef } from 'react';

type RevealProps<T extends ElementType = 'div'> = {
  children: ReactNode;
  as?: T;
  delay?: number; // Delay in seconds (e.g. 0.1, 0.2)
  threshold?: number;
  rootMargin?: string;
} & ComponentPropsWithoutRef<T>;

export function Reveal<T extends ElementType = 'div'>({
  children,
  as,
  className = '',
  style,
  id,
  delay = 0,
  threshold = 0.08,
  rootMargin = '0px 0px -40px 0px',
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
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  const customStyle = {
    ...style,
    ...(delay > 0 ? { transitionDelay: `${delay}s` } : {}),
  };

  return (
    <Tag 
      ref={ref} 
      id={id} 
      className={`reveal${inView ? ' in-view' : ''}${className ? ` ${className}` : ''}`} 
      style={customStyle} 
      {...rest}
    >
      {children}
    </Tag>
  );
}


import { useEffect, useRef } from 'react';
import { useToast } from '../context/ToastContext';
import { profile } from '../data';

const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export function MatrixEasterEgg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const showToast = useToast();

  useEffect(() => {
    // console easter egg
    console.log(
      `%c${profile.name}%c — if you're reading this, you already know how to inspect a page.\ntry the konami code: ↑ ↑ ↓ ↓ ← → ← → B A`,
      'color:#4fd88a;font-family:monospace;font-size:14px;font-weight:bold;',
      'color:#9b9b9b;font-family:monospace;font-size:12px;'
    );
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let konamiPos = 0;

    function runMatrixRain() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.classList.add('show');
      const chars = '01アイウエオカキクケコサシスセソ<>/_$#';
      const fontSize = 15;
      const columns = Math.floor(canvas.width / fontSize);
      const drops = new Array(columns).fill(1);
      let frames = 0;
      const maxFrames = 160;

      function draw() {
        if (!ctx || !canvas) return;
        ctx.fillStyle = 'rgba(25,25,25,0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#4fd88a';
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
          drops[i]++;
        }
        frames++;
        if (frames < maxFrames) {
          requestAnimationFrame(draw);
        } else {
          canvas.classList.remove('show');
          setTimeout(() => ctx.clearRect(0, 0, canvas.width, canvas.height), 400);
        }
      }
      draw();
    }

    function onKeydown(e: KeyboardEvent) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      konamiPos = key === konami[konamiPos] ? konamiPos + 1 : 0;
      if (konamiPos === konami.length) {
        konamiPos = 0;
        showToast('konami accepted — welcome to the mainframe');
        if (!reduceMotion) runMatrixRain();
      }
    }

    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, [showToast]);

  return <canvas className="matrix-overlay" ref={canvasRef} />;
}

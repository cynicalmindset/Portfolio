import type { SVGProps } from 'react';

type TechIconProps = SVGProps<SVGSVGElement> & {
  name: string;
  className?: string;
  size?: number;
};

export function TechIcon({ name, className = '', size = 14, ...props }: TechIconProps) {
  const norm = name.toLowerCase().trim();

  // React & React Native & React Three Fiber
  if (norm.includes('react') || norm.includes('fiber')) {
    return (
      <svg width={size} height={size} viewBox="-11.5 -10.232 23 20.463" fill="none" stroke="#00d8ff" strokeWidth="1.2" className={`tech-svg-icon ${className}`} {...props}>
        <circle cx="0" cy="0" r="2.05" fill="#00d8ff" />
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </svg>
    );
  }

  // Next.js
  if (norm.includes('next')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={`tech-svg-icon ${className}`} {...props}>
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.6 17.5l-6.9-9.8v9.8H9.3V6.5h1.4l6.9 9.8V6.5h1.4v11h-1.4z" />
      </svg>
    );
  }

  // TypeScript
  if (norm.includes('typescript') || norm === 'ts') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`tech-svg-icon ${className}`} {...props}>
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M11 9H6V11H7.5V18H9.5V11H11V9Z" fill="#ffffff" />
        <path d="M14.5 14C14.5 14 15.5 14.5 16.5 14.5C17.5 14.5 18 14 18 13.5C18 12.5 15.5 12.5 15.5 10.5C15.5 9 17 8.5 18 8.5C19 8.5 20 9 20 9L19.5 10.5C19.5 10.5 18.5 10 18 10C17.5 10 17 10.2 17 10.7C17 11.5 19.5 11.5 19.5 13.5C19.5 15.5 18 16 16.5 16C15 16 14 15.2 14 15.2L14.5 14Z" fill="#ffffff" />
      </svg>
    );
  }

  // JavaScript
  if (norm.includes('javascript') || norm === 'js') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`tech-svg-icon ${className}`} {...props}>
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path d="M7 16C7.5 17 8.5 17.5 9.5 17.5C11 17.5 11.8 16.5 11.8 15V10H10V15C10 15.6 9.5 16 9 16C8.5 16 8 15.5 7.8 15L7 16Z" fill="#000000" />
        <path d="M14 16.5C14.8 17.2 16 17.5 17 17.5C18.8 17.5 20 16.5 20 15C20 13.5 18.8 13 17.5 12.5C16.5 12.1 15.8 11.8 15.8 11.2C15.8 10.6 16.3 10.2 17 10.2C17.6 10.2 18.2 10.5 18.7 11L19.5 9.8C18.8 9.2 17.9 9 17 9C15.3 9 14.2 10 14.2 11.4C14.2 12.8 15.2 13.4 16.5 13.9C17.5 14.3 18.2 14.7 18.2 15.4C18.2 16.1 17.5 16.5 16.8 16.5C15.8 16.5 15 15.8 14.5 15.2L14 16.5Z" fill="#000000" />
      </svg>
    );
  }

  // Python
  if (norm.includes('python')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`tech-svg-icon ${className}`} {...props}>
        <path d="M11.9 2C8.7 2 8.9 3.4 8.9 3.4L8.9 4.8H12.1V5.3H5.8C3.7 5.3 2 6.8 2 9.5C2 12.3 3.3 13.4 5.2 13.4H6.5V11.8C6.5 9.9 8.2 8.3 10.1 8.3H13.8C14.9 8.3 15.8 7.3 15.8 6.2V3.4C15.8 2 13.8 2 11.9 2ZM10.5 3.3C10.9 3.3 11.2 3.6 11.2 4C11.2 4.4 10.9 4.7 10.5 4.7C10.1 4.7 9.8 4.4 9.8 4C9.8 3.6 10.1 3.3 10.5 3.3Z" fill="#3776AB" />
        <path d="M12.1 22C15.3 22 15.1 20.6 15.1 20.6L15.1 19.2H11.9V18.7H18.2C20.3 18.7 22 17.2 22 14.5C22 11.7 20.7 10.6 18.8 10.6H17.5V12.2C17.5 14.1 15.8 15.7 13.9 15.7H10.2C9.1 15.7 8.2 16.7 8.2 17.8V20.6C8.2 22 10.2 22 12.1 22ZM13.5 20.7C13.1 20.7 12.8 20.4 12.8 20C12.8 19.6 13.1 19.3 13.5 19.3C13.9 19.3 14.2 19.6 14.2 20C14.2 20.4 13.9 20.7 13.5 20.7Z" fill="#FFD43B" />
      </svg>
    );
  }

  // C++
  if (norm.includes('c++') || norm === 'cpp') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`tech-svg-icon ${className}`} {...props}>
        <rect width="24" height="24" rx="4" fill="#00599C" />
        <path d="M10 7C7.5 7 6 8.8 6 12C6 15.2 7.5 17 10 17C11.5 17 12.5 16.2 13 15.2L11.5 14.2C11.2 14.7 10.7 15.2 10 15.2C8.8 15.2 8 13.8 8 12C8 10.2 8.8 8.8 10 8.8C10.7 8.8 11.2 9.3 11.5 9.8L13 8.8C12.5 7.8 11.5 7 10 7Z" fill="#ffffff" />
        <path d="M14.5 11.3V12.7H15.8V14H17.2V12.7H18.5V11.3H17.2V10H15.8V11.3H14.5Z" fill="#ffffff" />
        <path d="M19 11.3V12.7H20.3V14H21.7V12.7H23V11.3H21.7V10H20.3V11.3H19Z" fill="#ffffff" />
      </svg>
    );
  }

  // Kotlin
  if (norm.includes('kotlin')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`tech-svg-icon ${className}`} {...props}>
        <path d="M22 2H2V22H22L12 12L22 2Z" fill="#7F52FF" />
      </svg>
    );
  }

  // Three.js / 3D
  if (norm.includes('three') || norm.includes('3d')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`tech-svg-icon ${className}`} {...props}>
        <polygon points="12 2 22 8 22 16 12 22 2 16 2 8" />
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="2" y1="8" x2="22" y2="16" />
        <line x1="22" y1="8" x2="2" y2="16" />
      </svg>
    );
  }

  // Tailwind CSS
  if (norm.includes('tailwind')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#38BDF8" className={`tech-svg-icon ${className}`} {...props}>
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
      </svg>
    );
  }

  // Node.js
  if (norm.includes('node')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#339933" className={`tech-svg-icon ${className}`} {...props}>
        <path d="M12 2L2 7.8v11.6L12 22l10-5.8V7.8L12 2zm-1 16.5l-6-3.5V9.4l6 3.5v5.6zm2 0v-5.6l6-3.5v5.6l-6 3.5z" />
      </svg>
    );
  }

  // Supabase
  if (norm.includes('supabase')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#3ECF8E" className={`tech-svg-icon ${className}`} {...props}>
        <path d="M11.9 1.5c.3 0 .6.2.7.5l4 9c.2.4-.1.8-.5.8h-4.8l4.4 10.3c.2.4-.2.8-.6.6l-9.8-10c-.3-.3-.1-.9.3-.9h4.8L6.7 2.1c-.2-.4.1-.6.4-.6h4.8z" />
      </svg>
    );
  }

  // Prisma
  if (norm.includes('prisma')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`tech-svg-icon ${className}`} {...props}>
        <path d="M12 2L3 19h18L12 2z" />
        <path d="M12 2v17" />
      </svg>
    );
  }

  // SQL & Databases
  if (norm.includes('sql') || norm.includes('database')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`tech-svg-icon ${className}`} {...props}>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    );
  }

  // Git & GitHub
  if (norm.includes('git')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#F05032" className={`tech-svg-icon ${className}`} {...props}>
        <path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L8.8 4.6l2.7 2.7c.6-.2 1.3-.1 1.8.4.5.5.6 1.2.4 1.8l2.6 2.6c.6-.2 1.3-.1 1.8.4.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0-.5-.5-.6-1.3-.4-1.8l-2.4-2.4v5.3c.2.2.3.4.3.7 0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8c0-.7.4-1.3 1-1.6V8.9c-.6-.3-1-.9-1-1.6 0-.3.1-.5.2-.7L4.6 8.8c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l6.4-6.4c.6-.6.6-1.5 0-2.1z" />
      </svg>
    );
  }

  // Vercel
  if (norm.includes('vercel')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={`tech-svg-icon ${className}`} {...props}>
        <path d="M12 1L24 22H0L12 1Z" />
      </svg>
    );
  }

  // Vite
  if (norm.includes('vite')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`tech-svg-icon ${className}`} {...props}>
        <path d="M21.4 3.7L12.5 21.6c-.2.4-.7.4-.9 0L2.6 3.7c-.2-.4.1-.8.5-.7l8.6 2 8.8-2c.4-.1.7.3.5.7z" fill="#646CFF" />
        <path d="M14.5 2.5L7.2 12.8h4.3L9.7 19.5l7.5-11.2h-4.3l1.6-5.8z" fill="#FFD62E" />
      </svg>
    );
  }

  // AI / Gemini / Groq / Qwen / Ollama / LangChain / RAG
  if (norm.includes('ai') || norm.includes('gemini') || norm.includes('groq') || norm.includes('ollama') || norm.includes('langchain') || norm.includes('rag') || norm.includes('qwen')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.8" className={`tech-svg-icon ${className}`} {...props}>
        <path d="M12 2L14.5 8.5L21 11L14.5 13.5L12 20L9.5 13.5L3 11L9.5 8.5L12 2Z" fill="rgba(139, 92, 246, 0.18)" />
      </svg>
    );
  }

  // Hardware / ESP32 / Bluetooth / Protocols
  if (norm.includes('esp32') || norm.includes('hardware') || norm.includes('oled') || norm.includes('bluetooth') || norm.includes('ble') || norm.includes('gatt') || norm.includes('crypto')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.8" className={`tech-svg-icon ${className}`} {...props}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="15" x2="4" y2="15" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="15" x2="23" y2="15" />
      </svg>
    );
  }

  // Framer Motion
  if (norm.includes('framer') || norm.includes('motion')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={`tech-svg-icon ${className}`} {...props}>
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    );
  }

  // Expo
  if (norm.includes('expo')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={`tech-svg-icon ${className}`} {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z" />
      </svg>
    );
  }

  // Better Auth / Security
  if (norm.includes('auth')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`tech-svg-icon ${className}`} {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  }

  // Default Code/Tool Icon
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`tech-svg-icon ${className}`} {...props}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

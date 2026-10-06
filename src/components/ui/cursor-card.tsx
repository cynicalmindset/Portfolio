import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export interface CursorCardProps {
  children: React.ReactNode;
  image: string;
  description: string;
  href?: string;
  className?: string;
}

export function CursorCard({
  children,
  image,
  description,
  href = "#",
  className = "",
}: CursorCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const targetCoords = useRef({ x: 0, y: 0 });
  const currentCoords = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isHovered) return;

    const animate = () => {
      currentCoords.current.x += (targetCoords.current.x - currentCoords.current.x) * 0.18;
      currentCoords.current.y += (targetCoords.current.y - currentCoords.current.y) * 0.18;
      setCoords({ x: currentCoords.current.x, y: currentCoords.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isHovered]);

  const handleMouseEnter = (e: React.MouseEvent) => {
    const posX = e.clientX - 110;
    const posY = e.clientY - 160;
    targetCoords.current = { x: posX, y: posY };
    currentCoords.current = { x: posX, y: posY };
    setCoords({ x: posX, y: posY });
    setIsHovered(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    targetCoords.current = {
      x: e.clientX - 110,
      y: e.clientY - 160,
    };
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <a
        href={href}
        className={`cursor-card-trigger ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>

      {mounted &&
        createPortal(
          <div
            className={`cursor-card-floating-container ${isHovered ? "active" : ""}`}
            style={{
              transform: `translate3d(${coords.x}px, ${coords.y}px, 0)`,
            }}
            aria-hidden="true"
          >
            <div className="cursor-card-inner">
              <div className="cursor-card-img-wrap">
                <img src={image} alt={description} className="cursor-card-img" />
              </div>
              {description && (
                <div className="cursor-card-desc-wrap">
                  <span className="cursor-card-desc-text">{description}</span>
                  <span className="cursor-card-badge">PREVIEW ↗</span>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

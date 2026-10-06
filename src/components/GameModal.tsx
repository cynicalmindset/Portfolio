import { useEffect } from 'react';

export function GameModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('keydown', handleKeyDown, true);

    // Prevent body scrolling while game is active
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('keydown', handleKeyDown, true);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="game-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="game-modal-dialog">
        {/* Header Telemetry Bar */}
        <div className="game-modal-header">
          <div className="game-modal-title-group">
            <span className="game-dot-live"></span>
            <span className="game-modal-title">portfolio_game.exe</span>
            <span className="game-engine-tag">GODOT HTML5</span>
          </div>
          
          <button 
            type="button"
            className="game-modal-close-btn" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close Game"
          >
            <span className="close-x">✕</span>
            <span>CLOSE [ESC]</span>
          </button>
        </div>

        {/* Game Iframe Frame */}
        <div className="game-iframe-wrapper">
          <iframe
            src="/game/portfolio_game.html"
            title="portfolio_game"
            allow="autoplay; fullscreen; gamepad"
            allowFullScreen
            className="game-iframe-element"
          />
        </div>

        {/* Game Footer Controls Guide */}
        <div className="game-modal-footer">
          <span>Controls: WASD / Arrow Keys to move · Space to Jump · Click Close or press ESC to exit</span>
        </div>
      </div>
    </div>
  );
}

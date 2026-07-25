import { useEffect } from 'react';

export function GameModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    function onKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, [open, onClose]);

  return (
    <div
      className={`modal-backdrop game-backdrop${open ? ' open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="game-modal">
        <div className="head">
          <span>portfolio_game.exe</span>
          <button className="close-btn" onClick={onClose}>esc to close</button>
        </div>
        <div className="game-frame-wrap">
          {open && (
            <iframe
              src="/game/portfolio_game.html"
              title="portfolio_game"
              allow="autoplay; fullscreen; gamepad"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </div>
  );
}

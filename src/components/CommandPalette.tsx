import { useState, useEffect, useRef } from 'react';
import { commandPaletteItems } from '../data';
import { TerminalIcon } from './Icons';
import { useToast } from '../context/ToastContext';

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const showToast = useToast();

  const filteredItems = commandPaletteItems.filter(
    (item) =>
      item.cmd.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const handleSelect = (item: typeof commandPaletteItems[0]) => {
    onClose();
    if (item.action.startsWith('#')) {
      const el = document.getElementById(item.action.replace('#', ''));
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (item.action.startsWith('http')) {
      window.open(item.action, '_blank', 'noopener,noreferrer');
    } else if (item.action === 'game') {
      const gameFrame = document.querySelector('.game-launch-frame') as HTMLElement;
      gameFrame?.click();
    } else {
      showToast(`Executed: ${item.cmd}`);
    }
  };

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex]);
        }
      }
    }
    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, [open, filteredItems, selectedIndex]);

  if (!open) return null;

  return (
    <div
      className="modal-backdrop open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="actuity-cmdk-modal">
        <div className="cmdk-input-row">
          <TerminalIcon className="cmdk-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="cmdk-text-input"
            placeholder="Type a command or jump to section..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <span className="cmdk-badge-esc" onClick={onClose}>ESC</span>
        </div>

        <div className="cmdk-results-list">
          {filteredItems.length === 0 ? (
            <div className="cmdk-empty-state">No matching commands found.</div>
          ) : (
            filteredItems.map((item, index) => (
              <div
                key={item.cmd}
                className={`cmdk-item-row ${index === selectedIndex ? 'selected' : ''}`}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="cmdk-item-left">
                  <span className="cmdk-prompt">$</span>
                  <div className="cmdk-text-col">
                    <span className="cmdk-cmd-name">{item.cmd}</span>
                    <span className="cmdk-cmd-desc">{item.desc}</span>
                  </div>
                </div>
                <span className="cmdk-enter-key">↵</span>
              </div>
            ))
          )}
        </div>

        <div className="cmdk-footer">
          <span>Use ↑ ↓ to navigate · ↵ to select · ESC to close</span>
        </div>
      </div>
    </div>
  );
}

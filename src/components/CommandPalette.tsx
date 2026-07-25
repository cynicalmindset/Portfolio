import { commandPaletteItems } from '../data';

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={`modal-backdrop${open ? ' open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="cmdk-modal">
        <div className="head"><span>command palette</span><span>esc to close</span></div>
        <ul>
          {commandPaletteItems.map((item) => (
            <li key={item}><span>$</span>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

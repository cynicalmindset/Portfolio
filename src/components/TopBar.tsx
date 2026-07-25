import { FolderIcon } from './Icons';

export function TopBar({
  activeSection,
  onOpenPalette,
}: {
  activeSection: string;
  onOpenPalette: () => void;
}) {
  return (
    <div className="topbar">
      <div className="inner">
        <div className="crumbs">
          <FolderIcon />
          workspace <span className="sep">/</span> <b>{activeSection}</b>
        </div>
        <div className="cmdk" onClick={onOpenPalette}>⌘ K</div>
      </div>
    </div>
  );
}

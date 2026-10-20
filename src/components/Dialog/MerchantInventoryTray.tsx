import React from 'react';
import previewimg from '../../assets/skills/preview.webp';
import { Item } from '../../types';

interface MerchantInventoryTrayProps {
  inventory: Array<Item>;
  onPreview: (item: Item) => void;
}

export const MerchantInventoryTray: React.FC<MerchantInventoryTrayProps> = ({
  inventory,
  onPreview,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 p-3 bg-stone-900/80 border border-stone-800 rounded-lg w-full max-h-48 overflow-y-auto">
      {inventory.map((item) => (
        <div
          key={item.name}
          className="relative flex items-center justify-center p-1.5 bg-stone-950/90 border border-stone-700/80 rounded-md hover:border-amber-500/80 transition-all group"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-12 h-12 object-contain group-hover:scale-105 transition-transform"
          />

          <button
            type="button"
            title="Inspect item"
            onClick={() => onPreview(item)}
            className="absolute -top-1.5 -right-1.5 p-0.5 bg-stone-800 hover:bg-stone-700 border border-stone-600 rounded-full transition-colors cursor-pointer shadow"
          >
            <img src={previewimg} alt="Preview" className="w-4 h-4 object-contain" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default MerchantInventoryTray;

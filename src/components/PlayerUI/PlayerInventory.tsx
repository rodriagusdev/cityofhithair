import React from 'react';
import { Item } from '../../types';

interface PlayerInventoryProps {
  inventory: Array<Item>;
}

export const PlayerInventory: React.FC<PlayerInventoryProps> = ({ inventory }) => {
  const sortedInventory = [...inventory].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between pb-1 mb-1 border-b border-stone-800">
        <span className="font-cinzel text-[10px] font-bold tracking-widest text-stone-400 uppercase">
          Inventory
        </span>
        <span className="text-[10px] text-stone-500">
          {sortedInventory.length} items
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-start gap-1 p-1 min-h-[42px] max-h-20 bg-stone-950/85 border border-stone-800/80 rounded-lg overflow-y-auto custom-scrollbar">
        {sortedInventory.length === 0 ? (
          <span className="text-[10px] text-stone-600 italic px-2 py-1">Inventory is empty</span>
        ) : (
          sortedInventory.map((item: Item, index: number) => (
            <button
              key={`${item.name}-${index}`}
              type="button"
              onClick={item.fn}
              title={`${item.name} — Click to use`}
              className="p-0.5 rounded-md bg-stone-900/90 border border-stone-700/80 hover:border-red-800 hover:bg-stone-850 transition-all cursor-pointer shadow-sm group shrink-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-7 h-7 object-contain group-hover:scale-105 transition-transform"
              />
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default PlayerInventory;

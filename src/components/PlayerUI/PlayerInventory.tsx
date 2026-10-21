import React from 'react';
import { Item } from '../../types';
import { usePlayerStore } from '../../stores';
import { formatStatModifiers } from '../../features/items';

interface PlayerInventoryProps {
  inventory: Array<Item>;
}

export const PlayerInventory: React.FC<PlayerInventoryProps> = ({ inventory }) => {
  const toggleEquipItem = usePlayerStore((state) => state.toggleEquipItem);

  const getItemTooltip = (item: Item): string => {
    const parts = [item.name];
    if (item.slot) parts.push(`[${item.slot.toUpperCase()}]`);
    if (item.isEquipped) parts.push('(EQUIPPED)');
    const mods = formatStatModifiers(item.statModifiers);
    if (mods.length > 0) parts.push(mods.join(', '));
    if (item.grantedSpellNames?.length) {
      parts.push(`Spells: ${item.grantedSpellNames.join(', ')}`);
    }
    if (item.grantedSkills?.length) {
      parts.push(`Spells: ${item.grantedSkills.map((s) => s.name).join(', ')}`);
    }
    if (item.description) parts.push(item.description);
    return parts.join(' — ');
  };

  const handleItemClick = (item: Item, index: number) => {
    if (item.fn) {
      item.fn();
    }
    if (item.slot || item.statModifiers || item.grantedSkills || item.grantedSpellNames) {
      toggleEquipItem(index);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between pb-1 mb-1 border-b border-stone-800">
        <span className="font-cinzel text-[10px] font-bold tracking-widest text-stone-400 uppercase">
          Inventory
        </span>
        <span className="text-[10px] text-stone-500">
          {inventory.length} items
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-start gap-1 p-1 min-h-[42px] max-h-20 bg-stone-950/85 border border-stone-800/80 rounded-lg overflow-y-auto custom-scrollbar">
        {inventory.length === 0 ? (
          <span className="text-[10px] text-stone-600 italic px-2 py-1">Inventory is empty</span>
        ) : (
          inventory.map((item: Item, index: number) => {
            const isEquippable = Boolean(
              item.slot || item.statModifiers || item.grantedSkills || item.grantedSpellNames
            );

            return (
              <button
                key={`${item.name}-${index}`}
                type="button"
                onClick={() => handleItemClick(item, index)}
                title={getItemTooltip(item)}
                className={`relative p-0.5 rounded-md bg-stone-900/90 border transition-all cursor-pointer shadow-sm group shrink-0 ${
                  item.isEquipped
                    ? 'border-cyan-400 ring-2 ring-cyan-400/50 bg-stone-850'
                    : isEquippable
                      ? 'border-amber-700/80 hover:border-amber-400 hover:bg-stone-850'
                      : 'border-stone-700/80 hover:border-red-800 hover:bg-stone-850'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-7 h-7 object-contain group-hover:scale-105 transition-transform"
                />
                {item.isEquipped && (
                  <span className="absolute -top-1 -right-1 px-1 bg-cyan-950 border border-cyan-400 text-[8px] font-cinzel font-bold text-cyan-300 rounded shadow">
                    E
                  </span>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PlayerInventory;

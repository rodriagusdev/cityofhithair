import React from 'react';
import { Item } from '../../types';
import { usePlayerStore } from '../../stores';
import { formatStatModifiers } from '../../features/items';
import InventorySlot from './InventorySlot';

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

      <div className="flex flex-wrap items-center justify-start gap-1.5 px-3.5 py-2 min-h-[42px] max-h-24 bg-stone-950/85 border border-stone-800/80 rounded-lg overflow-y-auto overflow-x-hidden custom-scrollbar">
        {inventory.length === 0 ? (
          <span className="text-[10px] text-stone-600 italic px-2 py-1">Inventory is empty</span>
        ) : (
          inventory.map((item: Item, index: number) => (
            <InventorySlot
              key={`${item.name}-${index}`}
              item={item}
              index={index}
              tooltip={getItemTooltip(item)}
              onClick={handleItemClick}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PlayerInventory;

import React from 'react';
import { Item } from '../../types';

interface InventorySlotProps {
  item: Item;
  index: number;
  tooltip: string;
  onClick: (item: Item, index: number) => void;
}

export const InventorySlot: React.FC<InventorySlotProps> = ({
  item,
  index,
  tooltip,
  onClick,
}) => {
  const isEquippable = Boolean(
    item.slot || item.statModifiers || item.grantedSkills || item.grantedSpellNames
  );

  return (
    <button
      type="button"
      onClick={() => onClick(item, index)}
      title={tooltip}
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
};

export default InventorySlot;

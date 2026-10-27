import React from 'react';
import { ItemLoot } from '../../types';

interface LootItemCardProps {
  loot: ItemLoot;
}

export const LootItemCard: React.FC<LootItemCardProps> = ({ loot }) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <img
        src={loot.image}
        alt={loot.name}
        className="w-12 h-12 object-contain p-1.5 bg-stone-950 border border-stone-700 rounded-lg shadow"
      />
      <p className="text-xs text-stone-300 font-semibold">{loot.name}</p>
    </div>
  );
};

export default LootItemCard;

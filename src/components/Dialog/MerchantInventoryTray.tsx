import React from 'react';
import { Item } from '../../types';
import MerchantItemCard from './MerchantItemCard';

interface MerchantInventoryTrayProps {
  inventory: Array<Item>;
  onPreview: (item: Item) => void;
}

export const MerchantInventoryTray: React.FC<MerchantInventoryTrayProps> = ({
  inventory,
  onPreview,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 p-3.5 bg-stone-900/80 border border-stone-800 rounded-lg w-full max-h-48 overflow-y-auto overflow-x-hidden">
      {inventory.map((item) => (
        <MerchantItemCard key={item.name} item={item} onPreview={onPreview} />
      ))}
    </div>
  );
};

export default MerchantInventoryTray;

import React from 'react';
import { Player } from '../../types';
import { Bar } from '../Bar';

interface PlayerVitalsProps {
  player: Player;
}

export const PlayerVitals: React.FC<PlayerVitalsProps> = ({ player }) => {
  return (
    <div className="flex items-center gap-3 w-full">
      {/* Hero Portrait */}
      <div className="relative group shrink-0">
        <img
          src={player.portrait}
          alt={player.name}
          className="w-16 h-20 sm:w-20 sm:h-24 object-cover rounded-lg border-2 border-stone-700 bg-stone-950 p-0.5 shadow-md transition-transform duration-300 group-hover:border-red-700/80"
        />
        <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-stone-950/50 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Hero Name & Health/Mana Bars */}
      <div className="flex flex-col flex-1 min-w-0 justify-center">
        <h4 className="font-cinzel text-xs sm:text-sm font-bold tracking-wider text-white uppercase drop-shadow truncate mb-1">
          {player.name}
        </h4>
        <div className="flex flex-col gap-1 w-full">
          <Bar
            type="health"
            value={player.health}
            maxValue={player.maxHealth}
            className="!w-full !h-5 !my-0 !mx-0"
          />
          <Bar
            type="mana"
            value={player.magic}
            maxValue={player.maxMagic}
            className="!w-full !h-5 !my-0 !mx-0"
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerVitals;

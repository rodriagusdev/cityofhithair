import React from 'react';
import { itemIcons } from '../../data/stats';
import { Player } from '../../types';

interface PlayerStatsProps {
  player: Player;
  gold: number;
}

export const PlayerStats: React.FC<PlayerStatsProps> = ({ player, gold }) => {
  return (
    <div className="flex items-center justify-around gap-2 py-1 px-3 bg-stone-950/85 border border-stone-800/80 rounded-lg shadow-sm w-full">
      {/* Gold */}
      <div className="flex items-center gap-1.5 group" title="Gold">
        <img
          src={itemIcons.playergold}
          alt="Gold"
          className="w-5 h-5 p-0.5 rounded-full bg-stone-900 border border-amber-600/60"
        />
        <span className="font-cinzel text-xs font-semibold text-amber-200">
          {gold}
        </span>
      </div>

      {/* Attack */}
      <div className="flex items-center gap-1.5 group" title="Attack">
        <img
          src={itemIcons.attack}
          alt="Attack"
          className="w-5 h-5 p-0.5 rounded-full bg-stone-900 border border-stone-700"
        />
        <span className="font-cinzel text-xs font-semibold text-stone-200">
          {player.attack.toFixed(0)}
        </span>
      </div>

      {/* Defense */}
      <div className="flex items-center gap-1.5 group" title="Defense">
        <img
          src={itemIcons.defense}
          alt="Defense"
          className="w-5 h-5 p-0.5 rounded-full bg-stone-900 border border-stone-700"
        />
        <span className="font-cinzel text-xs font-semibold text-stone-200">
          {player.defense.toFixed(0)}
        </span>
      </div>

      {/* Dark Mastery (if > 0) */}
      {player.darkMastery > 0 && (
        <div className="flex items-center gap-1.5 group" title="Dark Magic Mastery">
          <img
            src={itemIcons.darktome}
            alt="Dark Magic Mastery"
            className="w-5 h-5 p-0.5 rounded-full bg-stone-900 border border-purple-500/40"
          />
          <span className="font-cinzel text-xs font-semibold text-purple-300">
            {player.darkMastery}
          </span>
        </div>
      )}
    </div>
  );
};

export default PlayerStats;

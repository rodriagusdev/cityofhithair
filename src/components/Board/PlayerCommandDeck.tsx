import React from 'react';
import { useBattleStore } from '../../stores';
import UnitCombatStats from './BoardUnit/UnitCombatStats';
import UnitActionBar from './BoardUnit/UnitActionBar';

export const PlayerCommandDeck: React.FC = () => {
  const currentHero = useBattleStore((state) => state.boardPlayer);

  if (!currentHero) return null;

  return (
    <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-30 select-none overflow-visible">
      {/* Outer Dark-Iron Frame */}
      <div className="relative bg-gradient-to-b from-stone-900/95 via-stone-950 to-stone-950 border-2 border-stone-800/90 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.85),inset_0_1px_2px_rgba(255,255,255,0.08)] p-2.5 sm:p-3 flex flex-row items-center justify-center gap-2 sm:gap-3 backdrop-blur-md overflow-visible">
        {/* Dark-Iron Corner Rivets & Brackets */}
        <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-stone-600/80 rounded-tl pointer-events-none" />
        <div className="absolute top-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-stone-400 border border-stone-900 shadow-sm pointer-events-none" />

        <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-stone-600/80 rounded-tr pointer-events-none" />
        <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-stone-400 border border-stone-900 shadow-sm pointer-events-none" />

        <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-stone-600/80 rounded-bl pointer-events-none" />
        <div className="absolute bottom-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-stone-400 border border-stone-900 shadow-sm pointer-events-none" />

        <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-stone-600/80 rounded-br pointer-events-none" />
        <div className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-stone-400 border border-stone-900 shadow-sm pointer-events-none" />

        {/* Combat Attributes Tablet */}
        <div className="shrink-0 self-center">
          <UnitCombatStats unit={currentHero} isEnemy={false} />
        </div>

        {/* Combat Actions Deck (Skills & Consumables) */}
        <div className="shrink-0 flex items-center justify-center overflow-visible">
          <UnitActionBar unit={currentHero} isEnemy={false} />
        </div>
      </div>
    </div>
  );
};

export default PlayerCommandDeck;

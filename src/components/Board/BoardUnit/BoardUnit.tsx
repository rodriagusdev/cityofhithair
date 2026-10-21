import React from 'react';
import { useBoardUnit } from './useBoardUnit';
import { Player, Unit } from '../../../types';
import { useBattleStore } from '../../../stores';
import UnitPortrait from './UnitPortrait';
import UnitCombatStats from './UnitCombatStats';
import UnitActionBar from './UnitActionBar';
import MedallionPortrait from './MedallionPortrait';

interface Props {
  unit: Player | Unit;
  className?: string;
}

const BoardUnit: React.FC<Props> = ({ unit, className = '' }) => {
  const { handleOnClick, isEnemy } = useBoardUnit({ unit });
  const playerActionsRemaining = useBattleStore((state) => state.playerActionsRemaining);

  return (
    <div
      className={`flex flex-col items-center gap-3 p-4 transition-all w-full ${className}`}
    >
      {/* Unit Battlefield Sprite & Vitals */}
      <UnitPortrait unit={unit} isEnemy={isEnemy} onPortraitClick={handleOnClick} />

      {/* Turns counter above the player container */}
      {!isEnemy && (
        <div className="flex items-center justify-start w-full px-1 -mb-1">

          <span className="text-lg font-cinzel font-bold text-amber-500 tracking-wider">
            Turns: {playerActionsRemaining}
          </span>

        </div>
      )}

      {/* Unit Command Panel Container */}
      <div className="relative w-full bg-gradient-to-b from-stone-900/95 via-stone-950 to-stone-950 border-2 border-stone-800/90 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.85),inset_0_1px_2px_rgba(255,255,255,0.08)] p-3 sm:p-4 flex flex-col gap-3 backdrop-blur-md select-none">
        {/* Dark-Iron Corner Rivets & Brackets */}
        <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-stone-600/80 rounded-tl pointer-events-none" />
        <div className="absolute top-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-stone-400 border border-stone-900 shadow-sm pointer-events-none" />

        <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-stone-600/80 rounded-tr pointer-events-none" />
        <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-stone-400 border border-stone-900 shadow-sm pointer-events-none" />

        <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-stone-600/80 rounded-bl pointer-events-none" />
        <div className="absolute bottom-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-stone-400 border border-stone-900 shadow-sm pointer-events-none" />

        <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-stone-600/80 rounded-br pointer-events-none" />
        <div className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-stone-400 border border-stone-900 shadow-sm pointer-events-none" />


        {/* Upper Identity & Combat Attributes Row */}
        <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 pt-1 w-full">
          {/* Focal Medallion Portrait */}
          <MedallionPortrait
            unit={unit}
            isEnemy={isEnemy}
            onClick={handleOnClick}
          />

          {/* Combat Attributes Tablet */}
          <div className="shrink-0 self-center">
            <UnitCombatStats unit={unit} isEnemy={isEnemy} />
          </div>

          {/* Combat Actions Deck (Skills & Consumables) */}
          <div className="w-full flex items-center justify-center">
            <UnitActionBar unit={unit} isEnemy={isEnemy} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default BoardUnit;

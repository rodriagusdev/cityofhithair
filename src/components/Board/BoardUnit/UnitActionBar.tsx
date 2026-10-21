import React from 'react';
import { Player, Unit } from '../../../types';
import { Skill } from '../../Skill';
import { useBattleStore } from '../../../stores';

interface UnitActionBarProps {
  unit: Player | Unit;
  isEnemy: boolean;
}

export const UnitActionBar: React.FC<UnitActionBarProps> = ({ unit, isEnemy }) => {
  const isPlayer = !isEnemy;
  const playerPotions = isPlayer ? (unit as Player).potions : undefined;
  const hasPotions = playerPotions && playerPotions.length > 0;
  const playerActionsRemaining = useBattleStore((state) => state.playerActionsRemaining);

  return (
    <div className="relative w-full bg-gradient-to-b from-stone-900/80 via-stone-950/90 to-stone-950 border border-stone-800/90 rounded-xl p-2 sm:p-2.5 shadow-[inset_0_1px_3px_rgba(255,255,255,0.05),0_6px_16px_rgba(0,0,0,0.6)] flex flex-col gap-2 select-none">
      {/* Decorative Dark-Iron Corner Rivets */}
      <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-stone-600/70 pointer-events-none" />
      <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-stone-400 border border-stone-900 shadow-sm pointer-events-none" />

      <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-stone-600/70 pointer-events-none" />
      <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-stone-400 border border-stone-900 shadow-sm pointer-events-none" />

      <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-stone-600/70 pointer-events-none" />
      <div className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-stone-400 border border-stone-900 shadow-sm pointer-events-none" />

      <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-stone-600/70 pointer-events-none" />
      <div className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-stone-400 border border-stone-900 shadow-sm pointer-events-none" />

      {/* Combat Skills Rack */}
      <div className="flex flex-col gap-1 w-full">
        {/* Header / Divider */}
        <div className="flex items-center gap-2 w-full px-2">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-700/80 to-transparent" />
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rotate-45 bg-stone-600" />
            <span className="text-[10px] font-cinzel font-bold tracking-widest uppercase text-stone-400">
              Combat Arts
            </span>
            <div className="w-1.5 h-1.5 rotate-45 bg-stone-600" />
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-700/80 to-transparent" />
        </div>

        {/* Slotted Weapon Rack */}
        <div className="flex flex-row items-center justify-center gap-2 p-1.5 bg-stone-950/70 border border-stone-800/80 rounded-lg shadow-inner">
          {unit.skills.map((skill, index) => (
            <div key={skill.name} className="relative group">
              <Skill
                skill={skill}
                hotkey={isPlayer && index < 4 ? String(index + 1) : undefined}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Consumable Potions (Player only) */}
      {hasPotions && (
        <div className="flex flex-col gap-1 w-full">
          {/* Apothecary Header / Divider */}
          <div className="flex items-center gap-2 w-full px-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-800/60 to-transparent" />
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rotate-45 bg-amber-700" />
              <span className="text-[9px] font-cinzel font-bold tracking-widest uppercase text-amber-500/90">
                Apothecary
              </span>
              <div className="w-1.5 h-1.5 rotate-45 bg-amber-700" />
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-800/60 to-transparent" />
          </div>

          {/* Apothecary Tray */}
          <div className="flex items-center justify-center gap-2 p-1.5 bg-stone-950/70 border border-amber-950/40 rounded-lg shadow-inner">
            {playerPotions.map((potion) => (
              <div key={potion.name} className="relative group">
                <Skill
                  skill={potion}
                  hotkey={potion.name.includes('Life') ? 'Q' : 'E'}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitActionBar;

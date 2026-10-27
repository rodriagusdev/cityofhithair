import React from 'react';
import { itemIcons } from '../../../data/stats';
import { Player, Unit } from '../../../types';
import { useBattleStore } from '../../../stores';

interface UnitCombatStatsProps {
  unit: Player | Unit;
  isEnemy?: boolean;
}

export const UnitCombatStats: React.FC<UnitCombatStatsProps> = ({ unit, isEnemy = false }) => {
  const enemyStagger = useBattleStore((state) => state.enemyStagger);
  return (
    <div className="relative bg-gradient-to-b from-stone-900/90 via-stone-950/95 to-stone-950 border border-stone-800/90 rounded-lg p-1.5 sm:p-2 lg:p-2.5 shadow-[inset_0_1px_3px_rgba(255,255,255,0.06),0_6px_16px_rgba(0,0,0,0.7)] flex flex-col gap-1.5 sm:gap-2 min-w-[110px] sm:min-w-[125px] lg:min-w-[140px] select-none">
      {/* POSTURE BROKEN Banner above the container of stats */}
      {isEnemy && enemyStagger.isStaggered && (
        <div className="absolute -top-9 sm:-top-11 left-1/2 -translate-x-1/2 w-max text-center shadow-xl text-sm sm:text-base lg:text-lg font-cinzel font-black tracking-widest text-red-500 uppercase animate-pulse z-30 pointer-events-none whitespace-nowrap">
          POSTURE BROKEN
        </div>
      )}

      {/* Decorative Dark-Iron Corner Rivets */}
      <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-stone-600/70 pointer-events-none" />
      <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-stone-400 border border-stone-900 shadow-sm pointer-events-none" />

      <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-stone-600/70 pointer-events-none" />
      <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-stone-400 border border-stone-900 shadow-sm pointer-events-none" />

      <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-stone-600/70 pointer-events-none" />
      <div className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-stone-400 border border-stone-900 shadow-sm pointer-events-none" />

      <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-stone-600/70 pointer-events-none" />
      <div className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-stone-400 border border-stone-900 shadow-sm pointer-events-none" />

      {/* Engraved Header */}
      <div className="flex items-center justify-center gap-1.5 pb-1 border-b border-stone-800/80">
        <div className="w-1.5 h-1.5 rotate-45 bg-stone-600" />
        <span className="text-[9px] sm:text-[10px] font-cinzel font-bold tracking-widest text-stone-400 uppercase">
          Attributes
        </span>
        <div className="w-1.5 h-1.5 rotate-45 bg-stone-600" />
      </div>

      {/* Attack stat */}
      <div
        className="flex flex-row items-center justify-between gap-1.5 sm:gap-2 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-stone-950/70 border border-stone-800/80 hover:border-stone-700/80 rounded shadow-inner transition-colors"
        title="Physical Attack Power"
      >
        <div className="flex items-center gap-1 sm:gap-1.5">
          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-stone-900 border border-stone-700/60 rounded p-0.5 flex items-center justify-center shrink-0 shadow-sm">
            <img src={itemIcons.attack} alt="Attack" className="w-full h-full object-contain" />
          </div>
          <span className="font-cinzel text-[10px] sm:text-[11px] text-stone-400">Atk</span>
        </div>
        <span
          className={`font-cinzel text-[11px] sm:text-xs font-semibold ${unit.weaknessStatus
            ? 'text-rose-400 font-bold animate-pulse'
            : 'text-stone-200'
            }`}
        >
          {unit.attack.toFixed(1)}
        </span>
      </div>

      {/* Defense stat */}
      <div
        className="flex flex-row items-center justify-between gap-1.5 sm:gap-2 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-stone-950/70 border border-stone-800/80 hover:border-stone-700/80 rounded shadow-inner transition-colors"
        title="Armor Defense"
      >
        <div className="flex items-center gap-1 sm:gap-1.5">
          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-stone-900 border border-stone-700/60 rounded p-0.5 flex items-center justify-center shrink-0 shadow-sm">
            <img src={itemIcons.defense} alt="Defense" className="w-full h-full object-contain" />
          </div>
          <span className="font-cinzel text-[10px] sm:text-[11px] text-stone-400">Def</span>
        </div>
        <span
          className={`font-cinzel text-[11px] sm:text-xs font-semibold ${unit.vulnerabilityStatus
            ? 'text-rose-400 font-bold animate-pulse'
            : (unit.defenseStatus ?? 0) > 0
              ? 'text-emerald-400'
              : 'text-stone-200'
            }`}
        >
          {unit.defense.toFixed(1)}
        </span>
      </div>

      {/* Dark Mastery */}
      <div
        className="flex flex-row items-center justify-between gap-1.5 sm:gap-2 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-stone-950/70 border border-stone-800/80 hover:border-purple-900/40 rounded shadow-inner transition-colors"
        title="Dark Magic Mastery"
      >
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-stone-900 border border-stone-700/60 rounded p-0.5 flex items-center justify-center shrink-0 shadow-sm">
            <img src={itemIcons.darktome} alt="Dark Mastery" className="w-full h-full object-contain" />
          </div>
          <span className="font-cinzel text-[10px] sm:text-[11px] text-purple-400/90">Dark</span>
        </div>
        <span className="font-cinzel text-[11px] sm:text-xs font-semibold text-purple-300 drop-shadow-[0_0_3px_rgba(192,132,252,0.4)]">
          {unit.darkMastery}
        </span>
      </div>

      {/* Critical Chance */}
      <div
        className="flex flex-row items-center justify-between gap-1.5 sm:gap-2 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-stone-950/70 border border-stone-800/80 hover:border-amber-900/40 rounded shadow-inner transition-colors"
        title="Critical Strike Chance"
      >
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-stone-900 border border-stone-700/60 rounded p-0.5 flex items-center justify-center shrink-0 shadow-sm">
            <img src={itemIcons.critical} alt="Critical" className="w-full h-full object-contain" />
          </div>
          <span className="font-cinzel text-[10px] sm:text-[11px] text-amber-400/90">Crit</span>
        </div>
        <span className="font-cinzel text-[11px] sm:text-xs font-semibold text-amber-300 drop-shadow-[0_0_3px_rgba(252,211,77,0.4)]">
          {unit.criticalChance}%
        </span>
      </div>
    </div>
  );
};

export default UnitCombatStats;

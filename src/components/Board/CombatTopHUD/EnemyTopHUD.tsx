import React from 'react';
import { useBattleStore } from '../../../stores';
import { itemIcons } from '../../../data/stats';

export const EnemyTopHUD: React.FC = () => {
  const enemy = useBattleStore((state) => state.boardEnemy);
  const enemyStagger = useBattleStore((state) => state.enemyStagger);

  if (!enemy || !enemy.name) return null;

  const healthRatio = Math.max(
    0,
    Math.min(1, enemy.health / (enemy.maxHealth || 1))
  );

  const staggerRatio = enemyStagger.max > 0
    ? Math.max(0, Math.min(1, enemyStagger.current / enemyStagger.max))
    : 0;

  // Status flags
  const hasFrenzy = (enemy.frenzyStatus ?? 0) > 0;
  const hasDefense = (enemy.defenseStatus ?? 0) > 0;
  const hasWeakness = !!enemy.weaknessStatus;
  const hasVulnerability = !!enemy.vulnerabilityStatus;

  return (
    <div className="flex items-start gap-2 sm:gap-3 pointer-events-auto select-none">
      {/* 1. Gauges Column & Status Sockets (Mirrored - extending inward to the left) */}
      <div className="flex flex-col items-end gap-1.5 pt-0.5">
        {/* Nameplate */}
        <div className="flex items-center gap-1.5 px-0.5">
          <span className="font-cinzel text-xs sm:text-sm font-black tracking-widest text-red-300 uppercase drop-shadow">
            {enemy.name}
          </span>
        </div>

        {/* Health Bar (Gothic pointed sword-tip pointing left towards center) */}
        <div
          className="relative w-44 sm:w-60 md:w-72 lg:w-80 h-5 sm:h-6 bg-stone-950 border border-stone-700/90 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9),0_4px_12px_rgba(0,0,0,0.7)] flex items-center justify-end overflow-hidden"
          style={{
            clipPath:
              'polygon(12px 0, 100% 0, 100% 100%, 12px 100%, 0 50%)',
          }}
        >
          {/* Health fill (anchored to right) */}
          <div
            className="h-full bg-gradient-to-l from-red-950 via-red-600 to-rose-500 transition-all duration-300 ease-out"
            style={{ width: `${healthRatio * 100}%` }}
          />

          {/* Bar text readout */}
          <div className="absolute inset-0 flex items-center justify-end pr-2 sm:pr-3 pointer-events-none">
            <span className="font-cinzel text-[10px] sm:text-xs font-bold text-white tracking-wider drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              {Math.max(0, Math.round(enemy.health))} / {enemy.maxHealth} HP
            </span>
          </div>
        </div>

        {/* Stagger / Posture Bar (Pointed sword-tip pointing left) */}
        <div
          className="relative w-36 sm:w-48 md:w-60 lg:w-68 h-4 sm:h-5 bg-stone-950 border border-stone-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9),0_4px_10px_rgba(0,0,0,0.7)] flex items-center justify-end overflow-hidden"
          style={{
            clipPath:
              'polygon(10px 0, 100% 0, 100% 100%, 10px 100%, 0 50%)',
          }}
        >
          {/* Stagger fill */}
          <div
            className={`h-full transition-all duration-300 ease-out ${
              enemyStagger.isStaggered
                ? 'w-full bg-gradient-to-r from-red-600 via-rose-500 to-red-600 animate-pulse'
                : 'bg-gradient-to-l from-amber-900 via-amber-600 to-yellow-500'
            }`}
            style={{
              width: enemyStagger.isStaggered ? '100%' : `${staggerRatio * 100}%`,
            }}
          />

          {/* Bar text readout */}
          <div className="absolute inset-0 flex items-center justify-end pr-2 sm:pr-3 pointer-events-none">
            <span className="font-cinzel text-[9px] sm:text-[10px] font-bold text-amber-200 tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {enemyStagger.isStaggered
                ? 'POSTURE BROKEN'
                : `${enemyStagger.current} / ${enemyStagger.max} STAGGER`}
            </span>
          </div>
        </div>

        {/* 3. 4 Circular Status Orbs / Sockets below bars */}
        <div className="flex items-center gap-1.5 sm:gap-2 pt-1 pr-0.5">
          {/* Socket 1: Vulnerability */}
          <div
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center transition-all ${
              hasVulnerability
                ? 'border-purple-500 bg-purple-950/80 shadow-[0_0_8px_rgba(168,85,247,0.6)] animate-pulse'
                : 'border-stone-800 bg-stone-950/80 shadow-inner'
            }`}
            title={hasVulnerability ? 'Vulnerable (+25% Damage Taken)' : 'Vulnerability Socket'}
          >
            {hasVulnerability ? (
              <span className="text-[10px] sm:text-xs">⚡</span>
            ) : (
              <div className="w-1.5 h-1.5 rounded-full bg-stone-700/40" />
            )}
          </div>

          {/* Socket 2: Weakness */}
          <div
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center transition-all ${
              hasWeakness
                ? 'border-rose-500 bg-rose-950/80 shadow-[0_0_8px_rgba(244,63,94,0.6)] animate-pulse'
                : 'border-stone-800 bg-stone-950/80 shadow-inner'
            }`}
            title={hasWeakness ? 'Weakened (-Damage Dealt)' : 'Weakness Socket'}
          >
            {hasWeakness ? (
              <img src={itemIcons.attack} alt="Atk" className="w-3.5 h-3.5 object-contain opacity-70" />
            ) : (
              <div className="w-1.5 h-1.5 rounded-full bg-stone-700/40" />
            )}
          </div>

          {/* Socket 3: Armor Guard */}
          <div
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center transition-all ${
              hasDefense
                ? 'border-stone-400 bg-stone-900 shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                : 'border-stone-800 bg-stone-950/80 shadow-inner'
            }`}
            title={hasDefense ? `Armor Defense: ${enemy.defenseStatus}` : 'Armor Socket'}
          >
            {hasDefense ? (
              <img src={itemIcons.defense} alt="Armor" className="w-4 h-4 object-contain" />
            ) : (
              <div className="w-1.5 h-1.5 rounded-full bg-stone-700/40" />
            )}
          </div>

          {/* Socket 4: Frenzy / Enraged */}
          <div
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center transition-all ${
              hasFrenzy
                ? 'border-red-600 bg-red-950 shadow-[0_0_8px_rgba(220,38,38,0.7)] animate-pulse'
                : 'border-stone-800 bg-stone-950/80 shadow-inner'
            }`}
            title={hasFrenzy ? `Enraged (+${enemy.frenzyStatus} Atk)` : 'Enrage Socket'}
          >
            {hasFrenzy ? (
              <span className="text-[10px] sm:text-xs">🔥</span>
            ) : (
              <div className="w-1.5 h-1.5 rounded-full bg-stone-700/40" />
            )}
          </div>
        </div>

        {/* 4. Enemy Attributes Pill Strip */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-2 py-0.5 bg-stone-950/90 border border-stone-800/90 rounded-md shadow-lg backdrop-blur-sm mt-0.5">
          {/* Attack stat */}
          <div className="flex items-center gap-1" title="Physical Attack Power">
            <img src={itemIcons.attack} alt="Atk" className="w-3.5 h-3.5 object-contain" />
            <span
              className={`font-cinzel text-[10px] sm:text-[11px] font-bold ${
                enemy.weaknessStatus ? 'text-rose-400 animate-pulse' : 'text-stone-300'
              }`}
            >
              {enemy.attack.toFixed(1)}
            </span>
          </div>

          <div className="w-px h-3 bg-stone-800" />

          {/* Defense stat */}
          <div className="flex items-center gap-1" title="Armor Defense">
            <img src={itemIcons.defense} alt="Def" className="w-3.5 h-3.5 object-contain" />
            <span
              className={`font-cinzel text-[10px] sm:text-[11px] font-bold ${
                enemy.vulnerabilityStatus
                  ? 'text-rose-400 animate-pulse'
                  : (enemy.defenseStatus ?? 0) > 0
                    ? 'text-emerald-400'
                    : 'text-stone-300'
              }`}
            >
              {enemy.defense.toFixed(1)}
            </span>
          </div>

          <div className="w-px h-3 bg-stone-800" />

          {/* Dark Mastery */}
          <div className="flex items-center gap-1" title="Dark Magic Mastery">
            <img src={itemIcons.darktome} alt="Dark" className="w-3.5 h-3.5 object-contain" />
            <span className="font-cinzel text-[10px] sm:text-[11px] font-bold text-purple-300">
              {enemy.darkMastery}
            </span>
          </div>

          <div className="w-px h-3 bg-stone-800" />

          {/* Critical Chance */}
          <div className="flex items-center gap-1" title="Critical Strike Chance">
            <img src={itemIcons.critical} alt="Crit" className="w-3.5 h-3.5 object-contain" />
            <span className="font-cinzel text-[10px] sm:text-[11px] font-bold text-amber-300">
              {enemy.criticalChance}%
            </span>
          </div>
        </div>
      </div>

      {/* 2. Square Gothic Portrait Box (Far Right Corner) */}
      <div className="relative shrink-0">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 bg-stone-950 border-2 border-red-900/80 rounded-lg p-1 shadow-[0_8px_20px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.1)] relative">
          {/* Corner Brackets */}
          <div className="absolute top-0.5 left-0.5 w-2 h-2 border-t-2 border-l-2 border-red-700 pointer-events-none" />
          <div className="absolute top-0.5 right-0.5 w-2 h-2 border-t-2 border-r-2 border-red-700 pointer-events-none" />
          <div className="absolute bottom-0.5 left-0.5 w-2 h-2 border-b-2 border-l-2 border-red-700 pointer-events-none" />
          <div className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b-2 border-r-2 border-red-700 pointer-events-none" />

          {/* Enemy Portrait Image */}
          <img
            src={enemy.portraitFace}
            alt={enemy.name}
            className="w-full h-full object-cover rounded bg-stone-900 border border-stone-800"
          />

          {/* Sub-circle Socket at Bottom Center */}
          <div
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-stone-950 border-2 border-red-800 flex items-center justify-center shadow-md z-10"
            title={enemy.name}
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-stone-900 border border-red-950 flex items-center justify-center text-[10px] font-cinzel font-bold text-red-500">
              ☠
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnemyTopHUD;

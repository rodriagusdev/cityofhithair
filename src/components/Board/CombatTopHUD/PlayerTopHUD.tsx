import React from 'react';
import { useBattleStore } from '../../../stores';
import { itemIcons } from '../../../data/stats';

export const PlayerTopHUD: React.FC = () => {
  const player = useBattleStore((state) => state.boardPlayer);

  if (!player || !player.name) return null;

  const healthRatio = Math.max(
    0,
    Math.min(1, player.health / (player.maxHealth || 1))
  );
  const manaRatio = Math.max(
    0,
    Math.min(1, player.magic / (player.maxMagic || 1))
  );

  // Status flags
  const hasFrenzy = (player.frenzyStatus ?? 0) > 0;
  const hasDefense = (player.defenseStatus ?? 0) > 0;
  const hasDarkMastery = (player.darkMastery ?? 0) > 0;
  const hasDebuff = !!player.weaknessStatus || !!player.vulnerabilityStatus;

  return (
    <div className="flex items-start gap-2 sm:gap-3 pointer-events-auto select-none">
      {/* 1. Square Gothic Portrait Box */}
      <div className="relative shrink-0">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 bg-stone-950 border-2 border-stone-700/90 rounded-lg p-1 shadow-[0_8px_20px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.1)] relative">
          {/* Corner Brackets */}
          <div className="absolute top-0.5 left-0.5 w-2 h-2 border-t-2 border-l-2 border-amber-600 pointer-events-none" />
          <div className="absolute top-0.5 right-0.5 w-2 h-2 border-t-2 border-r-2 border-amber-600 pointer-events-none" />
          <div className="absolute bottom-0.5 left-0.5 w-2 h-2 border-b-2 border-l-2 border-amber-600 pointer-events-none" />
          <div className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b-2 border-r-2 border-amber-600 pointer-events-none" />

          {/* Hero Portrait Image */}
          <img
            src={player.portraitFace}
            alt={player.name}
            className="w-full h-full object-cover rounded bg-stone-900 border border-stone-800"
          />

          {/* Sub-circle Socket at Bottom Center */}
          <div
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-stone-950 border-2 border-stone-600 flex items-center justify-center shadow-md z-10"
            title={player.name}
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-stone-900 border border-stone-700 flex items-center justify-center text-[10px] font-cinzel font-bold text-amber-400">
              ⚔
            </div>
          </div>
        </div>
      </div>

      {/* 2. Gauges Column & Status Sockets */}
      <div className="flex flex-col gap-1.5 pt-0.5">
        {/* Nameplate */}
        <div className="flex items-center gap-1.5 px-0.5">
          <span className="font-cinzel text-xs sm:text-sm font-black tracking-widest text-stone-200 uppercase drop-shadow">
            {player.name}
          </span>
        </div>

        {/* Health Bar (Gothic pointed sword-tip extending right) */}
        <div
          className="relative w-44 sm:w-60 md:w-72 lg:w-80 h-5 sm:h-6 bg-stone-950 border border-stone-700/90 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9),0_4px_12px_rgba(0,0,0,0.7)] flex items-center overflow-hidden"
          style={{
            clipPath:
              'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)',
          }}
        >
          {/* Health fill */}
          <div
            className="h-full bg-gradient-to-r from-red-950 via-red-600 to-rose-500 transition-all duration-300 ease-out"
            style={{ width: `${healthRatio * 100}%` }}
          />

          {/* Bar text readout */}
          <div className="absolute inset-0 flex items-center justify-start pl-2 sm:pl-3 pointer-events-none">
            <span className="font-cinzel text-[10px] sm:text-xs font-bold text-white tracking-wider drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              {Math.max(0, Math.round(player.health))} / {player.maxHealth} HP
            </span>
          </div>
        </div>

        {/* Mana / SP Bar (Gothic pointed sword-tip extending right) */}
        <div
          className="relative w-36 sm:w-48 md:w-60 lg:w-68 h-4 sm:h-5 bg-stone-950 border border-stone-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9),0_4px_10px_rgba(0,0,0,0.7)] flex items-center overflow-hidden"
          style={{
            clipPath:
              'polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)',
          }}
        >
          {/* Mana fill */}
          <div
            className="h-full bg-gradient-to-r from-indigo-950 via-purple-700 to-violet-400 transition-all duration-300 ease-out"
            style={{ width: `${manaRatio * 100}%` }}
          />

          {/* Bar text readout */}
          <div className="absolute inset-0 flex items-center justify-start pl-2 sm:pl-3 pointer-events-none">
            <span className="font-cinzel text-[9px] sm:text-[10px] font-bold text-cyan-200 tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {player.magic} / {player.maxMagic} SP
            </span>
          </div>
        </div>

        {/* 3. 4 Circular Status Orbs / Sockets below bars */}
        <div className="flex items-center gap-1.5 sm:gap-2 pt-1 pl-0.5">
          {/* Socket 1: Frenzy */}
          <div
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center transition-all ${
              hasFrenzy
                ? 'border-red-500 bg-red-950/80 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse'
                : 'border-stone-800 bg-stone-950/80 shadow-inner'
            }`}
            title={hasFrenzy ? `Frenzy Active (+${player.frenzyStatus} Atk)` : 'Frenzy Socket'}
          >
            {hasFrenzy ? (
              <span className="text-[10px] sm:text-xs">🔥</span>
            ) : (
              <div className="w-1.5 h-1.5 rounded-full bg-stone-700/40" />
            )}
          </div>

          {/* Socket 2: Defense Guard */}
          <div
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center transition-all ${
              hasDefense
                ? 'border-cyan-500 bg-cyan-950/80 shadow-[0_0_8px_rgba(6,182,212,0.6)]'
                : 'border-stone-800 bg-stone-950/80 shadow-inner'
            }`}
            title={hasDefense ? `Defense Active (+${player.defenseStatus} Armor)` : 'Defense Socket'}
          >
            {hasDefense ? (
              <img src={itemIcons.defense} alt="Def" className="w-4 h-4 object-contain" />
            ) : (
              <div className="w-1.5 h-1.5 rounded-full bg-stone-700/40" />
            )}
          </div>

          {/* Socket 3: Dark Mastery / Buff */}
          <div
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center transition-all ${
              hasDarkMastery
                ? 'border-purple-500 bg-purple-950/80 shadow-[0_0_8px_rgba(168,85,247,0.6)]'
                : 'border-stone-800 bg-stone-950/80 shadow-inner'
            }`}
            title={hasDarkMastery ? `Dark Mastery: ${player.darkMastery}` : 'Occult Socket'}
          >
            {hasDarkMastery ? (
              <img src={itemIcons.darktome} alt="Tome" className="w-3.5 h-3.5 object-contain" />
            ) : (
              <div className="w-1.5 h-1.5 rounded-full bg-stone-700/40" />
            )}
          </div>

          {/* Socket 4: Debuff (Weakness / Vulnerability) */}
          <div
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center transition-all ${
              hasDebuff
                ? 'border-amber-500 bg-amber-950/80 shadow-[0_0_8px_rgba(245,158,11,0.6)] animate-pulse'
                : 'border-stone-800 bg-stone-950/80 shadow-inner'
            }`}
            title={hasDebuff ? 'Afflicted (Weakness/Vulnerable)' : 'Blight Socket'}
          >
            {hasDebuff ? (
              <span className="text-[10px] text-amber-400 font-bold">☠</span>
            ) : (
              <div className="w-1.5 h-1.5 rounded-full bg-stone-700/40" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerTopHUD;

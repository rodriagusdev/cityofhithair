import { useEffect, useState } from 'react';
import { useCombat } from '../../../features/combat';
import { useBattleStore } from '../../../stores';

const RADIUS = 50;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ~314.16

export const ParryIndicator = () => {
  const phase = useBattleStore((state) => state.phase);
  const enemyIntent = useBattleStore((state) => state.enemyIntent);
  const parryState = useBattleStore((state) => state.parryState);
  const { attemptParry } = useCombat();

  const [remainingRatio, setRemainingRatio] = useState(1);

  const currentStrike = parryState.currentStrike ?? 0;
  const strikeDuration =
    parryState.strikeDurationMs || enemyIntent?.telegraphDurationMs || 1500;

  useEffect(() => {
    if (phase !== 'enemy_telegraph' || !enemyIntent) {
      setRemainingRatio(1);
      return;
    }

    const duration = strikeDuration;
    const startTime = performance.now();
    let animId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const ratio = Math.max(0, 1 - elapsed / duration);
      setRemainingRatio(ratio);

      if (ratio > 0) {
        animId = requestAnimationFrame(tick);
      }
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [phase, enemyIntent, currentStrike, strikeDuration]);

  if (phase !== 'enemy_telegraph' || !enemyIntent) {
    return null;
  }

  const requiredParries = enemyIntent.requiredParries ?? 1;
  const isMultiParry = requiredParries > 1;
  const isWindowActive =
    parryState.isWindowOpen &&
    !parryState.comboBroken &&
    !parryState.wasParried &&
    !parryState.parryAttempted;
  const strokeOffset = CIRCUMFERENCE * (1 - remainingRatio);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-auto">
      {/* Gothic Telegraph Banner */}
      <div className="absolute -top-10 px-2.5 py-1 bg-stone-950/95 border border-red-900 rounded shadow-xl font-cinzel text-[10px] font-bold text-white uppercase tracking-widest whitespace-nowrap animate-pulse flex items-center gap-1.5">
        <span>⚔ {enemyIntent.actionName}</span>
      </div>

      {/* Circular interactive parry ward */}
      <button
        type="button"
        onClick={attemptParry}
        disabled={
          parryState.comboBroken ||
          parryState.wasParried ||
          (!parryState.canParry && !isWindowActive)
        }
        aria-label="Parry Incoming Attack"
        className={`relative flex items-center justify-center w-28 h-28 rounded-full bg-stone-950/90 border-2 transition-all duration-150 cursor-pointer ${
          parryState.wasParried
            ? 'border-cyan-400 ring-4 ring-cyan-400/40 shadow-[0_0_25px_rgba(34,211,238,0.7)]'
            : isWindowActive
              ? 'border-red-500 ring-4 ring-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.8)] scale-105'
              : parryState.feedbackText
                ? 'border-rose-950 opacity-70'
                : 'border-stone-700 hover:border-red-700 shadow-2xl'
        }`}
      >
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 origin-center"
          viewBox="0 0 120 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Track */}
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            className="stroke-stone-850 stroke-[6] fill-none"
          />

          {/* Smoothly reducing radial stroke */}
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeOffset}
            className={`stroke-[6] fill-none transition-[stroke-dashoffset] duration-75 ease-linear ${
              parryState.wasParried
                ? 'stroke-cyan-400'
                : isWindowActive
                  ? 'stroke-red-500 animate-pulse'
                  : 'stroke-red-700'
            }`}
          />
        </svg>

        {/* Center Readout & Deflection Glyphs */}
        <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none select-none text-center px-1">
          {parryState.feedbackText ? (
            <span
              className={`font-cinzel text-[10px] font-extrabold uppercase tracking-widest drop-shadow ${
                parryState.wasParried ? 'text-cyan-300' : 'text-rose-400'
              }`}
            >
              {parryState.feedbackText}
            </span>
          ) : (
            <>
              {/* Shield Icon */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`w-5 h-5 transition-colors ${
                  isWindowActive ? 'text-amber-300 animate-bounce' : 'text-stone-400'
                }`}
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>

              <span
                className={`font-cinzel text-[10px] font-black uppercase tracking-wider mt-0.5 ${
                  isWindowActive ? 'text-amber-300' : 'text-stone-300'
                }`}
              >
                {isWindowActive ? 'PARRY!' : 'PARRY'}
              </span>
              <span className="font-cinzel text-[8px] text-stone-500 uppercase tracking-widest">
                [SPACE]
              </span>
            </>
          )}
        </div>
      </button>
    </div>
  );
};

export default ParryIndicator;

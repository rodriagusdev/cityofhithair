import React from 'react';
import { useBattleStore } from '../../../stores';

export const CombatGothicClock: React.FC = () => {
  const playerActionsRemaining = useBattleStore(
    (state) => state.playerActionsRemaining
  );
  const turn = useBattleStore((state) => state.turn);
  const phase = useBattleStore((state) => state.phase);

  // Dynamic hand angle: rotates based on remaining actions / turn
  const hourHandAngle = turn === 'Player' ? 360 - playerActionsRemaining * 60 : 180;
  const minuteHandAngle = phase === 'resolving' ? 240 : 0;

  return (
    <div
      className="relative flex flex-col items-center select-none pointer-events-auto group shrink-0"
      title={`Current Turn: ${turn} | Phase: ${phase} | Actions: ${playerActionsRemaining}`}
    >
      {/* Antique Gothic Clock Frame (SVG based on reference design) */}
      <div className="relative w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 flex items-center justify-center drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)]">
        <svg
          viewBox="0 0 100 120"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Antique Bronze Gradient */}
            <radialGradient id="clockDialGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#45382b" />
              <stop offset="65%" stopColor="#241d16" />
              <stop offset="100%" stopColor="#120e0a" />
            </radialGradient>
            <linearGradient id="bronzeBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9a7b56" />
              <stop offset="30%" stopColor="#d4af37" />
              <stop offset="70%" stopColor="#5e482d" />
              <stop offset="100%" stopColor="#302414" />
            </linearGradient>
            <linearGradient id="filigreeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c5a059" />
              <stop offset="50%" stopColor="#7a5d33" />
              <stop offset="100%" stopColor="#382917" />
            </linearGradient>
          </defs>

          {/* Top Baroque Loop & Crest */}
          <path
            d="M 50 12 C 40 12 36 2 50 2 C 64 2 60 12 50 12 Z"
            fill="none"
            stroke="url(#filigreeGrad)"
            strokeWidth="2.5"
          />
          <circle cx="50" cy="7" r="3" fill="#d4af37" />
          <path
            d="M 38 15 C 44 8 56 8 62 15 C 56 18 44 18 38 15 Z"
            fill="url(#filigreeGrad)"
          />

          {/* Outer Filigree Flourishes Left & Right */}
          <path
            d="M 20 40 C 8 46 8 62 20 68 C 14 56 16 48 20 40 Z"
            fill="url(#filigreeGrad)"
          />
          <path
            d="M 80 40 C 92 46 92 62 80 68 C 86 56 84 48 80 40 Z"
            fill="url(#filigreeGrad)"
          />

          {/* Clock Outer Rim */}
          <circle
            cx="50"
            cy="55"
            r="36"
            fill="url(#clockDialGrad)"
            stroke="url(#bronzeBorderGrad)"
            strokeWidth="3.5"
            className="drop-shadow"
          />

          {/* Inner Rivet Ring */}
          <circle
            cx="50"
            cy="55"
            r="32"
            fill="none"
            stroke="#5c4428"
            strokeWidth="1"
            strokeDasharray="2 3"
          />

          {/* Roman Numerals / Dial Ticks */}
          <text x="50" y="32" textAnchor="middle" fill="#d4af37" fontSize="7" fontFamily="Cinzel, serif" fontWeight="bold">XII</text>
          <text x="75" y="58" textAnchor="middle" fill="#d4af37" fontSize="7" fontFamily="Cinzel, serif" fontWeight="bold">III</text>
          <text x="50" y="82" textAnchor="middle" fill="#d4af37" fontSize="7" fontFamily="Cinzel, serif" fontWeight="bold">VI</text>
          <text x="25" y="58" textAnchor="middle" fill="#d4af37" fontSize="7" fontFamily="Cinzel, serif" fontWeight="bold">IX</text>

          {/* Ticks for other hours */}
          {[30, 60, 120, 150, 210, 240, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="50"
              y1="26"
              x2="50"
              y2="28"
              stroke="#8a6f44"
              strokeWidth="1"
              transform={`rotate(${deg} 50 55)`}
            />
          ))}

          {/* Hour Hand */}
          <line
            x1="50"
            y1="55"
            x2="50"
            y2="38"
            stroke="#d4af37"
            strokeWidth="2.2"
            strokeLinecap="round"
            transform={`rotate(${hourHandAngle} 50 55)`}
            className="transition-transform duration-700 ease-out"
          />

          {/* Minute Hand */}
          <line
            x1="50"
            y1="55"
            x2="50"
            y2="31"
            stroke="#f5d77f"
            strokeWidth="1.4"
            strokeLinecap="round"
            transform={`rotate(${minuteHandAngle} 50 55)`}
            className="transition-transform duration-500 ease-out"
          />

          {/* Center Pin */}
          <circle cx="50" cy="55" r="2.8" fill="#d4af37" stroke="#120e0a" strokeWidth="1" />

          {/* Bottom Spire / Fleur-de-lis Pendant */}
          <path
            d="M 50 91 L 46 99 L 50 108 L 54 99 Z"
            fill="url(#filigreeGrad)"
          />
          <path
            d="M 43 96 C 41 102 46 103 48 102 Z"
            fill="url(#filigreeGrad)"
          />
          <path
            d="M 57 96 C 59 102 54 103 52 102 Z"
            fill="url(#filigreeGrad)"
          />
        </svg>

        {/* Turn Indicator Label Overlay directly under clock */}
        <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-stone-950/95 border border-amber-800/80 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.9)] flex items-center gap-1 whitespace-nowrap">
          <span className="text-[9px] sm:text-[10px] font-cinzel font-bold tracking-widest text-amber-400 uppercase">
            {turn === 'Player' ? `TURN: ${playerActionsRemaining}` : 'ENEMY'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CombatGothicClock;

import React from 'react';
import PlayerTopHUD from './PlayerTopHUD';
import EnemyTopHUD from './EnemyTopHUD';
import CombatGothicClock from './CombatGothicClock';

export const CombatTopHUD: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none w-full">
      {/* Gothic Atmospheric Header Vignette Wash */}
      <div className="absolute inset-0 h-32 sm:h-36 bg-gradient-to-b from-stone-950/95 via-stone-950/70 to-transparent pointer-events-none" />

      {/* Top HUD Row spanning width */}
      <div className="relative w-full max-w-[1920px] mx-auto px-2 sm:px-4 md:px-6 pt-2 sm:pt-3 flex items-start justify-between gap-2 sm:gap-4 overflow-visible">
        {/* Top-Left: Player HUD */}
        <div className="flex-1 flex justify-start min-w-0">
          <PlayerTopHUD />
        </div>

        {/* Top-Center: Antique Gothic Clock 
        <div className="shrink-0 flex justify-center -mt-1 sm:-mt-2">
          <CombatGothicClock />
        </div>*/}

        {/* Top-Right: Enemy HUD (Mirrored) */}
        <div className="flex-1 flex justify-end min-w-0">
          <EnemyTopHUD />
        </div>
      </div>
    </div>
  );
};

export default CombatTopHUD;

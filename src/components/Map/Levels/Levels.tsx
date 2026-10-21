import { useEffect } from 'react';
import ShowLoot from '../../Announcers/ShowLoot';
import { useLevelsStore } from '../../../stores';
import { Unit } from '../../../types';
import { Enemy } from '../../Enemy';
import { DialogNicolai } from '../../DialogNicolai';
import { Centerer } from '../../Centerer';
import werewolfHowl from '../../../assets/sound/werewolfhowl.ogg';
import { soundEngine } from '../../../services/soundEngine';
import { getLevelDefinition } from '../../../data/levels';

import { AtmosphereParticles } from '../../Atmosphere';

const playHowl = () => {
  soundEngine.playSfx(werewolfHowl);
};

export const Levels = () => {
  const currentLevelId = useLevelsStore((state) => state.currentLevelId);
  const enemiesByLevel = useLevelsStore((state) => state.enemiesByLevel);
  const cannibalDied = useLevelsStore((state) => state.cannibalDied);
  const { updateCannibalDied } = useLevelsStore();

  const currentDef = getLevelDefinition(currentLevelId);
  const enemies = enemiesByLevel[currentLevelId] ?? [];

  // Dark Passage Cannibal death trigger
  useEffect(() => {
    if (
      currentLevelId === 'darkPassage' &&
      enemies.length === 0 &&
      !cannibalDied
    ) {
      updateCannibalDied();
      playHowl();
    }
  }, [currentLevelId, enemies.length, cannibalDied, updateCannibalDied]);

  if (!currentDef || currentDef.isHub) {
    return null;
  }

  return (
    <div className="w-full h-full flex-1 flex flex-col self-stretch min-h-0 overflow-hidden relative">
      <ShowLoot text="Looking the place you find:" />

      {currentDef.specialEvent === 'dialog_nicolai' ? (
        <div
          className="relative flex items-center justify-center w-full h-full flex-1 self-stretch min-h-0 p-6 bg-cover bg-center shadow-inner"
          style={{ backgroundImage: `url(${currentDef.bgImage})` }}
        >
          <div className="absolute inset-0 bg-stone-950/50 pointer-events-none" />
          <AtmosphereParticles levelIdOverride={currentLevelId} />
          <div className="relative z-10 w-full flex justify-center">
            <Centerer>
              <DialogNicolai />
            </Centerer>
          </div>
        </div>
      ) : (
        <div
          className="relative flex items-center justify-around w-full h-full flex-1 self-stretch p-6 bg-cover bg-center shadow-inner overflow-hidden min-h-0"
          style={{ backgroundImage: `url(${currentDef.bgImage})` }}
        >
          <div className="absolute inset-0 bg-stone-950/40 backdrop-brightness-90 pointer-events-none" />
          <AtmosphereParticles levelIdOverride={currentLevelId} />
          <div className="relative z-10 flex flex-wrap items-center justify-around gap-8 w-full">
            {enemies.map((enemy: Unit) => (
              <Enemy enemy={enemy} key={enemy.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Levels;

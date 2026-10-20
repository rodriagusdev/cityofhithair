import ShowLoot from '../../Announcers/ShowLoot';
import { useLevelsStore } from '../../../stores';
import { Unit } from '../../../types';
import { Enemy } from '../../Enemy';
import { DialogNicolai } from '../../DialogNicolai';
import { Centerer } from '../../Centerer';
import { useEffect } from 'react';
import werewolfHowl from '../../../assets/sound/werewolfhowl.ogg';
import { soundEngine } from '../../../services/soundEngine';
import cemeteryBg from '../../../assets/levels/cemetery.webp';
import mausoleumBg from '../../../assets/levels/mausoleum.webp';
import darkPassageBg from '../../../assets/levels/darkpassage.webp';
import lostGalleryBg from '../../../assets/levels/lostgallery.webp';
import heartsPrisonBg from '../../../assets/levels/heartsprison.webp';

const playHowl = () => {
  soundEngine.playSfx(werewolfHowl);
};

const Levels = () => {
  const cemeteryEnemies = useLevelsStore((state) => state.cemeteryEnemies);
  const mausoleumEnemies = useLevelsStore((state) => state.mausoleumEnemies);
  const dPassageEnemies = useLevelsStore((state) => state.dPassageEnemies);
  const lostGalleryEnemies = useLevelsStore(
    (state) => state.lostGalleryEnemies
  );

  const isInCemetery = useLevelsStore((state) => state.isInCemetery);
  const isInMausoleum = useLevelsStore((state) => state.isInMausoleum);
  const isInDarkPassage = useLevelsStore((state) => state.isInDarkPassage);
  const isInLostGallery = useLevelsStore((state) => state.isInLostGallery);
  const isInHeartPrison = useLevelsStore((state) => state.isInHeartPrison);

  const cannibalDied = useLevelsStore((state) => state.cannibalDied);
  const { updateCannibalDied } = useLevelsStore();

  useEffect(() => {
    if (dPassageEnemies.length === 0 && cannibalDied === false) {
      updateCannibalDied();
      playHowl();
    }
  }, [dPassageEnemies, cannibalDied, updateCannibalDied]);

  const renderEnemyRow = (enemies: Array<Unit>, bgImage: string) => (
    <div
      className="relative flex items-center justify-around w-full h-full flex-1 self-stretch p-6 bg-cover bg-center shadow-inner overflow-hidden min-h-0"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-stone-950/40 backdrop-brightness-90 pointer-events-none" />
      <div className="relative z-10 flex flex-wrap items-center justify-around gap-8 w-full">
        {enemies.length === 0 ? (
          <div className="p-4 bg-stone-950/80 border border-stone-800 rounded-lg text-center font-cinzel text-stone-400 text-sm italic">
            This hollow ground has been cleansed of demonic corruption.
          </div>
        ) : (
          enemies.map((enemy: Unit) => (
            <Enemy enemy={enemy} key={enemy.id} />
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full h-full flex-1 flex flex-col self-stretch min-h-0 overflow-hidden">
      <ShowLoot text="Looking the place you find:" />

      {isInCemetery && renderEnemyRow(cemeteryEnemies, cemeteryBg)}
      {isInMausoleum && renderEnemyRow(mausoleumEnemies, mausoleumBg)}
      {isInDarkPassage && renderEnemyRow(dPassageEnemies, darkPassageBg)}
      {isInLostGallery && renderEnemyRow(lostGalleryEnemies, lostGalleryBg)}

      {isInHeartPrison && (
        <div
          className="relative flex items-center justify-center w-full h-full flex-1 self-stretch min-h-0 p-6 bg-cover bg-center shadow-inner"
          style={{ backgroundImage: `url(${heartsPrisonBg})` }}
        >
          <div className="absolute inset-0 bg-stone-950/50 pointer-events-none" />
          <div className="relative z-10 w-full flex justify-center">
            <Centerer>
              <DialogNicolai />
            </Centerer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Levels;

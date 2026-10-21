import React from 'react';
import { useBattleStore, usePlayerStore } from '../../stores';
import { Unit } from '../../types';

interface Props {
  enemy: Unit;
}

const Enemy: React.FC<Props> = ({ enemy }) => {
  const { updateFightingStatus, updateBoardEnemy, updateBoardPlayer } =
    useBattleStore();
  const getEffectivePlayer = usePlayerStore((state) => state.getEffectivePlayer);

  const getSelected = () => {
    updateFightingStatus();
    const selectEnemy = { ...enemy };
    updateBoardEnemy(selectEnemy);
    const sendPlayerHero = { ...getEffectivePlayer() };
    updateBoardPlayer(sendPlayerHero);
  };

  return (
    <div
      onClick={getSelected}
      className="flex flex-col items-center gap-2 group cursor-pointer transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="relative overflow-hidden rounded-full border-2 border-red-950 bg-stone-950 p-1 group-hover:border-red-600 group-hover:ring-2 group-hover:ring-red-600/40 transition-all duration-300 shadow-xl">
        <div className="w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-full group-hover:scale-110 transition-transform duration-300">
          <img
            src={enemy.portraitFace}
            alt={enemy.name}
            style={{ transform: 'scaleX(-1)' }}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 rounded-full bg-red-950/20 group-hover:bg-transparent transition-colors pointer-events-none" />
      </div>

      <div className="text-center">
        <h4 className="font-cinzel text-xs md:text-sm font-bold tracking-wider text-white uppercase drop-shadow-sm">
          {enemy.name}
        </h4>
        <span className="font-cinzel text-[10px] text-stone-500 uppercase tracking-widest group-hover:text-stone-400">
          Engage
        </span>
      </div>
    </div>
  );
};

export default Enemy;

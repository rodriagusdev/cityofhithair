import { useEffect, useState } from 'react';
import { PlayerUI } from '../PlayerUI';
import { City } from './City';
import { Levels } from './Levels';
import { GameOver } from '../GameOver';
import { Presentation } from '../Presentation';
import { NextLevel } from './NextLevel';
import { Board } from '../Board';
import { MusicPlayer } from '../MusicPlayer';
import { LowHealthVignette } from '../Atmosphere';
import { useLevelsStore, useBattleStore, usePlayerStore } from '../../stores';
import { getLevelDefinition } from '../../data/levels';
import hithairBg from '../../assets/levels/hithair.webp';

const MapMain = () => {
  const [presentation, setPresentation] = useState(true);
  const [track, setTrack] = useState('');

  const isInFight = useBattleStore((state) => state.isInFight);
  const getPlayerHero = usePlayerStore((state) => state.player);
  const currentLevelId = useLevelsStore((state) => state.currentLevelId);
  const isInHithair = useLevelsStore((state) => state.isInHithair);
  const levelName = useLevelsStore((state) => state.levelName);

  useEffect(() => {
    const levelDef = getLevelDefinition(currentLevelId);
    setTrack(levelDef?.musicTrack ?? (isInHithair ? 'hithair' : 'dungeons'));
  }, [currentLevelId, isInHithair]);

  return (
    <div className="relative h-screen w-full bg-stone-950 text-stone-100 overflow-hidden flex flex-col">
      <MusicPlayer track={track} />
      <LowHealthVignette />
      {presentation && <Presentation setPresentation={setPresentation} />}

      {getPlayerHero.health <= 0 && <GameOver />}

      {isInFight ? (
        <div className="w-full h-full overflow-hidden">
          <Board />
        </div>
      ) : (
        <div className="flex flex-col flex-1 h-[calc(100vh)] min-h-0 w-full overflow-hidden">
          {/* Gothic Atmosphere Top Bar - Name in White */}
          <header className="relative flex items-center justify-center py-2 px-6 bg-stone-950 border-b border-stone-800/90 shadow-md w-full shrink-0 h-12">
            <h1 className="font-cinzel text-lg md:text-xl font-bold tracking-widest text-white uppercase drop-shadow">
              {levelName}
            </h1>
          </header>

          {/* Main Exploratory Full-Width & Full-Height Grid */}
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px] gap-3 p-3 w-full h-[calc(100vh-3rem)] overflow-hidden">
            {/* Left: Location Zone (City or Dungeon Levels) occupying 100% full height */}
            <div className="w-full h-full flex flex-col self-stretch min-h-0 rounded-xl border border-stone-800/80 shadow-2xl overflow-hidden relative">
              {isInHithair ? (
                <div
                  className="relative flex flex-col justify-center w-full h-full flex-1 self-stretch bg-cover bg-center min-h-0"
                  style={{ backgroundImage: `url(${hithairBg})` }}
                >
                  <div className="absolute inset-0 bg-stone-950/30 backdrop-brightness-95 pointer-events-none" />
                  <div className="relative z-10 w-full h-full flex-1 flex flex-col justify-center">
                    <City />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex-1 flex flex-col self-stretch min-h-0 overflow-hidden">
                  <Levels />
                </div>
              )}
            </div>

            {/* Right: Hero Vitals/Inventory & Travel Navigator */}
            <div className="w-full h-full flex flex-col gap-3 self-stretch min-h-0 overflow-hidden">
              <PlayerUI />
              <NextLevel />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapMain;

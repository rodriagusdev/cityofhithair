import { useLevelsStore } from '../../../stores';
import { getAllLevels } from '../../../data/levels';
import TravelWaypoint from './TravelWaypoint';

export const NextLevel = () => {
  const {
    currentLevelId,
    isInHithair,
    isLevelAccessible,
    getEnemiesForLevel,
    travelTo,
  } = useLevelsStore();

  const allLevels = getAllLevels();

  const waypoints = allLevels.map((level) => {
    const isCurrent = level.id === currentLevelId;
    const isAccessible = isLevelAccessible(level.id);
    const enemies = getEnemiesForLevel(level.id);
    const hasInitialEnemies = Boolean(level.initialEnemies && level.initialEnemies.length > 0);

    return {
      id: level.id,
      name: level.name,
      image: level.bgImage,
      isCurrent,
      isAccessible,
      remainingEnemies: hasInitialEnemies ? enemies.length : undefined,
    };
  });

  return (
    <div className="flex-1 min-h-0 flex flex-col w-full p-2.5 bg-stone-950/85 backdrop-blur-md border border-stone-800 rounded-lg shadow-xl text-stone-200 overflow-hidden">
      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-stone-800/80 shrink-0">
        <h4 className="font-cinzel text-xs font-bold tracking-widest text-stone-400 uppercase">
          Passages & Waypoints
        </h4>
        <span className="text-[10px] text-stone-500 italic">
          {isInHithair ? 'Hub of Hithair' : 'Dungeon Depths'}
        </span>
      </div>

      <div className="flex-1 min-h-0 flex flex-col gap-1.5 overflow-y-auto overflow-x-hidden px-3.5 py-1.5 custom-scrollbar">
        {waypoints.map((wp) => {
          let status: 'current' | 'accessible' | 'locked' = 'locked';
          if (wp.isCurrent) status = 'current';
          else if (wp.isAccessible) status = 'accessible';

          return (
            <TravelWaypoint
              key={wp.id}
              id={wp.id}
              name={wp.name}
              image={wp.image}
              status={status}
              remainingEnemies={wp.remainingEnemies}
              onTravel={() => travelTo(wp.id)}
            />
          );
        })}
      </div>

      {!isInHithair && (
        <button
          type="button"
          onClick={() => travelTo('hithair')}
          className="mt-2 shrink-0 py-1.5 px-3 font-cinzel text-xs tracking-wider font-bold text-stone-200 bg-red-950/90 hover:bg-red-900 hover:text-white border border-red-900/80 hover:border-red-700 rounded transition-all cursor-pointer shadow-sm text-center"
        >
          Retreat to Safety
        </button>
      )}
    </div>
  );
};

export default NextLevel;

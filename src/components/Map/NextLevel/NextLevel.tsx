import { useLevelsStore } from '../../../stores';
import cemeteryBg from '../../../assets/levels/cemetery.webp';
import mausoleumBg from '../../../assets/levels/mausoleum.webp';
import darkPassageBg from '../../../assets/levels/darkpassage.webp';
import lostGalleryBg from '../../../assets/levels/lostgallery.webp';
import heartsPrisonBg from '../../../assets/levels/heartsprison.webp';
import hithairBg from '../../../assets/levels/hithair.webp';
import TravelWaypoint from './TravelWaypoint';

type DestinationKey =
  | 'hithair'
  | 'cemetery'
  | 'mausoleum'
  | 'darkPassage'
  | 'lostGallery'
  | 'heartPrison';

const NextLevel = () => {
  const {
    isInHithair,
    isInCemetery,
    isInMausoleum,
    isInDarkPassage,
    isInLostGallery,
    isInHeartPrison,
    cemeteryEnemies,
    mausoleumEnemies,
    dPassageEnemies,
    lostGalleryEnemies,
    travelTo,
  } = useLevelsStore();

  const isCemeteryCleared = cemeteryEnemies.length === 0;
  const isMausoleumCleared = mausoleumEnemies.length === 0;
  const isDarkPassageCleared = dPassageEnemies.length === 0;
  const isLostGalleryCleared = lostGalleryEnemies.length === 0;

  // Dungeon definitions and unlock progression
  const waypoints: Array<{
    id: DestinationKey;
    name: string;
    image: string;
    isCurrent: boolean;
    isAccessible: boolean;
    remainingEnemies?: number;
  }> = [
    {
      id: 'hithair',
      name: 'City of Hithair',
      image: hithairBg,
      isCurrent: isInHithair,
      isAccessible: true, // Can always return to Hithair hub
    },
    {
      id: 'cemetery',
      name: 'Cemetery',
      image: cemeteryBg,
      isCurrent: isInCemetery,
      isAccessible: true, // First dungeon, always unlocked
      remainingEnemies: cemeteryEnemies.length,
    },
    {
      id: 'mausoleum',
      name: 'Mausoleum',
      image: mausoleumBg,
      isCurrent: isInMausoleum,
      isAccessible: isCemeteryCleared,
      remainingEnemies: mausoleumEnemies.length,
    },
    {
      id: 'darkPassage',
      name: 'Dark Passage',
      image: darkPassageBg,
      isCurrent: isInDarkPassage,
      isAccessible: isCemeteryCleared && isMausoleumCleared,
      remainingEnemies: dPassageEnemies.length,
    },
    {
      id: 'lostGallery',
      name: 'Lost Gallery',
      image: lostGalleryBg,
      isCurrent: isInLostGallery,
      isAccessible: isCemeteryCleared && isMausoleumCleared && isDarkPassageCleared,
      remainingEnemies: lostGalleryEnemies.length,
    },
    {
      id: 'heartPrison',
      name: "Heart's Prison",
      image: heartsPrisonBg,
      isCurrent: isInHeartPrison,
      isAccessible:
        isCemeteryCleared &&
        isMausoleumCleared &&
        isDarkPassageCleared &&
        isLostGalleryCleared,
    },
  ];

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

      <div className="flex-1 min-h-0 flex flex-col gap-1.5 overflow-y-auto custom-scrollbar pr-1">
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
          Retreat to Safety (Hithair)
        </button>
      )}
    </div>
  );
};

export default NextLevel;

import React from 'react';
import DungeonIcon from './DungeonIcon';

interface TravelWaypointProps {
  id: string;
  name: string;
  status: 'current' | 'accessible' | 'locked';
  remainingEnemies?: number;
  image?: string;
  onTravel: () => void;
}

export const TravelWaypoint: React.FC<TravelWaypointProps> = ({
  name,
  status,
  remainingEnemies,
  image,
  onTravel,
}) => {
  const isCurrent = status === 'current';
  const isAccessible = status === 'accessible';
  const isLocked = status === 'locked';

  return (
    <button
      type="button"
      disabled={isLocked || isCurrent}
      onClick={onTravel}
      className={`group relative flex items-center justify-between w-full px-2.5 py-1.5 text-left rounded-lg border transition-all duration-200 overflow-hidden ${isCurrent
        ? 'border-red-900 bg-stone-900/95 text-stone-100 ring-1 ring-red-800/50 shadow-md'
        : isAccessible
          ? 'border-stone-800 bg-stone-950/70 text-stone-200 hover:border-red-900 hover:bg-stone-900/80 cursor-pointer shadow-sm'
          : 'border-stone-900 bg-stone-950/40 text-stone-600 cursor-not-allowed opacity-40'
        }`}
    >
      {/* Background ambient texture if level image exists */}
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}

      <div className="relative z-10 flex items-center gap-2.5 min-w-0">
        <div
          className={`shrink-0 w-7 h-7 rounded-full border p-1 bg-stone-950 flex items-center justify-center transition-all ${isCurrent
            ? 'border-red-700 shadow-[0_0_8px_rgba(185,28,28,0.5)]'
            : isAccessible
              ? 'border-stone-700 group-hover:border-red-700 group-hover:scale-105'
              : 'border-stone-900 opacity-30'
            }`}
        >
          <DungeonIcon
            className={`w-full h-full transition-colors ${isCurrent
              ? 'text-red-500'
              : isAccessible
                ? 'text-stone-300 group-hover:text-red-400'
                : 'text-stone-700'
              }`}
          />
        </div>

        <div className="flex flex-col min-w-0">
          <span className="font-cinzel text-xs tracking-wider font-bold uppercase text-white truncate">
            {name}
          </span>
          <span className="text-[10px] tracking-wide text-stone-400 truncate">
            {isCurrent && 'Current Location'}
            {isLocked && 'Sealed'}
          </span>
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-1.5 shrink-0 ml-2">
        {isAccessible && (
          <span className="text-xs text-red-600 group-hover:text-red-400 group-hover:translate-x-0.5 transition-transform">
            ➔
          </span>
        )}
      </div>
    </button>
  );
};

export default TravelWaypoint;

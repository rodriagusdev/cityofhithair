import { create } from 'zustand';
import { Unit } from '../types';
import {
  getLevelDefinition,
  getInitialEnemiesMap,
  LEVEL_REGISTRY,
} from '../data/levels';

export type DestinationKey =
  | 'hithair'
  | 'cemetery'
  | 'mausoleum'
  | 'darkPassage'
  | 'lostGallery'
  | 'heartPrison'
  | string;

export type PossibleLevelsForEnemies =
  | 'cemeteryEnemies'
  | 'mausoleumEnemies'
  | 'dPassageEnemies'
  | 'lostGalleryEnemies'
  | string;

interface State {
  currentLevelId: string;
  levelName: string;
  enemiesByLevel: Record<string, Array<Unit>>;
  clearedLevelIds: Record<string, boolean>;
  cannibalDied: boolean;

  // Legacy convenience properties for full backwards compatibility
  isInHithair: boolean;
  isInCemetery: boolean;
  isInMausoleum: boolean;
  isInDarkPassage: boolean;
  isInLostGallery: boolean;
  isInHeartPrison: boolean;
  cemeteryEnemies: Array<Unit>;
  mausoleumEnemies: Array<Unit>;
  dPassageEnemies: Array<Unit>;
  lostGalleryEnemies: Array<Unit>;
  levelsCompletion: {
    cemetery: number;
    mausoleum: number;
    darkPassage: number;
    lostGallery: number;
  };
}

interface Actions {
  travelTo: (destination: DestinationKey) => void;
  returnToHithair: () => void;
  updateLevelName: (level: string) => void;
  updateLevelEnemies: (
    enemyLevel: PossibleLevelsForEnemies,
    id: number
  ) => Promise<Array<Unit>>;
  isLevelCleared: (levelId: string) => boolean;
  isLevelAccessible: (levelId: string) => boolean;
  getEnemiesForLevel: (levelId: string) => Array<Unit>;
  updateLevelsCompletion: (level: string) => void;
  updateCannibalDied: () => void;
}

const initialEnemies = getInitialEnemiesMap();

export const useLevelsStore = create<State & Actions>((set, get) => ({
  currentLevelId: 'hithair',
  levelName: LEVEL_REGISTRY.hithair?.name ?? 'City of Hithair',
  enemiesByLevel: initialEnemies,
  clearedLevelIds: {},
  cannibalDied: false,

  // Legacy backwards compatibility initial values
  isInHithair: true,
  isInCemetery: false,
  isInMausoleum: false,
  isInDarkPassage: false,
  isInLostGallery: false,
  isInHeartPrison: false,
  cemeteryEnemies: initialEnemies['cemetery'] ?? [],
  mausoleumEnemies: initialEnemies['mausoleum'] ?? [],
  dPassageEnemies: initialEnemies['darkPassage'] ?? [],
  lostGalleryEnemies: initialEnemies['lostGallery'] ?? [],
  levelsCompletion: {
    cemetery: 0,
    mausoleum: 0,
    darkPassage: 0,
    lostGallery: 0,
  },

  travelTo: (dest) => {
    const def = getLevelDefinition(dest);
    const targetId = def?.id ?? dest;
    const targetName = def?.name ?? 'City of Hithair';

    set(() => ({
      currentLevelId: targetId,
      levelName: targetName,
      isInHithair: targetId === 'hithair',
      isInCemetery: targetId === 'cemetery',
      isInMausoleum: targetId === 'mausoleum',
      isInDarkPassage: targetId === 'darkPassage',
      isInLostGallery: targetId === 'lostGallery',
      isInHeartPrison: targetId === 'heartPrison',
    }));
  },

  returnToHithair: () => {
    get().travelTo('hithair');
  },

  updateLevelName: (level: string) => set(() => ({ levelName: level })),

  updateLevelEnemies: (enemyLevel: PossibleLevelsForEnemies, id: number) =>
    new Promise<Array<Unit>>((resolve) => {
      const state = get();
      const def = getLevelDefinition(enemyLevel);
      const levelId = def ? def.id : enemyLevel;
      const key = def?.enemyLevelKey ?? levelId;

      const currentList =
        state.enemiesByLevel[levelId] || state.enemiesByLevel[key] || [];
      const updatedList = currentList.filter((enemy) => enemy.id !== id);

      const nextEnemiesByLevel: Record<string, Array<Unit>> = {
        ...state.enemiesByLevel,
        [levelId]: updatedList,
      };
      if (def?.enemyLevelKey) {
        nextEnemiesByLevel[def.enemyLevelKey] = updatedList;
      }

      const nextCleared = { ...state.clearedLevelIds };
      if (updatedList.length === 0) {
        nextCleared[levelId] = true;
      }

      set(() => ({
        enemiesByLevel: nextEnemiesByLevel,
        clearedLevelIds: nextCleared,
        // Synchronize legacy convenience arrays
        cemeteryEnemies: nextEnemiesByLevel['cemetery'] ?? [],
        mausoleumEnemies: nextEnemiesByLevel['mausoleum'] ?? [],
        dPassageEnemies: nextEnemiesByLevel['darkPassage'] ?? [],
        lostGalleryEnemies: nextEnemiesByLevel['lostGallery'] ?? [],
      }));

      resolve(updatedList);
    }),

  isLevelCleared: (levelId: string) => {
    const state = get();
    if (state.clearedLevelIds[levelId]) return true;
    const def = getLevelDefinition(levelId);
    if (!def) return false;
    const list = state.enemiesByLevel[def.id] ?? [];
    return (def.initialEnemies?.length ?? 0) > 0 && list.length === 0;
  },

  isLevelAccessible: (levelId: string) => {
    const def = getLevelDefinition(levelId);
    if (!def || !def.unlockedBy) return true;
    const reqs = Array.isArray(def.unlockedBy) ? def.unlockedBy : [def.unlockedBy];
    return reqs.every((req) => get().isLevelCleared(req));
  },

  getEnemiesForLevel: (levelId: string) => {
    const def = getLevelDefinition(levelId);
    const key = def?.id ?? levelId;
    return get().enemiesByLevel[key] ?? [];
  },

  updateLevelsCompletion: (level: string) => {
    const def = getLevelDefinition(level);
    const levelId = def?.id ?? level;

    set((state) => ({
      clearedLevelIds: { ...state.clearedLevelIds, [levelId]: true },
      levelsCompletion: {
        ...state.levelsCompletion,
        ...(levelId in state.levelsCompletion
          ? { [levelId as keyof State['levelsCompletion']]: 1 }
          : {}),
      },
    }));
  },

  updateCannibalDied: () => {
    set(() => ({ cannibalDied: true }));
  },
}));

export default useLevelsStore;

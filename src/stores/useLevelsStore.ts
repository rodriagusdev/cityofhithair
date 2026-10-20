import { create } from 'zustand';
import {
  cemeteryData,
  darkPassageData,
  lostGalleryData,
  mausoleumData,
} from '../data/general';
import { Unit } from '../types';

type possibleLevelsToUpdateStatus =
  | 'isInHithair'
  | 'isInCemetery'
  | 'isInMausoleum'
  | 'isInDarkPassage'
  | 'isInLostGallery'
  | 'isInHeartPrison';

type possibleLevelsForEnemies =
  | 'cemeteryEnemies'
  | 'mausoleumEnemies'
  | 'dPassageEnemies'
  | 'lostGalleryEnemies';

interface State {
  levelName: string;
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
  cannibalDied: boolean;
}

interface Actions {
  updateLevelName: (level: string) => void;
  updateLevelStatus: (level: possibleLevelsToUpdateStatus) => void;
  updateLevelEnemies: (
    enemyLevel: possibleLevelsForEnemies,
    id: number
  ) => Promise<Array<Unit>>;
  returnToHithair: () => void;
  travelTo: (
    destination:
      | 'hithair'
      | 'cemetery'
      | 'mausoleum'
      | 'darkPassage'
      | 'lostGallery'
      | 'heartPrison'
  ) => void;
  updateLevelsCompletion: (level: string) => void;
  updateCannibalDied: () => void;
}

const useLevelsStore = create<State & Actions>((set, get) => ({
  levelName: 'City of Hithair',
  isInHithair: true,
  isInCemetery: false,
  isInMausoleum: false,
  isInDarkPassage: false,
  isInLostGallery: false,
  isInHeartPrison: false,
  cemeteryEnemies: cemeteryData,
  mausoleumEnemies: mausoleumData,
  dPassageEnemies: darkPassageData,
  lostGalleryEnemies: lostGalleryData,
  levelsCompletion: {
    cemetery: 0,
    mausoleum: 0,
    darkPassage: 0,
    lostGallery: 0,
  },
  cannibalDied: false,
  updateLevelName: (level: string) => set(() => ({ levelName: level })),
  updateLevelStatus: (level: possibleLevelsToUpdateStatus) => {
    set((state) => ({
      [level]: !state[level],
    }));
  },
  updateLevelEnemies: (enemyLevel: possibleLevelsForEnemies, id: number) =>
    new Promise<Array<Unit>>((resolve) => {
      const updateEnemies = get()[enemyLevel].filter(
        (enemies) => enemies.id != id
      );
      set({ [enemyLevel]: updateEnemies });
      resolve(updateEnemies);
    }),
  returnToHithair: () =>
    set(() => ({
      isInHithair: true,
      isInCemetery: false,
      isInMausoleum: false,
      isInDarkPassage: false,
      isInLostGallery: false,
      isInHeartPrison: false,
      levelName: 'City of Hithair',
    })),
  travelTo: (dest) => {
    const levelNames = {
      hithair: 'City of Hithair',
      cemetery: 'Cemetery',
      mausoleum: 'Mausoleum',
      darkPassage: 'Dark Passage',
      lostGallery: 'Lost Gallery',
      heartPrison: "Heart's Prison",
    };

    set(() => ({
      isInHithair: dest === 'hithair',
      isInCemetery: dest === 'cemetery',
      isInMausoleum: dest === 'mausoleum',
      isInDarkPassage: dest === 'darkPassage',
      isInLostGallery: dest === 'lostGallery',
      isInHeartPrison: dest === 'heartPrison',
      levelName: levelNames[dest] || 'City of Hithair',
    }));
  },
  updateLevelsCompletion: (level: string) => {
    let key: keyof State['levelsCompletion'] | null = null;

    switch (level) {
      case 'cemetery':
      case 'cemeteryEnemies':
        key = 'cemetery';
        break;
      case 'mausoleum':
      case 'mausoleumEnemies':
        key = 'mausoleum';
        break;
      case 'dark passage':
      case 'darkPassage':
      case 'dPassageEnemies':
        key = 'darkPassage';
        break;
      case 'lost gallery':
      case 'lostGallery':
      case 'lostGalleryEnemies':
        key = 'lostGallery';
        break;
      default:
        break;
    }

    if (key) {
      set((state) => ({
        levelsCompletion: { ...state.levelsCompletion, [key!]: 1 },
      }));
    }
  },
  updateCannibalDied: () => {
    set(() => ({ cannibalDied: true }));
  },
}));

export default useLevelsStore;

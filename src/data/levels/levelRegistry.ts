import hithairBg from '../../assets/levels/hithair.webp';
import cemeteryBg from '../../assets/levels/cemetery.webp';
import mausoleumBg from '../../assets/levels/mausoleum.webp';
import darkPassageBg from '../../assets/levels/darkpassage.webp';
import lostGalleryBg from '../../assets/levels/lostgallery.webp';
import heartsPrisonBg from '../../assets/levels/heartsprison.webp';

import {
  cemeteryData,
  darkPassageData,
  lostGalleryData,
  mausoleumData,
} from '../general';
import {
  cemeteryLoot,
  darkPassageLoot,
  lostGalleryLoot,
  mausoleumLoot,
} from '../loot';
import { notesInfo } from '../general/dialogTexts';
import { LevelDefinition } from './types';
import { Unit } from '../../types';

export const LEVEL_REGISTRY: Record<string, LevelDefinition> = {
  hithair: {
    id: 'hithair',
    name: 'City of Hithair',
    bgImage: hithairBg,
    musicTrack: 'hithair',
    isHub: true,
    initialEnemies: [],
  },
  cemetery: {
    id: 'cemetery',
    enemyLevelKey: 'cemeteryEnemies',
    name: 'Cemetery',
    bgImage: cemeteryBg,
    musicTrack: 'dungeons',
    initialEnemies: cemeteryData,
    loot: {
      gold: 100,
      healthPotions: 1,
      manaPotions: 1,
      lootItems: cemeteryLoot,
      notes: [
        {
          id: 'journal-I',
          title: 'Journal - Part I',
          text: notesInfo.journalPartI,
        },
        {
          id: 'ofKoetria',
          title: 'Tome: Of Koetria',
          text: notesInfo.ofKoetria,
        },
      ],
    },
  },
  mausoleum: {
    id: 'mausoleum',
    enemyLevelKey: 'mausoleumEnemies',
    name: 'Mausoleum',
    bgImage: mausoleumBg,
    musicTrack: 'dungeons',
    unlockedBy: 'cemetery',
    initialEnemies: mausoleumData,
    loot: {
      gold: 175,
      healthPotions: 1,
      lootItems: mausoleumLoot,
      notes: [
        {
          id: 'journal-II',
          title: 'Journal - Part II',
          text: notesInfo.journalPartII,
        },
      ],
    },
  },
  darkPassage: {
    id: 'darkPassage',
    enemyLevelKey: 'dPassageEnemies',
    name: 'Dark Passage',
    bgImage: darkPassageBg,
    musicTrack: 'dungeons',
    unlockedBy: ['cemetery', 'mausoleum'],
    initialEnemies: darkPassageData,
    specialEvent: 'werewolf_howl',
    loot: {
      gold: 280,
      healthPotions: 2,
      manaPotions: 1,
      lootItems: darkPassageLoot,
      notes: [
        {
          id: 'journal-III',
          title: 'Journal - Part III',
          text: notesInfo.journalPartIII,
        },
      ],
    },
  },
  lostGallery: {
    id: 'lostGallery',
    enemyLevelKey: 'lostGalleryEnemies',
    name: 'Lost Gallery',
    bgImage: lostGalleryBg,
    musicTrack: 'dungeons',
    unlockedBy: ['cemetery', 'mausoleum', 'darkPassage'],
    initialEnemies: lostGalleryData,
    loot: {
      lootItems: lostGalleryLoot,
      notes: [
        {
          id: 'journal-Hawnyr',
          title: 'Journal - Hawnyr',
          text: notesInfo.journalHawnyr,
        },
        {
          id: 'of-thinmel',
          title: 'Tome: Of Thinmel',
          text: notesInfo.ofThinmel,
        },
      ],
    },
  },
  heartPrison: {
    id: 'heartPrison',
    name: "Heart's Prison",
    bgImage: heartsPrisonBg,
    musicTrack: 'dungeons',
    unlockedBy: ['cemetery', 'mausoleum', 'darkPassage', 'lostGallery'],
    initialEnemies: [],
    specialEvent: 'dialog_nicolai',
  },
};

/**
 * Returns all configured level definitions in order of progression.
 */
export const getAllLevels = (): LevelDefinition[] => Object.values(LEVEL_REGISTRY);

/**
 * Finds a level definition by either its level ID (e.g. 'cemetery')
 * or its enemyLevelKey (e.g. 'cemeteryEnemies').
 */
export const getLevelDefinition = (idOrKey: string): LevelDefinition | undefined => {
  if (LEVEL_REGISTRY[idOrKey]) {
    return LEVEL_REGISTRY[idOrKey];
  }
  return Object.values(LEVEL_REGISTRY).find(
    (level) => level.enemyLevelKey === idOrKey || level.id.toLowerCase() === idOrKey.toLowerCase()
  );
};

/**
 * Returns an initial enemy mapping for the store.
 */
export const getInitialEnemiesMap = (): Record<string, Array<Unit>> => {
  const map: Record<string, Array<Unit>> = {};
  for (const level of Object.values(LEVEL_REGISTRY)) {
    if (level.initialEnemies) {
      map[level.id] = [...level.initialEnemies];
      if (level.enemyLevelKey) {
        map[level.enemyLevelKey] = map[level.id];
      }
    }
  }
  return map;
};

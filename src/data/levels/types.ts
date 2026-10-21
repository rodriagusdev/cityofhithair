import { Unit } from '../../types';

export interface LevelNoteReward {
  id: string;
  title: string;
  text: string;
}

export interface LevelLootConfig {
  gold?: number;
  healthPotions?: number;
  manaPotions?: number;
  notes?: LevelNoteReward[];
  lootItems?: Array<{
    name: string;
    image: string;
    description?: string;
    cost?: number;
    amount?: number;
  }>;
}

export interface LevelDefinition {
  id: string;
  name: string;
  bgImage: string;
  musicTrack?: string;
  isHub?: boolean;
  enemyLevelKey?: string;
  unlockedBy?: string | string[];
  initialEnemies?: Array<Unit>;
  loot?: LevelLootConfig;
  specialEvent?: 'dialog_nicolai' | 'werewolf_howl';
}

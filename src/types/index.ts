export interface ActiveStatusEffect {
  id: string;
  name: string;
  turnsRemaining: number;
  attackDelta?: number;
  defenseDelta?: number;
}

export type Skill = {
  name: string;
  description: string;
  image: string;
  cost: number;
};

// Backwards compatibility alias
export type skill = Skill;

export type Potion = Skill;
// Backwards compatibility alias
export type potion = Potion;

export interface UnitSounds {
  attack?: string;
  hit?: string;
  death?: string;
}

export interface Unit {
  id: number;
  level: string;
  name: string;
  health: number;
  maxHealth: number;
  defense: number;
  attack: number;
  magic: number;
  maxMagic: number;
  darkMastery: number;
  criticalChance: number;
  portraitFace: string;
  defaultAttack: number;
  removedAttack: number;
  removedDefense: number;
  frenzyAttack: number;
  defendArmor: number;
  vulnerabilityStatus: boolean;
  weaknessStatus: boolean;
  defenseStatus: number;
  frenzyStatus: number;
  sounds?: UnitSounds;
  soundAttack?: () => void;
  soundHitted?: () => void;
  soundDeath?: () => void;
  skills: Array<Skill>;
  statuses?: Array<ActiveStatusEffect>;
}

export interface Player extends Unit {
  player: boolean;
  heroClass: string;
  potions: Array<Potion>;
}

export interface StatModifiers {
  attack?: number;
  defense?: number;
  health?: number;
  maxHealth?: number;
  magic?: number;
  maxMagic?: number;
  criticalChance?: number;
  darkMastery?: number;
}

export type ItemSlot = 'weapon' | 'armor' | 'relic' | 'accessory' | 'consumable';

export interface Item {
  name: string;
  image: string;
  description: string;
  cost: number;
  fn?: () => void;
  slot?: ItemSlot;
  isEquipped?: boolean;
  isPassive?: boolean;
  statModifiers?: StatModifiers;
  grantedSkills?: Array<Skill>;
  grantedSpellNames?: Array<string>;
}

export interface ItemLoot {
  name: string;
  image: string;
}

export * from './dialog';

export type LegacyDialogOption = {
  createDialog?: () => void;
  text: string;
};

export interface Dialog {
  name: string;
  portrait: string;
  options: Array<LegacyDialogOption>;
  text: string;
}

export interface NoteProps {
  name: string;
  text: string;
}

export interface Action {
  text: string;
  attackerImg: string;
  receiverImg: string;
  skillIcon: string;
}

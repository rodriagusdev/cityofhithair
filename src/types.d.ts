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
  portrait: string;
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
  soundAttack: () => void;
  soundHitted: () => void;
  soundDeath: () => void;
  skills: Array<skill>;
  statuses?: Array<ActiveStatusEffect>;
}

export interface ActiveStatusEffect {
  id: string;
  name: string;
  turnsRemaining: number;
  attackDelta?: number;
  defenseDelta?: number;
}

export interface Player extends Unit {
  player: boolean;
  heroClass: string;
  potions: Array<potion>
}

interface Item {
  name: string;
  image: string;
  description: string;
  cost: number;
  fn?: () => void;
}

interface ItemLoot {
  name: string;
  image: string;
}

type DialogOption = {
  createDialog: () => void;
  text: string;
};

export interface Dialog {
  name: string;
  portrait: string;
  options: Array<DialogOption>;
  text: string;
}

export interface NoteProps {
  name: string;
  text: string;
}

type skill = {
  name: string;
  description: string;
  image: string;
  cost: number;
};

type potion = skill;

export interface Action {
  text: string;
  attackerImg: string;
  receiverImg: string;
  skillIcon: string;
}

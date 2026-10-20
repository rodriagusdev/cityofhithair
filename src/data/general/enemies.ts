import darkknightportrait from '../../assets/portraits/darkknightportrait.jpg';
import darkknightface from '../../assets/portraits/darkknightface.jpg';
import skeletonportrait from '../../assets/portraits/skeletonportrait.jpg';
import skeletonface from '../../assets/portraits/skeletonface.jpg';
import werewolfPortrait from '../../assets/portraits/werewolfportrait.jpg';
import werewolfface from '../../assets/portraits/werewolfface.jpg';
import cannibalportrait from '../../assets/portraits/cannibalportrait.jpg';
import cannibalface from '../../assets/portraits/cannibalface.jpg';
import attacksword from '../../assets/sound/attacksword.mp3';
import attackcannibal from '../../assets/sound/attackcannibal.ogg';
import attackwerewolf from '../../assets/sound/attackwerewolf.ogg';
import hittedskele from '../../assets/sound/hittedskeleton.mp3';
import hitteddk from '../../assets/sound/hitteddarkknight.ogg';
import hittedcannibal from '../../assets/sound/hittedcannibal.ogg';
import hittedwerewolf from '../../assets/sound/hittedwerewolf.ogg';
import deathcannibal from '../../assets/sound/deathcannibal.ogg';
import deathdarkknight from '../../assets/sound/deathdarkknight.ogg';
import deathwerewolf from '../../assets/sound/deathwerewolf.ogg';
import deathskeleton from '../../assets/sound/deathskeleton.mp3';
import { Unit } from '../../types';
import { attack } from '../skills/combat';
import { drainLife, vulnerability, weakness } from '../skills/darkmagic';

const attackSword = () => {
  new Audio(attacksword).play();
};

const attackCannibal = () => {
  new Audio(attackcannibal).play();
};

const attackWerewolf = () => {
  new Audio(attackwerewolf).play();
};

const hittedSkeleton = () => {
  new Audio(hittedskele).play();
};

const hittedDarkKnight = () => {
  new Audio(hitteddk).play();
};

const hittedCannibal = () => {
  new Audio(hittedcannibal).play();
};

const hittedWerewolf = () => {
  new Audio(hittedwerewolf).play();
};

const deathCannibal = () => {
  new Audio(deathcannibal).play();
};

const deathDarkKnight = () => {
  new Audio(deathdarkknight).play();
};

const deathWerewolf = () => {
  new Audio(deathwerewolf).play();
};

const deathSkeleton = () => {
  new Audio(deathskeleton).play();
};

export const cemeteryData: Array<Unit> = [
  {
    id: 3,
    level: 'cemeteryEnemies',
    name: 'Skeleton',
    health: 16,
    maxHealth: 16,
    defense: 1,
    attack: 6,
    defaultAttack: 6,
    magic: 0,
    maxMagic: 0,
    criticalChance: 10,
    portrait: skeletonportrait,
    portraitFace: skeletonface,
    removedAttack: 0,
    removedDefense: 0,
    frenzyAttack: 0,
    defendArmor: 0,
    vulnerabilityStatus: false,
    weaknessStatus: false,
    defenseStatus: 0,
    frenzyStatus: 0,
    darkMastery: 0,
    soundAttack: attackSword,
    soundHitted: hittedSkeleton,
    soundDeath: deathSkeleton,
    skills: [attack],
  },
  {
    id: 4,
    name: 'Skeleton',
    health: 25,
    maxHealth: 25,
    defense: 1,
    attack: 8,
    defaultAttack: 8,
    magic: 0,
    maxMagic: 0,
    criticalChance: 8,
    darkMastery: 0,
    portrait: skeletonportrait,
    portraitFace: skeletonface,
    level: 'cemeteryEnemies',
    removedAttack: 0,
    removedDefense: 0,
    frenzyAttack: 0,
    defendArmor: 0,
    vulnerabilityStatus: false,
    weaknessStatus: false,
    defenseStatus: 0,
    frenzyStatus: 0,
    soundAttack: attackSword,
    soundHitted: hittedSkeleton,
    soundDeath: deathSkeleton,
    skills: [attack],
  },
  {
    id: 5,
    name: 'Maevir',
    health: 50,
    maxHealth: 50,
    defense: 3,
    attack: 9,
    defaultAttack: 9,
    magic: 2,
    maxMagic: 2,
    darkMastery: 1,
    criticalChance: 12,
    portrait: darkknightportrait,
    portraitFace: darkknightface,
    level: 'cemeteryEnemies',
    removedAttack: 0,
    removedDefense: 0,
    frenzyAttack: 0,
    defendArmor: 0,
    vulnerabilityStatus: false,
    weaknessStatus: false,
    defenseStatus: 0,
    frenzyStatus: 0,
    soundAttack: attackSword,
    soundHitted: hittedDarkKnight,
    soundDeath: deathDarkKnight,
    skills: [attack, weakness],
  },
];

export const mausoleumData: Array<Unit> = [
  {
    id: 6,
    name: 'Skeleton',
    health: 35,
    maxHealth: 35,
    defense: 2,
    attack: 9,
    defaultAttack: 9,
    criticalChance: 25,
    magic: 0,
    maxMagic: 0,
    portrait: skeletonportrait,
    portraitFace: skeletonface,
    level: 'mausoleumEnemies',
    removedAttack: 0,
    removedDefense: 0,
    frenzyAttack: 0,
    defendArmor: 0,
    vulnerabilityStatus: false,
    weaknessStatus: false,
    defenseStatus: 0,
    frenzyStatus: 0,
    darkMastery: 0,
    soundAttack: attackSword,
    soundHitted: hittedSkeleton,
    soundDeath: deathSkeleton,
    skills: [attack],
  },
  {
    id: 9,
    name: 'Skeleton',
    health: 25,
    maxHealth: 25,
    defense: 4,
    attack: 7,
    defaultAttack: 7,
    criticalChance: 21,
    magic: 0,
    maxMagic: 0,
    portrait: skeletonportrait,
    portraitFace: skeletonface,
    level: 'mausoleumEnemies',
    removedAttack: 0,
    removedDefense: 0,
    frenzyAttack: 0,
    defendArmor: 0,
    vulnerabilityStatus: false,
    weaknessStatus: false,
    defenseStatus: 0,
    frenzyStatus: 0,
    darkMastery: 0,
    soundAttack: attackSword,
    soundHitted: hittedSkeleton,
    soundDeath: deathSkeleton,
    skills: [attack],
  },
  {
    id: 10,
    name: 'Lucard',
    health: 65,
    maxHealth: 65,
    defense: 1,
    attack: 13,
    defaultAttack: 13,
    magic: 6,
    maxMagic: 6,
    darkMastery: 4,
    criticalChance: 30,
    portrait: darkknightportrait,
    portraitFace: darkknightface,
    removedAttack: 0,
    removedDefense: 0,
    frenzyAttack: 0,
    defendArmor: 0,
    vulnerabilityStatus: false,
    weaknessStatus: false,
    defenseStatus: 0,
    frenzyStatus: 0,
    soundAttack: attackSword,
    soundHitted: hittedDarkKnight,
    soundDeath: deathDarkKnight,
    skills: [attack, vulnerability],
    level: 'mausoleumEnemies',
  },
  {
    id: 11,
    name: 'Eldare',
    health: 50,
    maxHealth: 50,
    defense: 6,
    attack: 7,
    defaultAttack: 7,
    magic: 2,
    maxMagic: 2,
    darkMastery: 2,
    criticalChance: 65,
    portrait: darkknightportrait,
    portraitFace: darkknightface,
    removedAttack: 0,
    removedDefense: 0,
    frenzyAttack: 0,
    defendArmor: 0,
    vulnerabilityStatus: false,
    weaknessStatus: false,
    defenseStatus: 0,
    frenzyStatus: 0,
    soundAttack: attackSword,
    soundHitted: hittedDarkKnight,
    soundDeath: deathDarkKnight,
    skills: [attack, weakness],
    level: 'mausoleumEnemies',
  },
];

export const darkPassageData: Array<Unit> = [
  {
    id: 122,
    name: 'The Cannibal',
    health: 60,
    maxHealth: 60,
    defense: 5,
    attack: 22,
    defaultAttack: 22,
    criticalChance: 30,
    magic: 2,
    maxMagic: 2,
    darkMastery: 2,
    portrait: cannibalportrait,
    portraitFace: cannibalface,
    removedAttack: 0,
    removedDefense: 0,
    frenzyAttack: 0,
    defendArmor: 0,
    vulnerabilityStatus: false,
    weaknessStatus: false,
    defenseStatus: 0,
    frenzyStatus: 0,
    soundAttack: attackCannibal,
    soundHitted: hittedCannibal,
    soundDeath: deathCannibal,
    skills: [attack, vulnerability],
    level: 'dPassageEnemies',
  },
];

export const lostGalleryData: Array<Unit> = [
  {
    id: 12,
    name: 'Hawnyr',
    health: 68,
    maxHealth: 68,
    defense: 4,
    attack: 19,
    defaultAttack: 19,
    criticalChance: 10,
    magic: 1,
    maxMagic: 1,
    darkMastery: 0,
    portrait: werewolfPortrait,
    portraitFace: werewolfface,
    removedAttack: 0,
    removedDefense: 0,
    frenzyAttack: 0,
    defendArmor: 0,
    vulnerabilityStatus: false,
    weaknessStatus: false,
    defenseStatus: 0,
    frenzyStatus: 0,
    soundAttack: attackWerewolf,
    soundHitted: hittedWerewolf,
    soundDeath: deathWerewolf,
    skills: [attack],
    level: 'lostGalleryEnemies',
  },
  {
    id: 13,
    name: 'Lazarus',
    health: 55,
    maxHealth: 55,
    defense: 6,
    attack: 13,
    defaultAttack: 11,
    criticalChance: 35,
    magic: 8,
    maxMagic: 8,
    darkMastery: 6,
    portrait: darkknightportrait,
    portraitFace: darkknightface,
    removedAttack: 0,
    removedDefense: 0,
    frenzyAttack: 0,
    defendArmor: 0,
    vulnerabilityStatus: false,
    weaknessStatus: false,
    defenseStatus: 0,
    frenzyStatus: 0,
    soundAttack: attackSword,
    soundHitted: hittedDarkKnight,
    soundDeath: deathDarkKnight,
    skills: [attack, drainLife, vulnerability],
    level: 'lostGalleryEnemies',
  },
];

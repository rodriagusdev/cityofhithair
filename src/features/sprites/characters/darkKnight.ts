import idleDarkKnightImg from '../../../assets/idledarkknight.png';
import attackDarkKnightImg from '../../../assets/attackdarkknight.png';
import hurtDarkKnightImg from '../../../assets/hurtdarkknight.png';
import parryDarkKnightImg from '../../../assets/parrydarkknight.png';
import readyDarkKnightImg from '../../../assets/readydarkknight.png';
import deathDarkKnightImg from '../../../assets/deathdarkknight.png';
import { UnitSpriteDefinition } from '../types';

/**
 * Dark Knight Character Sprite Configuration
 * Holds animation states for the Dark Knight enemies (Maevir, Lucard, Eldare, Lazarus).
 */
export const darkKnightSprite: UnitSpriteDefinition = {
  id: 'darkknight',
  name: 'Dark Knight',
  frameWidth: 168,
  frameHeight: 168,
  defaultFacing: 'right',
  states: {
    idle: {
      sheetUrl: idleDarkKnightImg,
      frameCount: 12,
      fps: 10,
      loop: true,
    },
    ready: {
      sheetUrl: readyDarkKnightImg,
      frameCount: 13,
      fps: 10,
      loop: false,
    },
    telegraph: {
      sheetUrl: readyDarkKnightImg,
      frameCount: 13,
      fps: 10,
      loop: false,
    },
    attack: {
      sheetUrl: attackDarkKnightImg,
      frameCount: 12,
      fps: 10,
      loop: false,
    },
    hit: {
      sheetUrl: hurtDarkKnightImg,
      frameCount: 6,
      fps: 8,
      loop: false,
    },
    hurt: {
      sheetUrl: hurtDarkKnightImg,
      frameCount: 6,
      fps: 8,
      loop: false,
    },
    parry: {
      sheetUrl: parryDarkKnightImg,
      frameCount: 10,
      fps: 10,
      loop: false,
    },
    defend: {
      sheetUrl: parryDarkKnightImg,
      frameCount: 10,
      fps: 10,
      loop: false,
    },
    die: {
      sheetUrl: deathDarkKnightImg,
      frameCount: 10,
      fps: 10,
      loop: false,
      holdLastFrame: true,
    },
    death: {
      sheetUrl: deathDarkKnightImg,
      frameCount: 10,
      fps: 10,
      loop: false,
      holdLastFrame: true,
    },
  },
};

/**
 * Enemy aliases associated with the Dark Knight sprite.
 * Matches enemy unit names and portrait asset references.
 */
export const darkKnightAliases = [
  'darkknight',
  'dark_knight',
  'dark knight',
  'maevir',
  'lucard',
  'eldare',
  'lazarus',
];

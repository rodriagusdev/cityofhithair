import idleKnightImg from '../../../assets/idleknight.webp';
import attackKnightImg from '../../../assets/attackknight.webp';
import spellKnightImg from '../../../assets/spellknight.webp';
import hurtKnightImg from '../../../assets/hurtknight.webp';
import parryKnightImg from '../../../assets/parryknight.webp';
import { UnitSpriteDefinition } from '../types';

/**
 * Knight Character Sprite Configuration
 * Holds animation states for the player hero Knight.
 */
export const knightSprite: UnitSpriteDefinition = {
  id: 'knight',
  name: 'Knight',
  frameWidth: 168,
  frameHeight: 168,
  defaultFacing: 'right',
  states: {
    idle: {
      sheetUrl: idleKnightImg,
      frameCount: 12,
      fps: 10,
      loop: true,
    },
    attack: {
      sheetUrl: attackKnightImg,
      frameCount: 10,
      fps: 10,
      loop: false,
    },
    hit: {
      sheetUrl: hurtKnightImg,
      frameCount: 10,
      fps: 10,
      loop: false,
    },
    hurt: {
      sheetUrl: hurtKnightImg,
      frameCount: 10,
      fps: 10,
      loop: false,
    },
    parry: {
      sheetUrl: parryKnightImg,
      frameCount: 10,
      fps: 10,
      loop: false,
    },
    defend: {
      sheetUrl: parryKnightImg,
      frameCount: 10,
      fps: 10,
      loop: false,
    },
    cast: {
      sheetUrl: spellKnightImg,
      frameCount: 12,
      fps: 10,
      loop: false,
    },
    spell: {
      sheetUrl: spellKnightImg,
      frameCount: 12,
      fps: 10,
      loop: false,
    },
  },
};


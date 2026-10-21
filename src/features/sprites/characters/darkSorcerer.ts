import idleDarkSorcererImg from '../../../assets/idledarksorcerer.webp';
import attackDarkSorcererImg from '../../../assets/attackdarksorcerer.webp';
import hurtDarkSorcererImg from '../../../assets/hurtdarksorcerer.webp';
import deathDarkSorcererImg from '../../../assets/deathdarksorcerer.webp';
import parryDarkSorcererImg from '../../../assets/parrydarksorcerer.webp';
import { UnitSpriteDefinition } from '../types';

/**
 * Dark Sorcerer Character Sprite Configuration
 * Holds animation states for the Dark Sorcerer / Dark Mage character.
 */
export const darkSorcererSprite: UnitSpriteDefinition = {
  id: 'darksorcerer',
  name: 'Dark Sorcerer',
  frameWidth: 168,
  frameHeight: 168,
  defaultFacing: 'right',
  states: {
    idle: {
      sheetUrl: idleDarkSorcererImg,
      frameCount: 12,
      fps: 10,
      loop: true,
    },
    ready: {
      sheetUrl: idleDarkSorcererImg,
      frameCount: 12,
      fps: 10,
      loop: true,
    },
    telegraph: {
      sheetUrl: idleDarkSorcererImg,
      frameCount: 12,
      fps: 10,
      loop: true,
    },
    attack: {
      sheetUrl: attackDarkSorcererImg,
      frameCount: 10,
      fps: 10,
      loop: false,
    },
    cast: {
      sheetUrl: attackDarkSorcererImg,
      frameCount: 10,
      fps: 10,
      loop: false,
    },
    spell: {
      sheetUrl: attackDarkSorcererImg,
      frameCount: 10,
      fps: 10,
      loop: false,
    },
    hit: {
      sheetUrl: hurtDarkSorcererImg,
      frameCount: 10,
      fps: 10,
      loop: false,
    },
    hurt: {
      sheetUrl: hurtDarkSorcererImg,
      frameCount: 10,
      fps: 10,
      loop: false,
    },
    parry: {
      sheetUrl: parryDarkSorcererImg,
      frameCount: 10,
      fps: 10,
      loop: false,
    },
    defend: {
      sheetUrl: parryDarkSorcererImg,
      frameCount: 10,
      fps: 10,
      loop: false,
    },
    die: {
      sheetUrl: deathDarkSorcererImg,
      frameCount: 10,
      fps: 10,
      loop: false,
      holdLastFrame: true,
    },
    death: {
      sheetUrl: deathDarkSorcererImg,
      frameCount: 10,
      fps: 10,
      loop: false,
      holdLastFrame: true,
    },
  },
};

/**
 * Aliases associated with the Dark Sorcerer sprite.
 * Matches hero class, unit names, and portrait asset references.
 */
export const darkSorcererAliases = [
  'darksorcerer',
  'dark_sorcerer',
  'dark sorcerer',
  'darkmage',
  'dark_mage',
  'dark mage',
  'darkwizard',
  'dark_wizard',
  'dark wizard',
  'sorcerer',
  'wizard',
  'malakor',
];

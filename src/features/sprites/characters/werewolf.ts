import idleWerewolfImg from '../../../assets/idlewerewolf.webp';
import attackWerewolfImg from '../../../assets/attackwerewolf.webp';
import hurtWerewolfImg from '../../../assets/hurtwerewolf.webp';
import deathWerewolfImg from '../../../assets/deathwerewolf.webp';
import { UnitSpriteDefinition } from '../types';

/**
 * Werewolf Character Sprite Configuration
 * Holds animation states for Werewolf enemies.
 */
export const werewolfSprite: UnitSpriteDefinition = {
  id: 'werewolf',
  name: 'Werewolf',
  frameWidth: 168,
  frameHeight: 168,
  defaultFacing: 'right',
  states: {
    idle: {
      sheetUrl: idleWerewolfImg,
      frameCount: 7,
      fps: 10,
      loop: true,
    },
    attack: {
      sheetUrl: attackWerewolfImg,
      frameCount: 10,
      fps: 10,
      loop: false,
    },
    hit: {
      sheetUrl: hurtWerewolfImg,
      frameCount: 5,
      fps: 10,
      loop: false,
    },
    hurt: {
      sheetUrl: hurtWerewolfImg,
      frameCount: 5,
      fps: 10,
      loop: false,
    },
    die: {
      sheetUrl: deathWerewolfImg,
      frameCount: 10,
      fps: 10,
      loop: false,
      holdLastFrame: true,
    },
    death: {
      sheetUrl: deathWerewolfImg,
      frameCount: 10,
      fps: 10,
      loop: false,
      holdLastFrame: true,
    },
  },
};

/**
 * Enemy aliases associated with the Werewolf sprite.
 * Matches enemy unit names and portrait asset references.
 */
export const werewolfAliases = [
  'werewolf',
  'hawnyr',
  'lupine',
  'wolf',
  'dire wolf',
];

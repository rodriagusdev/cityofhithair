import idleCannibalImg from '../../../assets/idlecannibal.png';
import attackCannibalImg from '../../../assets/attackcannibal.png';
import hurtCannibalImg from '../../../assets/hurtcannibal.png';
import deathCannibalImg from '../../../assets/deathcannibal.png';
import { UnitSpriteDefinition } from '../types';

/**
 * Cannibal Character Sprite Configuration
 * Holds animation states for The Cannibal enemy.
 */
export const cannibalSprite: UnitSpriteDefinition = {
  id: 'cannibal',
  name: 'The Cannibal',
  frameWidth: 168,
  frameHeight: 168,
  defaultFacing: 'right',
  states: {
    idle: {
      sheetUrl: idleCannibalImg,
      frameCount: 10,
      fps: 10,
      loop: true,
    },
    ready: {
      sheetUrl: idleCannibalImg,
      frameCount: 10,
      fps: 10,
      loop: true,
    },
    telegraph: {
      sheetUrl: idleCannibalImg,
      frameCount: 10,
      fps: 10,
      loop: true,
    },
    attack: {
      sheetUrl: attackCannibalImg,
      frameCount: 11,
      fps: 10,
      loop: false,
    },
    hit: {
      sheetUrl: hurtCannibalImg,
      frameCount: 10,
      fps: 10,
      loop: false,
    },
    hurt: {
      sheetUrl: hurtCannibalImg,
      frameCount: 10,
      fps: 10,
      loop: false,
    },
    die: {
      sheetUrl: deathCannibalImg,
      frameCount: 10,
      fps: 10,
      loop: false,
      holdLastFrame: true,
    },
    death: {
      sheetUrl: deathCannibalImg,
      frameCount: 10,
      fps: 10,
      loop: false,
      holdLastFrame: true,
    },
  },
};

/**
 * Enemy aliases associated with the Cannibal sprite.
 * Matches enemy unit names and portrait asset references.
 */
export const cannibalAliases = [
  'cannibal',
  'the cannibal',
  'the_cannibal',
  'dark cannibal',
  'butcher',
];

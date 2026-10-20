import idleSkeletonImg from '../../../assets/idleskeleton.png';
import attackSkeletonImg from '../../../assets/attackskeleton.png';
import readySkeletonImg from '../../../assets/readyskeleton.png';
import hurtSkeletonImg from '../../../assets/hurtskeleton.png';
import parrySkeletonImg from '../../../assets/parryskeleton.png';
import deathSkeletonImg from '../../../assets/deathskeleton.png';
import { UnitSpriteDefinition } from '../types';

/**
 * Skeleton Character Sprite Configuration
 * Holds animation states for Skeleton enemies.
 */
export const skeletonSprite: UnitSpriteDefinition = {
  id: 'skeleton',
  name: 'Skeleton',
  frameWidth: 168,
  frameHeight: 168,
  defaultFacing: 'right',
  states: {
    idle: {
      sheetUrl: idleSkeletonImg,
      frameCount: 12,
      fps: 10,
      loop: true,
    },
    ready: {
      sheetUrl: readySkeletonImg,
      frameCount: 10,
      fps: 10,
      loop: false,
    },
    telegraph: {
      sheetUrl: readySkeletonImg,
      frameCount: 10,
      fps: 10,
      loop: false,
    },
    attack: {
      sheetUrl: attackSkeletonImg,
      frameCount: 12,
      fps: 10,
      loop: false,
    },
    hit: {
      sheetUrl: hurtSkeletonImg,
      frameCount: 10,
      fps: 10,
      loop: false,
    },
    hurt: {
      sheetUrl: hurtSkeletonImg,
      frameCount: 10,
      fps: 10,
      loop: false,
    },
    parry: {
      sheetUrl: parrySkeletonImg,
      frameCount: 11,
      fps: 10,
      loop: false,
    },
    defend: {
      sheetUrl: parrySkeletonImg,
      frameCount: 11,
      fps: 10,
      loop: false,
    },
    die: {
      sheetUrl: deathSkeletonImg,
      frameCount: 9,
      fps: 10,
      loop: false,
      holdLastFrame: true,
    },
    death: {
      sheetUrl: deathSkeletonImg,
      frameCount: 9,
      fps: 10,
      loop: false,
      holdLastFrame: true,
    },
  },
};

/**
 * Enemy aliases associated with the Skeleton sprite.
 * Matches enemy unit names and portrait asset references.
 */
export const skeletonAliases = [
  'skeleton',
  'ancient skeleton',
  'skeleton warrior',
  'skele',
];

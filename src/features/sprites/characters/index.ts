import { knightSprite } from './knight';
import { darkKnightSprite, darkKnightAliases } from './darkKnight';
import { skeletonSprite, skeletonAliases } from './skeleton';
import { darkSorcererSprite, darkSorcererAliases } from './darkSorcerer';
import { werewolfSprite, werewolfAliases } from './werewolf';
import { cannibalSprite, cannibalAliases } from './cannibal';
import { UnitSpriteDefinition } from '../types';

export { knightSprite } from './knight';
export { darkKnightSprite, darkKnightAliases } from './darkKnight';
export { skeletonSprite, skeletonAliases } from './skeleton';
export { darkSorcererSprite, darkSorcererAliases } from './darkSorcerer';
export { werewolfSprite, werewolfAliases } from './werewolf';
export { cannibalSprite, cannibalAliases } from './cannibal';

/**
 * Registry of all implemented character sprite configurations.
 * Each character has its own file in this folder to keep states organized.
 */
export const CHARACTER_SPRITES: Record<string, UnitSpriteDefinition> = {
  [knightSprite.id]: knightSprite,
  [darkKnightSprite.id]: darkKnightSprite,
  [skeletonSprite.id]: skeletonSprite,
  [darkSorcererSprite.id]: darkSorcererSprite,
  [werewolfSprite.id]: werewolfSprite,
  [cannibalSprite.id]: cannibalSprite,
};


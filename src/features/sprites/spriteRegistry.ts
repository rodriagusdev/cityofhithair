import { Player, Unit } from '../../types';
import { UnitSpriteDefinition } from './types';
import {
  CHARACTER_SPRITES,
  cannibalAliases,
  cannibalSprite,
  darkKnightAliases,
  darkKnightSprite,
  darkSorcererAliases,
  darkSorcererSprite,
  knightSprite,
  skeletonAliases,
  skeletonSprite,
  werewolfAliases,
  werewolfSprite,
} from './characters';

/**
 * Global Sprite Registry
 * Dispatches to individual character definitions in the `characters/` folder.
 */
export const SPRITE_REGISTRY: Record<string, UnitSpriteDefinition> = {
  ...CHARACTER_SPRITES,
};

/**
 * Helper to resolve the sprite definition for any player or enemy unit.
 * Matches by character ID, hero class, enemy name/alias, or portrait asset.
 */
export const getSpriteDefinitionForUnit = (
  unit?: Player | Unit | string | null
): UnitSpriteDefinition | null => {
  if (!unit) return null;

  // Direct string id (e.g. 'knight', 'darkknight', 'skeleton', 'darksorcerer', 'darkmage', 'werewolf', 'cannibal')
  if (typeof unit === 'string') {
    const key = unit.toLowerCase().trim();
    if (SPRITE_REGISTRY[key]) return SPRITE_REGISTRY[key];
    if (darkKnightAliases.includes(key)) return darkKnightSprite;
    if (skeletonAliases.includes(key)) return skeletonSprite;
    if (darkSorcererAliases.includes(key)) return darkSorcererSprite;
    if (werewolfAliases.includes(key)) return werewolfSprite;
    if (cannibalAliases.includes(key)) return cannibalSprite;
    return null;
  }

  // Check unit.name (e.g. 'Maevir', 'Lucard', 'Eldare', 'Lazarus', 'Skeleton', 'Malakor', 'Werewolf', 'The Cannibal')
  const nameKey = unit.name?.toLowerCase().trim();
  if (nameKey) {
    if (SPRITE_REGISTRY[nameKey]) return SPRITE_REGISTRY[nameKey];
    if (darkKnightAliases.includes(nameKey)) return darkKnightSprite;
    if (skeletonAliases.includes(nameKey) || nameKey.includes('skeleton')) {
      return skeletonSprite;
    }
    if (werewolfAliases.includes(nameKey) || nameKey.includes('werewolf')) {
      return werewolfSprite;
    }
    if (cannibalAliases.includes(nameKey) || nameKey.includes('cannibal')) {
      return cannibalSprite;
    }
    if (
      darkSorcererAliases.includes(nameKey) ||
      nameKey.includes('sorcerer') ||
      nameKey.includes('dark mage') ||
      nameKey.includes('darkmage')
    ) {
      return darkSorcererSprite;
    }
    if (nameKey.includes('dark knight') || nameKey.includes('darkknight')) {
      return darkKnightSprite;
    }
    if (nameKey.includes('knight') && ('player' in unit && (unit as Player).player)) {
      return knightSprite;
    }
  }

  // Check portraitFace asset path (e.g. contains 'darkknight', 'skeleton', 'darkmage', 'darksorcerer', 'werewolf', 'hawnyr', 'cannibal')
  if (typeof unit.portraitFace === 'string') {
    const faceLower = unit.portraitFace.toLowerCase();
    if (faceLower.includes('darkknight')) {
      return darkKnightSprite;
    }
    if (faceLower.includes('skeleton')) {
      return skeletonSprite;
    }
    if (faceLower.includes('werewolf') || faceLower.includes('hawnyr')) {
      return werewolfSprite;
    }
    if (faceLower.includes('cannibal')) {
      return cannibalSprite;
    }
    if (
      faceLower.includes('darkmage') ||
      faceLower.includes('darksorcerer') ||
      faceLower.includes('sorcerer')
    ) {
      return darkSorcererSprite;
    }
  }

  // Check unit.heroClass
  const heroClass = (unit as Player).heroClass?.toLowerCase();
  if (heroClass) {
    if (SPRITE_REGISTRY[heroClass]) return SPRITE_REGISTRY[heroClass];
    if (darkSorcererAliases.includes(heroClass)) return darkSorcererSprite;
  }

  // Check if player unit with dark mastery / dark wizard kit
  if ('player' in unit && (unit as Player).player) {
    if (unit.darkMastery && unit.darkMastery > 0) {
      return darkSorcererSprite;
    }
    return knightSprite;
  }

  return null;
};

/**
 * Checks if a unit has an animated sprite registered.
 */
export const hasSpriteForUnit = (unit?: Player | Unit | string | null): boolean => {
  return getSpriteDefinitionForUnit(unit) !== null;
};

/**
 * Preload all registered sprite sheets into browser memory so there are
 * zero blank frames or image-decode hitches during active combat transitions.
 */
if (typeof window !== 'undefined') {
  Object.values(SPRITE_REGISTRY).forEach((def) => {
    Object.values(def.states).forEach((state) => {
      if (state?.sheetUrl) {
        const preloader = new Image();
        preloader.src = state.sheetUrl;
      }
    });
  });
}

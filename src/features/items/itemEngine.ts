import { Item, Player, Skill, StatModifiers } from '../../types';
import { skillsIcons } from '../../data/skills';
import {
  darkAttack,
  drainLife,
  vulnerability,
  weakness,
} from '../../data/skills/darkmagic';
import {
  attack,
  defend,
  frenzy,
  sacrifice,
} from '../../data/skills/combat';

// Registry of known base skills and spells to resolve by name
const KNOWN_SKILLS_MAP: Record<string, Skill> = {
  Attack: attack,
  'Dark Magic: Attack': darkAttack,
  Defend: defend,
  Frenzy: frenzy,
  Sacrifice: sacrifice,
  Weakness: weakness,
  Vulnerability: vulnerability,
  'Drain Life': drainLife,
};

/**
 * Checks if an item is considered active (equipped in a slot or an active passive relic).
 */
export function isItemActive(item: Item): boolean {
  if (item.isPassive) return true;
  if (item.isEquipped) return true;
  // If an item has stat modifiers or granted skills but no slot specified, treat as passive
  if (!item.slot && (item.statModifiers || item.grantedSkills || item.grantedSpellNames)) {
    return true;
  }
  return false;
}

/**
 * Aggregates all stat modifiers from all active items in the inventory.
 */
export function computeTotalStatModifiers(inventory: Item[]): Required<StatModifiers> {
  const totals: Required<StatModifiers> = {
    attack: 0,
    defense: 0,
    health: 0,
    maxHealth: 0,
    magic: 0,
    maxMagic: 0,
    criticalChance: 0,
    darkMastery: 0,
  };

  for (const item of inventory) {
    if (!isItemActive(item) || !item.statModifiers) continue;

    const m = item.statModifiers;
    if (m.attack) totals.attack += m.attack;
    if (m.defense) totals.defense += m.defense;
    if (m.health) totals.health += m.health;
    if (m.maxHealth) totals.maxHealth += m.maxHealth;
    if (m.magic) totals.magic += m.magic;
    if (m.maxMagic) totals.maxMagic += m.maxMagic;
    if (m.criticalChance) totals.criticalChance += m.criticalChance;
    if (m.darkMastery) totals.darkMastery += m.darkMastery;
  }

  return totals;
}

/**
 * Resolves any spells or skills granted by items in the inventory.
 */
export function resolveGrantedSkills(inventory: Item[], existingSkills: Skill[]): Skill[] {
  const existingNames = new Set(existingSkills.map((s) => s.name));
  const newSkills: Skill[] = [];

  for (const item of inventory) {
    if (!isItemActive(item)) continue;

    // Direct Skill objects attached to item
    if (item.grantedSkills) {
      for (const skill of item.grantedSkills) {
        if (!existingNames.has(skill.name)) {
          existingNames.add(skill.name);
          newSkills.push(skill);
        }
      }
    }

    // Skill names attached to item (e.g. 'Drain Life', 'Weakness')
    if (item.grantedSpellNames) {
      for (const spellName of item.grantedSpellNames) {
        if (!existingNames.has(spellName)) {
          const known = KNOWN_SKILLS_MAP[spellName];
          if (known) {
            existingNames.add(spellName);
            newSkills.push(known);
          } else {
            // Fallback generic spell definition if not in known skills map
            const customSkill: Skill = {
              name: spellName,
              description: `Granted by ${item.name}.`,
              image: skillsIcons.dmAttack || skillsIcons.attack,
              cost: 2,
            };
            existingNames.add(spellName);
            newSkills.push(customSkill);
          }
        }
      }
    }
  }

  return newSkills;
}

/**
 * Pure function: calculates the effective player stats and skills by combining base player stats
 * with all active items from the player's inventory.
 */
export function computeEffectivePlayer(basePlayer: Player, inventory: Item[]): Player {
  if (!basePlayer || !basePlayer.name) return basePlayer;

  const mods = computeTotalStatModifiers(inventory);
  const granted = resolveGrantedSkills(inventory, basePlayer.skills || []);

  const maxHealth = Math.max(1, (basePlayer.maxHealth || 1) + mods.maxHealth);
  const maxMagic = Math.max(0, (basePlayer.maxMagic || 0) + mods.maxMagic);

  return {
    ...basePlayer,
    attack: Math.max(1, basePlayer.attack + mods.attack),
    defense: Math.max(0, basePlayer.defense + mods.defense),
    maxHealth,
    health: Math.min(maxHealth, Math.max(0, basePlayer.health + mods.health)),
    maxMagic,
    magic: Math.min(maxMagic, Math.max(0, basePlayer.magic + mods.magic)),
    criticalChance: Math.max(0, Math.min(100, basePlayer.criticalChance + mods.criticalChance)),
    darkMastery: Math.max(0, basePlayer.darkMastery + mods.darkMastery),
    skills: [...(basePlayer.skills || []), ...granted],
  };
}

/**
 * Toggles the equipped state of an item at the given inventory index.
 * If equipping an item with a slot (e.g. 'weapon'), any other item with the same slot is unequipped.
 */
export function toggleEquipItem(inventory: Item[], targetIndex: number): Item[] {
  if (targetIndex < 0 || targetIndex >= inventory.length) return inventory;

  const target = inventory[targetIndex];
  if (!target.slot && !target.statModifiers && !target.grantedSkills && !target.grantedSpellNames) {
    // Non-equippable consumable or plain item
    return inventory;
  }

  const willEquip = !target.isEquipped;

  return inventory.map((item, idx) => {
    if (idx === targetIndex) {
      return { ...item, isEquipped: willEquip };
    }
    // Unequip conflicting slot if equipping target item in a unique slot
    if (willEquip && target.slot && item.slot === target.slot) {
      return { ...item, isEquipped: false };
    }
    return item;
  });
}

/**
 * Formats an item's stat modifiers into human-readable strings for tooltips or inspection.
 */
export function formatStatModifiers(mods?: StatModifiers): string[] {
  if (!mods) return [];
  const lines: string[] = [];
  if (mods.attack) lines.push(`${mods.attack > 0 ? '+' : ''}${mods.attack} Attack`);
  if (mods.defense) lines.push(`${mods.defense > 0 ? '+' : ''}${mods.defense} Defense`);
  if (mods.maxHealth) lines.push(`${mods.maxHealth > 0 ? '+' : ''}${mods.maxHealth} Max HP`);
  if (mods.health) lines.push(`${mods.health > 0 ? '+' : ''}${mods.health} HP`);
  if (mods.maxMagic) lines.push(`${mods.maxMagic > 0 ? '+' : ''}${mods.maxMagic} Max SP`);
  if (mods.magic) lines.push(`${mods.magic > 0 ? '+' : ''}${mods.magic} SP`);
  if (mods.criticalChance) lines.push(`${mods.criticalChance > 0 ? '+' : ''}${mods.criticalChance}% Crit`);
  if (mods.darkMastery) lines.push(`${mods.darkMastery > 0 ? '+' : ''}${mods.darkMastery} Dark Mastery`);
  return lines;
}

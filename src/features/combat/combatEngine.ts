import { skillsIcons } from '../../data/skills';
import { ActiveStatusEffect, Player, Unit } from '../../types';
import { CombatActionDefinition } from './types';

export function calculateDamage(
  attacker: Unit | Player,
  defender: Unit | Player
): { damage: number; isCritical: boolean } {
  const defenseReduction = Math.max(0, 1 - defender.defense / 10);
  const baseDamage = Math.max(1, Math.ceil(attacker.attack * defenseReduction));

  const roll = Math.floor(Math.random() * 100) + 1;
  const isCritical =
    attacker.criticalChance > 0 && roll <= attacker.criticalChance;
  const damage = isCritical ? Math.round(baseDamage * 2) : baseDamage;

  return { damage, isCritical };
}

/**
 * Adds an active status effect to a unit, updating existing status if already present.
 */
export function addStatusEffect(
  unit: Unit | Player,
  newStatus: ActiveStatusEffect
): void {
  if (!unit.statuses) {
    unit.statuses = [];
  }

  const existingIdx = unit.statuses.findIndex((s) => s.id === newStatus.id);
  if (existingIdx !== -1) {
    // Refresh duration and update deltas
    unit.statuses[existingIdx] = newStatus;
  } else {
    unit.statuses.push(newStatus);
  }

  // Update visual flags
  if (newStatus.id === 'weakness') unit.weaknessStatus = true;
  if (newStatus.id === 'vulnerability') unit.vulnerabilityStatus = true;
}

/**
 * Ticks down active status effects for a unit at the start/end of a turn.
 * Reverts stat modifications when an effect expires.
 */
export function tickUnitStatuses(unit: Unit | Player): {
  expired: ActiveStatusEffect[];
} {
  if (!unit.statuses || unit.statuses.length === 0) {
    return { expired: [] };
  }

  const expired: ActiveStatusEffect[] = [];
  const remaining: ActiveStatusEffect[] = [];

  for (const status of unit.statuses) {
    status.turnsRemaining -= 1;
    if (status.turnsRemaining <= 0) {
      expired.push(status);
      // Revert stat changes
      if (status.attackDelta) {
        unit.attack = Math.max(1, unit.attack - status.attackDelta);
      }
      if (status.defenseDelta) {
        unit.defense = unit.defense - status.defenseDelta;
      }
    } else {
      remaining.push(status);
    }
  }

  unit.statuses = remaining;

  // Re-evaluate visual flags
  unit.weaknessStatus = unit.statuses.some((s) => s.id === 'weakness');
  unit.vulnerabilityStatus = unit.statuses.some(
    (s) => s.id === 'vulnerability'
  );

  return { expired };
}

export const combatActions: Record<string, CombatActionDefinition> = {
  Attack: {
    name: 'Attack',
    isSelfCast: false,
    cost: { magic: 0 },
    canExecute: () => ({ can: true }),
    execute: (caster, target) => {
      const { damage, isCritical } = calculateDamage(caster, target);
      target.health = Math.max(0, target.health - damage);

      const critText = isCritical ? ' (CRITICAL HIT!)' : '';
      return {
        actionName: 'Attack',
        message: `${caster.name} attacks ${target.name} for ${damage} damage${critText}`,
        icon: skillsIcons.attack,
        attacker: caster,
        target,
        damage,
        isCritical,
        isDead: target.health <= 0,
      };
    },
  },

  'Dark Magic: Attack': {
    name: 'Dark Magic: Attack',
    isSelfCast: false,
    cost: { magic: 0 },
    canExecute: () => ({ can: true }),
    execute: (caster, target) => {
      const { damage, isCritical } = calculateDamage(caster, target);
      target.health = Math.max(0, target.health - damage);

      const darkMastery = caster.darkMastery || 0;
      const healAmount = 1 + darkMastery;
      caster.health = Math.min(caster.maxHealth, caster.health + healAmount);

      return {
        actionName: 'Dark Magic: Attack',
        message: `${caster.name} strikes with Dark Magic dealing ${damage} damage and siphoning ${healAmount} health`,
        icon: skillsIcons.dmAttack,
        attacker: caster,
        target,
        damage,
        isCritical,
        healing: healAmount,
        isDead: target.health <= 0,
      };
    },
  },

  Defend: {
    name: 'Defend',
    isSelfCast: true,
    cost: { magic: 2 },
    canExecute: (caster) => {
      if (caster.magic < 2) return { can: false, reason: 'No Spiritual Power' };
      return { can: true };
    },
    execute: (caster) => {
      caster.magic = Math.max(0, caster.magic - 2);
      const defenseBoost = 1;
      caster.defense += defenseBoost;

      const status: ActiveStatusEffect = {
        id: 'defend',
        name: 'Defense Stance',
        turnsRemaining: 3,
        defenseDelta: defenseBoost,
      };
      addStatusEffect(caster, status);

      return {
        actionName: 'Defend',
        message: `${caster.name} enters Defense Stance (+1 Defense for 3 turns)`,
        icon: skillsIcons.defend,
        attacker: caster,
        target: caster,
        appliedStatus: status,
      };
    },
  },

  Frenzy: {
    name: 'Frenzy',
    isSelfCast: true,
    cost: { magic: 2 },
    canExecute: (caster) => {
      if (caster.magic < 2) return { can: false, reason: 'No Spiritual Power' };
      return { can: true };
    },
    execute: (caster) => {
      caster.magic = Math.max(0, caster.magic - 2);
      const attackGain = 7;
      const defenseLoss = -2;

      caster.attack += attackGain;
      caster.defense += defenseLoss;

      const status: ActiveStatusEffect = {
        id: 'frenzy',
        name: 'Frenzy',
        turnsRemaining: 3,
        attackDelta: attackGain,
        defenseDelta: defenseLoss,
      };
      addStatusEffect(caster, status);

      return {
        actionName: 'Frenzy',
        message: `${caster.name} casts Frenzy (+7 Attack, -2 Defense for 3 turns)`,
        icon: skillsIcons.frenzy,
        attacker: caster,
        target: caster,
        appliedStatus: status,
      };
    },
  },

  Sacrifice: {
    name: 'Sacrifice',
    isSelfCast: false,
    cost: { magic: 2, health: 11 },
    canExecute: (caster) => {
      if (caster.magic < 2) return { can: false, reason: 'No Spiritual Power' };
      if (caster.health <= 11)
        return { can: false, reason: 'Health too low for Sacrifice' };
      return { can: true };
    },
    execute: (caster, target) => {
      caster.magic = Math.max(0, caster.magic - 2);
      caster.health = Math.max(1, caster.health - 11);

      // Deals physical strike damage as described
      const { damage } = calculateDamage(caster, target);
      target.health = Math.max(0, target.health - damage);

      // Destroys defense for 3 turns
      const armorReduction = 3;
      target.defense -= armorReduction;

      const status: ActiveStatusEffect = {
        id: 'vulnerability',
        name: 'Armor Shattered',
        turnsRemaining: 3,
        defenseDelta: -armorReduction,
      };
      addStatusEffect(target, status);

      return {
        actionName: 'Sacrifice',
        message: `${caster.name} sacrifices 11 health to strike for ${damage} and shatters ${target.name}'s armor (-3 Defense for 3 turns)!`,
        icon: skillsIcons.sacrifice,
        attacker: caster,
        target,
        damage,
        appliedStatus: status,
        isDead: target.health <= 0,
      };
    },
  },

  Weakness: {
    name: 'Weakness',
    isSelfCast: false,
    cost: { magic: 2 },
    canExecute: (caster) => {
      if (caster.magic < 2) return { can: false, reason: 'No Spiritual Power' };
      return { can: true };
    },
    execute: (caster, target) => {
      caster.magic = Math.max(0, caster.magic - 2);
      const mastery = caster.darkMastery || 0;
      // Formula matches tooltip: 30% + 7% per Dark Mastery
      const percentReduction = 0.3 + 0.07 * mastery;
      const attackReduction = target.attack * percentReduction;
      target.attack = Math.max(1, target.attack - attackReduction);

      const status: ActiveStatusEffect = {
        id: 'weakness',
        name: 'Weakness',
        turnsRemaining: 3,
        attackDelta: -attackReduction,
      };
      addStatusEffect(target, status);

      return {
        actionName: 'Weakness',
        message: `${caster.name} casts Weakness on ${target.name} (-${Math.round(percentReduction * 100)}% Attack for 3 turns)`,
        icon: skillsIcons.weakness,
        attacker: caster,
        target,
        appliedStatus: status,
      };
    },
  },

  Vulnerability: {
    name: 'Vulnerability',
    isSelfCast: false,
    cost: { magic: 2 },
    canExecute: (caster) => {
      if (caster.magic < 2) return { can: false, reason: 'No Spiritual Power' };
      return { can: true };
    },
    execute: (caster, target) => {
      caster.magic = Math.max(0, caster.magic - 2);
      const mastery = caster.darkMastery || 0;
      // Formula matches tooltip: flat 1 point + 1 per Dark Mastery
      const armorShred = 1 + mastery;
      target.defense -= armorShred;

      const status: ActiveStatusEffect = {
        id: 'vulnerability',
        name: 'Vulnerability',
        turnsRemaining: 3,
        defenseDelta: -armorShred,
      };
      addStatusEffect(target, status);

      return {
        actionName: 'Vulnerability',
        message: `${caster.name} casts Vulnerability on ${target.name} (-${armorShred} Defense for 3 turns)`,
        icon: skillsIcons.vulnerability,
        attacker: caster,
        target,
        appliedStatus: status,
      };
    },
  },

  'Drain Life': {
    name: 'Drain Life',
    isSelfCast: false,
    cost: { magic: 3 },
    canExecute: (caster) => {
      if (caster.magic < 3) return { can: false, reason: 'No Spiritual Power' };
      return { can: true };
    },
    execute: (caster, target) => {
      caster.magic = Math.max(0, caster.magic - 3);
      const mastery = caster.darkMastery || 0;
      // Formula matches tooltip: 10hp + 2hp per Dark Mastery
      const drainAmount = 10 + 2 * mastery;
      target.health = Math.max(0, target.health - drainAmount);
      caster.health = Math.min(caster.maxHealth, caster.health + drainAmount);

      return {
        actionName: 'Drain Life',
        message: `${caster.name} casts Drain Life, stealing ${drainAmount} health from ${target.name}`,
        icon: skillsIcons.drainLife,
        attacker: caster,
        target,
        damage: drainAmount,
        healing: drainAmount,
        isDead: target.health <= 0,
      };
    },
  },

  'Potion Of Life': {
    name: 'Potion Of Life',
    isSelfCast: true,
    cost: { healthPotions: 1 },
    canExecute: (_caster, _target, { healthPotions }) => {
      if (healthPotions <= 0) return { can: false, reason: 'No Potions' };
      return { can: true };
    },
    execute: (caster) => {
      caster.health = Math.min(caster.maxHealth, caster.health + 15);
      return {
        actionName: 'Potion Of Life',
        message: `${caster.name} drinks a Potion of Life and recovers 15 health`,
        icon: skillsIcons.healthPotion,
        attacker: caster,
        target: caster,
        healing: 15,
      };
    },
  },

  'Potion Of Magic': {
    name: 'Potion Of Magic',
    isSelfCast: true,
    cost: { manaPotions: 1 },
    canExecute: (_caster, _target, { manaPotions }) => {
      if (manaPotions <= 0) return { can: false, reason: 'No Potions' };
      return { can: true };
    },
    execute: (caster) => {
      caster.magic = Math.min(caster.maxMagic, caster.magic + 3);
      return {
        actionName: 'Potion Of Magic',
        message: `${caster.name} drinks a Potion of Magic and recovers 3 spiritual power`,
        icon: skillsIcons.manaPotion,
        attacker: caster,
        target: caster,
        spChange: 3,
      };
    },
  },
};

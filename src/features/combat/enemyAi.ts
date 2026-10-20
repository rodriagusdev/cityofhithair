import { skillsIcons } from '../../data/skills';
import { Player, Unit } from '../../types';
import { EnemyIntent, ParryWindow } from './types';

function getTelegraphDescription(enemy: Unit, actionName: string): string {
  const enemyLower = enemy.name.toLowerCase();

  if (actionName === 'Drain Life') {
    return `${enemy.name} channels dark energy to siphon your soul!`;
  }
  if (actionName === 'Weakness') {
    return `${enemy.name} weaves an enervating hex upon you!`;
  }
  if (actionName === 'Vulnerability') {
    return `${enemy.name} invokes a dark curse to sunder your armor!`;
  }

  // Physical attack telegraphs customized per enemy type
  if (enemyLower.includes('werewolf')) {
    return 'Werewolf unleashes a ferocious flurry of strikes!';
  }
  if (enemyLower.includes('cannibal')) {
    return 'Cannibal brandishes a rusted cleaver to strike!';
  }
  if (enemyLower.includes('skeleton')) {
    return 'Skeleton raises its ancient blade to attack!';
  }
  if (enemyLower.includes('knight')) {
    return 'Dark Knight readies a crushing blow!';
  }

  return `${enemy.name} prepares a heavy attack!`;
}

/**
 * Accurately determines enemy archetype across all levels and instances.
 */
export function getEnemyArchetype(
  enemy: Unit
): 'skeleton' | 'cannibal' | 'werewolf' | 'knight' | 'other' {
  const name = (enemy.name || '').toLowerCase();
  if (name.includes('skeleton')) return 'skeleton';
  if (name.includes('cannibal')) return 'cannibal';
  if (name.includes('werewolf') || name.includes('hawnyr')) return 'werewolf';
  if (
    name.includes('knight') ||
    name.includes('maevir') ||
    name.includes('lucard') ||
    name.includes('eldare') ||
    name.includes('lazarus')
  ) {
    return 'knight';
  }
  return 'other';
}

/**
 * Calculates enemy-specific timing and parry windows based on attack speed and archetype.
 * Every archetype guarantees an accessible, clear reaction window of at least 450-500ms.
 */
function getTimingAndWindow(
  enemy: Unit,
  isSpell: boolean
): { duration: number; window: ParryWindow } {
  if (isSpell) {
    // Spells: 1400ms telegraph with an accessible 500ms deflection window
    return {
      duration: 1400,
      window: { startMs: 800, durationMs: 500 },
    };
  }

  const archetype = getEnemyArchetype(enemy);

  switch (archetype) {
    case 'skeleton':
      // 1400ms duration, opens at 800ms for 500ms
      return {
        duration: 1400,
        window: { startMs: 800, durationMs: 500 },
      };
    case 'werewolf':
      // 1400ms duration, opens at 800ms for 450ms
      return {
        duration: 1400,
        window: { startMs: 800, durationMs: 450 },
      };
    case 'cannibal':
      // 1500ms duration, opens at 850ms for 450ms
      return {
        duration: 1500,
        window: { startMs: 850, durationMs: 450 },
      };
    case 'knight':
      // 1500ms duration, opens at 850ms for 450ms
      return {
        duration: 1500,
        window: { startMs: 850, durationMs: 450 },
      };
    default:
      return {
        duration: 1400,
        window: { startMs: 800, durationMs: 500 },
      };
  }
}

export function decideEnemyIntent(enemy: Unit, player: Player): EnemyIntent {
  const availableSkillNames = (enemy.skills || []).map((s) => s.name);

  let chosenAction = 'Attack';
  let icon = skillsIcons.attack;
  let isSpell = false;

  // AI Tactical Evaluation
  if (
    availableSkillNames.includes('Drain Life') &&
    enemy.magic >= 3 &&
    enemy.health <= enemy.maxHealth - 10
  ) {
    chosenAction = 'Drain Life';
    icon = skillsIcons.drainLife;
    isSpell = true;
  } else if (
    availableSkillNames.includes('Weakness') &&
    enemy.magic >= 2 &&
    !player.weaknessStatus &&
    Math.random() > 0.4
  ) {
    chosenAction = 'Weakness';
    icon = skillsIcons.weakness;
    isSpell = true;
  } else if (
    availableSkillNames.includes('Vulnerability') &&
    enemy.magic >= 2 &&
    !player.vulnerabilityStatus &&
    Math.random() > 0.4
  ) {
    chosenAction = 'Vulnerability';
    icon = skillsIcons.vulnerability;
    isSpell = true;
  } else {
    chosenAction = 'Attack';
    icon = skillsIcons.attack;
    isSpell = false;
  }

  const telegraphMessage = getTelegraphDescription(enemy, chosenAction);
  const { duration, window: parryWindow } = getTimingAndWindow(enemy, isSpell);

  let totalHits = 1;
  let requiredParries = 1;

  if (!isSpell) {
    const archetype = getEnemyArchetype(enemy);
    if (archetype === 'werewolf') {
      totalHits = 5;
      requiredParries = 2;
    } else if (archetype === 'cannibal') {
      totalHits = 3;
      requiredParries = 2;
    } else if (archetype === 'knight') {
      totalHits = 3;
      requiredParries = 2;
    } else if (archetype === 'skeleton') {
      totalHits = 2;
      requiredParries = 2;
    } else {
      totalHits = 1;
      requiredParries = 1;
    }
  }

  return {
    actionId: chosenAction,
    actionName: chosenAction,
    telegraphMessage,
    icon,
    isSpell,
    requiredSpToParry: 0,
    telegraphDurationMs: duration,
    parryWindow,
    totalHits,
    requiredParries,
  };
}

/**
 * Returns how many fully parried turns are required to break an enemy's posture/stagger.
 */
export function getEnemyStaggerThreshold(enemy: Unit): number {
  const archetype = getEnemyArchetype(enemy);
  if (archetype === 'skeleton') return 1; // 1 full parry breaks poise
  const name = (enemy.name || '').toLowerCase();
  if (name.includes('lazarus') || name.includes('maevir')) return 3; // Boss knights take 3
  return 2; // Werewolf (Hawnyr), Cannibal, Dark Knight take 2
}

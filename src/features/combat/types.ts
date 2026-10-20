import { ActiveStatusEffect, Player, Unit } from '../../types';

export type CombatTurn = 'Player' | 'Enemy';

export type CombatPhase =
  | 'idle'
  | 'player_turn'
  | 'resolving'
  | 'enemy_telegraph'
  | 'enemy_turn'
  | 'victory'
  | 'defeat';

export interface ParryWindow {
  /** Offset in milliseconds from telegraph start when parry window opens (e.g. 1200ms) */
  startMs: number;
  /** Duration of the perfect parry window in milliseconds (e.g. 300ms for 0.3s) */
  durationMs: number;
}

export interface EnemyIntent {
  actionId: string;
  actionName: string;
  telegraphMessage: string;
  icon: string;
  telegraphDurationMs: number;
  isSpell?: boolean;
  requiredSpToParry?: number;
  parryWindow?: ParryWindow;
  totalHits?: number;
  requiredParries?: number;
  hitIntervalMs?: number;
}

export interface ParryState {
  isWindowOpen: boolean;
  canParry: boolean;
  wasParried: boolean;
  parryAttempted: boolean;
  feedbackText: string;
  parriesLanded: number;
  requiredParries: number;
  comboBroken: boolean;
  currentStrike?: number;
  totalStrikes?: number;
  strikeDurationMs?: number;
}

export interface EnemyStagger {
  current: number;
  max: number;
  isStaggered: boolean;
}

export interface CombatActionResult {
  actionName: string;
  message: string;
  icon: string;
  attacker: Unit | Player;
  target: Unit | Player;
  damage?: number;
  isCritical?: boolean;
  healing?: number;
  spChange?: number;
  isDead?: boolean;
  parried?: boolean;
  appliedStatus?: ActiveStatusEffect;
}

export interface ActionCost {
  magic?: number;
  health?: number;
  healthPotions?: number;
  manaPotions?: number;
}

export interface CombatActionDefinition {
  name: string;
  isSelfCast: boolean;
  cost: ActionCost;
  canExecute: (
    caster: Player | Unit,
    target: Player | Unit,
    context: { healthPotions: number; manaPotions: number }
  ) => { can: boolean; reason?: string };
  execute: (
    caster: Player | Unit,
    target: Player | Unit,
    isPlayer: boolean
  ) => CombatActionResult;
}

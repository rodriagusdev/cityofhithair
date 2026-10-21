import { useBattleStore } from '../../stores';
import { Player, Unit } from '../../types';
import { SpriteAnimationState } from './types';

/**
 * Hook to automatically determine the active combat animation state
 * for a unit based on the real-time battle phase, turn, and vitals.
 */
export const useUnitAnimationState = (
  unit: Player | Unit | string,
  isEnemy: boolean,
  forcedState?: SpriteAnimationState
): SpriteAnimationState => {
  const phase = useBattleStore((state) => state.phase);
  const turn = useBattleStore((state) => state.turn);
  const action = useBattleStore((state) => state.action);
  const parryState = useBattleStore((state) => state.parryState);
  const enemyStagger = useBattleStore((state) => state.enemyStagger);
  const boardEnemy = useBattleStore((state) => state.boardEnemy);
  const boardPlayer = useBattleStore((state) => state.boardPlayer);

  if (forcedState) return forcedState;
  if (typeof unit === 'string') return 'idle';

  // 1. Death State
  if (unit.health <= 0) {
    return 'die';
  }

  // 2. Victory / Defeat outcome
  if (phase === 'victory') {
    return isEnemy ? 'die' : 'victory';
  }
  if (phase === 'defeat') {
    return isEnemy ? 'victory' : 'die';
  }

  // 3. Enemy Telegraph / Windup (Ready to attack)
  if (phase === 'enemy_telegraph') {
    if (isEnemy) {
      // If posture is broken, do not play attack windup
      if (enemyStagger.isStaggered) return 'idle';
      return 'ready';
    }
    if (parryState.wasParried) {
      return 'parry';
    }
  }

  // 4. Resolving Attacks & Hits
  if (phase === 'resolving' || phase === 'enemy_turn') {
    if (turn === 'Player') {
      // Player is attacking/casting, Enemy is taking damage
      if (isEnemy) {
        return 'hit';
      }
      if (action === 'Defend') {
        return 'defend';
      }
      const isSpell =
        action &&
        action !== 'Attack' &&
        !action.startsWith('Potion');
      return isSpell ? 'cast' : 'attack';
    } else {
      // Enemy is attacking
      if (isEnemy) {
        if (action === 'Defend') {
          return 'defend';
        }
        return 'attack';
      } else {
        // Player reaction
        return parryState.wasParried ? 'parry' : 'hit';
      }
    }
  }

  // 4. Default Idle
  return 'idle';
};

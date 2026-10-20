import React from 'react';
import { Player, Unit } from '../../../types';
import { ParryIndicator } from '../ParryIndicator';
import { UnitSprite } from '../../Sprite';
import { FloatingCombatText } from '../FloatingCombatText';
import { useBattleStore } from '../../../stores';

interface UnitPortraitProps {
  unit: Player | Unit;
  isEnemy: boolean;
  onPortraitClick: () => void;
}

export const UnitPortrait: React.FC<UnitPortraitProps> = ({
  unit,
  isEnemy,
  onPortraitClick,
}) => {
  const phase = useBattleStore((state) => state.phase);
  const turn = useBattleStore((state) => state.turn);

  const action = useBattleStore((state) => state.action);

  // Self Cast spells (Defend, Frenzy, Potions) do not draw characters together
  const isSelfCast =
    (turn === 'Player' &&
      (action === 'Defend' ||
        action === 'Frenzy' ||
        action.startsWith('Potion'))) ||
    (turn === 'Enemy' && (action === 'Defend' || action === 'Frenzy'));

  // Darkest Dungeon Combat Clash: active only when a targeted attack/spell is actively resolving
  const isHeroAttacking = phase === 'resolving' && turn === 'Player' && !isSelfCast;
  const isEnemyAttacking = phase === 'enemy_turn' && turn === 'Enemy' && !isSelfCast;
  const isClashActive = isHeroAttacking || isEnemyAttacking;

  // Calculate dynamic clash positioning so combatants are drawn exactly at arm's length
  let clashClass = 'combat-clash-neutral';
  let clashShadow = '';

  if (isClashActive) {
    if (!isEnemy) {
      // PLAYER HERO
      if (isHeroAttacking) {
        clashClass = 'combat-clash-hero-strike';
        clashShadow = 'drop-shadow-[0_16px_36px_rgba(0,0,0,0.9)]';
      } else {
        clashClass = 'combat-clash-hero-receive';
        clashShadow = 'drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]';
      }
    } else {
      // ENEMY UNIT
      if (isEnemyAttacking) {
        clashClass = 'combat-clash-enemy-strike';
        clashShadow = 'drop-shadow-[0_16px_36px_rgba(220,38,38,0.4)]';
      } else {
        clashClass = 'combat-clash-enemy-receive';
        clashShadow = 'drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]';
      }
    }
  }

  return (
    <div
      className={`relative flex flex-col items-center will-change-transform ${
        isClashActive
          ? 'transition-all duration-300 ease-out'
          : 'transition-all duration-500 ease-out'
      } ${clashClass} ${clashShadow}`}
    >
      <div className="relative group">
        <UnitSprite
          unit={unit}
          isEnemy={isEnemy}
          onClick={onPortraitClick}
        />

        {/* Floating Combat Text / Damage Numbers */}
        <FloatingCombatText isEnemy={isEnemy} />

        {/* Parry indicator overlay reticle directly over the player hero portrait */}
        {!isEnemy && <ParryIndicator />}
      </div>
    </div>
  );
};

export default UnitPortrait;

import React from 'react';
import { Player, Unit } from '../../types';
import {
  getSpriteDefinitionForUnit,
  useUnitAnimationState,
  SpriteAnimationState,
} from '../../features/sprites';
import { useBattleStore } from '../../stores';

interface UnitSpriteProps {
  unit: Player | Unit;
  isEnemy?: boolean;
  state?: SpriteAnimationState;
  onClick?: () => void;
  className?: string;
}

export const UnitSprite: React.FC<UnitSpriteProps> = ({
  unit,
  isEnemy = false,
  state,
  onClick,
  className = '',
}) => {
  const spriteDef = getSpriteDefinitionForUnit(unit);
  const activeState = useUnitAnimationState(unit, isEnemy, state);
  const parryState = useBattleStore((state) => state.parryState);

  // If no sprite definition exists for this unit, seamlessly render fallback portrait
  if (!spriteDef) {
    return (
      <img
        src={unit.portrait}
        alt={unit.name}
        onClick={onClick}
        className={`w-36 h-52 md:w-44 md:h-60 object-cover rounded-full border-2 p-1.5 shadow-2xl transition-all duration-200 cursor-pointer ${isEnemy
            ? 'border-red-900/80 bg-stone-950 hover:border-red-600 hover:ring-2 hover:ring-red-600/40'
            : 'border-stone-700 bg-stone-950 hover:border-red-700 hover:ring-2 hover:ring-red-800/40'
          } ${className}`}
      />
    );
  }

  // Active or fallback sprite configuration
  const stateConfig = spriteDef.states[activeState];
  const isUsingFallbackSheet = !stateConfig;
  const effectiveConfig =
    stateConfig ||
    spriteDef.states.idle ||
    Object.values(spriteDef.states)[0];

  if (!effectiveConfig) {
    return null;
  }

  // Animation timing
  const frameCount = effectiveConfig.frameCount;
  const fps = effectiveConfig.fps || 10;
  const duration = (frameCount / fps).toFixed(2);
  const isLooping =
    effectiveConfig.loop ?? (activeState === 'idle' || activeState === 'victory');

  // For looping sheets (idle, victory): animate 0 to -100% with steps(frameCount) infinite
  // For one-shot sheets (attack, hit, die): step through all frames and hold on the final frame without disappearing
  const animName = isLooping ? 'sprite-step-anim' : 'sprite-step-anim-hold';
  const stepCount = isLooping ? frameCount : Math.max(1, frameCount - 1);
  const endOffset = `-${(((frameCount - 1) / frameCount) * 100).toFixed(4)}%`;

  // Facing direction: Player faces right towards enemy, Enemy faces left towards player
  const defaultFacingRight = (spriteDef.defaultFacing || 'right') === 'right';
  const shouldFlip = isEnemy ? defaultFacingRight : !defaultFacingRight;

  // Procedural combat motion class when a dedicated sprite sheet is not yet provided
  let proceduralMotion = '';
  if (isUsingFallbackSheet) {
    switch (activeState) {
      case 'attack':
        proceduralMotion = isEnemy
          ? 'animate-combat-lunge-left'
          : 'animate-combat-lunge-right';
        break;
      case 'hit':
      case 'hurt':
        proceduralMotion = 'animate-combat-hit';
        break;
      case 'die':
      case 'death':
        proceduralMotion =
          'opacity-40 grayscale translate-y-3 transition-all duration-700';
        break;
      case 'victory':
        proceduralMotion = 'animate-combat-victory';
        break;
      case 'defend':
      case 'parry':
        proceduralMotion =
          'ring-2 ring-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)]';
        break;
      default:
        break;
    }
  }

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
      className={`relative w-100 h-100 rounded-full transition-all duration-200 cursor-pointer flex flex-col items-center justify-end overflow-hidden select-none  
        ${isEnemy
          ? 'border-transparent border-0 bg-transparent'
          : 'border-transparent border-0 bg-transparent'
        } ${className}`}
      title={`${unit.name} (${activeState})`}
    >
      {/* Sprite Animation Frame Wrapper */}
      <div
        className={`relative z-10 w-80 h-80 overflow-hidden mb-1 flex items-center justify-center ${proceduralMotion}`}
      >
        <div
          className="w-full h-full relative"
          style={{
            transform: shouldFlip ? 'scaleX(-1)' : 'none',
          }}
        >
          <img
            key={
              activeState === 'hit' || activeState === 'hurt'
                ? `${unit.name}-hit-${unit.health}-${effectiveConfig.sheetUrl}`
                : activeState === 'parry' || activeState === 'defend'
                  ? `${unit.name}-parry-${parryState.parriesLanded}-${effectiveConfig.sheetUrl}`
                  : `${unit.name}-${activeState}-${effectiveConfig.sheetUrl}`
            }
            src={effectiveConfig.sheetUrl}
            alt={`${unit.name} ${activeState}`}
            style={{
              width: `${frameCount * 100}%`,
              height: '100%',
              maxWidth: 'none',
              ['--sprite-end-offset' as string]: endOffset,
              animation: `${animName} ${duration}s steps(${stepCount}) ${
                isLooping ? 'infinite' : 'forwards'
              }`,
              imageRendering: 'pixelated',
            }}
            className="pointer-events-none select-none block bg-transparent"
          />
        </div>
      </div>

      {/* State Badge overlay during active combat actions */}
      {activeState !== 'idle' && (
        <div className="absolute top-2 px-2 py-0.5 rounded bg-stone-950/90 border border-stone-700/80 text-[9px] font-cinzel font-bold text-amber-300 uppercase tracking-widest pointer-events-none shadow z-20">
          {activeState === 'ready' && '⚔ Windup'}
          {activeState === 'attack' && '⚔ Attack'}
          {(activeState === 'hit' || activeState === 'hurt') && '💥 Hit'}
          {(activeState === 'die' || activeState === 'death') && '☠ Fallen'}
          {activeState === 'victory' && '★ Victory'}
          {(activeState === 'defend' || activeState === 'parry') && '🛡 Parry'}
          {(activeState === 'cast' || activeState === 'spell') && '✦ Spell'}
        </div>
      )}
    </div>
  );
};

export default UnitSprite;

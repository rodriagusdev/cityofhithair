import React from 'react';
import { skill } from '../../types';
import {
  useAnnouncerStore,
  useBattleStore,
  usePlayerStore,
} from '../../stores';

import { useBattleHandler } from '../../features/components/Board';

interface Props {
  skill: skill;
  hotkey?: string;
}

const selfCastSkills = new Set([
  'Frenzy',
  'Defend',
  'Potion Of Life',
  'Potion Of Magic',
]);

const Skill: React.FC<Props> = ({ skill, hotkey }) => {
  const { updateAction } = useBattleStore();
  const { handleActionOnEnemy } = useBattleHandler();
  const isInFight = useBattleStore((state) => state.isInFight);
  const turn = useBattleStore((state) => state.turn);
  const phase = useBattleStore((state) => state.phase);
  const { updateSelectedSkill } = usePlayerStore();
  const healthpotions = usePlayerStore((state) => state.healthPotions);
  const manaPotions = usePlayerStore((state) => state.manaPotions);
  const selectedSkill = usePlayerStore((state) => state.selectedSkill);

  const isSelected = selectedSkill === skill;

  const handleSkillAction = (actionName: string) => {
    updateSelectedSkill(skill);

    // If currently in combat on player's turn, execute immediately with NO modal popup!
    if (isInFight && turn === 'Player' && phase === 'player_turn') {
      handleActionOnEnemy(actionName);
    } else {
      updateAction(actionName);
    }
  };

  return (
    <div className="relative flex flex-col items-center group/skill">
      {/* Skill Icon Button */}
      <button
        type="button"
        onClick={() => handleSkillAction(skill.name)}
        aria-label={skill.name}
        className={`relative p-1 bg-stone-900 border transition-all cursor-pointer shadow-md ${
          isSelected
            ? 'border-amber-400 ring-2 ring-amber-400/60 scale-105'
            : 'border-stone-700 hover:border-amber-500/70 hover:scale-105'
        }`}
      >
        <img
          src={skill.image}
          alt={skill.name}
          className="w-10 h-10 md:w-12 md:h-12 object-contain"
        />

        {/* Keyboard Hotkey Badge */}
        {hotkey && (
          <span className="absolute -bottom-1 -right-1 px-1 py-0.2 bg-stone-950/90 text-stone-300 font-mono text-[9px] font-bold border border-stone-700 rounded shadow">
            {hotkey}
          </span>
        )}

        {/* Potion Quantity Badge */}
        {skill.name === 'Potion Of Life' && (
          <span className="absolute -top-1.5 -left-1.5 px-1.5 py-0.2 bg-stone-950 text-rose-300 font-cinzel text-[10px] font-bold border border-rose-600 rounded-full shadow">
            {healthpotions}
          </span>
        )}
        {skill.name === 'Potion Of Magic' && (
          <span className="absolute -top-1.5 -left-1.5 px-1.5 py-0.2 bg-stone-950 text-cyan-300 font-cinzel text-[10px] font-bold border border-cyan-600 rounded-full shadow">
            {manaPotions}
          </span>
        )}
      </button>

      {/* Dark Gothic Skill Tooltip on Hover */}
      <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 hidden group-hover/skill:flex flex-col gap-1 w-56 p-2.5 bg-stone-950/95 backdrop-blur-md border border-stone-800 rounded-md shadow-2xl z-50 pointer-events-none select-none">
        {/* Header: Skill Name & Cost */}
        <div className="flex items-center justify-between gap-2 border-b border-stone-800/80 pb-1">
          <span className="font-cinzel text-xs font-bold tracking-wider text-white uppercase drop-shadow-sm">
            {skill.name}
          </span>
          {skill.cost > 0 && (
            <span className="font-cinzel text-[10px] font-semibold text-cyan-400 whitespace-nowrap">
              {skill.cost} SP
            </span>
          )}
          {skill.name === 'Potion Of Life' && (
            <span className="font-cinzel text-[10px] font-semibold text-rose-400 whitespace-nowrap">
              1 Potion
            </span>
          )}
          {skill.name === 'Potion Of Magic' && (
            <span className="font-cinzel text-[10px] font-semibold text-cyan-400 whitespace-nowrap">
              1 Potion
            </span>
          )}
        </div>

        {/* Description */}
        <p className="font-cinzel text-[11px] text-stone-300 leading-relaxed italic text-left">
          {skill.description}
        </p>

        {/* Self-cast hint */}
        {selfCastSkills.has(skill.name) && (
          <span className="font-cinzel text-[9px] text-amber-500/90 tracking-widest uppercase font-semibold text-left">
            ✦ Self-Cast Action
          </span>
        )}

        {/* Arrow notch */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 rotate-45 bg-stone-950 border-r border-b border-stone-800" />
      </div>
    </div>
  );
};

export default Skill;

import React from 'react';
import { Skill } from '../Skill';
import { skill as SkillType } from '../../types';
import { UnitSprite } from '../Sprite';

interface HeroCardProps {
  id: string;
  name: string;
  portrait: string;
  health: number;
  attack: number;
  defense: number;
  spiritualPower: number;
  darkMastery?: number;
  skills: Array<SkillType>;
  roleBadge?: string;
  tagline?: string;
  description?: string;
  theme?: 'knight' | 'darkmage';
  onSelect: () => void;
}

export const HeroCard: React.FC<HeroCardProps> = ({
  id,
  name,
  portrait,
  health,
  attack,
  defense,
  spiritualPower,
  darkMastery,
  skills,
  roleBadge,
  tagline,
  description,
  theme = 'knight',
  onSelect,
}) => {
  const isKnight = theme === 'knight';

  return (
    <div
      className={`relative flex flex-col gap-10 sm:flex-row items-stretch backdrop-blur-md rounded-xl  transition-all duration-300 w-full ${isKnight
        ? 'hover:border-red-600/70'
        : 'hover:border-purple-600/70'
        } before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-gradient-to-r ${isKnight
          ? 'before:from-transparent before:via-red-500/60 before:to-transparent'
          : 'before:from-transparent before:via-purple-500/60 before:to-transparent'
        }`}
    >
      <div className='p-2'> {roleBadge && (

        <span
          className={`mt-3 px-2 py-0.5 rounded text-[10px] font-cinzel font-bold tracking-widest uppercase text-center ${isKnight
            ? 'text-red-500'
            : 'text-purple-300'
            }`}
        >
          {roleBadge}
        </span>
      )}

        <UnitSprite
          unit={id}
          state="idle"
          size="hero"
          className="relative z-10 transition-transform duration-300 scale-250 group-hover/sprite:scale-105"
        />

        {portrait && (
          <div
            className={`absolute top-2 right-2 w-7 h-7 rounded-full overflow-hidden border shadow-md pointer-events-none z-20 ${isKnight ? 'border-red-600/80' : 'border-purple-600/80'
              }`}
          >
            <img
              src={portrait}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

      </div>


      {/* Hero Lore & Attributes Column */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between gap-4 text-left">
        <div>
          {/* Header & Tagline */}
          <div className="border-b border-stone-800/80 pb-2.5">
            <h3 className="font-display text-2xl font-bold tracking-widest text-white uppercase drop-shadow-sm">
              {name}
            </h3>
            {tagline && (
              <span
                className={`font-cinzel text-xs font-semibold tracking-wider block mt-0.5 ${isKnight ? 'text-red-400/90' : 'text-purple-300/90'
                  }`}
              >
                {tagline}
              </span>
            )}
            {description && (
              <p className="font-body text-sm text-stone-300 leading-relaxed  mt-1.5">
                {description}
              </p>
            )}
          </div>

          {/* Vitals & Attributes Grid */}
          <div className="grid grid-cols-2 gap-2.5 p-3 mt-3">
            {/* Health */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400 font-cinzel text-[11px] flex items-center gap-1">
                  <span className="text-rose-500">❤</span> Health
                </span>
                <span className="font-bold text-rose-400 font-cinzel">{health}</span>
              </div>
              <div className="w-full bg-stone-950 h-1 rounded-full overflow-hidden border border-stone-800/60">
                <div
                  className="bg-rose-500/80 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (health / 70) * 100)}%` }}
                />
              </div>
            </div>

            {/* Attack */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400 font-cinzel text-[11px] flex items-center gap-1">
                  <span className="text-amber-500">⚔</span> Attack
                </span>
                <span className="font-bold text-amber-300 font-cinzel">{attack}</span>
              </div>
              <div className="w-full bg-stone-950 h-1 rounded-full overflow-hidden border border-stone-800/60">
                <div
                  className="bg-amber-500/80 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (attack / 15) * 100)}%` }}
                />
              </div>
            </div>

            {/* Defense */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400 font-cinzel text-[11px] flex items-center gap-1">
                  <span className="text-stone-300">🛡</span> Defense
                </span>
                <span className="font-bold text-stone-200 font-cinzel">{defense}</span>
              </div>
              <div className="w-full bg-stone-950 h-1 rounded-full overflow-hidden border border-stone-800/60">
                <div
                  className="bg-stone-300/80 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (defense / 6) * 100)}%` }}
                />
              </div>
            </div>

            {/* Spiritual Power */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400 font-cinzel text-[11px] flex items-center gap-1">
                  <span className="text-cyan-400">✦</span> Spirit
                </span>
                <span className="font-bold text-cyan-400 font-cinzel">{spiritualPower}</span>
              </div>
              <div className="w-full bg-stone-950 h-1 rounded-full overflow-hidden border border-stone-800/60">
                <div
                  className="bg-cyan-500/80 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (spiritualPower / 10) * 100)}%` }}
                />
              </div>
            </div>

            {/* Dark Mastery (if applicable) */}
            {darkMastery !== undefined && darkMastery > 0 && (
              <div className="col-span-2 flex items-center justify-between pt-1 border-t border-stone-800/60 text-xs">
                <span className="text-purple-400 font-cinzel text-[11px] flex items-center gap-1">
                  <span>☠</span> Dark Mastery
                </span>
                <span className="font-bold text-purple-300 font-cinzel">+{darkMastery}</span>
              </div>
            )}
          </div>

          {/* Starting Skills Tray */}
          <div className="mt-3 flex flex-col gap-1.5">
            <div className="flex items-center justify-center gap-2 p-1.5  rounded-lg">
              {skills.map((skill) => (
                <Skill key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        </div>

        {/* Selection Action Button */}
        <button
          type="button"
          onClick={onSelect}
          className={`w-full py-2.5 px-4 font-cinzel text-xs tracking-[0.2em] font-bold uppercase rounded-md transition-all duration-300 cursor-pointer shadow-md text-center border ${isKnight
            ? 'bg-red-950/80 hover:bg-red-900 text-stone-100 border-red-800/80 hover:border-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.35)]'
            : 'bg-purple-950/80 hover:bg-purple-900 text-stone-100 border-purple-800/80 hover:border-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.35)]'
            }`}
        >
          Select {name}
        </button>
      </div>
    </div>
  );
};

export default HeroCard;

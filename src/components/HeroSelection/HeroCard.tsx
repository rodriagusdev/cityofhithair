import React from 'react';
import { Skill } from '../Skill';
import { skill as SkillType } from '../../types';

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
      className={`relative flex flex-col sm:flex-row items-stretch bg-stone-950/85 backdrop-blur-md border border-stone-800/80 rounded-xl shadow-2xl transition-all duration-300 w-full overflow-hidden ${
        isKnight
          ? 'hover:border-amber-600/70 hover:shadow-[0_0_30px_rgba(217,119,6,0.12)]'
          : 'hover:border-purple-600/70 hover:shadow-[0_0_30px_rgba(147,51,234,0.15)]'
      } before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-gradient-to-r ${
        isKnight
          ? 'before:from-transparent before:via-amber-500/60 before:to-transparent'
          : 'before:from-transparent before:via-purple-500/60 before:to-transparent'
      }`}
    >
      {/* Portrait Showcase Column */}
      <div className="w-full sm:w-44 md:w-48 shrink-0 flex flex-col items-center justify-between p-4 sm:p-5 bg-stone-900/30 border-b sm:border-b-0 sm:border-r border-stone-800/70">
        <div
          onClick={onSelect}
          className={`relative group/portrait cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-300 shadow-xl w-full max-w-[170px] aspect-[3/4] ${
            isKnight
              ? 'border-stone-700/80 hover:border-amber-600/80 hover:shadow-[0_0_20px_rgba(217,119,6,0.25)]'
              : 'border-stone-700/80 hover:border-purple-600/80 hover:shadow-[0_0_20px_rgba(147,51,234,0.25)]'
          }`}
        >
          <img
            src={portrait}
            alt={name}
            className="w-full h-full object-cover object-top group-hover/portrait:scale-105 transition-transform duration-500 select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/10 group-hover/portrait:opacity-30 transition-opacity" />
        </div>

        {roleBadge && (
          <span
            className={`mt-3 px-2 py-0.5 rounded text-[10px] font-cinzel font-bold tracking-widest uppercase border text-center ${
              isKnight
                ? 'bg-amber-950/50 border-amber-800/60 text-amber-300'
                : 'bg-purple-950/50 border-purple-800/60 text-purple-300'
            }`}
          >
            {roleBadge}
          </span>
        )}
      </div>

      {/* Hero Lore & Attributes Column */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between gap-4 text-left">
        <div>
          {/* Header & Tagline */}
          <div className="border-b border-stone-800/80 pb-2.5">
            <h3 className="font-cinzel text-2xl font-bold tracking-widest text-white uppercase drop-shadow-sm">
              {name}
            </h3>
            {tagline && (
              <span
                className={`font-cinzel text-xs font-semibold tracking-wider block mt-0.5 ${
                  isKnight ? 'text-amber-400/90' : 'text-purple-300/90'
                }`}
              >
                {tagline}
              </span>
            )}
            {description && (
              <p className="font-cinzel text-[11px] text-stone-400 leading-relaxed italic mt-1.5">
                {description}
              </p>
            )}
          </div>

          {/* Vitals & Attributes Grid */}
          <div className="grid grid-cols-2 gap-2.5 p-3 mt-3 bg-stone-900/60 border border-stone-800/80 rounded-lg">
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
            <div className="flex items-center justify-between">
              <span className="font-cinzel text-[10px] tracking-widest text-stone-500 uppercase font-semibold">
                Starting Disciplines
              </span>
              <span className="text-[10px] text-stone-500 font-cinzel italic">
                Hover to inspect
              </span>
            </div>
            <div className="flex items-center gap-2 p-1.5 bg-stone-900/60 border border-stone-800/80 rounded-lg">
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
          className={`w-full py-2.5 px-4 font-cinzel text-xs tracking-[0.2em] font-bold uppercase rounded-md transition-all duration-300 cursor-pointer shadow-md text-center border ${
            isKnight
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

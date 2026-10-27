import React, { useState, useRef, useEffect } from 'react';
import { Player, Unit } from '../../../types';
import { Skill } from '../../Skill';
import { usePlayerStore } from '../../../stores';
import { itemIcons } from '../../../data/stats';

interface UnitActionBarProps {
  unit: Player | Unit;
  isEnemy?: boolean;
}

export const UnitActionBar: React.FC<UnitActionBarProps> = ({ unit }) => {
  const [isTomeOpen, setIsTomeOpen] = useState(false);
  const tomeRef = useRef<HTMLDivElement>(null);

  const selectedSkill = usePlayerStore((state) => state.selectedSkill);

  // Column 1: Basic attack and other skills inside Tome
  const basicAttack = unit.skills[0];
  const otherSkills = unit.skills.slice(1);
  const isAnyTomeSkillSelected = otherSkills.some(
    (s) => s.name === selectedSkill?.name
  );

  // Column 2: Items / Potions
  const playerPotions = (unit as Player).potions || [];

  // Close Tome when clicking outside or pressing Escape
  useEffect(() => {
    if (!isTomeOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (tomeRef.current && !tomeRef.current.contains(e.target as Node)) {
        setIsTomeOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsTomeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isTomeOpen]);

  // Allow pressing T to toggle Tome open / close
  useEffect(() => {
    const handleToggleKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if (e.key === 't' || e.key === 'T') {
        setIsTomeOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleToggleKey);
    return () => window.removeEventListener('keydown', handleToggleKey);
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-stone-900/80 via-stone-950/90 to-stone-950 border border-stone-800/90 rounded-xl p-2 sm:p-2.5 shadow-[inset_0_1px_3px_rgba(255,255,255,0.05),0_6px_16px_rgba(0,0,0,0.6)] flex flex-row items-stretch justify-center gap-2 sm:gap-3 select-none">
      {/* Decorative Dark-Iron Corner Rivets */}
      <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-stone-600/70 pointer-events-none" />
      <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-stone-400 border border-stone-900 shadow-sm pointer-events-none" />

      <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-stone-600/70 pointer-events-none" />
      <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-stone-400 border border-stone-900 shadow-sm pointer-events-none" />

      <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-stone-600/70 pointer-events-none" />
      <div className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-stone-400 border border-stone-900 shadow-sm pointer-events-none" />

      <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-stone-600/70 pointer-events-none" />
      <div className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-stone-400 border border-stone-900 shadow-sm pointer-events-none" />

      {/* Column 1: Combat Arts (Basic Attack + Tome) */}
      <div className="flex flex-col items-center gap-1.5">
        {/* Header */}
        <div className="flex items-center gap-1 w-full px-1">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-700/80 to-transparent" />
          <span className="text-[9px] sm:text-[10px] font-cinzel font-bold tracking-widest uppercase text-stone-400 whitespace-nowrap">
            Combat
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-700/80 to-transparent" />
        </div>

        {/* Column 1 Slots */}
        <div className="flex flex-col items-center justify-center gap-2 p-1.5 bg-stone-950/70 border border-stone-800/80 rounded-lg shadow-inner">
          {basicAttack && (
            <div className="relative group shrink-0">
              <Skill skill={basicAttack} hotkey="1" />
            </div>
          )}

          {/* Spell Tome Button */}
          <div
            className="relative flex flex-col items-center group/tome shrink-0"
            ref={tomeRef}
          >
            <button
              type="button"
              onClick={() => setIsTomeOpen((prev) => !prev)}
              aria-label="Spell Tome"
              className={`relative w-14 h-14 shrink-0 flex items-center justify-center p-1 bg-stone-900 border transition-all cursor-pointer shadow-md ${
                isTomeOpen || isAnyTomeSkillSelected
                  ? 'border-amber-400 ring-2 ring-amber-400/60 scale-105 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                  : 'border-stone-700 hover:border-amber-500/70 hover:scale-105'
              }`}
            >
              <img
                src={itemIcons.darktome}
                alt="Spell Tome"
                className="w-12 h-12 object-contain shrink-0 pointer-events-none drop-shadow"
              />

              {/* Keyboard Hotkey Badge */}
              <span className="absolute -bottom-1 -right-1 px-1 py-0.2 bg-stone-950/90 text-stone-300 font-mono text-[9px] font-bold border border-stone-700 rounded shadow">
                T
              </span>

              {/* Skill Count Badge */}
              <span className="absolute -top-1.5 -left-1.5 px-1.5 py-0.2 bg-stone-950 text-amber-300 font-cinzel text-[10px] font-bold border border-amber-600 rounded-full shadow">
                {otherSkills.length}
              </span>
            </button>

            {/* Hover Tooltip when popover is closed */}
            {!isTomeOpen && (
              <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 hidden group-hover/tome:flex flex-col gap-1 w-52 p-2.5 bg-stone-950/95 backdrop-blur-md border border-stone-800 rounded-md shadow-2xl z-50 pointer-events-none select-none">
                <div className="flex items-center justify-between gap-2 border-b border-stone-800/80 pb-1">
                  <span className="font-cinzel text-xs font-bold tracking-wider text-white uppercase drop-shadow-sm">
                    Spell Tome
                  </span>
                  <span className="font-cinzel text-[10px] font-semibold text-amber-400 whitespace-nowrap">
                    {otherSkills.length} Skills
                  </span>
                </div>
                <p className="font-cinzel text-[11px] text-stone-300 leading-relaxed italic text-left">
                  Grimoire of specialized combat skills. Click or press [T] to
                  open.
                </p>
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 rotate-45 bg-stone-950 border-r border-b border-stone-800" />
              </div>
            )}

            {/* Floating Popover when Tome is Open */}
            {isTomeOpen && (
              <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-40 bg-gradient-to-b from-stone-900/98 via-stone-950/98 to-stone-950/98 border-2 border-amber-900/80 rounded-xl p-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.95),0_0_24px_rgba(217,119,6,0.3)] backdrop-blur-md flex flex-col gap-2 min-w-[210px]">
                {/* Popover Header */}
                <div className="flex items-center justify-between gap-3 px-1 pb-1 border-b border-stone-800/80">
                  <div className="flex items-center gap-1.5">
                    <img
                      src={itemIcons.darktome}
                      alt="Tome"
                      className="w-4 h-4 object-contain"
                    />
                    <span className="font-cinzel text-xs font-bold text-amber-400 tracking-wider uppercase">
                      Grimoire Skills
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsTomeOpen(false);
                    }}
                    className="text-stone-400 hover:text-amber-400 text-xs px-1 font-bold cursor-pointer transition-colors"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                {/* Popover Skills Rack */}
                <div className="flex flex-row items-center justify-center gap-2 py-1">
                  {otherSkills.map((skill, index) => (
                    <div
                      key={skill.name}
                      onClick={() => setIsTomeOpen(false)}
                    >
                      <Skill
                        skill={skill}
                        hotkey={String(index + 2)}
                      />
                    </div>
                  ))}
                </div>

                {/* Arrow notch */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1.5 w-3 h-3 rotate-45 bg-stone-950 border-r-2 border-b-2 border-amber-900/80" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vertical subtle divider between columns */}
      <div className="w-px self-stretch bg-gradient-to-b from-transparent via-stone-800/90 to-transparent my-1" />

      {/* Column 2: Items / Apothecary */}
      <div className="flex flex-col items-center gap-1.5">
        {/* Header */}
        <div className="flex items-center gap-1 w-full px-1">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-800/60 to-transparent" />
          <span className="text-[9px] sm:text-[10px] font-cinzel font-bold tracking-widest uppercase text-amber-500/90 whitespace-nowrap">
            Items
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-800/60 to-transparent" />
        </div>

        {/* Column 2 Slots */}
        <div className="flex flex-col items-center justify-center gap-2 p-1.5 bg-stone-950/70 border border-amber-950/40 rounded-lg shadow-inner">
          {playerPotions.map((potion) => (
            <div key={potion.name} className="relative group shrink-0">
              <Skill
                skill={potion}
                hotkey={potion.name.includes('Life') ? 'Q' : 'E'}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnitActionBar;

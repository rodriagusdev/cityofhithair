import React, { useEffect } from 'react';
import { FloatingCombatNotification } from '../../../stores/useBattleStore';
import { useBattleStore } from '../../../stores';

interface Props {
  isEnemy: boolean;
}

export const FloatingCombatText: React.FC<Props> = ({ isEnemy }) => {
  const targetType = isEnemy ? 'Enemy' : 'Player';
  const floatingTexts = useBattleStore((state) => state.floatingTexts);
  const removeFloatingText = useBattleStore((state) => state.removeFloatingText);

  const activeTexts = floatingTexts.filter((t) => t.target === targetType);

  useEffect(() => {
    activeTexts.forEach((item) => {
      const timer = window.setTimeout(() => {
        removeFloatingText(item.id);
      }, 1200);
      return () => clearTimeout(timer);
    });
  }, [activeTexts, removeFloatingText]);

  if (activeTexts.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-60">
      {activeTexts.map((item) => {
        let colorClasses = 'text-rose-400 drop-shadow-[0_2px_10px_rgba(244,63,94,0.8)]';

        if (item.type === 'crit') {
          colorClasses = 'text-amber-300 font-extrabold text-2xl drop-shadow-[0_2px_12px_rgba(245,158,11,0.9)]';
        } else if (item.type === 'heal') {
          colorClasses = 'text-emerald-300 drop-shadow-[0_2px_10px_rgba(16,185,129,0.8)]';
        } else if (item.type === 'parry') {
          colorClasses = 'text-cyan-300 font-bold drop-shadow-[0_2px_12px_rgba(6,182,212,0.9)]';
        }

        return (
          <div
            key={item.id}
            className={`font-cinzel text-lg sm:text-xl md:text-2xl font-black tracking-wider uppercase select-none animate-float-combat-text ${colorClasses}`}
          >
            {item.text}
          </div>
        );
      })}
    </div>
  );
};

export default FloatingCombatText;

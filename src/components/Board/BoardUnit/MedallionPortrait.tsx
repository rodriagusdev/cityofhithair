import React from 'react';
import { Player, Unit } from '../../../types';
import { MedallionGauges } from './MedallionGauges';
import { MedallionFrame } from './MedallionFrame';
import { MedallionCharms } from './MedallionCharms';

interface MedallionPortraitProps {
  unit: Player | Unit;
  isEnemy: boolean;
  onClick?: () => void;
  className?: string;
}

// Total length of the 100-degree circular arc at radius 80
// 2 * PI * 80 * (100 / 360) = 139.63
const ARC_TOTAL_LENGTH = 139.63;

export const MedallionPortrait: React.FC<MedallionPortraitProps> = ({
  unit,
  isEnemy,
  onClick,
  className = '',
}) => {
  // Health & Mana calculations
  const healthRatio = Math.max(0, Math.min(1, unit.health / (unit.maxHealth || 1)));
  const manaRatio = Math.max(0, Math.min(1, unit.magic / (unit.maxMagic || 1)));

  const healthFill = healthRatio * ARC_TOTAL_LENGTH;
  const manaFill = manaRatio * ARC_TOTAL_LENGTH;

  const isLowHealth = healthRatio <= 0.3;

  // Active status triggers for hanging charms
  const hasFrenzy = (unit.frenzyStatus ?? 0) > 0;
  const hasWeakness = !!unit.weaknessStatus;
  const hasDarkMastery = (unit.darkMastery ?? 0) > 0;
  const hasVulnerability = !!unit.vulnerabilityStatus;
  const hasDefense = (unit.defenseStatus ?? 0) > 0;

  const portraitSrc = unit.portraitFace;

  return (
    <div
      className={`relative w-[180px] h-[210px] sm:w-[195px] sm:h-[228px] lg:w-[210px] lg:h-[245px] shrink-0 flex items-center justify-center select-none group ${className}`}
    >
      {/* SVG Layer: Outer curved gauges, dark iron frame, top nameplate, bottom spiked heart & hanging charms */}
      <svg
        viewBox="0 0 240 270"
        className="w-full h-full absolute inset-0 z-20 pointer-events-none overflow-visible drop-shadow-xl"
      >
        <defs>
          {/* Health Gauge Gradient (Rich Crimson to Radiant Blood Scarlet) */}
          <linearGradient id="medallionHealthGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#7f1d1d" />
            <stop offset="40%" stopColor="#b91c1c" />
            <stop offset="80%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>

          {/* Mana / SP Gauge Gradient (Dark Occult Violet to Radiant Purple) */}
          <linearGradient id="medallionManaGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#3b0764" />
            <stop offset="40%" stopColor="#6b21a8" />
            <stop offset="80%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>

          {/* Iron Plate Metal Gradient */}
          <linearGradient id="medallionIronGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#292524" />
            <stop offset="50%" stopColor="#1c1917" />
            <stop offset="100%" stopColor="#0c0a09" />
          </linearGradient>

          {/* Heart Sigil Gradient */}
          <radialGradient id="medallionHeartGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="60%" stopColor="#b91c1c" />
            <stop offset="100%" stopColor="#450a0a" />
          </radialGradient>

          {/* Bevel Drop Shadow */}
          <filter id="medallionShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.85" />
          </filter>
        </defs>

        {/* 1 & 2. Health & Mana Arc Gauges */}
        <MedallionGauges
          unit={unit}
          healthFill={healthFill}
          manaFill={manaFill}
          healthRatio={healthRatio}
          manaRatio={manaRatio}
          arcTotalLength={ARC_TOTAL_LENGTH}
        />

        {/* 3 & 4. Iron Bezel Ring and Gothic Nameplate */}
        <MedallionFrame unitName={unit.name} />

        {/* 5 & 6. Spiked Gothic Heart Crest & Status Effect Charms */}
        <MedallionCharms
          unit={unit}
          isLowHealth={isLowHealth}
          hasFrenzy={hasFrenzy}
          hasWeakness={hasWeakness}
          hasDarkMastery={hasDarkMastery}
          hasVulnerability={hasVulnerability}
          hasDefense={hasDefense}
        />
      </svg>

      {/* 7. Central Circular Aperture (Portrait Face Container) */}
      <div
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick?.();
          }
        }}
        className={`absolute top-[21.2%] left-1/2 -translate-x-1/2 w-[55.2%] h-[47.3%] rounded-full overflow-hidden bg-stone-950 flex items-center justify-center cursor-pointer z-10 shadow-[inset_0_0_20px_rgba(0,0,0,0.95)] border border-stone-800 transition-transform active:scale-95 group-hover:brightness-105 ${
          isEnemy
            ? 'hover:border-red-600/80 hover:ring-2 hover:ring-red-600/40'
            : 'hover:border-amber-600/80 hover:ring-2 hover:ring-amber-600/40'
        }`}
      >
        {/* Gritty Vignette ambient shadow for Darkest Dungeon lighting */}
        <div className="absolute inset-0 rounded-full pointer-events-none z-20 shadow-[inset_0_0_18px_rgba(0,0,0,0.9)]" />

        {/* Character Portrait Face Image */}
        <img
          src={portraitSrc}
          alt={unit.name}
          style={isEnemy ? { transform: 'scaleX(-1) scale(1.05)' } : { transform: 'scale(1.05)' }}
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>
    </div>
  );
};

export default MedallionPortrait;

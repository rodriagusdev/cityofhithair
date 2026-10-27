import React from 'react';
import { Player, Unit } from '../../../types';

interface MedallionGaugesProps {
  unit: Player | Unit;
  healthFill: number;
  manaFill: number;
  healthRatio: number;
  manaRatio: number;
  arcTotalLength: number;
}

export const MedallionGauges: React.FC<MedallionGaugesProps> = ({
  unit,
  healthFill,
  manaFill,
  healthRatio,
  manaRatio,
  arcTotalLength,
}) => {
  return (
    <>
      {/* 1. LEFT ARC: HEALTH GAUGE */}
      <g id="health-gauge" className="pointer-events-auto cursor-help">
        <title>{`Health: ${Math.round(unit.health)} / ${unit.maxHealth} HP (${Math.round(healthRatio * 100)}%)`}</title>

        {/* Outer Housing Casing Borders */}
        <path
          d="M 64.5 181.2 A 86 86 0 0 1 64.5 48.8"
          fill="none"
          stroke="#44403c"
          strokeWidth="1.5"
        />
        <path
          d="M 72.8 171.3 A 74 74 0 0 1 72.8 58.7"
          fill="none"
          stroke="#292524"
          strokeWidth="1.5"
        />

        {/* Dark Background Track */}
        <path
          d="M 68.6 176.3 A 80 80 0 0 1 68.6 53.7"
          fill="none"
          stroke="#141210"
          strokeWidth="10"
        />

        {/* Health Fill Arc (drains from top to bottom) */}
        <path
          d="M 68.6 176.3 A 80 80 0 0 1 68.6 53.7"
          fill="none"
          stroke="url(#medallionHealthGrad)"
          strokeWidth="8"
          strokeDasharray={`${healthFill} ${arcTotalLength}`}
          strokeLinecap="round"
          className="transition-[stroke-dasharray] duration-500 ease-out"
        />

        {/* Top Iron Endcap Bracket */}
        <polygon
          points="61,47 77,57 72,62 56,52"
          fill="#292524"
          stroke="#57534e"
          strokeWidth="1.2"
        />
        <circle cx="66" cy="54" r="1.5" fill="#a8a29e" stroke="#1c1917" />

        {/* Bottom Iron Endcap Bracket */}
        <polygon
          points="61,183 77,173 72,168 56,178"
          fill="#292524"
          stroke="#57534e"
          strokeWidth="1.2"
        />
        <circle cx="66" cy="176" r="1.5" fill="#a8a29e" stroke="#1c1917" />
      </g>

      {/* 2. RIGHT ARC: MANA / SP GAUGE */}
      <g id="mana-gauge" className="pointer-events-auto cursor-help">
        <title>{`Spiritual Power: ${Math.round(unit.magic)} / ${unit.maxMagic} SP (${Math.round(manaRatio * 100)}%)`}</title>

        {/* Outer Housing Casing Borders */}
        <path
          d="M 175.5 181.2 A 86 86 0 0 0 175.5 48.8"
          fill="none"
          stroke="#44403c"
          strokeWidth="1.5"
        />
        <path
          d="M 167.2 171.3 A 74 74 0 0 0 167.2 58.7"
          fill="none"
          stroke="#292524"
          strokeWidth="1.5"
        />

        {/* Dark Background Track */}
        <path
          d="M 171.4 176.3 A 80 80 0 0 0 171.4 53.7"
          fill="none"
          stroke="#141210"
          strokeWidth="10"
        />

        {/* Mana Fill Arc */}
        <path
          d="M 171.4 176.3 A 80 80 0 0 0 171.4 53.7"
          fill="none"
          stroke="url(#medallionManaGrad)"
          strokeWidth="8"
          strokeDasharray={`${manaFill} ${arcTotalLength}`}
          strokeLinecap="round"
          className="transition-[stroke-dasharray] duration-500 ease-out"
        />

        {/* Top Iron Endcap Bracket */}
        <polygon
          points="179,47 163,57 168,62 184,52"
          fill="#292524"
          stroke="#57534e"
          strokeWidth="1.2"
        />
        <circle cx="174" cy="54" r="1.5" fill="#a8a29e" stroke="#1c1917" />

        {/* Bottom Iron Endcap Bracket */}
        <polygon
          points="179,183 163,173 168,168 184,178"
          fill="#292524"
          stroke="#57534e"
          strokeWidth="1.2"
        />
        <circle cx="174" cy="176" r="1.5" fill="#a8a29e" stroke="#1c1917" />
      </g>
    </>
  );
};

export default MedallionGauges;

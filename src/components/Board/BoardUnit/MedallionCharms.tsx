import React from 'react';
import { Player, Unit } from '../../../types';

interface MedallionCharmsProps {
  unit: Player | Unit;
  isLowHealth: boolean;
  hasFrenzy: boolean;
  hasWeakness: boolean;
  hasDarkMastery: boolean;
  hasVulnerability: boolean;
  hasDefense: boolean;
}

export const MedallionCharms: React.FC<MedallionCharmsProps> = ({
  unit,
  isLowHealth,
  hasFrenzy,
  hasWeakness,
  hasDarkMastery,
  hasVulnerability,
  hasDefense,
}) => {
  return (
    <>
      {/* 5. BOTTOM CENTER: SPIKED GOTHIC HEART CREST */}
      <g id="spiked-heart" filter="url(#medallionShadow)">
        {/* Radiating Thorns & Iron Spikes Halo */}
        <path
          d="
            M 120 167 L 122 173 L 126 168 L 125 174 L 131 173 L 127 178
            L 133 180 L 127 183 L 131 187 L 125 188 L 126 194 L 122 191
            L 120 197 L 118 191 L 114 194 L 115 188 L 109 187 L 113 183
            L 107 180 L 113 178 L 110 173 L 115 174 L 114 168 L 118 173 Z
          "
          fill="#292524"
          stroke="#57534e"
          strokeWidth="0.8"
        />

        {/* Crimson Heart Body */}
        <path
          d="
            M 120 177
            C 117 169, 108 169, 108 178
            C 108 185, 117 190, 120 194
            C 123 190, 132 185, 132 178
            C 132 169, 123 169, 120 177 Z
          "
          fill="url(#medallionHeartGrad)"
          stroke="#1c1917"
          strokeWidth="1.2"
          className={isLowHealth ? 'animate-pulse' : ''}
        />

        {/* Specular highlight */}
        <path
          d="M 112 174 C 110 176, 110 180, 113 182"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </g>

      {/* 6. HANGING CHAIN LINKS & STATUS EFFECT CHARMS (STATIC DECORATION) */}
      <g id="hanging-charms" className="pointer-events-auto">
        {/* Charm 1: Left Flame (Burn / Frenzy) */}
        <g className="cursor-pointer">
          <title>{hasFrenzy ? 'Active: Blood Frenzy!' : 'Flame Charm'}</title>
          <line x1="76" y1="175" x2="76" y2="204" stroke="#57534e" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
          <circle cx="76" cy="205" r="2" fill="none" stroke="#78716c" strokeWidth="0.8" />
          <path
            d="M 76 208 C 72 212, 71 215, 73 219 C 75 222, 79 222, 80 219 C 81 216, 78 214, 79 211 C 78 210, 77 209, 76 208 Z"
            fill={hasFrenzy ? '#ef4444' : '#7f1d1d'}
            stroke="#1c1917"
            strokeWidth="0.8"
            className={hasFrenzy ? 'drop-shadow-[0_0_6px_rgba(239,68,68,0.9)]' : 'opacity-70'}
          />
        </g>

        {/* Charm 2: Mid-Left Swirl (Curse / Weakness) */}
        <g className="cursor-pointer">
          <title>{hasWeakness ? 'Afflicted: Enervating Weakness Hex' : 'Curse Ward Charm'}</title>
          <line x1="98" y1="184" x2="98" y2="212" stroke="#57534e" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
          <circle cx="98" cy="214" r="2" fill="none" stroke="#78716c" strokeWidth="0.8" />
          <path
            d="M 98 217 C 94 219, 94 224, 98 226 C 101 226, 102 222, 100 220 C 99 219, 97 220, 98 222"
            fill="none"
            stroke={hasWeakness ? '#f43f5e' : '#881337'}
            strokeWidth="1.6"
            strokeLinecap="round"
            className={hasWeakness ? 'drop-shadow-[0_0_6px_rgba(244,63,94,0.9)]' : 'opacity-70'}
          />
        </g>

        {/* Charm 3: Center Bottom Runic Tile (Dark Mastery) */}
        <g className="cursor-pointer">
          <title>{hasDarkMastery ? `Dark Magic Mastery (${unit.darkMastery})` : 'Occult Runic Ward'}</title>
          <line x1="120" y1="197" x2="120" y2="222" stroke="#57534e" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
          <circle cx="120" cy="224" r="2" fill="none" stroke="#78716c" strokeWidth="0.8" />
          <rect
            x="115"
            y="227"
            width="10"
            height="10"
            rx="1.2"
            fill={hasDarkMastery ? '#581c87' : '#292524'}
            stroke={hasDarkMastery ? '#c084fc' : '#57534e'}
            strokeWidth="1"
            className={hasDarkMastery ? 'drop-shadow-[0_0_6px_rgba(192,132,252,0.9)]' : 'opacity-70'}
          />
          <path d="M 118 230 L 122 234 M 122 230 L 118 234" stroke="#e9d5ff" strokeWidth="0.8" />
        </g>

        {/* Charm 4: Mid-Right Cross / Shield (Defend & Armor) */}
        <g className="cursor-pointer">
          <title>
            {hasVulnerability
              ? 'Afflicted: Armor Sundered (Vulnerability)!'
              : hasDefense
                ? `Fortified: Iron Defense (+${unit.defenseStatus})`
                : 'Shield Charm'}
          </title>
          <line x1="142" y1="184" x2="142" y2="212" stroke="#57534e" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
          <circle cx="142" cy="214" r="2" fill="none" stroke="#78716c" strokeWidth="0.8" />
          <path
            d="M 142 217 L 147 220 L 145 227 L 142 229 L 139 227 L 137 220 Z"
            fill={hasVulnerability ? '#dc2626' : hasDefense ? '#059669' : '#1c1917'}
            stroke={hasVulnerability ? '#fca5a5' : hasDefense ? '#34d399' : '#57534e'}
            strokeWidth="1.2"
            className={hasDefense || hasVulnerability ? 'drop-shadow-[0_0_6px_rgba(52,211,153,0.9)]' : 'opacity-70'}
          />
        </g>

        {/* Charm 5: Right Skull (Mortality / Death's Door) */}
        <g className="cursor-pointer">
          <title>{isLowHealth ? "DANGER: Death's Door Mortal Peril!" : 'Trophy Skull of Mortality'}</title>
          <line x1="164" y1="175" x2="164" y2="204" stroke="#57534e" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
          <circle cx="164" cy="205" r="2" fill="none" stroke="#78716c" strokeWidth="0.8" />
          <path
            d="
              M 160 210 
              C 160 207, 168 207, 168 210 
              C 169 214, 168 215, 166 217 
              L 166 219 L 162 219 L 162 217 
              C 160 215, 159 214, 160 210 Z
            "
            fill={isLowHealth ? '#ef4444' : '#292524'}
            stroke={isLowHealth ? '#fecaca' : '#78716c'}
            strokeWidth="1.2"
            className={isLowHealth ? 'drop-shadow-[0_0_8px_rgba(239,68,68,1)]' : 'opacity-70'}
          />
          <circle cx="162.5" cy="212" r="0.8" fill="#000" />
          <circle cx="165.5" cy="212" r="0.8" fill="#000" />
        </g>
      </g>
    </>
  );
};

export default MedallionCharms;

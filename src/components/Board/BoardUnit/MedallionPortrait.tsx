import React from 'react';
import { Player, Unit } from '../../../types';

interface MedallionPortraitProps {
  unit: Player | Unit;
  isEnemy: boolean;
  onClick?: () => void;
  className?: string;
}

// 12 Rivet angles around the central frame ring
const RIVET_ANGLES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

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
      className={`relative w-[210px] h-[245px] shrink-0 flex items-center justify-center select-none group ${className}`}
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

        {/* ============================================================== */}
        {/* 1. LEFT ARC: HEALTH GAUGE                                      */}
        {/* ============================================================== */}
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
            strokeDasharray={`${healthFill} ${ARC_TOTAL_LENGTH}`}
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

        {/* ============================================================== */}
        {/* 2. RIGHT ARC: MANA / SP GAUGE                                  */}
        {/* ============================================================== */}
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
            strokeDasharray={`${manaFill} ${ARC_TOTAL_LENGTH}`}
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

        {/* ============================================================== */}
        {/* 3. CENTRAL MEDALLION IRON FRAME & RIVET RING                   */}
        {/* ============================================================== */}
        <g id="central-frame" filter="url(#medallionShadow)">
          {/* Heavy outer dark-iron circular bezel ring (center: 120, 115) */}
          <circle
            cx="120"
            cy="115"
            r="72"
            fill="none"
            stroke="#1c1917"
            strokeWidth="7"
          />
          <circle
            cx="120"
            cy="115"
            r="75.5"
            fill="none"
            stroke="#44403c"
            strokeWidth="1.5"
          />
          <circle
            cx="120"
            cy="115"
            r="68.5"
            fill="none"
            stroke="#292524"
            strokeWidth="1.5"
          />

          {/* 12 Iron Rivets along the circumference at radius 67 */}
          {RIVET_ANGLES.map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const rx = 120 + 67 * Math.sin(rad);
            const ry = 115 - 67 * Math.cos(rad);
            return (
              <g key={deg}>
                <circle cx={rx} cy={ry} r="1.8" fill="#78716c" stroke="#0c0a09" strokeWidth="0.6" />
                <circle cx={rx - 0.5} cy={ry - 0.5} r="0.5" fill="#d6d3d1" />
              </g>
            );
          })}

          {/* Inner bezel retaining ring (radius 58.5) */}
          <circle
            cx="120"
            cy="115"
            r="58.5"
            fill="none"
            stroke="#1c1917"
            strokeWidth="2.5"
          />
        </g>

        {/* ============================================================== */}
        {/* 4. TOP GOTHIC NAMEPLATE PLAQUE                                 */}
        {/* ============================================================== */}
        <g id="nameplate" filter="url(#medallionShadow)">
          <rect
            x="45"
            y="9"
            width="150"
            height="22"
            rx="2"
            fill="url(#medallionIronGrad)"
            stroke="#57534e"
            strokeWidth="1.2"
          />
          <rect
            x="66"
            y="11"
            width="108"
            height="18"
            fill="none"
            stroke="#292524"
            strokeWidth="0.8"
          />

          {/* Corner Rivet Screws */}
          <circle cx="68.5" cy="13.5" r="1.1" fill="#a8a29e" stroke="#1c1917" />
          <circle cx="171.5" cy="13.5" r="1.1" fill="#a8a29e" stroke="#1c1917" />
          <circle cx="68.5" cy="26.5" r="1.1" fill="#a8a29e" stroke="#1c1917" />
          <circle cx="171.5" cy="26.5" r="1.1" fill="#a8a29e" stroke="#1c1917" />

          {/* Unit Name Display in Medieval Cinzel Typography */}
          <text
            x="120"
            y="24"
            textAnchor="middle"
            fill="#f5f5f4"
            className="font-cinzel text-[10px] font-black uppercase tracking-widest drop-shadow"
          >
            {unit.name.length > 18 ? unit.name.slice(0, 10) + '..' : unit.name}
          </text>
        </g>

        {/* ============================================================== */}
        {/* 5. BOTTOM CENTER: SPIKED GOTHIC HEART CREST                    */}
        {/* ============================================================== */}
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

        {/* ============================================================== */}
        {/* 6. HANGING CHAIN LINKS & STATUS EFFECT CHARMS (STATIC DECORATION) */}
        {/* ============================================================== */}
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
      </svg>

      {/* ============================================================== */}
      {/* 7. CENTRAL CIRCULAR APERTURE (PORTRAIT FACE CONTAINER)         */}
      {/* ============================================================== */}
      <div
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick?.();
          }
        }}
        className={`absolute top-13 w-29 h-29 rounded-full overflow-hidden bg-stone-950 flex items-center justify-center cursor-pointer z-10 shadow-[inset_0_0_20px_rgba(0,0,0,0.95)] border border-stone-800 transition-transform active:scale-95 group-hover:brightness-105 ${isEnemy
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

import React from 'react';

interface MedallionFrameProps {
  unitName: string;
}

const RIVET_ANGLES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

export const MedallionFrame: React.FC<MedallionFrameProps> = ({ unitName }) => {
  return (
    <>
      {/* 3. CENTRAL MEDALLION IRON FRAME & RIVET RING */}
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

      {/* 4. TOP GOTHIC NAMEPLATE PLAQUE */}
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
          {unitName.length > 18 ? unitName.slice(0, 10) + '..' : unitName}
        </text>
      </g>
    </>
  );
};

export default MedallionFrame;

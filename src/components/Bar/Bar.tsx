import React from 'react';

interface Props {
  value: number;
  maxValue: number;
  type: 'health' | 'mana' | string;
  className?: string;
}

const Bar: React.FC<Props> = ({ value, maxValue, type, className = '' }) => {
  const percentage = maxValue > 0 ? Math.max(0, Math.min(100, (value / maxValue) * 100)) : 0;
  const isMana = type === 'mana';

  return (
    <div
      className={`relative flex items-center justify-center w-[190px] h-[22px] my-1 mx-auto bg-stone-950/90 border border-stone-700/80 rounded-md shadow-inner overflow-hidden select-none ${className}`}
    >
      {/* Dynamic Fill Bar */}
      <div
        className={`absolute left-0 top-0 bottom-0 transition-all duration-300 ease-out ${
          isMana
            ? 'bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-700 shadow-[0_0_8px_rgba(56,189,248,0.5)]'
            : 'bg-gradient-to-r from-red-700 via-rose-600 to-red-900 shadow-[0_0_8px_rgba(225,29,72,0.5)]'
        }`}
        style={{ width: `${percentage}%` }}
      />

      {/* Gloss overlay */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-white/10 pointer-events-none" />

      {/* Numeric readout */}
      <span className="relative z-10 font-cinzel text-xs font-bold tracking-wider text-stone-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
        {isMana ? 'SP' : 'HP'}: {Math.max(0, value).toFixed(0)} / {maxValue.toFixed(0)}
      </span>
    </div>
  );
};

export default Bar;

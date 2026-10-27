import React from 'react';

interface DialogFlankProps {
  side: 'left' | 'right';
  theme?: 'crimson' | 'occult' | 'iron';
}

export const DialogFlank: React.FC<DialogFlankProps> = ({ side, theme = 'crimson' }) => {
  const isOccult = theme === 'occult';
  const isIron = theme === 'iron';

  // Badge gradient & borders
  const badgeGradient = isOccult
    ? 'bg-gradient-to-b from-[#581c87] via-[#3b0764] to-[#120420] border border-purple-700/60 shadow-[0_2px_6px_rgba(0,0,0,0.8)]'
    : isIron
      ? 'bg-gradient-to-b from-stone-700 via-stone-850 to-stone-950 border border-stone-600 shadow-[0_2px_6px_rgba(0,0,0,0.8)]'
      : 'bg-gradient-to-b from-[#8b1e1e] via-[#521313] to-[#200808] border border-[#7d6556] shadow-[0_2px_6px_rgba(0,0,0,0.8)]';

  const badgeIconColor = isOccult
    ? 'text-purple-200'
    : isIron
      ? 'text-stone-300'
      : 'text-amber-100/90';

  const pipColor = isOccult
    ? 'bg-purple-600'
    : isIron
      ? 'bg-stone-500'
      : 'bg-stone-500';

  const finialBorder = isOccult
    ? 'border-purple-700 bg-purple-950'
    : isIron
      ? 'border-stone-600 bg-stone-900'
      : 'border-stone-600 bg-stone-800';

  if (side === 'left') {
    return (
      <div className="w-9 sm:w-12 flex flex-col items-center py-3.5 shrink-0 border-r border-[#2d2622] bg-[#09080b]/90 select-none">
        {/* Heraldic Crest Badge */}
        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-sm ${badgeGradient} flex items-center justify-center relative p-1`}>
          <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-stone-500/80 rounded" />
          <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-stone-500/80 rounded" />
          <svg
            className={`w-4 h-4 ${badgeIconColor} drop-shadow`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </div>

        {/* Vertical Chain Track */}
        <div className="w-1.5 flex-1 my-3 bg-stone-950/90 border-x border-[#2c2420] rounded-full flex flex-col items-center justify-around py-3 opacity-60">
          <div className={`w-1 h-1 rounded-full ${pipColor}`} />
          <div className={`w-1 h-1 rounded-full ${pipColor}`} />
          <div className={`w-1 h-1 rounded-full ${pipColor}`} />
          <div className={`w-1 h-1 rounded-full ${pipColor}`} />
        </div>

        {/* Bottom Finial Diamond */}
        <div className={`w-2 h-2 rotate-45 border ${finialBorder}`} />
      </div>
    );
  }

  return (
    <div className="w-5 sm:w-7 flex flex-col items-center justify-between py-3.5 shrink-0 border-l border-[#2d2622] bg-[#09080b]/90 select-none text-stone-500">
      <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="currentColor">
        <polygon points="5,1 9,8 1,8" />
      </svg>
      <div className="w-px flex-1 bg-gradient-to-b from-stone-700 via-stone-800 to-stone-700 my-2 relative flex flex-col items-center justify-around">
        <div className={`w-1.5 h-1.5 rotate-45 border ${finialBorder}`} />
        <div className={`w-1.5 h-1.5 rotate-45 border ${finialBorder}`} />
      </div>
      <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="currentColor">
        <polygon points="5,9 9,2 1,2" />
      </svg>
    </div>
  );
};

export default DialogFlank;

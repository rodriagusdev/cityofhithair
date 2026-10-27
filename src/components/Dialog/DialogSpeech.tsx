import React, { useEffect, useState } from 'react';
import MerchantInventoryTray from './MerchantInventoryTray';
import { Item } from '../../types';

interface DialogSpeechProps {
  speakerName: string;
  speakerPortrait: string;
  text: string;
  theme?: 'crimson' | 'occult' | 'iron';
  hasShop?: boolean;
  merchantInventory?: Array<Item>;
  onItemPreview?: (item: Item) => void;
}

export const DialogSpeech: React.FC<DialogSpeechProps> = ({
  speakerName,
  speakerPortrait,
  text,
  theme = 'crimson',
  hasShop = false,
  merchantInventory = [],
  onItemPreview,
}) => {
  const [displayedText, setDisplayedText] = useState(text);
  const [isTyping, setIsTyping] = useState(false);

  // Smooth typewriter progression on text change
  useEffect(() => {
    let currentIndex = 0;
    setIsTyping(true);
    setDisplayedText('');

    const interval = window.setInterval(() => {
      currentIndex += 2;
      if (currentIndex >= text.length) {
        setDisplayedText(text);
        setIsTyping(false);
        clearInterval(interval);
      } else {
        setDisplayedText(text.slice(0, currentIndex));
      }
    }, 14);

    return () => clearInterval(interval);
  }, [text]);

  const handleSkipTyping = () => {
    if (isTyping) {
      setDisplayedText(text);
      setIsTyping(false);
    }
  };

  const isOccult = theme === 'occult';
  const nameColor = isOccult ? 'text-purple-300' : 'text-amber-400';
  const portraitBorder = isOccult
    ? 'border-2 border-purple-900 ring-1 ring-purple-950'
    : 'border-2 border-[#54463d] ring-1 ring-stone-900';

  return (
    <div className="flex flex-row items-start gap-3.5 sm:gap-5">
      {/* Speaker Portrait */}
      <div className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg bg-stone-950 shadow-md overflow-hidden ${portraitBorder}`}>
        <img
          src={speakerPortrait}
          alt={speakerName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Speech Transcript */}
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div
          onClick={handleSkipTyping}
          className="font-body text-base sm:text-lg leading-relaxed text-stone-200 max-h-36 sm:max-h-44 overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar cursor-pointer select-text"
          title={isTyping ? 'Click to show full speech' : undefined}
        >
          <span className={`font-display font-bold tracking-wider mr-2 text-sm sm:text-base drop-shadow-sm select-none ${nameColor}`}>
            {speakerName} -
          </span>
          <span className="text-stone-200">{displayedText}</span>
          {isTyping && (
            <span className="inline-block w-1.5 h-3.5 ml-1 bg-amber-400 animate-pulse" />
          )}
        </div>

        {/* Merchant Inventory Tray */}
        {hasShop && merchantInventory.length > 0 && onItemPreview && (
          <div className="mt-2 pt-2 border-t border-stone-800/80">
            <div className="font-cinzel text-[11px] text-stone-400 uppercase tracking-widest mb-1.5 font-semibold">
              Wares for sale:
            </div>
            <MerchantInventoryTray
              inventory={merchantInventory}
              onPreview={onItemPreview}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DialogSpeech;

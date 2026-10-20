import React from 'react';
import { DialogOption } from '../../types';

export const formatDialogChoiceText = (text: string): string => {
  if (!text) return '';
  const trimmed = text.trim();
  // Already formatted with asterisks or bracket prefix
  if (trimmed.startsWith('*') || trimmed.startsWith('[')) return trimmed;
  // Questions
  if (trimmed.endsWith('?')) return `*${trimmed}*`;
  // Actions
  if (/^(join|leave|walk|take|end)\b/i.test(trimmed)) return `*${trimmed}*`;
  // Thematic conversions
  if (trimmed.toLowerCase() === 'items') return '*Inquire about wares and goods.*';
  if (trimmed.toLowerCase() === 'money') return '*Inquire about rare artifacts and gold.*';
  if (trimmed.toLowerCase() === 'merchant') return '*Ask about Sagrob the Merchant.*';
  if (trimmed.toLowerCase() === 'wanderer') return '*Ask about the wanderer Nicolai.*';

  return `*Ask about ${trimmed}.*`;
};

interface DialogChoicesProps {
  options?: Array<DialogOption>;
  onLeave?: () => void;
  leaveText?: string;
}

export const DialogChoices: React.FC<DialogChoicesProps> = ({
  options = [],
  onLeave,
  leaveText = 'Take your leave.',
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full max-h-52 overflow-y-auto pr-2 custom-scrollbar">
      {options.map((option, index) => (
        <button
          key={index}
          type="button"
          onClick={option.createDialog}
          className="group flex items-start text-left gap-2 w-full py-0.5 px-1 bg-transparent hover:bg-transparent border-0 hover:border-transparent transition-colors cursor-pointer text-stone-300"
        >
          <span className="font-cinzel text-sm font-semibold text-stone-400 group-hover:text-amber-400 select-none min-w-[1.25rem]">
            {index + 1}.
          </span>
          <span className="font-cinzel text-sm group-hover:text-amber-200 tracking-wide transition-colors leading-snug">
            {formatDialogChoiceText(option.text)}
          </span>
        </button>
      ))}

      {onLeave && (
        <button
          type="button"
          onClick={onLeave}
          className="group flex items-start text-left gap-2 w-full py-0.5 px-1 bg-transparent hover:bg-transparent border-0 hover:border-transparent transition-colors cursor-pointer text-stone-400"
        >
          <span className="font-cinzel text-sm font-semibold text-stone-500 group-hover:text-amber-400 select-none min-w-[1.25rem]">
            {options.length + 1}.
          </span>
          <span className="font-cinzel text-sm italic group-hover:text-amber-200 tracking-wide transition-colors leading-snug">
            *{leaveText}*
          </span>
        </button>
      )}
    </div>
  );
};

export default DialogChoices;

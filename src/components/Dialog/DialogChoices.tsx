import React, { useEffect } from 'react';
import { DialogChoice } from '../../types/dialog';
import { LegacyDialogOption } from '../../types';

export const formatDialogChoiceText = (text: string): string => {
  if (!text) return '';
  const trimmed = text.trim();
  // Already formatted with asterisks or bracket prefix
  if (trimmed.startsWith('*') || trimmed.startsWith('[')) return trimmed;
  // Questions
  if (trimmed.endsWith('?')) return `*${trimmed}*`;
  // Actions
  if (/^(join|leave|walk|take|end|submit|ask)\b/i.test(trimmed)) return `*${trimmed}*`;
  // Thematic conversions
  if (trimmed.toLowerCase() === 'items') return '*Inquire about wares and goods.*';
  if (trimmed.toLowerCase() === 'money') return '*Inquire about rare artifacts and gold.*';
  if (trimmed.toLowerCase() === 'merchant') return '*Ask about Sagrob the Merchant.*';
  if (trimmed.toLowerCase() === 'wanderer') return '*Ask about the wanderer Nicolai.*';

  return `*Ask about ${trimmed}.*`;
};

interface DialogChoicesProps {
  choices?: DialogChoice[];
  // Legacy options fallback
  options?: Array<LegacyDialogOption>;
  visitedChoiceIds?: Record<string, boolean>;
  onSelectChoice?: (choice: DialogChoice) => void;
  onLeave?: () => void;
  leaveText?: string;
  theme?: 'crimson' | 'occult' | 'iron';
}

export const DialogChoices: React.FC<DialogChoicesProps> = ({
  choices,
  options,
  visitedChoiceIds = {},
  onSelectChoice,
  onLeave,
  leaveText = 'Take your leave.',
  theme = 'crimson',
}) => {
  // Normalize choices array (either new DialogChoice[] or legacy options mapped)
  const normalizedChoices: DialogChoice[] = choices && choices.length > 0
    ? choices
    : (options || []).map((opt, i) => ({
        id: `legacy-${i}`,
        text: opt.text,
        action: opt.createDialog ? undefined : 'close',
      }));

  // Keyboard navigation: 1-9 to select choice, Escape to leave
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'Escape') {
        onLeave?.();
        return;
      }

      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= normalizedChoices.length) {
        const selected = normalizedChoices[num - 1];
        if (selected) {
          if (onSelectChoice) {
            onSelectChoice(selected);
          } else if (options && options[num - 1]?.createDialog) {
            options[num - 1].createDialog?.();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [normalizedChoices, onSelectChoice, onLeave, options]);

  const numberColor = theme === 'occult'
    ? 'text-purple-400 group-hover:text-purple-300'
    : 'text-stone-400 group-hover:text-amber-400';

  const isOccult = theme === 'occult';

  return (
    <div className="flex flex-col gap-1.5 w-full max-h-52 overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar select-none">
      {normalizedChoices.map((choice, index) => {
        const isVisited = Boolean(visitedChoiceIds[choice.id]);

        return (
          <button
            key={choice.id || index}
            type="button"
            onClick={() => {
              if (onSelectChoice) {
                onSelectChoice(choice);
              } else if (options && options[index]?.createDialog) {
                options[index].createDialog?.();
              }
            }}
            className="group flex items-start text-left gap-2 w-full py-0.5 px-1 bg-transparent hover:bg-transparent border-0 cursor-pointer transition-colors"
          >
            <span className={`font-cinzel text-sm font-bold min-w-[1.25rem] transition-colors ${numberColor}`}>
              {index + 1}.
            </span>
            <span
              className={`font-cinzel text-sm tracking-wide transition-colors leading-snug ${
                isVisited
                  ? 'text-stone-400 group-hover:text-amber-300 italic'
                  : isOccult
                    ? 'text-purple-100 group-hover:text-purple-300 font-medium'
                    : 'text-stone-200 group-hover:text-amber-200 font-medium'
              }`}
            >
              {formatDialogChoiceText(choice.text)}
            </span>
          </button>
        );
      })}

      {onLeave && (
        <button
          type="button"
          onClick={onLeave}
          className="group flex items-start text-left gap-2 w-full py-0.5 px-1 bg-transparent hover:bg-transparent border-0 cursor-pointer text-stone-500 transition-colors"
        >
          <span className="font-cinzel text-sm font-semibold text-stone-600 group-hover:text-amber-400 min-w-[1.25rem] transition-colors">
            {normalizedChoices.length + 1}.
          </span>
          <span className="font-cinzel text-sm italic text-stone-400 group-hover:text-amber-200 tracking-wide transition-colors leading-snug">
            *{leaveText}* [Esc]
          </span>
        </button>
      )}
    </div>
  );
};

export default DialogChoices;

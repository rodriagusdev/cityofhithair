import React from 'react';
import { useMerchant } from './useMerchant';
import { useAnnouncerStore, useDialogStore, usePlayerStore } from '../../stores';
import { heroPortraits } from '../../data/general';
import { ShowItemBought } from '../Announcers';
import { Centerer } from '../Centerer';
import ItemPreview from '../ItemPreview/ItemPreview';
import MerchantInventoryTray from './MerchantInventoryTray';
import DialogChoices from './DialogChoices';

const getInitialGreeting = (name: string): string => {
  switch (name) {
    case 'Marion':
      return 'Welcome to what remains of our sanctuary, traveler. The ruins and memory of our city hold many grim tales, and the dead stir in the cemetery. Speak, what brings you to Hithair?';
    case 'Merchant':
      return 'Wares and curiosities scavenged from the crypts below... Interested in trading, or curious where I find these relics?';
    case 'Knight':
      return 'Hold there, traveler. The depths below have stirred with unholy creatures and bestial knights. Choose your words carefully; what is your business in Hithair?';
    default:
      return '*Watches you with a quiet, watchful gaze, waiting for your inquiry.*';
  }
};

const Dialog: React.FC = () => {
  const { updateDialogStatus } = useDialogStore();
  const { merchantInventory } = useMerchant();
  const { handleItemPreview } = useAnnouncerStore();
  const currentDialog = useDialogStore((state) => state.dialog);
  const isVisible = useAnnouncerStore((state) => state.isAnnouncerVisible);
  const isItemPreviewVisible = useAnnouncerStore(
    (state) => state.isItemPreviewVisible
  );

  const player = usePlayerStore((state) => state.player);
  const playerPortrait =
    player?.portraitFace ||
    heroPortraits.knightheroface;
  const playerName = player?.name || 'Hero';

  const speechText = currentDialog.text || getInitialGreeting(currentDialog.name);

  return (
    <>
      {isItemPreviewVisible && (
        <Centerer>
          <ItemPreview />
        </Centerer>
      )}

      {isVisible && (
        <Centerer>
          <ShowItemBought />
        </Centerer>
      )}

      {/* Divinity: Original Sin 2 Style Dialogue Box */}
      <div className="relative flex flex-row w-full max-w-4xl lg:max-w-5xl bg-[#0e0d11]/95 backdrop-blur-md border-2 border-[#3c342f] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_0_30px_rgba(0,0,0,0.85)] overflow-hidden text-stone-200">
        {/* Subtle corner metallic studs */}
        <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-amber-600/40 pointer-events-none z-10" />
        <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-amber-600/40 pointer-events-none z-10" />
        <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-amber-600/40 pointer-events-none z-10" />
        <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-amber-600/40 pointer-events-none z-10" />

        {/* Left Decorative Flank (Embossed Red Badge & Chain Track) */}
        <div className="w-9 sm:w-12 flex flex-col items-center py-3.5 flex-shrink-0 border-r border-[#2d2622] bg-[#09080b]/90 select-none">
          {/* Crimson Heraldic Badge */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-sm bg-gradient-to-b from-[#8b1e1e] via-[#521313] to-[#200808] border border-[#7d6556] shadow-[0_2px_6px_rgba(0,0,0,0.8)] flex items-center justify-center relative p-1">
            <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-stone-500/80 rounded" />
            <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-stone-500/80 rounded" />
            <svg
              className="w-4 h-4 text-amber-100/90 drop-shadow"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>

          {/* Carved Track / Rail */}
          <div className="w-1.5 flex-1 my-3 bg-stone-950/90 border-x border-[#2c2420] rounded-full flex flex-col items-center justify-around py-3 opacity-60">
            <div className="w-1 h-1 rounded-full bg-stone-500" />
            <div className="w-1 h-1 rounded-full bg-stone-500" />
            <div className="w-1 h-1 rounded-full bg-stone-500" />
            <div className="w-1 h-1 rounded-full bg-stone-500" />
          </div>

          {/* Bottom Finial */}
          <div className="w-2 h-2 rotate-45 border border-stone-600 bg-stone-800" />
        </div>

        {/* Central Dialogue Container */}
        <div className="flex-1 min-w-0 flex flex-col p-4 sm:p-6 gap-4 sm:gap-5">
          {/* Top Row: NPC Speaker Section */}
          <div className="flex flex-row items-start gap-3.5 sm:gap-5">
            {/* NPC Portrait */}
            <div className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg border-2 border-[#54463d] bg-stone-950 shadow-md ring-1 ring-stone-900 overflow-hidden">
              <img
                src={currentDialog.portrait}
                alt={currentDialog.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Speech Transcript */}
            <div className="flex-1 min-w-0 flex flex-col gap-2">
              <div className="font-body text-base sm:text-lg leading-relaxed text-stone-200 max-h-36 sm:max-h-44 overflow-y-auto pr-2">
                <span className="font-display font-bold text-amber-400 tracking-wider mr-2 text-sm sm:text-base drop-shadow-sm select-none">
                  {currentDialog.name} -
                </span>
                <span className="text-stone-200">{speechText}</span>
              </div>

              {/* Merchant Tray (integrated cleanly if NPC is Merchant) */}
              {currentDialog.name === 'Merchant' && (
                <div className="mt-2 pt-2 border-t border-stone-800/80">
                  <div className="font-cinzel text-[11px] text-stone-400 uppercase tracking-widest mb-1.5 font-semibold">
                    Wares for sale:
                  </div>
                  <MerchantInventoryTray
                    inventory={merchantInventory}
                    onPreview={handleItemPreview}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Subtle Horizontal Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#453b34]/70 to-transparent my-0.5" />

          {/* Bottom Row: Player Response Choices Section */}
          <div className="flex flex-row items-start gap-3.5 sm:gap-5">
            {/* Player Portrait with DOS2 Ornate Gold Bracket Frame */}
            <div className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg border border-amber-600/70 bg-stone-950 p-0.5 shadow-md">
              {/* Corner brackets */}
              <div className="absolute -top-1 -left-1 w-2.5 h-2.5 pointer-events-none" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 pointer-events-none" />
              <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 pointer-events-none" />
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 pointer-events-none" />
              <img
                src={playerPortrait}
                alt={playerName}
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            {/* Numbered Choices List */}
            <div className="flex-1 min-w-0">
              <DialogChoices
                options={currentDialog?.options}
                onLeave={updateDialogStatus}
              />
            </div>
          </div>
        </div>

        {/* Right Decorative Flank (Scroll Track / Finials) */}
        <div className="w-5 sm:w-7 flex flex-col items-center justify-between py-3.5 flex-shrink-0 border-l border-[#2d2622] bg-[#09080b]/90 select-none text-stone-500">
          <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="currentColor">
            <polygon points="5,1 9,8 1,8" />
          </svg>
          <div className="w-px flex-1 bg-gradient-to-b from-stone-700 via-stone-800 to-stone-700 my-2 relative flex flex-col items-center justify-around">
            <div className="w-1.5 h-1.5 rotate-45 border border-stone-600 bg-stone-900" />
            <div className="w-1.5 h-1.5 rotate-45 border border-stone-600 bg-stone-900" />
          </div>
          <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="currentColor">
            <polygon points="5,9 9,2 1,2" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Dialog;

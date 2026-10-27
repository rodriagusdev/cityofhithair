import React from 'react';
import { useMerchant } from './useMerchant';
import { useAnnouncerStore, useDialogStore, usePlayerStore } from '../../stores';
import { heroPortraits } from '../../data/general';
import { ShowItemBought } from '../Announcers';
import { Centerer } from '../Centerer';
import { Victory } from '../Victory';
import ItemPreview from '../ItemPreview/ItemPreview';
import DialogFlank from './DialogFlank';
import DialogSpeech from './DialogSpeech';
import DialogChoices from './DialogChoices';
import { DialogChoice } from '../../types/dialog';

export const Dialog: React.FC = () => {
  const fsm = useDialogStore((state) => state.fsm);
  const isVictoryVisible = useDialogStore((state) => state.isVictoryVisible);
  const closeDialog = useDialogStore((state) => state.closeDialog);
  const selectChoice = useDialogStore((state) => state.selectChoice);

  // Merchant wares & Announcers
  const { merchantInventory } = useMerchant();
  const { handleItemPreview } = useAnnouncerStore();
  const isAnnouncerVisible = useAnnouncerStore((state) => state.isAnnouncerVisible);
  const isItemPreviewVisible = useAnnouncerStore((state) => state.isItemPreviewVisible);

  // Player portrait & vitals
  const player = usePlayerStore((state) => state.player);
  const playerPortrait = player?.portraitFace || heroPortraits.knightheroface;
  const playerName = player?.name || 'Hero';

  // Active dialog session
  const activeDialog = fsm.status === 'in_dialog' ? fsm.dialog : undefined;

  // Fallback if rendered directly without an active FSM session
  const speakerName = activeDialog?.speakerName || 'Speaker';
  const speakerPortrait = activeDialog?.speakerPortrait || heroPortraits.knightheroface;
  const speechText = activeDialog?.text || '';
  const choices: DialogChoice[] = activeDialog?.choices || [];
  const theme = activeDialog?.theme || 'crimson';
  const hasShop = Boolean(activeDialog?.hasShop);
  const visitedChoiceIds = activeDialog?.visitedChoiceIds || {};

  const isOccult = theme === 'occult';
  const cornerStudColor = isOccult ? 'border-purple-500/40' : 'border-amber-600/40';

  return (
    <>
      {/* Victory Claimed End Screen (if triggered by Nicolai) */}
      {isVictoryVisible && (
        <Centerer>
          <Victory visible={isVictoryVisible} />
        </Centerer>
      )}

      {/* Item Inspect Preview */}
      {isItemPreviewVisible && (
        <Centerer>
          <ItemPreview />
        </Centerer>
      )}

      {/* Item Purchase Toast Announcement */}
      {isAnnouncerVisible && (
        <Centerer>
          <ShowItemBought />
        </Centerer>
      )}

      {/* Divinity: Original Sin 2 Style Dialogue Box */}
      <div className="relative flex flex-row w-full max-w-4xl lg:max-w-5xl bg-stone-950 backdrop-blur-md border-2 border-[#3c342f] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_0_30px_rgba(0,0,0,0.85)] overflow-hidden text-stone-200">
        {/* Subtle corner metallic studs */}
        <div className={`absolute top-1 left-1 w-2 h-2 border-t border-l ${cornerStudColor} pointer-events-none z-10`} />
        <div className={`absolute top-1 right-1 w-2 h-2 border-t border-r ${cornerStudColor} pointer-events-none z-10`} />
        <div className={`absolute bottom-1 left-1 w-2 h-2 border-b border-l ${cornerStudColor} pointer-events-none z-10`} />
        <div className={`absolute bottom-1 right-1 w-2 h-2 border-b border-r ${cornerStudColor} pointer-events-none z-10`} />

        {/* Left Decorative Heraldic Flank */}
        <DialogFlank side="left" theme={theme} />

        {/* Central Dialogue Area */}
        <div className="flex-1 min-w-0 flex flex-col p-4 sm:p-6 gap-4 sm:gap-5">
          {/* Top Row: NPC Speaker Section */}
          <DialogSpeech
            speakerName={speakerName}
            speakerPortrait={speakerPortrait}
            text={speechText}
            theme={theme}
            hasShop={hasShop}
            merchantInventory={merchantInventory}
            onItemPreview={handleItemPreview}
          />

          {/* Subtle Horizontal Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#453b34]/70 to-transparent my-0.5" />

          {/* Bottom Row: Player Response Choices Section */}
          <div className="flex flex-row items-start gap-3.5 sm:gap-5">
            {/* Player Portrait with DOS2 Corner Bracket Frame */}
            <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg border border-amber-600/70 bg-stone-950 p-0.5 shadow-md">
              <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-amber-400 pointer-events-none" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-amber-400 pointer-events-none" />
              <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-amber-400 pointer-events-none" />
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-amber-400 pointer-events-none" />
              <img
                src={playerPortrait}
                alt={playerName}
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            {/* Numbered Choices List */}
            <div className="flex-1 min-w-0">
              <DialogChoices
                choices={choices}
                visitedChoiceIds={visitedChoiceIds}
                onSelectChoice={selectChoice}
                onLeave={closeDialog}
                leaveText={isOccult ? 'Wrestle with your chains.' : 'Take your leave.'}
                theme={theme}
              />
            </div>
          </div>
        </div>

        {/* Right Decorative Flank */}
        <DialogFlank side="right" theme={theme} />
      </div>
    </>
  );
};

export default Dialog;

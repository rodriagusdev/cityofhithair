import React from 'react';
import { useDialogStore } from '../../stores';

interface Props {
  NPC: {
    id?: string;
    name: string;
    portrait?: string;
    face: string;
    x: number | string;
    y: number | string;
  };
}

export const Npc: React.FC<Props> = ({ NPC }) => {
  const startDialog = useDialogStore((state) => state.startDialog);

  const startConversation = () => {
    const treeId = NPC.id || NPC.name.toLowerCase();
    startDialog(treeId);
  };

  return (
    <div
      style={{ top: NPC.y, left: NPC.x }}
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 group cursor-pointer select-none"
    >
      <div className="relative overflow-hidden rounded-full border-2 border-stone-600 bg-stone-950 p-1 group-hover:border-red-700 group-hover:ring-2 group-hover:ring-red-800/40 transition-all duration-300 shadow-lg">
        <img
          src={NPC.face}
          onClick={startConversation}
          alt={NPC.name}
          className="w-14 h-14 md:w-18 md:h-18 object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <h4 className="font-cinzel text-xs md:text-sm font-bold tracking-wider text-white uppercase drop-shadow-sm">
        {NPC.name}
      </h4>
    </div>
  );
};

export default Npc;

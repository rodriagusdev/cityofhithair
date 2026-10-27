import React from 'react';
import { Dialog } from '../../Dialog';
import { useDialogStore } from '../../../stores';
import { Centerer } from '../../Centerer';
import { cityNPCs } from '../../../data/npc';
import { Npc } from '../../NPC';

export const City: React.FC = () => {
  const isInDialog = useDialogStore((state) => state.isInDialog);

  return (
    <div className="relative flex flex-row items-center justify-around w-full h-full flex-1 self-stretch p-6">
      {cityNPCs.map((npc) => (
        <Npc key={npc.id} NPC={npc} />
      ))}

      {isInDialog && (
        <Centerer>
          <Dialog />
        </Centerer>
      )}
    </div>
  );
};

export default City;
